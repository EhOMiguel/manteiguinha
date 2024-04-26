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
            // Esse código será necessário se e somente se você quiser baixar o pdf
            // .then(response => {
            //     let conteudoPdf = response.conteudo;
            //     let blob = base64toBlob(conteudoPdf, 'application/pdf');
            //     const fileName = "arquivo.pdf";
            //     downloadBlob(blob, fileName);
            // })
            .then(response => {    
                let json = JSON.stringify(response);
                let blob = new Blob([json], { type: "application/json" });
                let url = URL.createObjectURL(blob);
                let link = document.createElement("a");
                
                link.download = "dados.json";
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log("coraçãozinho S2 S2 *>_<*")
            })
            .catch(error => {
                console.log(error)
            });
    } else {
        console.error("Nenhum arquivo selecionado.");
    }
}

function base64toBlob(base64String, contentType) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
}

function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download';
    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener('click', clickHandler);
        }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
}

// Para executar os testes em jest
module.exports = send; 