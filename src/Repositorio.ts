import { IProgresso } from "./IProgresso";

export class Repositorio {


    public obterDados(): IProgresso {

        const dados = window.localStorage.getItem('progresso');

        let progresso;

        if (dados) {
            progresso = JSON.parse(dados) as IProgresso;
        }

        return progresso!;
    }

    public salvarDados(progresso: IProgresso): void {

        const progressoEmString = JSON.stringify(progresso);

        window.localStorage.setItem('progresso', progressoEmString);
    }

}
