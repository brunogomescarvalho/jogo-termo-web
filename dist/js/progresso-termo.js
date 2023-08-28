export class Progresso {
    constructor(repositorio) {
        this.repositorio = repositorio;
        this.progresso = {
            jogos: 0,
            porcentagemVitorias: 0,
            sequenciaVitorias: 0,
            melhorSequencia: 0,
            linhaDaJogada: [] = [0, 0, 0, 0, 0],
            erros: 0
        };
    }
    obterDados() {
        return this.repositorio.obterDados();
    }
    atualizarJogada(acertou, linha) {
        let dados = this.obterDados();
        this.atualizarDados(dados, acertou, linha);
        this.repositorio.salvarDados(this.progresso);
    }
    atualizarDados(dados, acertou, linha) {
        if (dados)
            this.progresso = dados;
        this.progresso.jogos++;
        if (acertou)
            this.progresso.linhaDaJogada[linha]++;
        else
            this.progresso.erros++;
        this.calcularSequencia(acertou);
        this.calcularPorcentagem();
    }
    calcularPorcentagem() {
        if (this.progresso.erros == 0)
            this.progresso.porcentagemVitorias = 100;
        else {
            const valor = this.progresso.erros / this.progresso.jogos;
            this.progresso.porcentagemVitorias = 100 - Math.floor(100 * valor);
        }
    }
    calcularSequencia(acertou) {
        if (acertou)
            this.progresso.sequenciaVitorias++;
        else
            this.progresso.sequenciaVitorias = 0;
        if (acertou && this.progresso.jogos == 1)
            this.progresso.melhorSequencia = 1;
        if (this.progresso.sequenciaVitorias > this.progresso.melhorSequencia)
            this.progresso.melhorSequencia = this.progresso.sequenciaVitorias;
    }
}
//# sourceMappingURL=progresso-termo.js.map