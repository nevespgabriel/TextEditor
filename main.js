// Restante do código JavaScript existente
const inputSize = document.getElementById('font-size');
const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');
const editor = document.querySelector("#editor");
const dropdown = document.getElementById("dropdown");
const colorButton = document.getElementById('color-button');
const colorPicker = document.getElementById('color-picker');
const downloadButton = document.querySelector("#download-button");
const downloadBox = document.querySelector("#download-box");
const removeButton = document.querySelector("#remove-button");
const removeBox = document.querySelector("#remove-box");
const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#back-button");
const fontSelect = document.querySelector("#font-change");
const sizeBox = document.querySelector("#toolbar-container");
const textStyle = document.querySelector(".text-style");
const customSelect = document.querySelector('.custom-select');
const selected = customSelect.querySelector('.selected');
const options = customSelect.querySelector('.options');
const selectSpace = document.querySelector('.select-space');
const selectedSpace = selectSpace.querySelector('.selected-space');
const optionsSpace = selectSpace.querySelector('.options-space');
const bulletButton = document.querySelector("#bullet-button");
const orderedButton = document.querySelector("#ordered-button");
const plusButton = document.querySelector("#plus-button");
const tituloDoc = document.getElementById('titulo-doc');

let lastFont = 'arial';
let lastColor = '#000000';
let lastBold = false;
let lastItalic = false;
let lastUnderline = false;
let lastSize = '12pt';

document.querySelector("header a");
var Parchment = Quill.import('parchment');
var lineHeightStyle = new Parchment.Attributor.Style('lineheight', 'line-height', {
  scope: Parchment.Scope.BLOCK,
});
Quill.register(lineHeightStyle, true);

var Font = Quill.import('formats/font');
Font.whitelist = [
  'arial', 'verdana', 'tahoma', 'times-new-roman', 'georgia', 'courier-new', 'comic-sans-ms', 
  'impact', 'roboto', 'open-sans', 'lato', 'montserrat', 'raleway', 'poppins', 'garamond', 
  'palatino', 'trebuchet-ms', 'helvetica', 'ubuntu', 'merriweather', 'fira-sans', 
  'inconsolata', 'playfair-display', 'dancing-script'
];
Quill.register(Font, true);

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

function storeCurrentFormats() {
  let selection = quill.getFormat();
  
  lastFont = selection.font || lastFont;
  lastColor = selection.color || lastColor;
  lastSize = selection.size || lastSize; // Agora armazena o tamanho da fonte
  lastBold = document.querySelector("#bold-button").classList.contains("pressed");
  lastItalic = document.querySelector("#italic-button").classList.contains("pressed");
  lastUnderline = document.querySelector("#underline-button").classList.contains("pressed");
}

function restoreLastFormats() {
  quill.format('font', lastFont);
  quill.format('color', lastColor);
  quill.format('bold', lastBold);
  quill.format('italic', lastItalic);
  quill.format('underline', lastUnderline);
  quill.format('size', lastSize);
}

function ensureNonEmptyContent() {
  if (quill.getLength() === 1) {
    quill.format('font', lastFont);
    quill.format('color', lastColor);
    quill.format('bold', lastBold);
    quill.format('italic', lastItalic);
    quill.format('underline', lastUnderline);
  }
}

// Função para aplicar o tamanho da fonte
function applyFontSize(size) {
  const range = quill.getSelection();
  lastSize = size + 'pt';
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
}

function applyAlignment(alignValue) {
  const range = quill.getSelection();

  // Verifica se o valor de alinhamento é "left" e define como null
  if (alignValue === 'left') {
    alignValue = null; // Quill usa null para alinhamento à esquerda
  }

  if (range) {
    if (range.length === 0) {
      // Aplica ao texto futuro se não houver texto selecionado
      quill.format('align', alignValue);
    } else {
      // Aplica ao texto selecionado
      quill.format('align', alignValue);
    }
  } else {
    // Aplica ao texto futuro se não houver posição do cursor
    quill.format('align', alignValue);
  }
}

