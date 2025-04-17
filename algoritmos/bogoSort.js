//implementação do bogo sort
export async function bogoSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista){
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras
    
    //Verifica se a lista está ordenada
    function estaOrdenada(){
        for (let i = 0; i < lista.length - 1; i++){ //para cada elemento da lista
            if (lista[i] > lista[i + 1]){ //se o elemento atual for maior que o próximo elemento
                return false;// a lista não está ordenada
            }
        }
        return true;// caso a lista esteja ordenada, retorna verdadeiro
    }

    //função que embaralha a lista aleatoriamente
    function embaralhar(){
        for (let i = lista.length - 1; i > 0; i--){ //para cada elemento da lista
            const j = Math.floor(Math.random() * (i + 1));// em uma variável auxiliar, gera-se uma nova posição para o elemento atual
            trocar(i, j);//realiza a troca do elemento atual para a nova posição
        }
    }

    while (!estaOrdenada() && estado.estaOrdenando){// enquanto a lista não está ordenada

        while (estado.estaPausado) {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (!estado.estaOrdenando) return;
        }

        embaralhar();// embaralha os elementos novamente
        mostrarLista();// exibe a lista após embaralhar

        const barrasAtuais = document.querySelectorAll('.barra');

        for (let i = 0; i < lista.length; i++) {// adiciona a cor para os elementos que estão selecionados atualmente
            barrasAtuais[i].classList.add('ativo');
        }

        atualizarPassos()// incrementa o contador de passos

        await new Promise(resolve => setTimeout(resolve, getDuracaoPasso()));

        for (let i = 0; i < lista.length; i++) {// retorna a cor original das barras
            barras[i].classList.remove('ativo');
        }

        if (!estado.estaOrdenando) break;
        
    }
    
    if(estaOrdenada){
        for (let i = 0; i < lista.length; i++) {// retorna a cor original das barras
            barras[i].classList.remove('ativo');
        }
        mostrarLista();
    }
    
    
}