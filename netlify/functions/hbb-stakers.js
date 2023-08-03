export const handler = async ()=> {
  console.log(fetch);
  const response = await fetch("https://api.hubbleprotocol.io/staking/hbb/users");
  return await response.json();
};f