export class Repositorio {
    constructor() {
        this.key = 'jogoTermo:progresso';
    }
    salvarDados(progresso) {
        const progressoEmString = JSON.stringify(progresso);
        localStorage.setItem(this.key, progressoEmString);
    }
    obterDados() {
        const dados = localStorage.getItem(this.key);
        let progresso;
        if (dados) {
            progresso = JSON.parse(dados);
        }
        return progresso;
    }
}
//# sourceMappingURL=repositorio-termo.js.map