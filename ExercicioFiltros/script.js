const btnFiltro = document.getElementById("filtrar");
const selectCategoria = document.getElementById("categoria");

class Item {
  constructor(nome, preco, categoria) {
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
  }

  Criar() {
    const lista = document.getElementById("lista");
    const li = document.createElement("li");
    li.classList.add("item");

    const nomeElement = document.createElement("span");
    nomeElement.innerHTML = `${this.nome} - `;

    const precoElement = document.createElement("span");
    precoElement.innerHTML = `R$ ${this.preco},00 - `;

    const categoriaElement = document.createElement("span");
    categoriaElement.innerHTML = `${this.categoria}`;

    li.appendChild(nomeElement);
    li.appendChild(precoElement);
    li.appendChild(categoriaElement);

    lista.appendChild(li);
  }
}

const produtos = [];
for (let i = 0; i < 10; i++) {
  const item = new Item(
    `Produto ${i + 1}`,
    `R$ ${10 * (i + 1)},00`,
    `Categoria ${Math.floor(Math.random() * 3) + 1}`
  );
  produtos.push(item);
  item.Criar();
}

btnFiltro.addEventListener("click", function () {
  const input = document.getElementById("filtro").value.toLowerCase();
  const filtroCategoria = selectCategoria.value;
  const lista = document.getElementById("lista");
  const itens = lista.getElementsByClassName("item");
  let count = 0;
  let total = 0;
  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];
    const nomeProduto = item.children[0].innerHTML.toLowerCase();
    const categoriaProduto = item.children[2].innerHTML.toLowerCase();

    if (
      nomeProduto.includes(input) &&
      (filtroCategoria === "" || categoriaProduto === filtroCategoria)
    ) {
      item.style.display = "flex";
      count++;
      total += parseFloat(
        item.children[1].innerHTML.replace("R$ ", "").replace(",", ".")
      );
    } else {
      item.style.display = "none";
    }
  }

  const contador = document.getElementById("contador");
  if (input === "0") {
    contador.innerHTML = "Nenhum Produto encontrado";
  } else {
    contador.innerHTML = `${count} produto(s) encontrado(s) - Total: R$ ${total}`;
  }
});
