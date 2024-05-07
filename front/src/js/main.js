function sendAssinatura(token, arquivo) {
    const formData = new FormData();
    formData.append("arquivo", arquivo);
    formData.append("token", token);

    const options = {
        method: "POST",
        body: formData,
    };

    fetch('http://localhost:8081/api/rota', options)
        .then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: "Seu Arquivo foi assinado com sucesso",
                    icon: "success",
                    showConfirmButton: false,
                    confirmButtonText: 'Baixar Assinatura',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'botao-assinar'
                    }
                })
                return response;
            } else {
                Swal.fire({
                    title: "Houve um problema ao assinar o seu Arquivo",
                    icon: "error",
                    confirmButtonText: 'Tentar novamente',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'botao-assinar'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        sendAssinatura(token, arquivo); // Chama a função send
                    }
                });
                throw new Error('Erro na requisição: ' + response.statusText);
            }
        })
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
            
            link.download = "assinatura.json";
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log("coraçãozinho S2 S2 *>_<*")
        })
        .catch(error => {
            console.log(error)
        });

}

function sendVerificador(assinatura, arquivo) {
    const formData = new FormData();
    formData.append("arquivoAssinado", arquivo);
    formData.append("arquivoJson", assinatura);

    const options = {
        method: "POST",
        body: formData,
    };

    fetch('http://localhost:8083/verificar', options)
        .then(response => {
            if (response.status === 200) {
                return response;
            } else {
                Swal.fire({
                    title: "Houve um problema ao verificar o seu Arquivo",
                    icon: "error",
                    confirmButtonText: 'Tentar novamente',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'botao-assinar'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        sendVerificador(assinatura, arquivo);
                    }
                });
                throw new Error('Erro na requisição: ' + response.statusText);
            }
        })
        .then(response => response.text())
        .then(text => {
            if (text == 'Integridade verificada :)'){
                Swal.fire({
                    title: text,
                    icon: "success",
                    showConfirmButton: false
                })
            }
            else{
                Swal.fire({
                    title: text,
                    icon: "error",
                    showConfirmButton: false
                })
            }
        })
        .catch(error => {
            console.log(error)
        });

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