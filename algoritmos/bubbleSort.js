//implementação do bubble sort

export async function bubbleSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista) {
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras

    for (let i = 0; i < lista.length - 1 && estado.estaOrdenando; i++) {
        for (let j = 0; j < lista.length - i - 1 && estado.estaOrdenando; j++) { // verifica-se a lista duplamente para verificar a ordenação
            
            if (!estado.estaOrdenando) return; // se o botão de parar for clicado, para a ordenação

            while(estado.estaPausado){
                await new Promise(resolve => setTimeout(resolve, 100)); // pausa a ordenação
                if (!estado.estaOrdenando) return;
            }
            barras[j].classList.add('ativo'); // troca a cor da barra atual e a posterior para demonstrar que estão sendo comparadas
            barras[j + 1].classList.add('ativo');

            if (lista[j] > lista[j + 1]) { //caso o elemento atual seja maior que o próximo
                trocar(j, j + 1); // troca-se de lugar o elemento atual pelo próximo
                atualizarPassos();// incrementa-se o contador de passos
                await new Promise(resolve => setTimeout(resolve, getDuracaoPasso())); // atrasa a visualização na velocidade escolhida
                mostrarLista(); // exibe a lista após realizar a troca

                const barrasAtualizadas = document.querySelectorAll('.barra'); // atualiza as barras após a troca
                barrasAtualizadas[j].classList.add('ativo');
                barrasAtualizadas[j + 1].classList.add('ativo');

                await new Promise(resolve => setTimeout(resolve, getDuracaoPasso() / 2));
                barrasAtualizadas[j].classList.remove('ativo');
                barrasAtualizadas[j + 1].classList.remove('ativo');
            } else {
                //remove a cor da barra a qual foi efetuada a comparação
                barras[j].classList.remove('ativo');
                barras[j + 1].classList.remove('ativo');
            }
        }
    }
}