window.onload = async () => {
  const updateButton = document.getElementById("update-button");
  const ladderPanel = document.getElementById("ladder-panel");
  const stakerCardTemplate = document.getElementById("staker-card-template");

  function createStakerCard({ index, address, amount }) {
    const cardElem = stakerCardTemplate.content.cloneNode(true);
    const posElem = cardElem.querySelector(".staker-number-value");
    const addressElem = cardElem.querySelector(".staker-address-value");
    const amountElem = cardElem.querySelector(".staker-amount-value");

    posElem.textContent = index + 1;
    addressElem.textContent = address;
    amountElem.textContent = amount;

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
    } catch (e) {
      renderError(e);
    } finally {
      updateButton.removeAttribute("disabled");
      updateButton.textContent = "Fetch stakers";
    }
  }

  updateButton.addEventListener("click", async () => {
    await updatePage();
  });

  await updatePage();
};