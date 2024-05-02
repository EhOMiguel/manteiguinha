// Função para tratar o evento de clique e abrir o seletor de arquivos
document.getElementById('file-input').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

// Função para tratar o evento de mudança e capturar o arquivo selecionado
document.getElementById('fileInput').addEventListener('change', function(event) {
    var files = event.target.files;
    handleFiles(files);
});

// Função para tratar os arquivos arrastados para a div
document.getElementById('file-input').addEventListener('drop', function(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    handleFiles(files);
});

// Função para tratar os eventos de arrastar sobre a div
document.getElementById('file-input').addEventListener('dragover', function(event) {
    event.preventDefault();
});

// Função para processar os arquivos
function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      // Processar cada arquivo
      console.log('Arquivo(s) adicionado(s): ' + files[i].name);
    }
}
