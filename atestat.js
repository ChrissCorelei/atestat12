const produse = document.querySelectorAll(".produs");
const indemn = document.getElementById("detalii-indemn");
const continut = document.getElementById("detalii-continut");
const nume = document.getElementById("detalii-nume");
const descriere = document.getElementById("detalii-descriere");
const pret = document.getElementById("detalii-pret");

produse.forEach(function (produs) {
    produs.addEventListener("click", function () {
        produse.forEach(function (altul) {
            altul.classList.remove("activ");
        });
        produs.classList.add("activ");

        nume.textContent = produs.textContent;
        descriere.textContent = produs.dataset.descriere;
        pret.textContent = produs.dataset.pret;

        indemn.hidden = true;
        continut.hidden = false;
    });
});
