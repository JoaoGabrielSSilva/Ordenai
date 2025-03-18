//implementação do insertion sort

export async function insertionSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista) {
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras

    for (let i = 1; i  < lista.length && estado.estaOrdenando; i++) { // percorre-se a lista
        let chave = lista[i]; // define-se a chave como o elemento atual
        let j = i - 1; // define-se j como o elemento anterior a chave

        while (j >= 0 && lista[j] > chave) { // enquanto j for maior ou igual a 0 e o elemento anterior a chave for maior que a chave
            lista[j + 1] = lista[j]; // o elemento anterior a chave é colocado na posição da chave
            j--; // decrementa-se j
        }
        lista[j + 1] = chave; // a chave é colocado na posição correta
    }
}