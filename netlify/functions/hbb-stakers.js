export const handler = async ()=> {
  const response = await fetch("https://api.hubbleprotocol.io/staking/hbb/users");

  if (response.status === 200) {
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } else {
    return {
      statusCode: 500
    };
  }
};
