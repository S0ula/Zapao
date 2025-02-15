document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("details.html")) {
    renderCryptoDetails();
  } else {
    renderCryptoCards();
  }
});
