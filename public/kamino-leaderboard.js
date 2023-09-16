import * as api from "./api.js";

window.onload = async () => {
  const strategyCardTemplate = document.getElementById("card-template");
  const strategyPanel = document.getElementById("strategy-panel");

  function createStrategyCard({ index, strategy }) {
    const cardElem = strategyCardTemplate.content.cloneNode(true);
    const addressElem = cardElem.querySelector(".address");
    const apyElem = cardElem.querySelector(".apy");
    const pnlElem = cardElem.querySelector(".pnl");
    const volumeElem = cardElem.querySelector(".volume");
    const feesElem = cardElem.querySelector(".fees");
    const tvlElem = cardElem.querySelector(".tvl");

    addressElem.textContent = strategy.strategy;
    addressElem.setAttribute("href", `https://app.kamino.finance/liquidity/${strategy.strategy}`);
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
    const { strategies } = await api.getKaminoLeaderboard({ period: "24h" });//await(await fetch("./leaderboard.json")).json();
    renderStrategies(strategies);
  }

  await updatePage();
};