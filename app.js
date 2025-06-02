// Importando as funções dos diferentes algoritmos de ordenação
import { bubbleSort } from "./algoritmos/bubbleSort.js";
import { bogoSort } from "./algoritmos/bogoSort.js";
import { insertionSort } from "./algoritmos/insertionSort.js";
import { mergeSort } from "./algoritmos/mergeSort.js";
import { quickSort } from "./algoritmos/quickSort.js";
import { selectionSort } from "./algoritmos/selectionSort.js";

// Pegando os elementos do DOM que serão manipulados
const containerLista = document.getElementById('container-lista'); // Local onde as barras são exibidas
const contadorPassos = document.getElementById('contador-passos'); // Contador de passos realizados
const botoesQuantidade = document.querySelectorAll('.modificador-quantidade .btn'); // Botões para definir quantos elementos terá a lista
const botoesVelocidade = document.querySelectorAll('.modificador-velocidade .btn'); // Botões para ajustar a velocidade da ordenação
const seletorAlgoritmos = document.getElementById('selec-algoritmos'); // Seletor do algoritmo de ordenação

// Estado do programa: indica se está ordenando ou pausado
const estado = {
    estaOrdenando: false,
    estaPausado: false
};

let duracaoPasso = 500; // Tempo (em ms) entre cada passo da ordenação
let lista = []; // Lista principal de números a ser ordenada
let listaAtual = []; // Cópia da lista original para reiniciar quando necessário
let passos = 0; // Contador de passos realizados durante a ordenação
let quantElementos = 5; // Quantidade de elementos na lista (padrão inicial)

//----------------------------------------------------------------------------------------
// Função relacionada à seleção da quantidade de elementos
botoesQuantidade.forEach(botao => {
    botao.addEventListener('click', function() {
        const quantidade = parseInt(this.textContent);
        atualizarQuantidade(quantidade); // Atualiza a quantidade e gera nova lista
    });
});

function atualizarQuantidade(quantidade) {
    estado.estaOrdenando = false;
    estado.estaPausado = false;
    seletorAlgoritmos.disabled = false;

    setTimeout(() => {
        quantElementos = quantidade;
        gerarListaAleatoria(quantElementos); // Gera uma nova lista com a nova quantidade
        passos = 0;
        contadorPassos.innerHTML = "Passos: " + passos;

        const botaoIniciarPausa = document.getElementById('botaoIniciarPausa');
        botaoIniciarPausa.textContent = '▶';
    }, 100);

}

//----------------------------------------------------------------------------------------
// Funções relacionadas à velocidade de execução
botoesVelocidade.forEach(botao => {
    botao.addEventListener('click', function() {
        if (this.id !== 'botao-pausa') {
            const velocidade = parseFloat(this.textContent.replace('x', ''));
            atualizarVelocidade(velocidade); // Ajusta a velocidade de execução
        }
    });
});

function getDuracaoPasso() {
    return duracaoPasso;
}

function atualizarVelocidade(velocidade) {
    duracaoPasso = 500 / velocidade; // Quanto maior a velocidade, menor a duração do passo
}

//----------------------------------------------------------------------------------------
// Funções relacionadas aos algoritmos de ordenação
function trocar(i, j) {
    [lista[i], lista[j]] = [lista[j], lista[i]]; // Troca dois elementos na lista
    mostrarLista(); // Atualiza a exibição visual
}


// Função chamada ao clicar no botão de iniciar/pausar a ordenação
export function iniciarOrdenacao() {
    const botaoIniciarPausa = document.getElementById('botaoIniciarPausa');
    if (!estado.estaOrdenando) {
        var tipoOrdenacao = document.getElementById("selec-algoritmos");
        if (!tipoOrdenacao.value) return;
        estado.estaOrdenando = true;
        estado.estaPausado = false;
        seletorAlgoritmos.disabled = true; // Impede mudanças durante a execução
        botaoIniciarPausa.textContent = '❚❚'; // Muda ícone para pause

        // Executa o algoritmo selecionado
        switch (tipoOrdenacao.options[tipoOrdenacao.selectedIndex].text) {
            case 'Bubble Sort':
                bubbleSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista);
                break;
            case 'Quick Sort':
                quickSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista);
                break;
            case 'Merge Sort':
                mergeSort(lista, estado, getDuracaoPasso, atualizarPassos, mostrarLista);
                break;
            case 'Selection Sort':
                selectionSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista);
                break;
            case 'Insertion Sort':
                insertionSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista);
                break;
            case 'Bogo Sort':
                bogoSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos, mostrarLista);
                break;
            default:
                break;
        }
    } else {
        // Pausa ou retoma a execução
        estado.estaPausado = !estado.estaPausado;
        botaoIniciarPausa.textContent = estado.estaPausado ? '▶' : '❚❚';
    }
}

