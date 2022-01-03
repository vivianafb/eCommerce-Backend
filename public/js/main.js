const chatMessages = document.querySelector(".chat-messages");
const chatBot = document.querySelector(".chat-bot");
const formAuthor = document.getElementById("formAuthor");
const usuarioInpuit = document.querySelector("usuerLogged");
const qsData = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

let date = new Date();
let now = date.toLocaleString();

const socket = io();
socket.emit("JoinRoom", qsData);

formAuthor.addEventListener("submit", (e) => {
  e.preventDefault();

  if (usuario.value) {
    let data = {
      usuario: usuario.value,
      mensajes: mensajes.value,
    };
    console.log("EMITIENDO SOCKET");
    socket.emit("newMessage", data);
    socket.emit("chatMessage", mensajes);
    socket.emit("usuarioInpuit", usuario.value);
    usuario.value = "";
    mensajes.value = "";
  }
});


socket.on("newMessage", (mensajes) => {
  if (mensajes.mensajeUser.toLowerCase() === "stock") {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
    <p class="meta">${mensajes.usuario} <span> ${date}</span> </p>
    <p class="text"> ${JSON.stringify(mensajes.mensajeUser)} </p>`;
    chatMessages.appendChild(div);

    const div2 = document.createElement("div");
    div2.classList.add("bot");

    let divInner = `<p class="meta">CHATBOT <span> ${date}</span> </p>`;
    let mensajeBOT = mensajes.mensajeBot;
    mensajeBOT.forEach((element) => {
      divInner += `<p class="text"> NOMBRE: ${element.nombre}  ||   STOCK:${element.stock}</p>`;
    });
    div2.innerHTML = divInner;
    chatMessages.appendChild(div2);
  } else if (mensajes.mensajeUser.toLowerCase() === "orden") {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
    <p class="meta">${mensajes.usuario} <span> ${date}</span> </p>
    <p class="text"> ${JSON.stringify(mensajes.mensajeUser)} </p>`;
    chatMessages.appendChild(div);

    const div2 = document.createElement("div");
    div2.classList.add("bot");

    let divInner = `<p class="meta">CHATBOT <span> ${date}</span> </p>
    <p>Aqui estan los productos de tu ultima orden: </p>`;
    let mensajeBOT = mensajes.mensajeBot;
    mensajeBOT.forEach((element) => {
      divInner += `<p class="text"> Los productos que compraste: ${element.items}</p>
      <p class="text"> Total de la compra: ${element.total}</p>`;
    });
    div2.innerHTML = divInner;
    chatMessages.appendChild(div2);
  } else if (mensajes.mensajeUser.toLowerCase() === "carrito") {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
    <p class="meta">${mensajes.usuario} <span> ${date}</span> </p>
    <p class="text"> ${JSON.stringify(mensajes.mensajeUser)} </p>`;
    chatMessages.appendChild(div);

    const div2 = document.createElement("div");
    div2.classList.add("bot");

    div2.innerHTML = `<p class="meta">CHATBOT <span> ${date}</span> </p>
    <p>Aqui estan tu carrito: </p>
     <p class="text"> Los productos que compraste: ${JSON.stringify(
       mensajes.mensajeBot
     )}</p>`;

    chatMessages.appendChild(div2);
  } else {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
    <p class="meta">CHATBOT<span> ${date}</span> </p>
    <p class="text">${mensajes.mensajeBot} </p>`;
    chatMessages.appendChild(div);
  }
});
