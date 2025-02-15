async function renderCryptoCards() {
  const cardContainer = document.getElementById("crypto-cards");
  cardContainer.innerHTML = "Loading...";

  const cryptoData = await fetchCryptoData();
  cardContainer.innerHTML = "";

  cryptoData.forEach((crypto) => {
    const card = document.createElement("div");
    card.className = "crypto-card";
    card.innerHTML = `
      <img src="${crypto.image}" alt="${crypto.name}" width="50">
      <h2>${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
      <p>Value: ${crypto.value}</p>
      <p>Market Cap: $${crypto.marketCap.toLocaleString()}</p>
    `;
    card.addEventListener("click", () => {
      window.location.href = `details.html?id=${crypto.id}`;
    });
    cardContainer.appendChild(card);
  });
}

// async function renderCryptoDetails() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const cryptoId = urlParams.get("id");
//   const crypto = await getCryptoById(cryptoId);

//   if (crypto) {
//     document.getElementById("crypto-name").textContent = `${
//       crypto.name
//     } (${crypto.symbol.toUpperCase()})`;

//     // Fetch transactions for a sample Ethereum address
//     const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Example address
//     const transactions = await fetchTransactions(walletAddress);

//     // Ensure transactions are valid numbers
//     const transactionValues = transactions
//       .map((tx) => parseFloat(tx))
//       .filter((tx) => !isNaN(tx));

//     // Render the graph
//     const ctx = document.getElementById("transaction-graph").getContext("2d");
//     new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: transactionValues.map((_, i) => `Transaction ${i + 1}`),
//         datasets: [
//           {
//             label: "Transaction Value (ETH)",
//             data: transactionValues,
//             borderColor: "#ff6f61",
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });

//     // Scam evaluation logic
//     const scamEvaluation =
//       transactionValues.length > 10 ? "High risk" : "Low risk";
//     const evaluationClass =
//       scamEvaluation === "High risk" ? "high-risk" : "low-risk";

//     document.getElementById("scam-evaluation").innerHTML = `
//       <h2>Scam Evaluation</h2>
//       <p class="${evaluationClass}">${scamEvaluation}</p>
//     `;

//     // Suggestions (placeholder logic)
//     const suggestions = ["Ethereum", "Bitcoin", "Solana"];
//     document.getElementById("suggestions").innerHTML = `
//       <h2>Suggestions</h2>
//       <ul>
//         ${suggestions.map((s) => `<li>${s}</li>`).join("")}
//       </ul>
//     `;
//   } else {
//     console.error("Crypto not found");
//   }
// }

// async function renderCryptoDetails() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const cryptoId = urlParams.get("id");
//   const crypto = await getCryptoById(cryptoId);

//   if (!crypto) {
//     console.error("Crypto not found");
//     return;
//   }

//   document.getElementById("crypto-name").textContent = `${
//     crypto.name
//   } (${crypto.symbol.toUpperCase()})`;

//   // Fetch transactions dynamically for the selected crypto
//   const transactions = await fetchTransactions(cryptoId);

//   // Ensure transactions are valid numbers
//   const transactionValues = transactions
//     .map((tx) => parseFloat(tx))
//     .filter((tx) => !isNaN(tx));

//   const ctx = document.getElementById("transaction-graph").getContext("2d");

//   // Check if there are transactions before rendering chart
//   if (transactionValues.length === 0) {
//     document.getElementById("transaction-graph-container").innerHTML =
//       "<p>No transaction data available for this cryptocurrency.</p>";
//     return;
//   }

//   // Destroy previous Chart instance if it exists
//   if (window.myChart) {
//     window.myChart.destroy();
//   }

//   // Render a bar chart instead of a line graph
//   window.myChart = new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: transactionValues.map((_, i) => `Tx ${i + 1}`),
//       datasets: [
//         {
//           label: "Transaction Value (ETH/BTC)",
//           data: transactionValues,
//           backgroundColor: transactionValues.map(
//             (value) => (value > 1 ? "#ff6f61" : "#4caf50") // Color based on value
//           ),
//           borderColor: "#333",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: "ETH/BTC Value",
//           },
//         },
//         x: {
//           title: {
//             display: true,
//             text: "Transactions",
//           },
//         },
//       },
//       plugins: {
//         legend: { display: false }, // Hide legend
//         tooltip: {
//           callbacks: {
//             label: (tooltipItem) =>
//               `Value: ${tooltipItem.raw} ${crypto.symbol.toUpperCase()}`,
//           },
//         },
//       },
//     },
//   });

//   // Scam evaluation logic
//   const scamEvaluation =
//     transactionValues.length > 10 ? "High risk" : "Low risk";
//   const evaluationClass =
//     scamEvaluation === "High risk" ? "high-risk" : "low-risk";

//   document.getElementById("scam-evaluation").innerHTML = `
//     <h2>Scam Evaluation</h2>
//     <p class="${evaluationClass}">${scamEvaluation}</p>
//   `;

//   // Suggestions (placeholder logic)
//   const suggestions = ["Ethereum", "Bitcoin", "Solana"];
//   document.getElementById("suggestions").innerHTML = `
//     <h2>Suggestions</h2>
//     <ul>
//       ${suggestions.map((s) => `<li>${s}</li>`).join("")}
//     </ul>
//   `;
// }

async function renderCryptoDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const cryptoId = urlParams.get("id");
  const crypto = await getCryptoById(cryptoId);

  if (crypto) {
    document.getElementById("crypto-name").textContent = `${
      crypto.name
    } (${crypto.symbol.toUpperCase()})`;

    // Fetch transactions for a sample Ethereum address
    // const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Example address
    const walletAddress = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE"; // Example address
    const transactions = await fetchTransactions(walletAddress);

    // Ensure transactions are valid numbers
    const transactionValues = transactions
      .map((tx) => parseFloat(tx))
      .filter((tx) => !isNaN(tx));

    // Render the graph
    const ctx = document.getElementById("transaction-graph").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: transactionValues.map((_, i) => `Transaction ${i + 1}`),
        datasets: [
          {
            label: "Transaction Value (ETH)",
            data: transactionValues,
            borderColor: "#ff6f61",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Scam evaluation logic
    const scamEvaluation =
      transactionValues.length > 10 ? "High risk" : "Low risk";
    const evaluationClass =
      scamEvaluation === "High risk" ? "high-risk" : "low-risk";

    document.getElementById("scam-evaluation").innerHTML = `
      <h2>Scam Evaluation</h2>
      <p class="${evaluationClass}">${scamEvaluation}</p>
    `;

    // Suggestions (placeholder logic)
    const suggestions = ["Ethereum", "Bitcoin", "Solana"];
    document.getElementById("suggestions").innerHTML = `
      <h2>Suggestions</h2>
      <ul>
        ${suggestions.map((s) => `<li>${s}</li>`).join("")}
      </ul>
    `;
  } else {
    console.error("Crypto not found");
  }
}
