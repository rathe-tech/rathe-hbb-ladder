import * as api from "./api.js";

window.onload = async () => {
  const updateButton = document.getElementById("update-button");
  const ladderPanel = document.getElementById("ladder-panel");
  const donationPanel = document.getElementById("donation-panel");
  const donationWallet = document.getElementById("donation-wallet");
  const statsElem = document.getElementById("stats");
  const activeStakersElem = document.getElementById("active-stakers");
  const hbbStakedElem = document.getElementById("hbb-staked");
  const stakerCardTemplate = document.getElementById("card-template");

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
    addressElem.setAttribute("href", `https://solscan.io/account/${address}`);
    amountElem.textContent = formatAmount(amount);

    return cardElem;
  }

  function renderHbbStakers(stakers) {
    stakers.forEach((s, index) => {
      const card = createStakerCard({ index, address: s.user, amount: s.staked });
      ladderPanel.appendChild(card);
    });
  }

  function renderTotalStats(stakers) {
    activeStakersElem.textContent = stakers.length;
    hbbStakedElem.textContent = formatAmount(stakers.reduce((v, s) => {
      return v + parseFloat(s.staked);
    }, 0).toFixed(6));
    statsElem.classList.toggle("hidden");
  }

  function renderError(e) {
    ladderPanel.textContent = `Could not fetch data: ${e}`;
  }

  function showDonationPanel() {
    donationPanel.removeAttribute("style");
  }

  async function updatePage() {
    try {
      updateButton.setAttribute("disabled", true);
      statsElem.classList.add("hidden");
      updateButton.textContent = "Fetching stakers...";
      ladderPanel.textContent = "";

      const stakers = await api.getHbbStakers();
      renderTotalStats(stakers);
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