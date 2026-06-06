import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  prompt: z.string().min(3).max(2000),
});

export type SuggestParamsResult = {
  empathy: number;
  concept: number;
  optimization: number;
  speed: number;
  budget: number;
  reasoning: string;
  recommended: "HUMAN" | "AI" | "HYBRID";
};

const clamp = (n: unknown) => {
  const v = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(v)) return 50;
  return Math.max(0, Math.min(100, Math.round(v)));
};

export const suggestParams = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<SuggestParamsResult> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const system = `You are QARYA's task parameter analyst for industrial design briefs.
Given a project task description, output 5 parameter scores (0-100) that characterise the brief:
- empathy: need for human-centric design, contextual understanding, vulnerable groups
- concept: need for radical innovation and abstract conceptualization (C-K Theory)
- optimization: need to process datasets, generate variations, reduce material cost
- speed: requirement for rapid prototyping and short cycles
- budget: strictness of financial/operational constraints
Return STRICT JSON only. No prose, no markdown fences.`;

    const user = `TASK: """${data.prompt}"""

Return JSON: {
  "empathy": number 0-100,
  "concept": number 0-100,
  "optimization": number 0-100,
  "speed": number 0-100,
  "budget": number 0-100,
  "reasoning": string (1-2 sentences explaining the scoring),
  "recommended": "HUMAN" | "AI" | "HYBRID"
}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`AI gateway error ${res.status}: ${text}`);
    }

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content ?? "{}";
    const cleaned = content.replace(/^```json\s*|\s*```$/g, "").trim();
    const parsed = JSON.parse(cleaned) as Partial<SuggestParamsResult>;

    return {
      empathy: clamp(parsed.empathy),
      concept: clamp(parsed.concept),
      optimization: clamp(parsed.optimization),
      speed: clamp(parsed.speed),
      budget: clamp(parsed.budget),
      reasoning: typeof parsed.reasoning === "string" ? parsed.reasoning : "",
      recommended:
        parsed.recommended === "HUMAN" || parsed.recommended === "AI" || parsed.recommended === "HYBRID"
          ? parsed.recommended
          : "HYBRID",
    };
  });