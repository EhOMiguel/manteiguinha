function send() {
    const nome = document.getElementById("nameText").value;
    const numero = document.getElementById("numberInput").value;
    const arquivo = document.getElementById("fileInput").files[0];

    if (arquivo) {
        const formData = new FormData();
        formData.append("arquivo", arquivo);

        const options = {
            method: "POST",
            body: formData,
                    };

        fetch('http://localhost:4040/teste', options)
            .then(response => response.json())
            .then(response => {
                const conteudoPdf = response.conteudo;
                const blob = base64toBlob(conteudoPdf, 'application/pdf');
                const fileName = "arquivo.pdf";
                saveBlobAsFile(blob, fileName);
            });
    } else {
        console.error("Nenhum arquivo selecionado.");
    }

    // Exemplo de uso dos valores de nome e número
    // window.alert(`Nome: ${nome}, Número: ${numero}`);
}

function base64toPDF(base64String, fileName) {
    // Convertendo a string Base64 em dados binários
    const binaryString = Buffer.from(base64String, 'base64');

    // Salvando os dados binários em um arquivo PDF
    fs.writeFileSync(fileName, binaryString, { encoding: 'binary' });
}