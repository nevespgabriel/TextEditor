const inputSize = document.getElementById('font-size');
const dropdown = document.getElementById('dropdown');
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');

inputSize.addEventListener('click', function () {
    dropdown.style.display = 'block';
});

// Colocar para o font-size ser o selecionado
document.addEventListener('click', function (e) {
    if (!inputSize.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// Atualizar o inputSize com o valor selecionado no dropdown
dropdown.addEventListener('click', function (e) {
    if (e.target.dataset.value) {
        inputSize.value = e.target.dataset.value;
        dropdown.style.display = 'none';
    }
});

// Função de incrementar e decrementar o valor
btnPlus.addEventListener('click', function () {
    let currentValue = parseInt(inputSize.value) || 12;
    inputSize.value = currentValue + 1;
});

btnMinus.addEventListener('click', function () {
    let currentValue = parseInt(inputSize.value) || 12;
    inputSize.value = currentValue - 1;
});

document.getElementById('font-family').addEventListener('change', function () {
    const selectedFont = this.value;
    document.execCommand('fontName', false, selectedFont);
});

const customSelect = document.querySelector('.custom-select');
const selected = customSelect.querySelector('.selected');
const options = customSelect.querySelector('.options');

// Abre/fecha o menu de opções ao clicar no seletor
selected.addEventListener('click', (event) => {
  customSelect.classList.toggle('active');
  event.stopPropagation(); // Impede que o clique se propague para o documento
});

// Fecha o menu ao selecionar uma opção
options.addEventListener('click', (event) => {
  const option = event.target.closest('.option');
  if (option) {
    const imgSrc = option.querySelector('img').src;
    selected.querySelector('img').src = imgSrc;
    customSelect.classList.remove('active'); // Fecha o menu após a seleção
  }
  event.stopPropagation(); // Impede o evento de clique se propagar
});

// Fecha o menu se clicar fora dele
document.addEventListener('click', (event) => {
  if (!customSelect.contains(event.target)) {
    customSelect.classList.remove('active'); // Fecha o menu se clicar fora dele
  }
});