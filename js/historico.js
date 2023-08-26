export class Repositorio {
    obterDados() {
        const dados = window.localStorage.getItem('progresso');
        let progresso;
        if (dados) {
            progresso = JSON.parse(dados);
        }
        return progresso;
    }
    salvarDados(progresso) {
        const progressoEmString = JSON.stringify(progresso);
        window.localStorage.setItem('progresso', progressoEmString);
    }
}
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
        this.calcularPorcentagem(acertou);
        this.calcularSequencia(acertou);
        if (acertou) {
            this.progresso.linhaDaJogada[linha]++;
        }
        else {
            this.progresso.erros++;
        }
    }
    calcularPorcentagem(acertou) {
        const primeiraJogada = this.progresso.jogos === 1;
        if (acertou && primeiraJogada)
            this.progresso.porcentagemVitorias = 100;
        else if (!acertou && primeiraJogada)
            this.progresso.porcentagemVitorias = 0;
        else {
            this.progresso.porcentagemVitorias = this.progresso.erros / this.progresso.jogos;
        }
    }
    calcularSequencia(acertou) {
        const primeiraJogada = this.progresso.jogos === 1;
        if (acertou && primeiraJogada)
            this.progresso.melhorSequencia = 1;
        if (acertou) {
            this.progresso.sequenciaVitorias++;
        }
        else {
            this.progresso.sequenciaVitorias = 0;
        }
        if (this.progresso.sequenciaVitorias > this.progresso.melhorSequencia)
            this.progresso.melhorSequencia++;
    }
}
//# sourceMappingURL=historico.js.map