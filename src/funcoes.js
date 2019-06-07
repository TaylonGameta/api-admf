const func = {
    calcularVP : function calcularVP(vf, taxa, periodos){
        const value = vf / Math.pow(1 + taxa/100, periodos)
        return value
    },
    calcularVF : function calcularVF(req,res){
        const value = req.body.vp * Math.pow(1 + req.body.taxa/100, req.body.periodos)
        res.json({valor : value.toFixed(2)})
    },
    vpl : function vpl(req,res){
        const valores = [null,20, 30, 40]
        let intervalo = req.body.intervalo
        let tir = req.body.tir
        let iinicial = req.body.inicial
        let periodos = req.body.periodos

        let r = 0

        for(let i = 1; i<=periodos; i++){
            r += this.calcularVP(valores[i], tir,i)
        }

        r -= iinicial
        res.json({valor : r.toFixed(2)})
        
    },
    payback : function payback(req, res){
        let vps = []
        let saldo = []
        let fcatual
        const valores = [null,400,500,600]
        const periodos = req.body.periodos
        const inicial = req.body.inicial
        const invervalo = Number(req.body.intervalo)
        let saldoAtual = Number(inicial)
        vps.push(Number(inicial))
        saldo.push(Number(inicial))
        
        for(let i = 1; i <= periodos; i++){
            fcatual = this.calcularVP(valores[i], req.body.tir, i)
            vps.push(Number(fcatual.toFixed(2)))
            saldoAtual += fcatual
            saldo.push(Number(saldoAtual.toFixed(2)))
        }
        console.log(saldo[saldo.length - 1])
        console.log(vps[saldo.length - 1])

        const n1 = Number((vps[vps.length -1] - saldo[saldo.length -1]).toFixed(2))
        const resultado = Number((periodos - 1 + (n1/vps[vps.length - 1])).toFixed(2))
        return resultado
    }
}

module.exports = func