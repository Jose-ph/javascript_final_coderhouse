// función para crear cards segun los productos
// y la sección deseada
function crearCards(productos, seccion) {
  for (let i = 0; i < productos.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", `card ${productos[i].envase}`);
    cardDiv.style.width = "18rem";

    let imgDiv = document.createElement("img");
    imgDiv.setAttribute("src", `${productos[i].img}`);
    imgDiv.setAttribute("class", "card-img-top");

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "card-body");
    //agrego id prueba
    cardBodyDiv.setAttribute("id", `${productos[i].id}`);

    let cardTitulo = document.createElement("h5");
    cardTitulo.setAttribute("class", "card-title");
    cardTitulo.innerText = `${productos[i].id}-- ${productos[i].nombre}`;

    let cardParrafo = document.createElement("p");
    cardParrafo.setAttribute("class", "card-text");
    cardParrafo.textContent = ` Precio: $ ${productos[i].precio}-
    Descripción: ${productos[i].descripcion} ${productos[i].peso}`;

    let cardEnlace = document.createElement("a");
    cardEnlace.setAttribute("class", "btn btn-primary");
    //cardEnlace.setAttribute("href", "#");
    cardEnlace.innerText = "Agregar al carrito";

    // agregar todos los elementos al body div

    cardBodyDiv.appendChild(cardTitulo);
    cardBodyDiv.appendChild(cardParrafo);
    cardBodyDiv.appendChild(cardEnlace);

    //agregar elementos al card div principal

    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(cardBodyDiv);

    //sectionPrueba.appendChild(cardDiv);
    seccion.appendChild(cardDiv);
  }
}

//Esta función agrega los productos al carrito

function agregarAlCarrito(idProducto) {
  //revisar si el producto se repite en el carrito
  let productoRepetido;

  productoRepetido = carritoUsuario.some(
    (producto) => producto.id == idProducto
  );

  if (productoRepetido) {
    botonAgregarAlCarrito.forEach((boton) => {
      boton.onclick = () => {
        boton.disabled = true;
        boton.style.display = "none";
      };
    });
  } else {
    let itemCoincideId = productos.find(
      (producto) => producto.id == idProducto
    );

    carritoUsuario.push({ ...itemCoincideId, unidadesElegidas: 1,stock : itemCoincideId.stock  });

    productos.forEach(producto => {

      if(producto.id == idProducto){
        
          producto.stock--;
          console.log(producto.stock);
      }
      
    });
    
  }

  actualizarCarrito();
}

//Esta funcion muestra el carrito sin recargar la página
function actualizarCarrito() {
  mostrarProductosCarrito();
  

  sumarUnidad();

  restarUnidad();

  borrarProductoCarrito();

  mostrarTotalGastado();

  mostrarBotonAgregar();

  guardarCarritoUsuario();

   carritoUsuario.forEach(item => {

    if(item.unidadesElegidas == 1){

      
      $('.restar').click(()=> borrarRestando());
    }
     
   });

  
}

//Esta función muestra el total gastado.
function mostrarTotalGastado() {
  if (carritoUsuario.length > 0) {
    let precioTotal = 0;
    let productosTotal = 0;
    

    carritoUsuario.forEach((producto) => {
      precioTotal += producto.precio * producto.unidadesElegidas;

      productosTotal += producto.unidadesElegidas;
    });

    seccionMostrarTotal.innerHTML = `

    <p class="parrafo" id="parrafo">La cantidad de productos es : ${productosTotal}
      y el valor total es  $: ${precioTotal.toFixed(2)}
      </p>
      
     
      <button type="button" class="btn btn-danger dolar">Pasar total a USD</button>
        <button type="button" class="btn btn-info pesos">Pasar total a Pesos</button>

    
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="btn-comprar" data-bs-target="#exampleModal">
      Comprar
      </button> -->

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

      <p id="parrafo-modal">Presione para Pagar para continuar el proceso de compra.</p>
      
      
     
      <div class="modal-footer">
        
      <button type="button" class="btn btn-secondary cerrar" data-bs-dismiss="modal">Cerrar</button>
      <button type="button" class="btn btn-primary pagar">Pagar</button>
     
        
      </div>
    </div>
  </div>
</div>
    
      `;

    pasarADolar();
    pasarAPesos();
    
    pagar();
    return precioTotal;
  } else {
    seccionMostrarTotal.innerHTML = "";
  }
}


function pagar(){

  let cuerpoModal = document.querySelector(".modal-body");
  let pagar = false;

  //Agrega botón pagar

  $('.pagar').click(()=>{

  

    $('#parrafo-modal').text("Procesando pago...")

  setTimeout(() => {
    $('#parrafo-modal').text("Gracias por su compra!!")

  }, 1500);
 
  pagar = true;

  //Ocultar resto página
  setTimeout(() => {
    carritoUsuario = [];
    actualizarCarrito()
    
   
      $('body').html(`  <h2>Compra finalizada !</h2>
      <img src="../images/cesta-de-la-compra.png" id="cesta-compra" alt="cesta de la compra">
       

        <a href="../pages/tienda.html" target="_self"><button type="button" class="btn btn-primary" id="reload">Reset</button></a>
      
        <script src="../js/funciones.js"></script>
      `)
    

    




  }, 2500);
  
   

})

$('.cerrar').click(()=>{

  
  if(pagar === true){
    carritoUsuario = [];
   actualizarCarrito();
   //$('body').html("<h1>Compra finalizada !</h1>")

    
  
    
  }

})


}



