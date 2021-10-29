let sectionCards = document.querySelector("#fila-servicios");

crearCards(productos, sectionCards);

let botonAgregarAlCarrito = document.querySelectorAll(".card a");

let opcionUsuario;

const sectionCarrito = document.querySelector("#carrito");

let seccionMostrarTotal = document.querySelector("#total-carrito");

botonAgregarAlCarrito.forEach((boton) => {
  boton.onclick = () => {
    opcionUsuario = boton.parentElement.id;

    agregarAlCarrito(opcionUsuario);

    console.log(opcionUsuario);
  };
});

// Se asegura que el DOM esté listo para manipular

$(document).ready(() => console.log("El DOM está listo"));

//Estas dos líneas  muestran el carrito guardado en el storage
let carritoUsuario = JSON.parse(localStorage.getItem("carritoUsuario")) || [];
actualizarCarrito();

//Llamado a API DOLAR para pasar el total a esa moneda

const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

//Animación del banner

$("#banner").fadeOut(1000).fadeIn(1000);

///FILTRADO DE PRODUCTOS

let botonPlastico = $("#plastico");
let botonVidrio = $("#vidrio");
let botonTodos = $("#todos");

let cards = document.querySelectorAll(".card");
let cardsDuplicadas = Array.from(cards).map((cards) => cards);

botonTodos.click(() => {
  cardsDuplicadas = cardsDuplicadas.filter((card) => card.className);

  console.log(cards);

  mostrarCartas(cardsDuplicadas);
});

botonPlastico.click(() => {
  cardsDuplicadas = cardsDuplicadas.filter(
    (card) => card.className != "card vidrio"
  );

  console.log(cards);

  mostrarCartaClon(cardsDuplicadas);
});

botonVidrio.click(() => {
  cardsDuplicadas = Array.from(cards).map((cards) => cards);

  cardsDuplicadas = cardsDuplicadas.filter(
    (card) => card.className != "card plástico"
  );

  console.log(cards);

  mostrarCartaClon(cardsDuplicadas);

  console.log(cardsDuplicadas);
});
