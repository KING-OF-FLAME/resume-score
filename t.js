import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost",
    "X-Title": "ResumeScoreTool"
  },
});

async function testResume() {
  try {
    // Sample resume text
    const sampleResume = `
    John Doe
    Skills: JavaScript, Python, HTML, CSS
    Experience: 3 years as Web Developer at XYZ Corp
    Education: B.Tech in Computer Science
    `;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        {
          role: "user",
          content: `Analyze this resume and provide numeric score out of 100 for Skills, Experience, Education. Return in format 'Skills: 90%, Experience: 80%, Education: 85%'. Resume: ${sampleResume}`
        }
      ],
      max_tokens: 200
    });

    console.log("✅ API Response:");
    console.log(completion.choices[0].message);

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testResume();
