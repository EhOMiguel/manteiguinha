const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require("fs");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()); 

const upload = multer();

app.post("/teste", upload.single('arquivo'), function(req, res){
    let contents = fs.readFileSync("base64.txt", "utf-8").trim();
    contents = {"conteudo":contents}
    // const pdfRecebido = req.file; // Use req.file para acessar o arquivo enviado
    console.log("PDF: ", contents);
    res.send(contents);    
});

app.listen(4040);