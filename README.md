# 📄 ATS-Based Resume Score Checker

A powerful and AI-powered ATS resume scoring tool that analyzes resumes, gives **section-wise and overall scores**, and generates a **detailed PDF report**. This tool helps job seekers optimize their resumes for **Applicant Tracking Systems (ATS)** and receive actionable insights.

<p align="center">
  <img src="https://i.ibb.co/RTHWr3Lp/make-a-logo-for-resume-score-checker.jpg" alt="Resume Score Checker Screenshot" width="250">
  <br>
  <i>(Interactive dashboard and PDF report generation in action)</i>
</p>

[![Repo Size](https://img.shields.io/github/repo-size/KING-OF-FLAME/resume-score?style=flat-square\&color=orange)](https://github.com/KING-OF-FLAME/resume-score)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/KING-OF-FLAME/resume-score)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/KING-OF-FLAME/resume-score/graphs/commit-activity)

---

## 🌟 About The Project 📍

The **Resume Score Checker** is designed to help candidates understand how well their resumes perform under ATS and recruiter scrutiny. Using **OpenRouter AI**, the system provides:

* **Section-wise scores**: Skills, Experience, Education.
* **Overall ATS Score**: A numeric score out of 100.
* **Breakdown & Insights**: AI-generated analysis highlighting strengths and weaknesses.
* **PDF Report**: A professional downloadable report with scores and analysis.

---

## 🚀 Features 📍

* **ATS-Optimized Analysis** – scores your resume like a real ATS.
* **Section-Wise Scoring** – Skills, Experience, Education, and Overall.
* **Interactive Dashboard** – animated bars and performance visualization.
* **PDF Report Generation** – download a detailed report.
* **Real-Time Loader Animation** – smooth progress indicator while analyzing.
* **Vanilla Stack** – HTML, CSS, JS frontend + Node.js backend, no heavy frontend frameworks.

---

## 🛠 Requirements

* **Node.js** (v18+) installed
* **npm** installed
* OpenRouter AI API key

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/KING-OF-FLAME/resume-score.git
cd resume-score
```

### 2️⃣ Install Dependencies

```bash
npm install express multer pdf-parse pdfkit openai
```

### 3️⃣ Update API Key

Open `server.js` and update your OpenRouter API key:

```js
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "YOUR_API_KEY_HERE"  // <-- Replace this
});
```

---

## 💻 Running Locally

### **Using XAMPP / Local Server**

1. Make sure **Node.js** is installed.
2. Navigate to the project folder in terminal.
3. Run the server:

```bash
node server.js
```

4. Open your browser and go to:

```
http://localhost:3000
```

---

### **Using Shared Hosting**

> Note: Shared hosting must support Node.js (some cPanels allow Node apps). If not, you’ll need VPS/Cloud hosting.

1. Upload your project files to your Node.js-enabled hosting.
2. Install dependencies via SSH:

```bash
npm install
```

3. Update API key in `server.js` as above.
4. Start the Node server (some hosting panels provide a "Run Node.js App" option).
5. Access your app via the assigned domain or port.

---

## 📂 Folder Structure

```
/resume-score/
|-- server.js           # Main backend file
|-- package.json
|-- package-lock.json
|-- /public/            # Frontend files
    |-- index.html
    |-- style.css
    |-- script.js
|-- /uploads/           # Uploaded resumes (auto-created)
|-- /reports/           # Generated PDF reports (auto-created)
```

> ⚠️ Tip: Add `uploads/` and `reports/` to `.gitignore` to avoid pushing temporary files.

---

## 🎨 Usage

1. Open the web app in browser.
2. Upload your resume (PDF).
3. Wait for the loader animation while the AI analyzes your resume.
4. View **section-wise scores**, **overall score**, and **AI feedback**.
5. Download the **PDF report**.

---

## 🤝 Contributions

Contributions, issues, and feature requests are welcome!

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes:

```bash
git commit -m 'Add some AmazingFeature'
```

4. Push to the branch:

```bash
git push origin feature/AmazingFeature
```

5. Open a pull request.

---

## 📧 Contact

Github: [KING OF FLAME](https://github.com/KING-OF-FLAME)
Instagram: [yash.developer](https://instagram.com/yash.developer)

---

## 🙏 Acknowledgments

* OpenRouter AI for intelligent resume analysis.
* PDFKit & pdf-parse for PDF generation and parsing.
* Inspiration from ATS best practices and open-source community.
