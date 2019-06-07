const express = require("express")
const app = express()
const bp = require("body-parser")
const funcoes = require("./src/funcoes")

app.use(bp.urlencoded({ extended: false }))

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

app.listen(process.env.PORT || 3000, ()=>{
    console.log("ouvindo na 3000 ou ", process.env.PORT)
})