const AI_API_URL = 'https://back-end.scriptimiz.com/api/chatAI';

interface AiResponse {
  answer: string;
  cached: boolean;
}

export const aiService = {
  async enhanceText(prompt: string, systemPrompt = 'You are an expert resume writer. Only return the improved text, no explanations.'): Promise<{ data?: string; error?: string }> {
    try {
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt },
          ],
        }),
      });

      if (!response.ok) {
        return { error: 'AI service unavailable. Please try again.' };
      }

      const data: AiResponse = await response.json();
      return { data: data.answer };
    } catch {
      return { error: 'Failed to connect to AI service.' };
    }
  },

  async improveSummary(summary: string): Promise<{ data?: string; error?: string }> {
    return this.enhanceText(
      `Improve this professional summary for a resume. Keep it concise (2-3 sentences). Only return the improved summary text, nothing else:\n\n${summary}`
    );
  },

  async improveExperienceDescription(position: string, company: string, description: string): Promise<{ data?: string; error?: string }> {
    return this.enhanceText(
      `Improve this job description for a resume. Use bullet points starting with action verbs. Keep it concise and impactful. Only return the improved description, nothing else.\n\nPosition: ${position}\nCompany: ${company}\nDescription:\n${description}`
    );
  },
};
