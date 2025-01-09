const inputSize = document.getElementById('font-size');
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');
const editor = document.querySelector("#editor");

// Função para aplicar o tamanho da fonte diretamente ao conteúdo selecionado
function changeSize(size) {
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.style.fontSize = size + "px";
        range.surroundContents(span);dasdsd
    } else {
        // Se não houver seleção, aplica o tamanho de fonte no editor inteiro
        editor.style.fontSize = size + "px";
    }
}

inputSize.addEventListener('input', function () {
    const newSize = parseInt(this.value);
    changeSize(newSize);
});

// Função de incrementar o valor
btnPlus.addEventListener('click', function () {
    let currentValue = parseInt(inputSize.value) || 12;
    let newValue = currentValue + 2; // Incrementa de 2 em 2
    inputSize.value = newValue;
    changeSize(newValue);
});

// Função de decrementar o valor
btnMinus.addEventListener('click', function () {
    let currentValue = parseInt(inputSize.value) || 12;
    let newValue = currentValue - 2; // Decrementa de 2 em 2
    inputSize.value = newValue;
    changeSize(newValue);
});

// Exibe dropdown ao clicar no input
inputSize.addEventListener('focus', function () {
    dropdown.style.display = 'block';
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

function textModify(modifier){
    document.querySelector(`#${modifier}-button`).addEventListener("click", function() {
        this.classList.toggle("pressed");
        document.execCommand(modifier);
    });
}


textModify("bold");
textModify("italic");
textModify("underline");