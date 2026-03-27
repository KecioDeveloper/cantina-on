setTimeout(() => {
  document.querySelector(".loader").style.display = "none";
  document.getElementById("entrar").style.display = "inline-block";
}, 3000);

document.getElementById("entrar").addEventListener("click", () => {
  window.location.href = "cantina_on_v0.6.html";
});