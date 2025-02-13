document.getElementById('font-family').addEventListener('click', function () {
    const selectedFont = this.value;
    document.execCommand('fontName', "Times New Roman");
  });