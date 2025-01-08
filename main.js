const input = document.getElementById('font-size');
const dropdown = document.getElementById('dropdown');
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');

// Mostrar lista suspensa ao clicar no input
input.addEventListener('click', function () {
    dropdown.style.display = 'block';
});

// Esconder lista suspensa ao clicar fora dela
document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// Atualizar o input com o valor selecionado no dropdown
dropdown.addEventListener('click', function (e) {
    if (e.target.dataset.value) {
        input.value = e.target.dataset.value;
        dropdown.style.display = 'none';
    }
});

// Função de incrementar e decrementar o valor
btnPlus.addEventListener('click', function () {
    let currentValue = parseInt(input.value) || 12;
    input.value = currentValue + 1;
});

btnMinus.addEventListener('click', function () {
    let currentValue = parseInt(input.value) || 12;
    input.value = currentValue - 1;
});

document.getElementById('font-family').addEventListener('change', function () {
    const selectedFont = this.value;
    document.execCommand('fontName', false, selectedFont);
});

const customSelect = document.querySelector('.custom-select');
  const selected = customSelect.querySelector('.selected');
  const options = customSelect.querySelector('.options');

  customSelect.addEventListener('click', () => {
    customSelect.classList.add('active');
  });

  options.addEventListener('click', (event) => {
    const option = event.target.closest('.option');
    if (option) {
      const imgSrc = option.querySelector('img').src;
      selected.querySelector('img').src = imgSrc;
      customSelect.classList.remove('active');
    }
  });