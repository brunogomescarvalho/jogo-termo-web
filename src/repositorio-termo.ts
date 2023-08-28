import { IProgresso } from "./IProgresso";

export class Repositorio {

    private key: string = 'jogoTermo:progresso';

    public salvarDados(progresso: IProgresso): void {

        const progressoEmString = JSON.stringify(progresso);

        localStorage.setItem(this.key, progressoEmString);
    }

    public obterDados(): IProgresso {

        const dados = localStorage.getItem(this.key);

        let progresso;

        if (dados) {
            progresso = JSON.parse(dados) as IProgresso;
        }

        return progresso!;
    }

}
