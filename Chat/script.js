const btnEnvio = document.getElementById("btnEnvio");
const inputTexto = document.getElementById("msg");

btnEnvio.addEventListener("click", function () {
    const texto = inputTexto.value;
    if(texto.trim() === "") {
        alert("Por favor, digite uma mensagem antes de enviar.");
        return;
    }
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", "usuario");
    mensagem.textContent = texto;
    document.getElementById("chat").appendChild(mensagem);
    inputTexto.value = ""; // Limpa o campo de entrada após enviar
});