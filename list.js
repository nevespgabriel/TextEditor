const downloadButtons = document.querySelectorAll(".download-button");
const downloadBoxes = document.querySelectorAll(".download-box");
const removeButtons = document.querySelectorAll(".remove-button");
const removeBoxes = document.querySelectorAll(".remove-box");

// Adicionar evento de clique para cada botão de download
downloadButtons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    button.classList.add("header-pressed");
    const downloadBox = downloadBoxes[index];

    if (downloadBox.style.display === "block") {
      downloadBox.style.display = "none";
      button.classList.remove("header-pressed");
    } else {
      downloadBox.style.display = "block";
    }
    event.stopPropagation();
  });
});

// Adicionar evento de clique para cada botão de remoção
removeButtons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    button.classList.add("header-pressed");
    const removeBox = removeBoxes[index];

    if (removeBox.style.display === "block") {
      removeBox.style.display = "none";
      button.classList.remove("header-pressed");
    } else {
      removeBox.style.display = "block";
    }
    event.stopPropagation();
  });
});

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