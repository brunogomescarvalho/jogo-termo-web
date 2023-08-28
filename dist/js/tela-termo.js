import { acervo } from "./acervo-termo.js";
import { jogo, resultado } from "./jogo-termo.js";
import { Progresso } from "./progresso-termo.js";
import { Repositorio } from "./repositorio-termo.js";
class telaTermo {
    constructor(jogo, progresso) {
        this.jogo = jogo;
        this.progresso = progresso;
        this.letras = [];
        this.maxCol = 5;
        this.maxRow = 5;
        this.coluna = 0;
        this.linha = 0;
        this.palavra = "";
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
    atribuirLetra(sender) {
        if (this.palavra.length === this.maxCol)
            return;
        const tbLetra = this.pnlTermo
            .children[this.linha]
            .children[this.coluna];
        let letra = sender.target;
        tbLetra.textContent = letra.innerText;
        this.palavra += letra.innerText;
        this.letras.push(tbLetra);
        this.coluna++;
    }
    verificarJogada() {
        if (this.palavra.length !== this.maxCol)
            return;
        this.colorirletras();
        if (this.jogo.acertou(this.palavra)) {
            this.enviarMensagem(true);
            this.salvarProgresso(true, this.linha);
        }
        else {
            this.linha++;
            if (this.linha === this.maxRow) {
                this.enviarMensagem(false);
                this.salvarProgresso(false);
            }
        }
        this.limparDados();
    }
    colorirletras() {
        let resultados = this.jogo.verificarJogada(this.palavra);
        for (let i = 0; i <= this.palavra.length; i++) {
            switch (resultados[i]) {
                case resultado.Acerto:
                    this.letras[i].classList.add('letra-correta');
                    break;
                case resultado.Erro:
                    this.letras[i].classList.add('letra-incorreta');
                    break;
                case resultado.Inexistente:
                    this.letras[i].classList.add('letra-inexistente');
                    break;
            }
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
    enviarMensagem(venceu) {
        let msg = this.gerarElementosMsgFinal();
        if (venceu) {
            msg.textContent = `Parabéns! Você acertou a palavra: ${this.jogo.getPalavra()}`;
        }
        else {
            msg.textContent = `Fim de Jogo! A palavra era: ${this.jogo.getPalavra()}`;
        }
    }
    corrigirInput() {
        if (this.coluna == 0)
            return;
        let letra = this.letras[this.coluna - 1];
        letra.textContent = "";
        this.letras.pop();
        this.coluna--;
        this.palavra = this.palavra.substring(0, this.palavra.length - 1);
    }
    reiniciarJogo() {
        this.limparDados();
        this.linha = 0;
        this.jogo = new jogo(new acervo());
        this.limparQuadros();
        this.removerMsgFinal();
        this.alterarStatusTeclado();
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
        this.letras = [];
    }
    removerMsgFinal() {
        const mensagemFinal = document.getElementById('divMensagemFinal');
        if (mensagemFinal) {
            this.pnlConteudo.removeChild(mensagemFinal);
        }
    }
    limparQuadros() {
        for (let i = 0; i < this.pnlTermo.children.length; i++) {
            const linha = this.pnlTermo.children.item(i);
            for (let index = 0; index < linha.children.length; index++) {
                const letra = linha.children.item(index);
                letra.classList.remove('letra-correta', 'letra-incorreta', 'letra-inexistente');
                letra.textContent = '';
            }
        }
    }
    salvarProgresso(acertou, linha) {
        this.progresso.atualizarJogada(acertou, linha);
    }
    obterProgresso() {
        const progresso = this.progresso.obterDados();
        if (!progresso)
            return;
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
window.addEventListener("load", () => new telaTermo(new jogo(new acervo()), new Progresso(new Repositorio())));
//# sourceMappingURL=tela-termo.js.map