import express from "express";
import multer from "multer";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import PDFDocument from "pdfkit";
import OpenAI from "openai";
import path from "path";

const app = express();
const PORT = 3000;

// OpenRouter API
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "Your API KEY"
});

// Middleware
app.use(express.static("public"));

// Ensure folders exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("reports")) fs.mkdirSync("reports");

// Serve reports folder
app.use('/reports', express.static(path.join(process.cwd(), 'reports')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});
const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.json({ error: "No file uploaded" });

    const filePath = req.file.path;

    // 1️⃣ Extract text from PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text || "";

    if (!text.trim()) return res.json({ error: "Could not extract text from PDF" });

    // 2️⃣ Call OpenRouter AI for ATS-style analysis
    const prompt = `
Analyze this resume for an ATS-style score for Skills, Experience, and Education.
Provide:

1. Section-wise scores (Skills, Experience, Education)
2. Overall Score
3. A detailed breakdown explaining deductions or highlights for each section
4. do not send me in bold format means i dont want any stars .

Output should be in this:

Format:
Skills: 85%
Experience: 75%
Education: 80%
Overall: 80%

Breakdown:
1) Skills (85%): ...
2) Experience (75%): ...
3) Education (80%): ...
Resume: ${text}
`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600
    });

    const content = completion.choices[0].message.content;

    // 3️⃣ Extract numeric scores from AI response
    const scores = { skills: 0, experience: 0, education: 0, overall: 0 };
    const regexSkills = /Skills[:\- ]+(\d+)%/i;
    const regexExperience = /Experience[:\- ]+(\d+)%/i;
    const regexEducation = /Education[:\- ]+(\d+)%/i;
    const regexOverall = /Overall[:\- ]+(\d+)%/i;

    const matchSkills = content.match(regexSkills);
    if (matchSkills) scores.skills = parseInt(matchSkills[1]);

    const matchExperience = content.match(regexExperience);
    if (matchExperience) scores.experience = parseInt(matchExperience[1]);

    const matchEducation = content.match(regexEducation);
    if (matchEducation) scores.education = parseInt(matchEducation[1]);

    const matchOverall = content.match(regexOverall);
    if (matchOverall) scores.overall = parseInt(matchOverall[1]);

    // 4️⃣ Generate PDF report
    const pdfFileName = `resume_report_${Date.now()}.pdf`;
    const pdfPath = path.join('reports', pdfFileName);

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Header
    doc.fontSize(22).text("ATS Resume Analysis Report", { align: "center" });
    doc.moveDown(1);

    // Scores
    doc.fontSize(16).text(`Overall Score: ${scores.overall}%`, { align: "center" });
    doc.moveDown(1);

    doc.fontSize(14).text(`Section-wise Scores:`);
    doc.moveDown(0.5);
    doc.text(`Skills: ${scores.skills}%`);
    doc.text(`Experience: ${scores.experience}%`);
    doc.text(`Education: ${scores.education}%`);
    doc.moveDown(1);

    // Breakdown
    doc.fontSize(14).text("Detailed Breakdown:", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(content);

    doc.end();

    // Return JSON with scores, AI content, PDF link
    res.json({
      scores,
      apiContent: content,
      pdfReport: `/reports/${pdfFileName}`
    });

  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
