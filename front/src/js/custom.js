// Função para tratar o evento de mudança e capturar o arquivo selecionado
document.getElementById('file-input').addEventListener('change', function(event) {
    var files = event.target.files;
    handleFiles(files);
});

const drop = document.getElementById('drop');
const dropFile = document.getElementById('drop-file');
const dropAss = document.getElementById('drop-ass');

// Evento ao arrastar o arquivo sobre a área de soltura
drop.addEventListener('dragover', (event) => {
  event.preventDefault();
  drop.classList.add('dragover');
});

// Evento ao sair do arquivo da área de soltura
drop.addEventListener('dragleave', () => {
  drop.classList.remove('dragover');
});

// Evento ao soltar o arquivo na área de soltura
drop.addEventListener('drop', (event) => {
  event.preventDefault();
  drop.classList.remove('dragover');
  const files = event.dataTransfer.files;

  document.getElementById('file-input').files = files;

  handleFiles(files);
});



function validaCamposAssinador(token, arquivo) {
    const tokenValido = token.value.trim() !== '';
    const fileValido = arquivo.files.length !== 0;

    token.classList.remove('input-invalido');
    drop.classList.remove('input-invalido');

    // Força o navegador a reprocessar a remoção da classe antes de re-adicioná-la
    void token.offsetWidth;
    void drop.offsetWidth;

    if (!tokenValido) token.classList.add('input-invalido');
    if (!fileValido) drop.classList.add('input-invalido');

    return tokenValido && fileValido;
}

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
function handleFiles(files) {
    document.getElementById('file-name').textContent = files[0].name;
}

const formAssinar = document.getElementById("form-assinar");

// Adiciona um ouvinte de evento para o envio do formulário
formAssinar.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const token = document.getElementById("token");
    const arquivo = document.getElementById("file-input");

    if (validaCamposAssinador(token, arquivo)) sendAssinatura(token.value, arquivo.files[0])
})



const formVerificar = document.getElementById("form-verificar");

// Adiciona um ouvinte de evento para o envio do formulário
formVerificar.addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const assinatura = document.getElementById("file-input-ass");
    const arquivo = document.getElementById("file-input-file");

    if (validaCamposVerificador(assinatura, arquivo)) sendVerificador(assinatura.files[0], arquivo.files[0])
})