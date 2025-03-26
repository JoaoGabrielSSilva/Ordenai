//implementação do insertion sort

export async function insertionSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista) {
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras

    for (let i = 1; i  < lista.length && estado.estaOrdenando; i++) { // percorre-se a lista
        let chave = lista[i]; // define-se a chave como o elemento atual
        let j = i - 1; // define-se j como o elemento anterior a chave

        barras.forEach(barra => barra.classList.remove('ativo')); // remove-se a classe ativo de todas as barras anteriores
        barras[i].classList.add('chave'); // adiciona-se a classe ativo à barra atual

        while (j >= 0 && lista[j] > chave && estado.estaOrdenando) { // enquanto j for maior ou igual a 0 e o elemento anterior a chave for maior que a chave
            barras[j].classList.add('ativo'); // adiciona-se a classe ativo à barra atual
            trocar(j, j + 1)// o elemento anterior a chave é colocado na posição da chave
            atualizarPassos();
            await new Promise(resolve => setTimeout(resolve, duracaoPasso));
            mostrarLista();

            const barrasAtualizadas = document.querySelectorAll('.barra'); // atualiza-se as barras
            barrasAtualizadas[j + 1].classList.add('chave');

            if (j >= 0){
                barrasAtualizadas[j].classList.add('ativo');
            }

            j--; // decrementa-se j
        }

        lista[j + 1] = chave; // a chave é colocado na posição correta

        await new Promise(resolve => setTimeout(resolve, duracaoPasso));
        mostrarLista();
    }

    const barrasFinais = document.querySelectorAll('.barra');
    barrasFinais.forEach(barra => {
        barra.classList.remove('ativo');
        barra.classList.remove('chave');
    });
}