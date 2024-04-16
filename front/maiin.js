function send() {
    const nome = document.getElementById("nameText").value;
    const numero = document.getElementById("numberInput").value;
    const arquivo = document.getElementById("fileInput").files[0];

    if (arquivo) {
        var fileReader = new FileReader();

        fileReader.onload = function() {
            console.log("Conteúdo binário do arquivo:", fileReader.result);

            var blob = new Blob([fileReader.result], { type: 'application/pdf' });

            // Criando uma URL temporária para o Blob
            var url = URL.createObjectURL(blob);

            // Aqui você pode fazer o que quiser com o Blob, como enviá-lo para o servidor
            console.log("Blob do PDF:", blob);
            console.log("URL do Blob:", url);

            // Exemplo: Abrir o PDF em uma nova aba
            window.open(url);
        };

        // Lê o arquivo como um Blob
        fileReader.readAsArrayBuffer(arquivo);
    } else {
        console.error("Nenhum arquivo selecionado.");
    }

    // Exemplo de uso dos valores de nome e número
    window.alert(`Nome: ${nome}, Número: ${numero}`);
}
