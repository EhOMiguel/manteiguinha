const { response } = require("express");

function send() {
    const nome = document.getElementById("nameText").value;
    const numero = document.getElementById("numberInput").value;
    const arquivo = document.getElementById("fileInput").files[0];

    console.log(">>>", arquivo)

    if (arquivo) {
        const formData = new FormData();

        formData.append("arquivo", arquivo);

        const options = {
            method: "POST",
            body: formData,
            // headers: {'Content-Type': 'multipart/form-data'}
        };

        fetch('http://localhost:4040/teste', options)
            .then(response => response.json())
            .then(response => {
                console.log("oieee", response)

                // Convertendo os dados do buffer em um Blob
                const blob = new Blob([new Uint8Array(response.buffer.data)], { type: response.mimetype });

                // Criando um URL temporário para o Blob
                const url = URL.createObjectURL(blob);

                // Criando um link para download
                const link = document.createElement('a');
                link.href = url;
                link.download = response.originalname;

                // Simulando um clique no link para iniciar o download
                link.click();

                // Liberando o URL temporário criado
                URL.revokeObjectURL(url);
            }
            )
    } else {
        console.error("Nenhum arquivo selecionado.");
    }

    // Exemplo de uso dos valores de nome e número
    // window.alert(`Nome: ${nome}, Número: ${numero}`);
}
