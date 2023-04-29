"user strict";

const playUninformed = document.querySelector("#uninformed");
const playInformed = document.querySelector("#informed");

playUninformed.addEventListener("click", async function () {
  window.location.href = "/uninformed";
});

playInformed.addEventListener("click", async function () {
  window.location.href = "/informed";
});