function changeLayout(toNone, toBlock) {
  toNone.forEach((elemento) => {
    if (elemento !== textStyle) {
      elemento.style.display = "none";
    } else {
      // Se textStyle for uma coleção de elementos
      const textStyleElements = Array.isArray(textStyle) ? textStyle : [textStyle];
      textStyleElements.forEach(function(el) {
        el.style.display = "none";
      });
    }
  });

  toBlock.forEach((elemento) => {
    if (elemento === sizeBox) {
      elemento.style.display = "flex";
    } else if (elemento === textStyle) {
      // Se textStyle for uma coleção de elementos
      const textStyleElements = Array.isArray(textStyle) ? textStyle : [textStyle];
      textStyleElements.forEach(function(el) {
        el.style.display = "inline";
      });
    } else {
      elemento.style.display = "block";
    }
  });
}

plusButton.addEventListener("click", function(){
  plusButton.classList.toggle("pressed");
  const fileButtons = document.querySelector("#file-buttons");
  if(plusButton.classList.contains("pressed")){
    fileButtons.style.display = "flex";
    fileButtons.style.flexDirection = "column";
    fileButtons.style.position = "absolute";
    fileButtons.style.top = "50px";
  } else{
    fileButtons.style.display = "none";
  }
    
})

nextButton.addEventListener("click", function(){
  const toNone = [nextButton, fontSelect, sizeBox, textStyle];
  const toBlock = [backButton, customSelect, selectSpace, bulletButton, orderedButton];
  changeLayout(toNone, toBlock);
  document.querySelectorAll("hr").forEach(function(hr) {
    hr.style.display = "none";
  });
});

backButton.addEventListener("click", function(){
  const toNone = [backButton, customSelect, selectSpace, bulletButton, orderedButton];
  const toBlock = [nextButton, fontSelect, sizeBox, textStyle]; 
  changeLayout(toNone, toBlock);
  document.querySelectorAll("hr").forEach(function(hr) {
    hr.style.display = "block";
  });
  document.querySelector("#not-show-hr").style.display = "none";
})

document.querySelector('#font-family').addEventListener('change', function() {
  lastFont = this.value.toLowerCase().replace(/\s/g, '-');
  quill.format('font', lastFont);
});

tituloDoc.addEventListener('focus', function() {
  quill.blur(); 
});

// Adicionar evento de foco ao campo de título
tituloDoc.addEventListener('click', function(event) {
  
  event.stopPropagation();
  setTimeout(() => {
    quill.blur(); // Remove o foco do Quill
    tituloDoc.focus(); // Garante que o título tenha foco
  }, 0);
});

// Mostrar o seletor de cor logo abaixo do botão ao clicar
colorButton.addEventListener('click', function(event) {
  // Impede que o clique no botão de cor feche o seletor
  event.stopPropagation();
  
  if (colorPicker.style.display === 'none' || !colorPicker.style.display) {
    colorPicker.style.display = 'block';
    this.classList.add("pressed");
  } else {
    colorPicker.style.display = 'none';
    this.classList.remove("pressed"); // Remover a classe quando o seletor desaparecer
  }
});

// Aplicar a cor selecionada ao texto
colorPicker.addEventListener('input', function(event) {
  lastColor = this.value;
  const range = quill.getSelection();

  if (range) {
    if (range.length === 0) {
      // Aplica cor ao texto futuro (caso não haja texto selecionado)
      quill.format('color', lastColor);
    } else {
      // Aplica cor ao texto selecionado
      quill.formatText(range, 'color', last);
    }
  }

  // Oculta o seletor de cor após selecionar
  colorButton.classList.remove("pressed"); // Remove a classe quando o seletor desaparece
});

document.querySelector("header a").addEventListener("click", function(){
  this.classList.add("header-pressed");
});

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Obter o ID do documento da URL
const docId = getQueryParam("doc"); // por exemplo, "documento-1"

