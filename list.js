let cardCount = 1;  // Contador para criar IDs únicos
let cardsData = JSON.parse(localStorage.getItem("cardsData")) || []; // Carregar os dados existentes

// Função para salvar os dados dos cards no localStorage
function saveCardsData() {
  localStorage.setItem("cardsData", JSON.stringify(cardsData));
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function convertDeltaToText(delta) {
  let text = "";
  delta.ops.forEach(op => {
      if (typeof op.insert === "string") {
          let insertText = op.insert;

          if (op.attributes) {
              if (op.attributes.bold) insertText = `**${insertText}**`; // Negrito
              if (op.attributes.italic) insertText = `_${insertText}_`; // Itálico
              if (op.attributes.underline) insertText = `__${insertText}__`; // Sublinhado
          }

          text += insertText;
      }
  });

  return text;
}

// Função para criar um novo card e adicionar ao DOM
function createCard(cardTitle, cardId) {
  const newCard = document.createElement("div");
  newCard.classList.add("col", "document-card");

  const editorUrl = `index.html?doc=${cardId}`; // URL do editor de texto

  // Estrutura do novo card
  newCard.innerHTML = `
    <div class="card shadow-sm h-100">
      <a href="${editorUrl}">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
          <image href="" width="100%" height="100%" />
        </svg>
        <hr>
        <div class="card-body d-flex flex-column">
          <h2 class="card-text">${cardTitle}</h2>
        </div>
      </a>
      <div class="d-flex justify-content-between align-items-center mt-auto">
        <div class="btn-group" id="buttons">
          <button type="button" class="btn btn-sm download-button">
            <img src="./icons/download_24dp_48752C_FILL0_wght400_GRAD0_opsz24.png" alt="Download">
            <div class="confirmation-box download-box none">
              <div>Download arquivo HTML</div>
              <div>Download arquivo txt</div>
            </div>
          </button>
          <button type="button" class="btn btn-sm remove-button">
            <img src="./icons/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.png" alt="Delete">
            <div class="confirmation-box remove-box none">
              Remover arquivo?
              <div class="confirm-remove">Sim</div>
              <div class="cancel-remove">Não</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;

  // Adicionar eventos para os novos botões
  const downloadButton = newCard.querySelector(".download-button");
  const removeButton = newCard.querySelector(".remove-button");
  const downloadBox = downloadButton.querySelector(".download-box");
  const removeBox = removeButton.querySelector(".remove-box");

  downloadButton.addEventListener("click", function(event) {
    downloadBox.classList.toggle("none");

    const htmlDownload = downloadBox.querySelector(".html-download");


    const txtDownload = downloadBox.querySelector(".txt-download");
  });

  removeButton.addEventListener("click", function(event) {
    removeBox.classList.toggle("none");

    const confirmRemove = removeBox.querySelector(".confirm-remove");
    confirmRemove.addEventListener("click", function() {
      removeCard(removeButton, cardId); // Chama a função de remover o card
    });

    const cancelRemove = removeBox.querySelector(".cancel-remove");
    cancelRemove.addEventListener("click", function() {
      removeBox.classList.add("none"); // Fecha a box de remoção
    });
  });

  // Adicionar o card ao container
  document.getElementById("card-container").appendChild(newCard);
}

// Função para remover um card do DOM e do localStorage
function removeCard(button, cardId) {
  const card = button.closest(".document-card");
  card.remove();

  // Remover o card dos dados armazenados
  cardsData = cardsData.filter(card => card.id !== cardId);

  // Atualizar o localStorage
  saveCardsData();
}

// Evento para criar um novo card
document.getElementById("first").addEventListener("click", function() {
  const cardId = `documento-${cardCount}`; // ID único
  const cardTitle = `Documento ${cardCount}`; // Título do documento
  
  // Adicionar os dados do novo card à lista
  cardsData.push({ id: cardId, title: cardTitle });

  // Criar o card no DOM
  createCard(cardTitle, cardId);

  // Salvar os dados no localStorage
  saveCardsData();

  // Incrementar o contador de cards
  cardCount++;
});

// Carregar os cards salvos do localStorage quando a página for carregada
window.onload = function() {
  if (cardsData.length > 0) {
    cardsData.forEach(card => {
      createCard(card.title, card.id); // Recriar os cards salvos
    });
    cardCount = cardsData.length + 1; // Atualizar o contador
  }
};

// Função para filtrar documentos com base no título
function filterDocuments(event) {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const documentCards = document.querySelectorAll('.document-card');
  
  documentCards.forEach(card => {
    const title = card.querySelector('h2').innerText.toLowerCase();
    if (title.includes(searchInput)) {
      card.style.display = 'block'; // Mostra o card
    } else {
      card.style.display = 'none'; // Oculta o card
    }
  });
}

