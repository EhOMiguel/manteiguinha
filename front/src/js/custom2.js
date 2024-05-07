const dropFile = document.getElementById('drop-file');
const dropAss = document.getElementById('drop-ass');

// Função para tratar o evento de mudança e capturar o arquivo selecionado
document.getElementById('file-input-file').addEventListener('change', function(event) {
  var files = event.target.files;
  handleFiles(files, 'arquivo');
});

// Função para tratar o evento de mudança e capturar o arquivo selecionado
document.getElementById('file-input-ass').addEventListener('change', function(event) {
  var files = event.target.files;
  handleFiles(files, 'assinatura');
});

// Evento ao arrastar o arquivo sobre a área de soltura
dropFile.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropFile.classList.add('dragover');
});

// Evento ao sair do arquivo da área de soltura
dropFile.addEventListener('dragleave', () => {
  dropFile.classList.remove('dragover');
});

// Evento ao soltar o arquivo na área de soltura
dropFile.addEventListener('drop', (event) => {
  event.preventDefault();
  dropFile.classList.remove('dragover');
  const files = event.dataTransfer.files;

  document.getElementById('file-input-file').files = files;

  handleFiles(files, 'arquivo');
});



// Evento ao arrastar o arquivo sobre a área de soltura
dropAss.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropAss.classList.add('dragover');
  });
  
// Evento ao sair do arquivo da área de soltura
dropAss.addEventListener('dragleave', () => {
dropAss.classList.remove('dragover');
});

// Evento ao soltar o arquivo na área de soltura
dropAss.addEventListener('drop', (event) => {
    event.preventDefault();
    dropAss.classList.remove('dragover');
    const files = event.dataTransfer.files;

    document.getElementById('file-input-ass').files = files;

    handleFiles(files, 'assinatura');
});

function validaCamposVerificador(assinatura, arquivo) {
  const assinaturaValida = assinatura.files.length !== 0;
  const fileValido = arquivo.files.length !== 0;

  dropFile.classList.remove('input-invalido');
  dropAss.classList.remove('input-invalido');

  // Força o navegador a reprocessar a remoção da classe antes de re-adicioná-la
  void dropFile.offsetWidth;
  void dropAss.offsetWidth;

  if (!assinaturaValida) dropAss.classList.add('input-invalido');
  if (!fileValido) dropFile.classList.add('input-invalido');

  return assinaturaValida && fileValido;
}

// Função para processar os arquivos
function handleFiles(files, flag) {
    if(flag == 'arquivo') document.getElementById('file-name-file').textContent = files[0].name;
    else document.getElementById('file-name-ass').textContent = files[0].name;
}

const formVerificar = document.getElementById("form-verificar");

// Adiciona um ouvinte de evento para o envio do formulário
formVerificar.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const assinatura = document.getElementById("file-input-ass");
    const arquivo = document.getElementById("file-input-file");

    if (validaCamposVerificador(assinatura, arquivo)) sendVerificador(assinatura.files[0], arquivo.files[0])
})