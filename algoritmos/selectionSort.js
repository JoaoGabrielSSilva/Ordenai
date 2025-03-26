//implementação do selection sort

export async function selectionSort(lista, estado, duracaoPasso, trocar, atualizarPassos, mostrarLista) {
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras

    for (let i = 0; i < lista.length - 1 && estado.estaOrdenando; i++) {
        let minIndex = i; // define-se o índice do menor valor como o atual
        barras[i].classList.add('chave'); // troca a cor da barra atual para demonstrar que está sendo comparada

        for (let j = i + 1; j < lista.length && estado.estaOrdenando; j++) { // verifica-se a lista a partir do elemento atual

            const barrasAtuais = document.querySelectorAll('.barra');
            barrasAtuais[i].classList.add('chave');
            barrasAtuais[j].classList.add('ativo');

            if (lista[j] < lista[minIndex]) { // caso o elemento atual seja menor que o menor valor encontrado até o momento
                barras[minIndex].classList.remove('ativo'); // remove-se a cor da barra anterior que era a chave
                minIndex = j; // atualiza-se o índice do menor valor
                barras[minIndex].classList.add('ativo'); // troca a cor da barra atual para demonstrar que está sendo comparada
            }

            await new Promise(resolve => setTimeout(resolve, duracaoPasso)); 
            if(j !== minIndex){
                barras[j].classList.remove('ativo'); // remove-se a cor da barra anterior que era a chave
            }
        }

        if (minIndex !== i) { // caso o menor valor encontrado não seja o atual
            trocar(i, minIndex); // troca-se de lugar o elemento atual pelo menor valor encontrado
            atualizarPassos(); // incrementa-se o contador de passos
            
            mostrarLista(); // exibe a lista após realizar a troca
            
            const barrasAtualizadas = document.querySelectorAll('.barra'); // atualiza as barras após a troca
            barrasAtualizadas[i].classList.add('chave');
            barrasAtualizadas[minIndex].classList.add('ativo');
            await new Promise(resolve => setTimeout(resolve, duracaoPasso)); // atrasa a visualização na velocidade escolhida
        }

        const barrasAtuais = document.querySelectorAll('.barra');
        barrasAtuais[i].classList.remove('chave');
        if(minIndex !== i){
            barrasAtuais[minIndex].classList.remove('ativo');
        }
    }

    const barrasFinais = document.querySelectorAll('.barra');
    barrasFinais.forEach(barra => {
        barra.classList.remove('ativo');
        barra.classList.remove('chave');
    });
}