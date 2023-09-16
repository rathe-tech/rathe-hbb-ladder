import * as api from "./api.js";

window.onload = async () => {
  const strategyCardTemplate = document.getElementById("card-template");
  const strategyPanel = document.getElementById("strategy-panel");

  function createStrategyCard({ index, strategy }) {
    const cardElem = strategyCardTemplate.content.cloneNode(true);
    const addressElem = cardElem.querySelector(".strategy-address-value");
    const apyElem = cardElem.querySelector(".strategy-apy-value");
    const pnlElem = cardElem.querySelector(".strategy-pnl-value");
    const volumeElem = cardElem.querySelector(".strategy-volume-value");
    const feesElem = cardElem.querySelector(".strategy-fees-value");
    const tvlElem = cardElem.querySelector(".strategy-tvl-value");

    addressElem.textContent = strategy.strategy;
    apyElem.textContent = strategy.apy;
    pnlElem.textContent = strategy.pnl;
    volumeElem.textContent = strategy.volume;
    feesElem.textContent = strategy.fees;
    tvlElem.textContent = strategy.tvl;

    return cardElem;
  }

  function renderStrategies(strategies) {
    strategies.forEach((strategy, index) => {
      const card = createStrategyCard({ index, strategy });
      strategyPanel.appendChild(card);
    });
  }

  async function updatePage() {
    const { strategies } = await(await fetch("./leaderboard.json")).json();//await api.getKaminoLeaderboard({ period: "24h" });
    renderStrategies(strategies);
  }

  await updatePage();
};