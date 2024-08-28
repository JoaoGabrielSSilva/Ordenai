const containerLista = document.getElementById('container-lista');
var duracaoPasso = 50;
let lista = [];
let passos = 0;
let quantElementos = 4

function atualizarPassos(){
    passos = passos + 1
    const contadorPassos = document.getElementById('contador-passos')
    contadorPassos.innerHTML = "Passos: " + passos;
}

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
                atualizarPassos()
                await new Promise(resolve => setTimeout(resolve, duracaoPasso)); // Delay for visualization
                mostrarLista();
            }

            barras[j].classList.remove('ativo');
            barras[j + 1].classList.remove('ativo');
        }
    }
}

async function bogoSort(){
    const barras = document.querySelectorAll('.barra');
    
    function estaOrdenada(){
        for (let i = 0; i < lista.length - 1; i++){
            if (lista[i] > lista[i + 1]){
                return false
            }
        }
        return true
    }

    function embaralhar(){
        for (let i = lista.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            trocar(i, j);
        }
    }

    while (!estaOrdenada()){
        embaralhar();
        atualizarPassos()
        await new Promise(resolve => setTimeout(resolve, duracaoPasso)); // Delay for visualization
        mostrarLista();

        for (let i = 0; i < lista.length; i++) {
            barras[i].classList.add('ativo');
        }
        await new Promise(resolve => setTimeout(resolve, duracaoPasso));
        for (let i = 0; i < lista.length; i++) {
            barras[i].classList.remove('ativo');
        }
    }
}

function iniciarOrdenacao() {
    var tipoOrdenacao = document.getElementById("selec-algoritmos")
    switch (tipoOrdenacao.options[tipoOrdenacao.selectedIndex].text){
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'bogoSort':
            bogoSort();
            break;
        default:
            break;
    }
    
}

function resetarLista() {
    gerarListaAleatoria(quantElementos);
    passos = 0
}

// Initial array setup
gerarListaAleatoria(quantElementos);