//Esta funcion borra el producto del carrito

function borrarProductoCarrito() {
  /* carritoUsuario = carritoUsuario.filter((item)=>item.id != id );

  actualizarCarrito(); */

  let botonEliminar = document.querySelectorAll(".eliminar");

  botonEliminar.forEach((boton) => {
    boton.onclick = () => {
      id = boton.parentElement.id;
      console.log(id);

      carritoUsuario = carritoUsuario.filter((item) => item.id != id);

      actualizarCarrito();
    };
  });
}

//Esta funcion muestra los productos del carrito
function mostrarProductosCarrito() {
  sectionCarrito.innerHTML = "";
  carritoUsuario.forEach((item) => {
    sectionCarrito.innerHTML += `
    
    
    <div class="card" style="width: 18rem;">
    <img src="${item.img}" class="card-img-top">
    <div class="card-body" id="${item.id}">
    <h5 class="card-title">${item.id}-- Miel Pura</h5>
    <p class="card-text"> Precio:ARS ${item.precio}-- Unidades:${item.unidadesElegidas -1 }
      Stock: ${item.stock } 
      Descripción : ${item.descripcion} ${item.peso}</p>
    <button type="button" class ="sumar btn btn-success">+</button>
    <button type="button" class="restar btn btn-info">-</button> 
    <button type="button" class="btn btn-danger eliminar">X</button>
     


    </div>`;
  });
}

//Esta funcion  suma una unidad al carrito
//cada vez que se hace click en "+"
function sumarUnidad() {
  let botonSumar = document.querySelectorAll(".sumar");

  botonSumar.forEach((boton) => {
    boton.onclick = () => {
      carritoUsuario = carritoUsuario.map((item) => {
        let unidadesElegidas = item.unidadesElegidas;

        if (
          item.id == boton.parentElement.id/*  &&
          unidadesElegidas < item.stock */
          && item.stock > 0
        ) {
          unidadesElegidas++;
          item.stock--;
          console.log(item.stock)

          

          if(item.stock == 0){
            alert("No hay más stock");
          }
          
        }

        

        return {
          ...item,
          unidadesElegidas,
        };
      });
      actualizarCarrito();
    };
  });
}

//Esta función resta una unidad por cada click en "-"
function restarUnidad() {
  let botonRestar = document.querySelectorAll(".restar");

  botonRestar.forEach((boton) => {
    boton.onclick = () => {
      carritoUsuario = carritoUsuario.map((item) => {
        let unidadesElegidas = item.unidadesElegidas;

        if (item.id == boton.parentElement.id && unidadesElegidas > 1) {
          unidadesElegidas--;
          item.stock++;
          console.log(unidadesElegidas);

         
          
        }

    

        return {
          ...item,
          unidadesElegidas,
        };
      });
      actualizarCarrito();
    };
  });
}

//Esa función permite volver a comprar al vaciar el carrito
function mostrarBotonAgregar() {
  /*Esta lógica se puede mejorar
    recorrer el carrito y habilitar el boton  cuyo id no está. */

  if (carritoUsuario.length === 0) {
    botonAgregarAlCarrito.forEach((boton) => {
      boton.style.display = "";
    });
  }
}

//Esta función guarda el carrito del usuario en el local storage
function guardarCarritoUsuario() {
  let carritoJson = JSON.stringify(carritoUsuario);
  localStorage.setItem("carritoUsuario", carritoJson);
}

//Estas funciones manejan el tipo de cambio.

function pasarADolar() {
  $(".dolar").click(() => {
    console.log("click dolar");
    $.get(URLGET, function (respuesta, estado) {
      if (estado === "success") {
        let datosDolarOficial = respuesta;
        
        let tipoCambioOficial = parseInt(datosDolarOficial[0].casa.venta);
        console.log(respuesta);

        let precioTotal = parseInt(mostrarTotalGastado()) / tipoCambioOficial;

        $(".parrafo").text(`El total en u$d es : ${precioTotal.toFixed(2)} `);
      } else {
        console.log("No llegaron los datos");
      }
    });
  });
}

function pasarAPesos() {
  $(".pesos").click(() => {
    console.log("click peso");

    let precioTotal = parseInt(mostrarTotalGastado());

    $(".parrafo").text(`El total en $ es : ${precioTotal.toFixed(2)} `);
  });
}




//Esta funcioón muestra las cartas del arraycopiado
function mostrarCartaClon(cartas) {
  sectionCards.innerHTML = "";
  sectionCards.appendChild(cartas[0]);
  sectionCards.appendChild(cartas[1]);
  console.log(cartas[0]);
  console.log(cartas[1]);
  cardsDuplicadas = Array.from(cards).map((cards) => cards);
}

//Esta función muestra todas las cartas
function mostrarCartas(cartas) {
  sectionCards.innerHTML = "";
  sectionCards.appendChild(cartas[0]);
  sectionCards.appendChild(cartas[1]);
  sectionCards.appendChild(cartas[2]);
  sectionCards.appendChild(cartas[3]);
  console.log(cartas[0]);
  console.log(cartas[1]);
  cardsDuplicadas = Array.from(cards).map((cards) => cards);
}



//BORRAR DESDE BOTON RESTAR
function borrarRestando(){
let botonRestar = document.querySelectorAll(".restar");

  botonRestar.forEach((boton) => {
    boton.onclick = () => {
      id = boton.parentElement.id;
      console.log(id);

      carritoUsuario = carritoUsuario.filter((item) => item.id != id);

      actualizarCarrito();
    };
  });

}