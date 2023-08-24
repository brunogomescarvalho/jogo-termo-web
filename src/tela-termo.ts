import { acervo } from "./acervo-termo.js";
import { jogo, resultado } from "./jogo-termo.js";

class telaTermo {
    maxCol: number = 5;
    maxRow: number = 5;
    celulas: HTMLElement[] = [];
    pnlTeclado: HTMLElement;
    btnEnter: HTMLButtonElement;
    pnlConteudo: HTMLElement;
    pnlTermo: HTMLElement;
    coluna: number = 0;
    linha: number = 0;
    palavra: string = "";
    jogo: jogo;


    constructor(jogo: jogo) {
        this.jogo = jogo;
        this.atribuirEventos();
        this.pnlTermo = document.getElementById('pnlTermo') as HTMLElement;
        this.pnlConteudo = document.getElementById('pnlConteudo') as HTMLElement;
    }

    private atribuirEventos() {
        this.btnEnter = document.getElementById('btnEnter') as HTMLButtonElement;
        this.btnEnter.addEventListener('click', () => this.verificarJogada());

        this.pnlTeclado = document.getElementById('pnlTeclado') as HTMLElement;

        for (let i = 0; i < this.pnlTeclado.children.length; i++) {
            const tecla = this.pnlTeclado.children.item(i) as HTMLButtonElement;
            if (tecla.textContent != 'Enter')
                tecla.addEventListener('click', (sender) => this.atribuirLetra(sender));
        }
    }

    private verificarJogada(): void {
        if (this.palavra.length !== this.maxCol)
            return;

        this.colorirCelulas();

        if (this.jogo.acertou(this.palavra))
            this.enviarMensagem(true);

        this.linha++;

        if (this.linha === this.maxRow) {
            this.enviarMensagem(false);
        }

        this.limparDados();
    }


    private colorirCelulas() {
        let resultados: resultado[] = this.jogo.verificarJogada(this.palavra);

        for (let i = 0; i <= this.palavra.length; i++) {
            switch (resultados[i]) {
                case resultado.Acerto:
                    this.celulas[i].style.backgroundColor = '#0fda0fb6'
                    break;
                case resultado.Erro:
                    this.celulas[i].style.backgroundColor = '#ffff00ba '
                    break;
                case resultado.Inexistente:
                    this.celulas[i].style.backgroundColor = '#e25858b3'
                    break;
            }
        }
    }

    private atribuirLetra(sender: Event): void {
        if (this.palavra.length === this.maxCol)
            return;

        const casaJogada = this.pnlTermo
            .children[this.linha]
            .children[this.coluna] as HTMLElement;

        let button = sender.target as (HTMLButtonElement);
        casaJogada.textContent = button.innerText;
        this.celulas.push(casaJogada);
        this.palavra += button.innerText;
        this.coluna++;
    }

    private enviarMensagem(venceu: boolean) {
        let msg = this.gerarElementosMsgFinal();

        if (venceu) {
            msg.textContent = `Parabéns! Você acertou a palavra: ${this.jogo.getPalavra()}`
        }
        else {
            msg.textContent = `Fim de Jogo! A palavra era: ${this.jogo.getPalavra()}`
        }
    }

    private gerarElementosMsgFinal(): HTMLSpanElement {

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

        return spanMsg;
    }

    private limparDados() {
        this.coluna = 0;
        this.palavra = "";
        this.celulas = [];
    }

    private reiniciarJogo() {
        this.limparDados();
        this.linha = 0;

        this.jogo = new jogo(new acervo());

        for (let i = 0; i < this.pnlTermo.children.length; i++) {
            const linha = this.pnlTermo.children.item(i) as HTMLElement;
            for (let index = 0; index < linha.children.length; index++) {
                const letra = linha.children.item(index) as HTMLElement;
                letra.style.backgroundColor = '#bebebe';
                letra.textContent = '';
            }
        }
        const mensagemFinal = document.getElementById('divMensagemFinal');
        if (mensagemFinal) {
            this.pnlConteudo.removeChild(mensagemFinal);
        }
    }
}

window.addEventListener("load", () => new telaTermo(new jogo(new acervo())));