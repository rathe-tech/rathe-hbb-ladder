window.onload = () => {
  const updateButton = document.getElementById("update-button");
  const ladderPanel = document.getElementById("ladder-panel");

  updateButton.addEventListener("click", async () => {
    const response = await fetch("/.netlify/functions/hbb-stakers");
    const data = await response.json();
    ladderPanel.innerText = data;
  });
};