const form = document.getElementById("resumeForm");
const loading = document.getElementById("loading");
const resultDiv = document.getElementById("result");
const scoreBars = document.getElementById("scoreBars");
const apiContent = document.getElementById("apiContent");
const downloadPdf = document.getElementById("downloadPdf");

// Loader HTML (hidden initially)
loading.innerHTML = `
  <div class="loader-container">
    <div class="loader-bar-bg">
      <div class="loader-bar" id="loaderBar">0%</div>
    </div>
    <p>Analyzing Resume...</p>
  </div>
`;
loading.style.display = "none"; // initially hidden

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset UI
  scoreBars.innerHTML = "";
  apiContent.textContent = "";
  downloadPdf.href = "#";
  resultDiv.classList.add("hidden");

  const file = document.getElementById("resume").files[0];
  if (!file) return alert("Select a PDF");

  // Show loader
  loading.style.display = "block";
  const loaderBar = document.getElementById("loaderBar");
  loaderBar.style.width = "0%";
  loaderBar.textContent = "0%";

  const formData = new FormData();
  formData.append("resume", file);

  // CONFIGURABLE SPEED: Increase step faster or slower
  let speed = 380; // lower = faster, higher = slower
  let percent = 0;

  const loadingInterval = setInterval(() => {
    if (percent < 95) { // animate slowly up to 95%
      percent += 1; // change increment to adjust perceived speed
      loaderBar.style.width = percent + "%";
      loaderBar.textContent = percent + "%";
    }
  }, speed);

  try {
    const res = await fetch("/upload", { method: "POST", body: formData });
    const data = await res.json();

    clearInterval(loadingInterval);

    // Jump to 100% instantly
    loaderBar.style.width = "100%";
    loaderBar.textContent = "100%";

    // Short delay to let user see 100%
    setTimeout(() => {
      loading.style.display = "none";
      resultDiv.classList.remove("hidden");
    }, 400);

    if (data.error) return alert(data.error);

    // Section-wise bars
    const keys = ["skills", "experience", "education", "overall"];
    keys.forEach(key => {
      if (data.scores[key] === undefined) return;
      const val = data.scores[key];
      const barCont = document.createElement("div");
      barCont.className = "bar-container";

      const bar = document.createElement("div");
      bar.className = `bar ${key}`;
      bar.textContent = `${key.toUpperCase()}: ${val}%`;
      barCont.appendChild(bar);
      scoreBars.appendChild(barCont);

      // Animate bar width
      setTimeout(() => { bar.style.width = val + "%"; }, 100);
    });

    apiContent.textContent = data.apiContent;
    downloadPdf.href = data.pdfReport;

  } catch (err) {
    clearInterval(loadingInterval);
    loading.style.display = "none";
    alert("Error: " + err);
  }
});
