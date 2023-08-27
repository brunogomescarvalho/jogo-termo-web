import { acervo } from "./acervo-termo.js";
import { jogo, resultado } from "./jogo-termo.js";
import { Progresso } from "./progresso-termo.js";
import { Repositorio } from "./Repositorio.js";
class telaTermo {
    constructor(jogo) {
        this.maxCol = 5;
        this.maxRow = 5;
        this.celulas = [];
        this.coluna = 0;
        this.linha = 0;
        this.palavra = "";
        this.progresso = new Progresso(new Repositorio());
        this.jogo = jogo;
        this.atribuirEventos();
        this.pnlTermo = document.getElementById('pnlTermo');
        this.pnlConteudo = document.getElementById('pnlConteudo');
    }
    atribuirEventos() {
        this.btnEnter = document.getElementById('btnEnter');
        this.btnEnter.addEventListener('click', () => this.verificarJogada());
        this.btnBack = document.getElementById('btnBackspace');
        this.btnBack.addEventListener('click', () => this.corrigirInput());
        this.pnlTeclado = document.getElementById('pnlTeclado');
        for (let i = 0; i < this.pnlTeclado.children.length; i++) {
            const tecla = this.pnlTeclado.children.item(i);
            if (tecla.textContent != 'Enter' && tecla.id != 'btnBackspace')
                tecla.addEventListener('click', (sender) => this.atribuirLetra(sender));
        }
        this.btnHistorico = document.getElementById('btnHistorico');
        this.btnHistorico.addEventListener('click', () => this.obterProgresso());
    }
    corrigirInput() {
        if (this.coluna == 0)
            return;
        let quadro = this.celulas[this.coluna - 1];
        quadro.textContent = "";
        this.celulas.pop();
        this.coluna--;
        this.palavra = this.palavra.substring(0, this.palavra.length - 1);
    }
    verificarJogada() {
        if (this.palavra.length !== this.maxCol)
            return;
        this.colorirCelulas();
        if (this.jogo.acertou(this.palavra)) {
            this.enviarMensagem(true);
            this.salvarProgresso(true, this.linha);
        }
        this.linha++;
        if (this.linha === this.maxRow) {
            this.enviarMensagem(false);
            this.salvarProgresso(false);
        }
        this.limparDados();
    }
    colorirCelulas() {
        let resultados = this.jogo.verificarJogada(this.palavra);
        for (let i = 0; i <= this.palavra.length; i++) {
            switch (resultados[i]) {
                case resultado.Acerto:
                    this.celulas[i].style.backgroundColor = '#0fda0fb6';
                    break;
                case resultado.Erro:
                    this.celulas[i].style.backgroundColor = '#ffff00fa';
                    break;
                case resultado.Inexistente:
                    this.celulas[i].style.backgroundColor = '#e25858b3';
                    break;
            }
        }
    }
    atribuirLetra(sender) {
        if (this.palavra.length === this.maxCol)
            return;
        const casaJogada = this.pnlTermo
            .children[this.linha]
            .children[this.coluna];
        let button = sender.target;
        casaJogada.textContent = button.innerText;
        this.celulas.push(casaJogada);
        this.palavra += button.innerText;
        this.coluna++;
    }
    enviarMensagem(venceu) {
        let msg = this.gerarElementosMsgFinal();
        if (venceu) {
            msg.textContent = `Parabéns! Você acertou a palavra: ${this.jogo.getPalavra()}`;
        }
        else {
            msg.textContent = `Fim de Jogo! A palavra era: ${this.jogo.getPalavra()}`;
        }
    }
    gerarElementosMsgFinal() {
        this.removerMsgFinal();
        let div = document.createElement('div');
        div.id = "divMensagemFinal";
        div.classList.add('group-mensagem');
        this.pnlConteudo.appendChild(div);
        let spanMsg = document.createElement('span');
        div.appendChild(spanMsg);
        let button = document.createElement('button');
        button.classList.add('btn-reiniciar');
        button.id = "btnReiniciar";
        button.innerText = "Recomeçar";
        button.addEventListener('click', () => this.reiniciarJogo());
        div.appendChild(button);
        this.alterarStatusTeclado();
        return spanMsg;
    }
    alterarStatusTeclado() {
        for (let index = 0; index < this.pnlTeclado.children.length; index++) {
            let tecla = this.pnlTeclado.children[index];
            tecla.disabled = !tecla.disabled;
        }
    }
    limparDados() {
        this.coluna = 0;
        this.palavra = "";
        this.celulas = [];
    }
    reiniciarJogo() {
        this.limparDados();
        this.linha = 0;
        this.jogo = new jogo(new acervo());
        for (let i = 0; i < this.pnlTermo.children.length; i++) {
            const linha = this.pnlTermo.children.item(i);
            for (let index = 0; index < linha.children.length; index++) {
                const letra = linha.children.item(index);
                letra.style.backgroundColor = '#bebebe';
                letra.textContent = '';
            }
        }
        this.removerMsgFinal();
        this.alterarStatusTeclado();
    }
    removerMsgFinal() {
        const mensagemFinal = document.getElementById('divMensagemFinal');
        if (mensagemFinal) {
            this.pnlConteudo.removeChild(mensagemFinal);
        }
    }
    salvarProgresso(acertou, linha) {
        this.progresso.atualizarJogada(acertou, linha);
    }
    obterProgresso() {
        const progresso = this.progresso.obterDados();
        if (!progresso)
            return;
        console.clear();
        console.log(progresso);
        const valores = document.getElementById('valores');
        valores.children[0].textContent = progresso.jogos.toString();
        valores.children[1].textContent = progresso.porcentagemVitorias.toString() + "%";
        valores.children[2].textContent = progresso.sequenciaVitorias.toString();
        valores.children[3].textContent = progresso.melhorSequencia.toString();
        const historico = document.getElementById('historico');
        historico.children[1].lastChild.textContent = progresso.linhaDaJogada[0].toString();
        historico.children[2].lastChild.textContent = progresso.linhaDaJogada[1].toString();
        historico.children[3].lastChild.textContent = progresso.linhaDaJogada[2].toString();
        historico.children[4].lastChild.textContent = progresso.linhaDaJogada[3].toString();
        historico.children[5].lastChild.textContent = progresso.linhaDaJogada[4].toString();
        historico.children[6].lastChild.textContent = progresso.erros.toString();
    }
}
window.addEventListener("load", () => new telaTermo(new jogo(new acervo())));
//# sourceMappingURL=tela-termo.js.map