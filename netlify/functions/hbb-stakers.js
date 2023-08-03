export const handler = async ()=> {
  console.log(process.version);
  const response = await fetch("https://api.hubbleprotocol.io/staking/hbb/users");
  return await response.json();
};f