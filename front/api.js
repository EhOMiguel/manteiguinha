const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()); 

const upload = multer();

app.post("/teste", upload.single('arquivo'), function(req, res){
    const pdfRecebido = req.file; // Use req.file para acessar o arquivo enviado
    console.log("PDF: ", pdfRecebido);
    res.send(pdfRecebido);    
});

app.listen(4040);