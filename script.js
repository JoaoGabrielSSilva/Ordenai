const containerLista = document.getElementById('container-lista');
var duracaoPasso = 500;
let lista = [];

function gerarListaAleatoria(tamanho) {
    lista = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100) + 1);
    mostrarLista();
}

function mostrarLista() {
    containerLista.innerHTML = '';
    lista.forEach((value) => {
        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = `${value * 3}px`; // Scale value to fit container height
        containerLista.appendChild(barra);
    });
}

function trocar(i, j) {
    [lista[i], lista[j]] = [lista[j], lista[i]];
}

async function bubbleSort() {
    const barras = document.querySelectorAll('.barra');
    for (let i = 0; i < lista.length - 1; i++) {
        for (let j = 0; j < lista.length - i - 1; j++) {
            barras[j].classList.add('ativo');
            barras[j + 1].classList.add('ativo');

            if (lista[j] > lista[j + 1]) {
                trocar(j, j + 1);
                await new Promise(resolve => setTimeout(resolve, duracaoPasso)); // Delay for visualization
                mostrarLista();
            }

            barras[j].classList.remove('ativo');
            barras[j + 1].classList.remove('ativo');
        }
    }
}

async function bogoSort(){

}

function iniciarOrdenacao() {
    var tipoOrdenacao = document.getElementById("selec-algoritmos")
    switch (tipoOrdenacao.options[tipoOrdenacao.selectedIndex].text){
        case 'bubbleSort':
            bubbleSort();
        case 'bogoSort':
            bogoSort();
        default:
            break;
    }
    
}

function resetarLista() {
    gerarListaAleatoria(10);
}

// Initial array setup
gerarListaAleatoria(10);
