export async function getHbbStakers() {
  const response = await fetch("/.netlify/functions/hbb-stakers");
  if (response.status !== 200) {
    throw new Error(`HTTP status: ${response.status}`);
  }
  const stakers = await response.json();
  return stakers.sort((x, y) => y.staked - x.staked);
}

export async function getKaminoLeaderboard({ period }) {
  const response = await fetch(`/.netlify/functions/kamino-leaderboard?period=${period}`);
  if (response.status !== 200) {
    throw new Error(`HTTP status: ${response.status}`);
  }
  const { strategies } = await response.json();
  return strategies;
}