//----------------------------------------------------------------------------------------
// Funções auxiliares do sistema

// Adiciona 1 ao contador de passos e atualiza a interface
function atualizarPassos() {
    passos += 1;
    contadorPassos.innerHTML = "Passos: " + passos;
}

// Gera uma lista aleatória com valores entre 1 e 100
function gerarListaAleatoria(tamanho) {
    seletorAlgoritmos.disabled = false;
    lista = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100) + 1);
    listaAtual = Array.from(lista); // Salva cópia para reiniciar depois
    mostrarLista();
}

// Exibe a lista como barras verticais no HTML
function mostrarLista() {
    const barrasAtivas = document.querySelectorAll('.barra.ativo');
    barrasAtivas.forEach(barra => barra.classList.remove('ativo'));

    containerLista.innerHTML = ''; // Limpa o conteúdo anterior

    lista.forEach((valor) => {
        const barraContainer = document.createElement('div');
        barraContainer.className = 'barra-container';

        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = `${valor * 3}px`; // Define altura proporcional ao valor

        const valorTexto = document.createElement('span');
        valorTexto.className = 'valor-barra';
        valorTexto.textContent = valor;

        barraContainer.appendChild(barra);
        barraContainer.appendChild(valorTexto);

        containerLista.appendChild(barraContainer);
    });
}

// Gera uma nova lista aleatória (chamada ao clicar no botão de "Gerar")
export async function gerarLista() {
    estado.estaOrdenando = false;
    await new Promise(resolve => setTimeout(resolve, duracaoPasso));
    containerLista.innerHTML = '';
    gerarListaAleatoria(quantElementos);
    passos = 0;
    contadorPassos.innerHTML = "Passos: " + passos;

    const botaoIniciarPausa = document.getElementById('botaoIniciarPausa');
    botaoIniciarPausa.textContent = '▶';
}

// Reinicia a lista para o estado original (chamada ao clicar em "Reiniciar")
export function reiniciarLista() {
    estado.estaOrdenando = false;
    seletorAlgoritmos.disabled = false;
    setTimeout(() => {
        lista = Array.from(listaAtual); // Restaura a cópia salva
        mostrarLista();
        passos = 0;
        contadorPassos.innerHTML = "Passos: " + passos;
    
        const botaoIniciarPausa = document.getElementById('botaoIniciarPausa');
        botaoIniciarPausa.textContent = '▶';
    }, 100);
}

// Mostra a explicação do algoritmo selecionado quando muda o seletor
document.getElementById('selec-algoritmos').addEventListener('change', function() {
    const elementoTooltip = document.querySelector('.botao-duvida');
    const explicacoes = {
        bubbleSort: "Este algoritmo compara pares adjacentes e troca-os se estiverem fora de ordem, empurrando o maior elemento para o final.",
        quickSort: "Escolhe um pivô e divide a lista em menores e maiores que ele, ordenando recursivamente as partes.",
        mergeSort: "Divide a lista até ficar com listas unitárias e depois vai mesclando-as mantendo a ordem.",
        selectionSort: "Seleciona o menor elemento restante e o coloca na posição correta, repetindo até ordenar tudo.",
        insertionSort: "Insere cada elemento na posição correta dentro da parte já ordenada da lista.",
        bogoSort: "Embaralha a lista repetidamente até que acidentalmente fique ordenada. Ineficiente, mas engraçado."
    };
    elementoTooltip.setAttribute('data-tooltip', explicacoes[this.value] || 'Selecione um algoritmo para ver sua explicação');
});

// Gera uma lista inicial ao carregar o programa
gerarListaAleatoria(quantElementos);