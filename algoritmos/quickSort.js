//implementação do quick sort

export async function quickSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista) {

    async function particao(baixa, alta) {
        const pivot = lista[alta]; // define o pivô 
        const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras
        barras[alta].classList.add('chave'); // adiciona a classe 'chave' à barra do pivô

        let i = baixa - 1;

        for(let j = baixa; j <= alta && estado.estaOrdenando; j++) {

            while (estado.estaPausado) {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (!estado.estaOrdenando) return;
            }

            const barrasAtuais = document.querySelectorAll('.barra');
            barrasAtuais[j].classList.add('ativo'); 
            await new Promise(resolve => setTimeout(resolve, getDuracaoPasso()));
            if(lista[j] < pivot) {
                i++;
                barrasAtuais[i].classList.add('ativo');

                await new Promise(resolve => setTimeout(resolve, getDuracaoPasso() / 2)); 
                trocar(i, j);
                atualizarPassos();
                mostrarLista();

                const barrasPos = document.querySelectorAll('.barra');
                barrasPos[alta].classList.add('chave');
                barrasPos[i].classList.add('ativo');
                barrasPos[j].classList.add('ativo');
            }

            const barrasLimpar = document.querySelectorAll('.barra');
            barrasLimpar[j].classList.remove('ativo');
            if (i >= baixa) barrasLimpar[i].classList.remove('ativo');

        }

        const barrasFinal = document.querySelectorAll('.barra');
        barrasFinal[i + 1].classList.add('ativo');
        barrasFinal[alta].classList.add('ativo');

        trocar(i + 1, alta);
        atualizarPassos();
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

    estado.estaOrdenando = false;
}