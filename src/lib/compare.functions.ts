import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  task: z.string().min(3).max(2000),
});

export type CompareResult = {
  task: string;
  human: {
    role: string;
    hourlyRateUsd: number;
    estimatedHours: number;
    totalCostUsd: number;
    estimatedDurationDays: number;
    strengths: string[];
    weaknesses: string[];
  };
  ai: {
    model: string;
    estimatedTokens: number;
    pricePerMillionTokensUsd: number;
    totalCostUsd: number;
    estimatedDurationMinutes: number;
    strengths: string[];
    weaknesses: string[];
  };
  comparison: {
    costRatio: string;
    speedRatio: string;
    qualityNote: string;
  };
  verdict: "HUMAN" | "AI" | "HYBRID";
  verdictHeadline: string;
  verdictReasoning: string;
  marketNote: string;
};

export const compareHumanVsAi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<CompareResult> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const system = `You are QARYA's Human vs AI cost & capability analyst for industrial design tasks.
Estimate realistic 2026 market rates. Use your knowledge of current freelance/industry hourly rates by role (industrial designer, CAD engineer, illustrator, etc.) and current LLM/generative AI token pricing.
Always return STRICT JSON matching the schema. No prose, no markdown fences.`;

    const user = `TASK: """${data.task}"""

Return a JSON object with this exact shape:
{
  "task": string,
  "human": {
    "role": string,                        // best-fit professional role
    "hourlyRateUsd": number,               // realistic 2026 market rate
    "estimatedHours": number,
    "totalCostUsd": number,
    "estimatedDurationDays": number,
    "strengths": string[3],
    "weaknesses": string[2]
  },
  "ai": {
    "model": string,                       // e.g. "GPT-class / Gemini Pro"
    "estimatedTokens": number,             // total input+output tokens
    "pricePerMillionTokensUsd": number,    // blended price
    "totalCostUsd": number,
    "estimatedDurationMinutes": number,
    "strengths": string[3],
    "weaknesses": string[2]
  },
  "comparison": {
    "costRatio": string,                   // e.g. "AI is 142x cheaper"
    "speedRatio": string,                  // e.g. "AI is 480x faster"
    "qualityNote": string                  // 1 sentence
  },
  "verdict": "HUMAN" | "AI" | "HYBRID",
  "verdictHeadline": string,               // <= 8 words
  "verdictReasoning": string,              // 2-3 sentences
  "marketNote": string                     // 1 sentence on current market rate basis
}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
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
    const parsed = JSON.parse(cleaned) as CompareResult;
    return parsed;
  });