// Carregar conteúdo salvo no localStorage para o documento específico
const savedContent = localStorage.getItem(`quill-content-${docId}`);
if (savedContent) {
  quill.setContents(JSON.parse(savedContent));
}

// Carregar título salvo no localStorage para o documento específico
const savedTitle = localStorage.getItem(`doc-title-${docId}`);
if (savedTitle) {
  tituloDoc.value = savedTitle;
}

// Salvar o conteúdo e título no localStorage ao clicar no botão salvar
document.querySelector("#save-button").addEventListener("click", function(){
  this.classList.add("header-pressed");
  setTimeout(function(){
      document.querySelector("#save-button").classList.remove("header-pressed");

      const saveBox = document.querySelector("#save-box");
      saveBox.classList.remove("hide");
      saveBox.classList.add("show");

      setTimeout(function(){
          saveBox.classList.remove("show");
          saveBox.classList.add("hide");
      }, 2000);
  }, 500);

  // Salvar conteúdo do editor Quill para o documento específico
  const content = quill.getContents();  
  localStorage.setItem(`quill-content-${docId}`, JSON.stringify(content));  // Salvar com base no ID do documento

  // Salvar título do documento
  const title = tituloDoc.value;  // Pega o valor do campo de título
  localStorage.setItem(`doc-title-${docId}`, title);  // Salvar com base no ID do documento
});

// Lógica do seletor personalizado
document.querySelectorAll('.option').forEach(function(option) {
  option.addEventListener('click', function() {
    const alignValue = this.getAttribute('data-value'); // Obtém o valor de alinhamento
    console.log("Alinhamento selecionado:", alignValue); // Verifica qual valor foi selecionado
    applyAlignment(alignValue); // Aplica o alinhamento

    // Atualiza o ícone selecionado para refletir a escolha
    document.querySelector('.selected img').src = this.querySelector('img').src;
  });
});

// Solução para garantir que a seleção seja sempre atualizada

document.querySelectorAll('.option-space').forEach(function(option) {
  option.addEventListener('click', function() {
    const spacingValue = this.getAttribute('data-value'); // Obtém o valor do espaçamento
    quill.format('lineheight', spacingValue); // Aplica o espaçamento de linha
  });
});

quill.on('selection-change', function(range) {
  if (document.activeElement === tituloDoc) {
    return; // Se o título está em edição, não faça nada
  }
  
  if (range == null) {
    // Se não houver seleção, pode-se lidar com o estado de desfoque aqui
  }s
});



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

downloadButton.addEventListener("click", function(event){
  downloadButton.classList.add("header-pressed");
  if(downloadBox.style.display == "block"){
    downloadBox.style.display = "none";
    downloadButton.classList.remove("header-pressed");
  } else{
    downloadBox.style.display = "block";
  } 
  event.stopPropagation();
});

removeButton.addEventListener("click", function(event){
  removeButton.classList.add("header-pressed");
  if(removeBox.style.display == "block"){
    removeBox.style.display = "none";
    removeButton.classList.remove("header-pressed");
  } else{
    removeBox.style.display = "block";
  } 
  event.stopPropagation();
});

