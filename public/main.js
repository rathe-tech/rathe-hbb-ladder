window.onload = async () => {
  const updateButton = document.getElementById("update-button");
  const ladderPanel = document.getElementById("ladder-panel");
  const donationPanel = document.getElementById("donation-panel");
  const donationWallet = document.getElementById("donation-wallet");
  const stakerCardTemplate = document.getElementById("staker-card-template");

  function formatAmount(amount) {
    const [whole, decimal] = amount.split(".");

    const partialSize = whole.length % 3;
    const fullCount = (whole.length - partialSize) / 3;
    const chunks = [];

    if (partialSize !== 0) {
      const chunk = whole.substring(0, partialSize);
      chunks.push(chunk);
    }

    for (let i = 0; i < fullCount; i++) {
      const startIndex = i * 3 + partialSize;
      const endIndex = startIndex + 3;
      const chunk = whole.substring(startIndex, endIndex);
      chunks.push(chunk)
    }
    
    const formattedWhole = chunks.join(",") || "0";
    return [formattedWhole, ".", decimal || "0"].join("");
  }

  function createStakerCard({ index, address, amount }) {
    const cardElem = stakerCardTemplate.content.cloneNode(true);
    const posElem = cardElem.querySelector(".staker-number-value");
    const addressElem = cardElem.querySelector(".staker-address-value");
    const amountElem = cardElem.querySelector(".staker-amount-value");

    posElem.textContent = index + 1;
    addressElem.textContent = address;
    amountElem.textContent = formatAmount(amount);

    return cardElem;
  }

  function renderHbbStakers(stakers) {
    stakers.forEach((s, index) => {
      const card = createStakerCard({ index, address: s.user, amount: s.staked });
      ladderPanel.appendChild(card);
    });
  }

  function renderError(e) {
    ladderPanel.textContent = `Could not fetch data: ${e}`;
  }

  function showDonationPanel() {
    donationPanel.removeAttribute("style");
  }

  async function fetchHbbStakers() {
    const response = await fetch("/.netlify/functions/hbb-stakers");
    const stakers = await response.json();
    return stakers.sort((x, y) => y.staked - x.staked);
  }

  async function updatePage() {
    try {
      updateButton.setAttribute("disabled", true);
      updateButton.textContent = "Fetching stakers...";
      ladderPanel.textContent = "";

      const stakers = await fetchHbbStakers();
      renderHbbStakers(stakers);
      showDonationPanel();
    } catch (e) {
      renderError(e);
    } finally {
      showDonationPanel();
      updateButton.removeAttribute("disabled");
      updateButton.textContent = "Fetch stakers";
    }
  }

  updateButton.addEventListener("click", async () => {
    await updatePage();
  });

  donationWallet.addEventListener("click", async () => {
    await navigator.clipboard.writeText("1DxMVkgaKW4sCNJcXGHGGEb2kv4Jh3Q4Wd9RjEvMP73");
    alert("Wallet address copied!");
  });

  await updatePage();
};