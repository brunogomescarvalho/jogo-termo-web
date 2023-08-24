export class jogo {
    constructor(acervo) {
        this.acervo = acervo;
        this.listaPalavras = acervo.palavras;
        this.sortearPalavra();
        console.log(this.palavra);
    }
    getPalavra() {
        return this.palavra;
    }
    verificarJogada(palavraJogada) {
        let resultados = [];
        for (let i = 0; i < this.palavra.length; i++) {
            if (this.palavra[i] === palavraJogada[i]) {
                resultados.push(resultado.Acerto);
            }
            else if (this.palavra.includes(palavraJogada[i])) {
                resultados.push(resultado.Erro);
            }
            else
                resultados.push(resultado.Inexistente);
        }
        return resultados;
    }
    acertou(palavraJogada) {
        return palavraJogada === this.palavra;
    }
    sortearPalavra() {
        this.palavra = this.listaPalavras[Math.floor(Math.random() * this.listaPalavras.length + 1)]
            .toUpperCase();
    }
}
export var resultado;
(function (resultado) {
    resultado[resultado["Acerto"] = 0] = "Acerto";
    resultado[resultado["Erro"] = 1] = "Erro";
    resultado[resultado["Inexistente"] = 2] = "Inexistente";
})(resultado || (resultado = {}));
//# sourceMappingURL=jogo-termo.js.map