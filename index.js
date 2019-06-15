const express = require("express")
const app = express()
const bp = require("body-parser")
const funcoes = require("./src/funcoes")

app.use(bp.urlencoded({ extended: false }))

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
});

app.post('/calculavp', (req,res)=>{
    res.json({valor : funcoes.calcularVP(req.body.vf, req.body.taxa, req.body.periodos).toFixed(2)})
})

app.post('/calculavf', (req,res)=>{
    funcoes.calcularVF(req,res)
})

app.post('/vpl', (req,res)=>{
    funcoes.vpl(req,res)
})

app.post('/payback', (req,res)=>{
    res.json({valor : funcoes.payback(req)})
})

app.post('/tir', (req,res)=>{
    res.json({valor : funcoes.tir(req)})
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("ouvindo na 3000 ou ", process.env.PORT)
})