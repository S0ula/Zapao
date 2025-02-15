// Fetch cryptocurrency data from CoinGecko API
async function fetchCryptoData() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map((crypto) => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      value: `$${crypto.current_price}`,
      image: crypto.image,
      marketCap: crypto.market_cap,
      transactions: [], // Transactions will be fetched separately
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
}

// Fetch Ethereum transactions for a specific address using Etherscan API
async function fetchTransactions(walletAddress) {
  const apiKey = "YOUR_ETHERSCAN_API_KEY"; // Replace with your Etherscan API key
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result.map((tx) => (tx.value / 1e18).toFixed(4)); // Convert Wei to Ether and limit decimals
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

// Get crypto details by ID
async function getCryptoById(id) {
  const cryptoData = await fetchCryptoData();
  return cryptoData.find((crypto) => crypto.id === id);
}
