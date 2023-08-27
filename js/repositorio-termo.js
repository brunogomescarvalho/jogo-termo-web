export class Repositorio {
    salvarDados(progresso) {
        const progressoEmString = JSON.stringify(progresso);
        window.localStorage.setItem('progresso', progressoEmString);
    }
    obterDados() {
        const dados = window.localStorage.getItem('progresso');
        let progresso;
        if (dados) {
            progresso = JSON.parse(dados);
        }
        return progresso;
    }
}
//# sourceMappingURL=repositorio-termo.js.map