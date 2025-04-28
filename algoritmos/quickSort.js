//implementação do quick sort

export async function quickSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista) {
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras

    async function particao(baixa, alta) {
        const pivot = lista[alta]; // define o pivô 
        barras[alta].classList.add('chave'); // adiciona a classe 'chave' à barra do pivô

        let i = baixa - 1;

        for(let j = baixa; j <= alta && estado.estaOrdenando; j++) {

            while (estado.estaPausado) {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (!estado.estaOrdenando) return;
            }

            barras[j].classList.add('ativo'); // adiciona a classe 'ativo' à barra atual
            if(lista[j] < pivot) {
                i++;
                trocar(i, j);
                atualizarPassos();

                await new Promise(resolve => setTimeout(resolve, getDuracaoPasso()));
                mostrarLista();

                const barrasAtualizadas = document.querySelectorAll('.barra');
                barrasAtualizadas[alta].classList.add('chave');
            }

            barras[j].classList.remove('ativo'); // remove a classe 'ativo' da barra atual
        }

        trocar(i + 1, alta);
        atualizarPassos();

        await new Promise(resolve => setTimeout(resolve, getDuracaoPasso()));
        mostrarLista();

        return i + 1;
    }

    async function quickSortRecursivo(baixa, alta) {
        if(baixa < alta && estado.estaOrdenando) {
            const pivo = await particao(baixa, alta);
            await quickSortRecursivo(baixa, pivo - 1);
            await quickSortRecursivo(pivo + 1, alta);
        }
    }

    await quickSortRecursivo(0, lista.length - 1);

    const barrasFinais = document.querySelectorAll('.barra');
    barrasFinais.forEach(barra => {
        barra.classList.remove('ativo');
        barra.classList.remove('chave');
    });
}