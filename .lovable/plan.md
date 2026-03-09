

## Problem

The AI response returns `{ answer: "<stringified JSON>", cached: true }` where `answer` is already a valid JSON string. The current regex-based "cleaning" (line 122: unquoted keys regex) is corrupting the already-valid JSON by mangling quoted property names that contain special characters or double-quoted values.

The regex `(['"])?(\w+)(['"])?\s*:` matches already-quoted keys like `"fullName":` and can break them, especially when the JSON contains values with colons (like URLs).

## Plan

**File: `src/components/resume/ResumeUpload.tsx`**

Replace the JSON extraction/cleaning logic (lines 107-130) with a simpler approach:

1. First, try `JSON.parse(aiText)` directly since the `answer` field is already valid JSON
2. If that fails, extract JSON from markdown code blocks, isolate `{...}`, and try again
3. Only apply regex sanitization as a last resort fallback
4. Remove the aggressive unquoted-keys regex that corrupts valid JSON

```
// Try parsing directly first (answer is often valid JSON)
let parsed: any;
try {
  parsed = JSON.parse(aiText);
} catch {
  // Fallback: extract from markdown blocks, isolate JSON object
  let jsonStr = aiText;
  const jsonMatch = aiText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) jsonStr = jsonMatch[1];
  const firstBrace = jsonStr.indexOf('{');
  const lastBrace = jsonStr.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
  }
  // Light cleanup only: trailing commas
  jsonStr = jsonStr.replace(/,\s*([}\]])/g, '$1');
  try {
    parsed = JSON.parse(jsonStr.trim());
  } catch {
    throw new Error('AI returned invalid format. Please try again.');
  }
}
```

This fixes the root cause: the aggressive regex was corrupting valid JSON.

