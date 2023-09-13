export const handler = async (event) => {
  const period = event.queryStringParameters?.period ?? "24h";
  const response = await fetch(`https://api.hubbleprotocol.io/strategies/leaderboard?env=mainnet-beta&period=${period}`);

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