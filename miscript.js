/* Mensaje de bienvenida */
function bienvenido() {
  alert("Bienvenido/a primero vamos a crear tu usuario")
}
bienvenido()

/* Crear usuario y contraseña */
let usuario = prompt("Ingrese usuario").toUpperCase()
let contrasenia = prompt("Ingrese contraseña")

/* Array de productos */
let productos = [
  { id: 1, nombre: "Barbijo de polvo", informacion: "con valvula marca Libus 1740", categoria: "proteccion respiratoria", stock: 2, precio: 5000 },
  { id: 2, nombre: "Mameluco", informacion: "descartable color blanco marca 3M", categoria: "indumentaria de trabajo", stock: 7, precio: 2650 },
  { id: 3, nombre: "Gafas claras", informacion: "con proteccion lateral marca Libus modelo ARGON", categoria: "proteccion visual", stock: 4, precio: 4500 },
  { id: 4, nombre: "Casco", informacion: "color blanco con arnes y cremallera marca 3M", categoria: "proteccion de cabeza", stock: 1, precio: 2800 },
  { id: 5, nombre: "Gafas oscuras", informacion: "con proteccion lateral y UV marca Libus modelo ARGON", categoria: "proteccion visual", stock: 0, precio: 7300 },
  { id: 6, nombre: "Guantes de vaqueta", informacion: "de puño corto marca Libus", categoria: "proteccion de manos", stock: 0, precio: 5600 },
  { id: 7, nombre: "Barbijo de gases", informacion: "con valvula marca Libus 1840v", categoria: "proteccion respiratoria", stock: 7, precio: 2650 },
]

let opcionPago
let contador = 0
let opcionCompra
let opcionMenu

/* opcion compra credito */
function credito(total) {
  totalCredito = total + (10 * total / 100)
  alert("Usted eligio pagar con tarjeta de credito, el total a pagar es $ " + totalCredito)
}

/* opcion compra debito */
function debito(total) {
  console.log(total)
  alert("Usted eligio pagar con tarjeta de debito, el total a pagar es $ " + total)
}

/* funcion ordenar por precio */
function ordenarPrecioAscendente() {
  productos.sort((a, b) => {
    if (a.precio < b.precio) {
      return -1
    }
    if (a.precio > b.precio) {
      return 1
    }
    return 0
  })
  let listaPrecio = productos.map(producto => `${producto.nombre} ${producto.precio}`).join("\n")
  alert(listaPrecio)
}

function ordenarPrecioDescendente() {
  productos.sort((a, b) => {
    if (a.precio > b.precio) {
      return -1
    }
    if (a.precio < b.precio) {
      return 1
    }
    return 0
  })
  let listaPrecio = productos.map(producto => `${producto.nombre} ${producto.precio}`).join("\n")
  alert(listaPrecio)
}

/* validar usuario y contraseña */
function iniciarSesion() {
  do {
    alert("Ahora vamos a validar sus datos ingresados anteriormente")
    usuarioBD = prompt("Ingrese nuevamente su usuario anterior").toUpperCase()
    contraseniaBD = prompt("Ingrese nuevamente su contraseña anterior")
    contador++
    if (usuario === usuarioBD && contrasenia === contraseniaBD) {
      do {
        opcionMenu = Number(prompt("Bienvenido/a " + usuario + " elija una de las siguientes opciones\n1 - Compra de EPP\n2 - Servicio de control documental\n3 - Servicio de Higiene y seguridad\n4 - Salir "))
        switch (opcionMenu) {
          case 1:
            alert("Usted eligio el sector compras de EPP")
            principal(productos)
            break
          case 2:
            alert("Usted eligio el area de control documental el cual se encuentra en mantenimiento")
            break
          case 3:
            alert("Usted eligio el area de Higiene y Seguridad el cual se encuentra en mantenimiento")
            break
          default:
            break
        }
      } while (opcionMenu != 4)
      alert("Muchas gracias")
    } else {
      alert("Usuario y/o contraseña incorrecto/s")
    }
  } while (contador < 3)
  if (contador === 3) {
    alert("Agotaste tus intentos")
  }
}

/* Funcion mostrar informacion del producto. Pide al usuario el nombre del prdoucto y en caso de que se encuentre en el array productos muestra por pantalla informacion del producto. */
function mostrarInformacion(productos) {
  let nombreProducto = prompt("Ingrese nombre del producto\n" + listar(productos)).toLowerCase()
  let productoBuscado = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto)
  if (productoBuscado) {
    alert(productoBuscado.nombre + " " + productoBuscado.informacion)
  }
}

iniciarSesion()

function principal(productos) {
  let carrito = []

  let opcion
  do {
    opcionCompra = Number(prompt("Ingrese opción:\n1 - listar productos\n2 - ver información de un producto en particular\n3 - agregar producto al carrito\n4 - filtrar por categoria\n5 - ordenar por precio asc\n6 - ordenar por precio desc\n7 - finalizar compra\n0 - para salir"))
    switch (opcionCompra) {
      case 1:
        alert(listar(productos))
        break
      case 2:
        mostrarInformacion(productos)
        break
      case 3:
        agregarProductoAlCarrito(productos, carrito)
        break
      case 4:
        let categoriaProducto = prompt("Ingrese categoria de los productos que desea filtrar\n" + listarCategoria(productos)).toLowerCase()
        let productosCategoria = productos.filter(producto => producto.categoria === categoriaProducto)
        alert(listar(productosCategoria, "id", "nombre"))
        break
      /* Ordenar los productos por precio de manera ascendente. */
      case 5:
        ordenarPrecioAscendente()
        break
      case 6:
        ordenarPrecioDescendente()
        break
      case 7:
        finalizarCompra(carrito)
        carrito = []
        break
      default:
        break
    }
  } while (opcion != 0)
}

/* funcion finalizar compra carrito */
function finalizarCompra(carrito) {
  let total = 0
  if (carrito.length === 0) {
    alert("Primero debe agregar productos al carrito")
  } else {
    total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
    alert("El total a pagar es " + total)
  }
  let finalizar = prompt("¿Desea finalizar la compra? Si o No").toLowerCase()
  if (finalizar === "si") {
    do {
      opcionPago = Number(prompt("Ingrese opción:\n1 - pago de debito\n2 - pago de credito\n0 - para salir"))
      switch (opcionPago) {
        case 1:
          debito(total)
          break
        case 2:
          credito(total)
          break
        default:
          break
      }
    } while (opcionPago !== 0)
    alert("Gracias por su compra " + usuarioBD)
  }
}

/* funcion listar productos por id y nombre */
function listar(productos) {
  return productos.map(producto => producto.id + " - " + producto.nombre).join("\n")
}

/* funcion listar productos por categoria y nombre */
function listarCategoria(productos) {
  return productos.map(producto => producto.categoria + " - " + producto.nombre).join("\n")
}

/* funcion agregar productos al carrito buscando por ID */
function agregarProductoAlCarrito(productos, carrito) {
  let id = Number(prompt("Seleccione producto por id:\n" + listar(productos)))
  let productoBuscado = productos.find(producto => producto.id === id)
  let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)
  /* agregar producto en caso de que el stock sea mayor a 0 */
  if (productoBuscado.stock > 0) {
    if (productoEnCarrito) {
      productoEnCarrito.unidades++
      productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
    } else {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: 1,
        subtotal: productoBuscado.precio
      })
    }
    /* quitar stock de los productos que se compraron */
    productoBuscado.stock--
    alert("Se agregó producto al carrito")
  } else {
    alert("Disculpe " + usuarioBD + " No hay más stock del producto seleccionado")
  }
}

