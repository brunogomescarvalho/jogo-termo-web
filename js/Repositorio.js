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
//# sourceMappingURL=Repositorio.js.map