// Fecha o dropdown se clicar fora
document.addEventListener('click', function (e) {
  if (!inputSize.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
  if(downloadBox.style.display == "block"){
    downloadBox.style.display = "none";
    downloadButton.classList.remove("header-pressed");
  }
  if(removeBox.style.display == "block"){
    removeBox.style.display = "none";
    removeButton.classList.remove("header-pressed");
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

selectSpace.addEventListener('click', (event) => {
  selectSpace.classList.toggle('active');
  event.stopPropagation(); // Impede que o clique se propague para o documento
});

// Fecha o menu ao selecionar uma opção
optionsSpace.addEventListener('click', (event) => {
  const option = event.target.closest('.option-space');
  if (option) {
    selectSpace.classList.remove('active'); // Fecha o menu após a seleção
  }
  event.stopPropagation(); // Impede o evento de clique se propagar
});

// Fecha o menu se clicar fora dele
document.addEventListener('click', (event) => {
  if (!selectSpace.contains(event.target)) {
    selectSpace.classList.remove('active'); // Fecha o menu se clicar fora dele
  }
});

function textModify(modifier) {
  document.querySelector(`#${modifier}-button`).addEventListener("click", function () {
    this.classList.toggle("pressed");

    let newState = this.classList.contains("pressed");
    quill.format(modifier, newState);

    // Atualizar o estado global da formatação
    if (modifier === "bold") lastBold = newState;
    if (modifier === "italic") lastItalic = newState;
    if (modifier === "underline") lastUnderline = newState;
  });
}

function listModify(modifier){
  document.querySelector(`#${modifier}-button`).addEventListener("click", function() {
      this.classList.toggle("pressed");
      quill.format('list', modifier);
      if(modifier == "bullet"){
        document.querySelector("#ordered-button").classList.remove("pressed");
      } else if(modifier == "ordered"){
        document.querySelector("#bullet-button").classList.remove("pressed");
      }
  });
}


textModify("bold");
textModify("italic");
textModify("underline");
listModify("ordered");
listModify("bullet");

editor.addEventListener('keydown', function(event) {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    storeLastFormats(); // Armazena as formatações antes de apagar
    setTimeout(ensureNonEmptyContent, 0);
  }
});

// Garantir que o editor tenha sempre conteúdo ao focar ou desfocar
editor.addEventListener('blur', ensureNonEmptyContent);
editor.addEventListener('focus', ensureNonEmptyContent);


// Garantir que o espaço inicial seja removido ao começar a digitar
editor.addEventListener('input', function() {
  if (editor.innerHTML === '&nbsp;') {
    editor.innerHTML = ''; // Remover espaço se for o único conteúdo
  }

});

quill.on('text-change', function(delta, oldDelta, source) {
  if (quill.getLength() === 1) { // Se o editor estiver vazio
    restoreLastFormats(); // Restaurar apenas se necessário
  }
});

quill.on('selection-change', function() {
  storeCurrentFormats();
});

quill.on('text-change', function() {
  if (quill.getLength() === 1) { // Se o editor estiver vazio
    quill.format('size', lastSize);
  }
});

// Função para baixar um arquivo
function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Função para converter Delta para Markdown-like (para TXT)
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

// Botão de download em HTML (mantém formatação)
downloadBox.querySelector("#html-download").addEventListener("click", function () {
  const content = localStorage.getItem(`quill-content-${docId}`);
  const title = localStorage.getItem(`doc-title-${docId}`) || "documento";

  if (content) {
      const htmlContent = quill.root.innerHTML; // Obtém HTML formatado do Quill
      const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Open+Sans:wght@400;500&family=Lato:wght@400;500&family=Montserrat:wght@400;500&family=Raleway:wght@400;500&family=Poppins:wght@400;500&family=Merriweather:wght@400;500&family=Fira+Sans:wght@400;500&family=Inconsolata:wght@400;500&family=Playfair+Display:wght@400;500&family=Dancing+Script:wght@400;500&display=swap" rel="stylesheet">
  <title>${title}</title>
</head>
<body>
  ${htmlContent}
</body>
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>  
</html>`;

      downloadFile(`${title}.html`, fullHtml, "text/html");
  }
});

// Botão de download em TXT (converte formatação básica)
downloadBox.querySelector("#txt-download").addEventListener("click", function () {
  const content = localStorage.getItem(`quill-content-${docId}`);
  const title = localStorage.getItem(`doc-title-${docId}`) || "documento";

  if (content) {
      const quillDelta = JSON.parse(content); // Recupera a estrutura do Quill
      const plainText = convertDeltaToText(quillDelta); // Converte para formato Markdown-like
      downloadFile(`${title}.txt`, plainText, "text/plain");
  }
});