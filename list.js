const downloadButtons = document.querySelectorAll(".download-button");
const downloadBoxes = document.querySelectorAll(".download-box");
const removeButtons = document.querySelectorAll(".remove-button");
const removeBoxes = document.querySelectorAll(".remove-box");

let cardCount = 1;  // Contador para criar IDs únicos

// Função para adicionar novo card

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

document.getElementById("first").addEventListener("click", function() {
  const newCard = document.createElement("div");
  newCard.classList.add("col", "document-card");
  const cardId = `documento-${cardCount}`;

  const newDocId = `doc-${cardCount}`; // Criar um novo ID único
  const docTitle = `Documento ${cardCount}`; // Título padrão
  const docContent = ''; // Conteúdo inicial vazio

  // Salvar o título e o conteúdo inicial no localStorage
  localStorage.setItem(`doc-title-${newDocId}`, docTitle);
  localStorage.setItem(`quill-content-${newDocId}`, JSON.stringify(docContent));

  // Estrutura do novo card
  newCard.innerHTML = `
<div class="document-card">
  <div class="card shadow-sm h-100">
    <!-- Link para redirecionar para o documento -->
    <a href="index.html?docId=${newDocId}" class="card-link">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="225" 
           xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" 
           preserveAspectRatio="xMidYMid slice" focusable="false">
        <image href="" width="100%" height="100%" />
      </svg>
      <hr>
      <div class="card-body d-flex flex-column">
        <h2 class="card-text">Documento ${cardCount}</h2>
      </div>
    </a>
    <!-- Grupo de botões fora do link -->
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
          <div>Sim</div>
          <div>Não</div>
        </div>
      </button>
    </div>
  </div>
</div>
`;

      newCard.classList.add("col", "document-card");
  // Adicionar o card ao container
  document.getElementById("card-container").appendChild(newCard);
  console.log("Card criado.")
  newCard.querySelector(".download-button").addEventListener("click", function (event) {
    console.log("clicando download")
    const downloadBox = this.querySelector(".download-box")
    if (downloadBox.style.display == "block") {
      console.log("remove")
      downloadBox.classList.add("none")

    } else {
      console.log("foi");
      downloadBox.classList.remove("none");
    }
  });

  newCard.querySelector("#remove-button").addEventListener("click", function (event) {
    event.stopPropagation(); // Impede a propagação do clique para o card
    event.preventDefault();  // Impede o redirecionamento por acidente

    const removeBox = removeBoxes[index];
    if (removeBox.style.display === "block") {
      removeBox.style.display = "none";
    } else {
      removeBox.style.display = "block";
    }
  });
  // Incrementar o contador de cards
  cardCount++;
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