export const handler = async () => {
  const response = await fetch("https://api.hubbleprotocol.io/staking/hbb/users");

  if (response.status === 200) {
    const data = await response.text();
    return {
      statusCode: 200,
      headers: {
        "content-type": "text/json"
      },
      body: data
    };
  } else {
    return {
      statusCode: 500
    };
  }
};
