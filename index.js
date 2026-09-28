const produse = document.querySelectorAll(".produs");
const indemn = document.getElementById("detalii-indemn");
const continut = document.getElementById("detalii-continut");
const nume = document.getElementById("detalii-nume");
const descriere = document.getElementById("detalii-descriere");
const pret = document.getElementById("detalii-pret");
const adaugaInCos = document.getElementById("adauga-in-cos");
const foto = document.getElementById("detalii-foto");
const imagine = document.getElementById("detalii-imagine");
const credit = document.getElementById("detalii-credit");

const paginaPrincipala = document.getElementById("pagina-principala");
const paginaCos = document.getElementById("cos");
const cosNumar = document.getElementById("cos-numar");
const cosGol = document.getElementById("cos-gol");
const cosLista = document.getElementById("cos-lista");
const cosTotal = document.getElementById("cos-total");
const cosSuma = document.getElementById("cos-suma");
const plaseazaComanda = document.getElementById("plaseaza-comanda");
const emailContact = document.getElementById("email-contact");
const cosTrimitere = document.getElementById("cos-trimitere");
const trimiteGmail = document.getElementById("trimite-gmail");
const trimiteAplicatie = document.getElementById("trimite-aplicatie");

const cos = [];
let produsAles = null;

produse.forEach(function (produs) {
    produs.addEventListener("click", function () {
        produse.forEach(function (altul) {
            altul.classList.remove("activ");
        });
        produs.classList.add("activ");
        produsAles = produs;

        nume.textContent = produs.textContent;
        descriere.textContent = produs.dataset.descriere;
        pret.textContent = produs.dataset.pret + " lei";

        if (produs.dataset.imagine) {
            imagine.src = produs.dataset.imagine;
            imagine.alt = produs.textContent;
            credit.textContent = produs.dataset.credit;
            credit.href = produs.dataset.sursa;
            foto.hidden = false;
        } else {
            foto.hidden = true;
        }

        indemn.hidden = true;
        continut.hidden = false;
    });
});

imagine.addEventListener("error", function () {
    foto.hidden = true;
});

adaugaInCos.addEventListener("click", function () {
    const articol = cos.find(function (a) {
        return a.nume === produsAles.textContent;
    });

    if (articol) {
        articol.cantitate = articol.cantitate + 1;
    } else {
        cos.push({
            nume: produsAles.textContent,
            pret: Number(produsAles.dataset.pret),
            cantitate: 1
        });
    }

    afiseazaCos();
});

function schimbaCantitatea(articol, diferenta) {
    articol.cantitate = articol.cantitate + diferenta;

    if (articol.cantitate === 0) {
        cos.splice(cos.indexOf(articol), 1);
    }

    afiseazaCos();
}

function afiseazaCos() {
    cosLista.innerHTML = "";
    let bucati = 0;
    let total = 0;

    cos.forEach(function (articol) {
        const rand = document.createElement("li");
        rand.className = "cos-articol";
        rand.innerHTML = `
            <span class="cos-nume">${articol.nume}</span>
            <span class="cos-cantitate">
                <button type="button" class="cos-minus" aria-label="Scade cantitatea">−</button>
                <span>${articol.cantitate}</span>
                <button type="button" class="cos-plus" aria-label="Crește cantitatea">+</button>
            </span>
            <span class="cos-subtotal">${articol.pret * articol.cantitate} lei</span>
        `;

        rand.querySelector(".cos-minus").addEventListener("click", function () {
            schimbaCantitatea(articol, -1);
        });
        rand.querySelector(".cos-plus").addEventListener("click", function () {
            schimbaCantitatea(articol, 1);
        });

        cosLista.appendChild(rand);
        bucati = bucati + articol.cantitate;
        total = total + articol.pret * articol.cantitate;
    });

    cosNumar.textContent = bucati;
    cosNumar.hidden = bucati === 0;
    cosSuma.textContent = total;
    cosGol.hidden = cos.length > 0;
    cosTotal.hidden = cos.length === 0;
    plaseazaComanda.hidden = cos.length === 0;

    if (cos.length === 0) {
        cosTrimitere.hidden = true;
    }

    pregatesteEmailul(total);
}

function pregatesteEmailul(total) {
    const randuri = ["Bună ziua,", "", "Aș dori să comand:"];

    cos.forEach(function (articol) {
        const subtotal = articol.pret * articol.cantitate;
        randuri.push("- " + articol.nume + " x " + articol.cantitate + " = " + subtotal + " lei");
    });

    randuri.push("", "Total: " + total + " lei", "", "Nume:", "Telefon:", "", "Mulțumesc!");

    const adresa = emailContact.textContent.trim();
    const subiect = encodeURIComponent("Comandă nouă - Patiseria Amira");
    const text = encodeURIComponent(randuri.join("\n"));

    trimiteAplicatie.href = "mailto:" + adresa + "?subject=" + subiect + "&body=" + text;
    trimiteGmail.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + adresa + "&su=" + subiect + "&body=" + text;
}

plaseazaComanda.addEventListener("click", function () {
    cosTrimitere.hidden = false;
});

function arataPagina() {
    const peCos = location.hash === "#cos";
    paginaPrincipala.hidden = peCos;
    paginaCos.hidden = !peCos;

    if (peCos) {
        window.scrollTo({ top: 0, behavior: "instant" });
    } else if (location.hash) {
        const tinta = document.getElementById(location.hash.slice(1));
        if (tinta) {
            tinta.scrollIntoView();
        }
    }
}

window.addEventListener("hashchange", arataPagina);
arataPagina();
