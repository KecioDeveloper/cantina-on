let total = 0;
let qtdItens = 0;
const SENHA_ADM = "cantinaon";

function carregarCardapio() {
  const produtos = JSON.parse(localStorage.getItem("cardapio")) || [
    { nome: "Salgado", preco: 8, img: "img/salgado-previa.jpg" },
    { nome: "Refrigerante", preco: 4, img: "img/refri-icon.png" },
    { nome: "Geladinho", preco: 2, img: "img/geladinho.png" }
  ];
  const area = document.querySelector(".produtos");
  area.innerHTML = "<h2>Cardápio</h2>";
  produtos.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.nome}">
      <h3>${item.nome}</h3>
      <p>R$ ${item.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">Adicionar</button>
    `;
    area.appendChild(div);
  });
}

function adicionarAoCarrinho(produto, preco) {
  const lista = document.getElementById("itens-carrinho");
  const li = document.createElement("li");
  li.textContent = `${produto} - R$ ${preco.toFixed(2)}`;
  lista.appendChild(li);
  total += preco;
  qtdItens++;
  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("qtd-itens").textContent = qtdItens;
  alert(`${produto} adicionado ao carrinho!`);
}

function limparCarrinho() {
  if (confirm("Tem certeza que deseja limpar o carrinho?")) {
    document.getElementById("itens-carrinho").innerHTML = "";
    total = 0;
    qtdItens = 0;
    document.getElementById("total").textContent = "0.00";
    document.getElementById("qtd-itens").textContent = "0";

    document.getElementById("pagamento").style.display = "none";

    ["pix-imagem", "form-cartao", "mensagem-dinheiro"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  }
}

function mostrarOpcoesPagamento() {
  if (qtdItens === 0) return alert("O carrinho está vazio!");
  document.getElementById("pagamento").style.display = "block";
}

function confirmarPagamento(metodo) {
  document.getElementById("pagamento").style.display = "none";
  ["pix-imagem", "form-cartao", "mensagem-dinheiro"].forEach(id => 
    document.getElementById(id).style.display = "none"
  );

  if (metodo === "Pix") document.getElementById("pix-imagem").style.display = "block";
  else if (metodo === "Cartão de Crédito") document.getElementById("form-cartao").style.display = "block";
  else if (metodo === "Dinheiro Físico") document.getElementById("mensagem-dinheiro").style.display = "block";
}

function finalizarPagamentoCartao() {
  const numero = document.getElementById("numero-cartao").value;
  const validade = document.getElementById("validade-cartao").value;
  const codigo = document.getElementById("codigo-cartao").value;
  if (numero && validade && codigo) {
    alert("Pagamento com cartão finalizado! Obrigado por comprar na Cantina On 😄");
  } else {
    alert("Preencha todos os campos do cartão!");
  }
  document.getElementById("form-cartao").style.display = "none";
}

function modoadm() {
  const senha = prompt("Digite a senha do administrador:");
  if (senha === SENHA_ADM) {
    document.getElementById("painel").style.display = "block";
    mostrarItensPainel();
  } else {
    alert("Senha incorreta!");
  }
}

function mostrarItensPainel() {
  const cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];
  const painel = document.getElementById("painel");
  let lista = "<h4>Itens atuais:</h4>";
  if (cardapio.length === 0) {
    lista += "<p>Nenhum item no cardápio.</p>";
  } else {
    cardapio.forEach((item, i) => {
      lista += `
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:5px;">
          <img src="${item.img}" style="width:40px; height:40px; border-radius:5px;">
          <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
          <button onclick="removerItem(${i})">Remover</button>
        </div>
      `;
    });
  }
  painel.querySelector(".lista-itens").innerHTML = lista;
}

function adicionarSugestao(nome, preco, img) {
  const cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];
  cardapio.push({ nome, preco, img });
  localStorage.setItem("cardapio", JSON.stringify(cardapio));
  carregarCardapio();
  mostrarItensPainel();
}

function adicionarItem() {
  const nome = document.getElementById("nomeNovo").value.trim();
  const preco = parseFloat(document.getElementById("precoNovo").value);
  const img = document.getElementById("imgNovo").value.trim() || "img/salgado-previa.jpg";
  if (!nome || isNaN(preco)) return alert("Preencha nome e preço!");
  const cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];
  cardapio.push({ nome, preco, img });
  localStorage.setItem("cardapio", JSON.stringify(cardapio));
  carregarCardapio();
  mostrarItensPainel();
}

function removerItem(index) {
  const cardapio = JSON.parse(localStorage.getItem("cardapio")) || [];
  cardapio.splice(index, 1);
  localStorage.setItem("cardapio", JSON.stringify(cardapio));
  carregarCardapio();
  mostrarItensPainel();
}

function fecharPainel() {
  document.getElementById("painel").style.display = "none";
}

window.onload = carregarCardapio;

