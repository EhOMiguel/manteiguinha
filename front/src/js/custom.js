// Função para tratar o evento de mudança e capturar o arquivo selecionado
document.getElementById('file-input').addEventListener('change', function(event) {
    var files = event.target.files;
    handleFiles(files);
});

const drop = document.getElementById('drop');

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
  handleFiles(files);
});



function validaCampos(token, fileInput) {
    const tokenValido = token.value.trim() !== '';
    const fileValido = fileInput.files.length !== 0;

    token.classList.remove('input-invalido');
    drop.classList.remove('input-invalido');

    // Força o navegador a reprocessar a remoção da classe antes de re-adicioná-la
    void token.offsetWidth;
    void drop.offsetWidth;

    if (!tokenValido) token.classList.add('input-invalido');
    if (!fileValido) drop.classList.add('input-invalido');

    return tokenValido && fileValido;
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
    const fileInput = document.getElementById("file-input");

    if (validaCampos(token, fileInput)) send(token.value, fileInput.files[0])
})