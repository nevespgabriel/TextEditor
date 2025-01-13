const inputSize = document.getElementById('font-size');
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');
const editor = document.querySelector("#editor");
const dropdown = document.getElementById("dropdown");

// Configuração do Quill
var quill = new Quill('#editor', {
  modules: {
    toolbar: '#toolbar-container' 
  },
  theme: 'snow'
});



// Registrar tamanhos personalizados
const Size = Quill.import('attributors/style/size');
Size.whitelist = [
  '8pt', '10pt', '12pt', '14pt', '16pt', '18pt', '20pt', '22pt', 
  '24pt', '26pt', '28pt', '30pt', '32pt', '34pt', '36pt', '38pt', 
  '40pt', '42pt', '44pt', '46pt', '48pt', '50pt', '52pt', '54pt', 
  '56pt', '58pt', '60pt', '62pt', '64pt', '66pt', '68pt', '70pt', 
  '72pt', '74pt', '76pt', '78pt', '80pt', '82pt', '84pt', '86pt', 
  '88pt', '90pt', '92pt', '94pt', '96pt'
];
Quill.register(Size, true);

/*const Font = Quill.import('formats/font');
Font.whitelist = [
    'Arial', 
    'Verdana', 
    'Tahoma', 
    'Times New Roman', 
    'Georgia', 
    'Courier New', 
    'Comic Sans MS', 
    'Impact'
];
Quill.register(Font, true);

// Função para aplicar o tamanho da fonte
function applyFontSize(size) {
  const range = quill.getSelection();
  if (range) {
    if (range.length === 0) {
      // Nenhum texto selecionado, aplica o formato para o texto futuro
      quill.format('size', size + 'pt');
    } else {
      // Texto selecionado, aplica o formato à seleção
      quill.formatText(range, 'size', size + 'pt');
    }
  } else {
    // Se não houver seleção (nenhuma posição do cursor), aplica o formato para o texto futuro
    quill.format('size', size + 'pt');
  }
}*/

// Evento para o input de tamanho da fonte
inputSize.addEventListener('input', function () {
  const newSize = parseInt(this.value);
  applyFontSize(newSize);
});

// Exibe o dropdown ao focar no input
inputSize.addEventListener('focus', function () {
  dropdown.style.display = 'block';
});

// Incrementa o tamanho da fonte
btnPlus.addEventListener('click', function () {
  let currentValue = parseInt(inputSize.value) || 12;
  let newValue = currentValue + 2; // Incrementa de 2 em 2
  inputSize.value = newValue;
  applyFontSize(newValue); 
});

// Decrementa o tamanho da fonte
btnMinus.addEventListener('click', function () {
  let currentValue = parseInt(inputSize.value) || 12;
  let newValue = currentValue - 2; // Decrementa de 2 em 2
  inputSize.value = newValue;
  applyFontSize(newValue);
});

// Fecha o dropdown se clicar fora
document.addEventListener('click', function (e) {
  if (!inputSize.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Evento para dropdown de tamanhos
dropdown.addEventListener('click', function (e) {
  if (e.target.dataset.value) {
    inputSize.value = e.target.dataset.value;
    applyFontSize(e.target.dataset.value);
    dropdown.style.display = 'none'; // Fecha o dropdown
  }
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