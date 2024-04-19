
const fs = require("fs");

function base64toPDF(base64String, fileName) {
    // Convertendo a string Base64 em dados binários
    const binaryString = Buffer.from(base64String, 'base64');

    // Salvando os dados binários em um arquivo PDF
    fs.writeFileSync(fileName, binaryString, { encoding: 'binary' });
}

// Lendo a string Base64 do arquivo
let contents = fs.readFileSync("base64.txt", "utf-8").trim();

// Exemplo de uso:
const fileName = "arquivo.pdf";
base64toPDF(contents, fileName);