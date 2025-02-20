const downloadButtons = document.querySelectorAll(".download-button");
const downloadBoxes = document.querySelectorAll(".download-box");
const removeButtons = document.querySelectorAll(".remove-button");
const removeBoxes = document.querySelectorAll(".remove-box");

let cardsData = JSON.parse(localStorage.getItem("cardsData")) || [];

// Atualiza o cardCount com base no número de cards já criados
let cardCount = cardsData.length + 1;

function saveCardsData() {
  localStorage.setItem("cardsData", JSON.stringify(cardsData));
}

// Adicionar evento de clique para os botões de download
downloadButtons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    event.stopPropagation(); // Impede a propagação do clique para o card
    event.preventDefault();  // Impede o redirecionamento por acidente

    const downloadBox = downloadBoxes[index];
    if (downloadBox.style.display === "block") {
      downloadBox.style.display = "none";
    } else {
      downloadBox.style.display = "block";
    }
  });
});

// Adicionar evento de clique para os botões de remoção
removeButtons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    event.stopPropagation(); // Impede a propagação do clique para o card
    event.preventDefault();  // Impede o redirecionamento por acidente

    const removeBox = removeBoxes[index];
    if (removeBox.style.display === "block") {
      removeBox.style.display = "none";
    } else {
      removeBox.style.display = "block";
    }
  });
});

function createCard(docTitle, docId) {
  const newCard = document.createElement("div");
  newCard.classList.add("col", "document-card");

  newCard.innerHTML = `
    <div class="card shadow-sm h-100">
      <!-- Link para redirecionar para o editor de texto com o docId único -->
      <a href="index.html?docId=${docId}" class="card-link">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" 
             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" 
             preserveAspectRatio="xMidYMid slice" focusable="false">
          <image href="" width="100%" height="100%" />
        </svg>
        <hr>
        <div class="card-body d-flex flex-column">
          <h2 class="card-text">${docTitle}</h2>
        </div>
      </a>
      <!-- Grupo de botões fora do link -->
      <div class="btn-group" id="buttons">
        <button type="button" class="btn btn-sm download-button">
          <img src="./icons/download_24dp_48752C_FILL0_wght400_GRAD0_opsz24.png" alt="Download">
          <div class="confirmation-box download-box" style="display: none;">
            <div>Download arquivo HTML</div>
            <div>Download arquivo txt</div>
          </div>
        </button>
        <button type="button" class="btn btn-sm remove-button">
          <img src="./icons/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.png" alt="Delete">
          <div class="confirmation-box remove-box" style="display: none;">
            Remover arquivo?
            <div class="drop">Sim</div>
            <div>Não</div>
          </div>
        </button>
      </div>
    </div>
  `;

  // Adiciona os event listeners para os botões dentro deste novo card

  // Botão de download:
  newCard.querySelector(".download-button").addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    const downloadBox = this.querySelector(".download-box");
    if (downloadBox.style.display === "block") {
      downloadBox.style.display = "none";
    } else {
      downloadBox.style.display = "block";
    }
  });

  // Botão de remoção:
  newCard.querySelector(".remove-button").addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    // Você pode adicionar aqui a lógica de remoção (por exemplo, remover o card do DOM e atualizar o cardsData)
    const removeBox = newCard.querySelector(".remove-box"); 
    
    if (removeBox.style.display === "block") {
      removeBox.style.display = "none";
    } else {
      removeBox.style.display = "block";
    }

    removeBox.querySelector(".drop").addEventListener("click", function(event){
      newCard.remove();
      cardsData = cardsData.filter(card => card.docId !== docId);
      saveCardsData();
    });
  });

  // Adiciona o card ao container de cards
  document.getElementById("card-container").appendChild(newCard);
}

// Evento para criar um novo documento ao clicar no botão "criar novo documento"
// Supondo que o botão de criação tem o id "first"
document.getElementById("first").addEventListener("click", function() {
  const newDocId = `doc-${cardCount}`; // Ex: "doc-1", "doc-2", etc.
  const docTitle = `Documento ${cardCount}`;
  const docContent = ''; // Conteúdo inicial vazio

  // Salvar título e conteúdo iniciais no localStorage para este documento
  localStorage.setItem(`doc-title-${newDocId}`, docTitle);
  localStorage.setItem(`quill-content-${newDocId}`, JSON.stringify(docContent));

  // Adicionar os dados do novo documento ao array e salvar
  cardsData.push({ docId: newDocId, docTitle: docTitle });
  saveCardsData();

  // Criar o novo card no DOM
  createCard(docTitle, newDocId);

  cardCount++;
});

// Ao carregar a página, recria os cards previamente salvos
window.addEventListener("DOMContentLoaded", function() {
  // Se houver cards salvos, recria cada um
  cardsData.forEach(card => {
    createCard(card.docTitle, card.docId);
  });
});

// Função para remover um card
function removeCard(button) {
  const card = button.closest(".document-card");
  card.remove();
}


// Função para remover card
function removeCard(button) {
    const card = button.closest(".document-card");
    card.remove();
}

// Função para baixar o documento em HTML
function downloadDocument(docNumber) {
    createNewHTMLPage(docNumber);
}


// Adicionar evento de clique para cada botão de download


// Fechar dropdowns quando clicar fora
document.addEventListener("click", function () {
  // Fechar todas as caixas de download
  downloadBoxes.forEach((box, index) => {
    if (box.style.display === "block") {
      box.style.display = "none";
      downloadButtons[index].classList.remove("header-pressed");
    }
  });

  // Fechar todas as caixas de remoção
  removeBoxes.forEach((box, index) => {
    if (box.style.display === "block") {
      box.style.display = "none";
      removeButtons[index].classList.remove("header-pressed");
    }
  });
});

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