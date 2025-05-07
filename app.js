import { bubbleSort } from "./algoritmos/bubbleSort.js";
import { bogoSort } from "./algoritmos/bogoSort.js";
import { insertionSort } from "./algoritmos/insertionSort.js";
import { mergeSort } from "./algoritmos/mergeSort.js";
import { quickSort } from "./algoritmos/quickSort.js";
import { selectionSort } from "./algoritmos/selectionSort.js";

//definição das variáveis
const containerLista = document.getElementById('container-lista'); //recebendo o elemento que exibe as barras da lista
const contadorPassos = document.getElementById('contador-passos')  //recebendo o elemento que exibe a contagem de passos

const botoesQuantidade = document.querySelectorAll('.modificador-quantidade-box .btn');

const botoesVelocidade = document.querySelectorAll('.modificador-velocidade-box .btn');

const seletorAlgoritmos = document.getElementById('selec-algoritmos');

const estado = {
    estaOrdenando: false,
    estaPausado: false
}

let duracaoPasso = 500; //duração do passo (1000 = 1 segundo)
let lista = []; // inicializando a lista
let listaAtual = []; // utilizado para armazenar a lista atual para reiniciar
let passos = 0; // inicializando o contador de passos
let quantElementos = 5; // define a quantidade de elementos a serem ordenados

//----------------------------------------------------------------------------------------
//Funções relacionadas com quantidade de elementos

botoesQuantidade.forEach(botao => {
    botao.addEventListener('click', function() {
      const quantidade = parseInt(this.textContent);
      atualizarQuantidade(quantidade);
    });
});

function atualizarQuantidade(quantidade){
    quantElementos = quantidade;
    gerarListaAleatoria(quantElementos);

    passos = 0;
    contadorPassos.innerHTML = "Passos: " + passos; // atualiza o contador de passos
    estado.estaOrdenando = false;
    console.log(quantElementos)
}

//----------------------------------------------------------------------------------------
//Funções relacionadas com velocidade de ordenação

botoesVelocidade.forEach(botao => {
    botao.addEventListener('click', function() {
      if (this.id !== 'botao-pausa'){
        const velocidade = parseFloat(this.textContent.replace('x', ''));
        atualizarVelocidade(velocidade);
      }
    });
});

function getDuracaoPasso(){
    return duracaoPasso;
}

function atualizarVelocidade(velocidade){
    duracaoPasso = 500 / velocidade;
    if (estado.estaPausado === true){
        alternarPausa()
    }
    console.log(duracaoPasso)    
}

//----------------------------------------------------------------------------------------
//Funções relacionadas com as ordenações

//função para realizar trocas em diferentes algoritmos de ordenação
function trocar(i, j) {
    [lista[i], lista[j]] = [lista[j], lista[i]];
    mostrarLista();
}


//função que inicia a ordenação ao clicar no botão
export function iniciarOrdenacao() {
    var tipoOrdenacao = document.getElementById("selec-algoritmos"); //recebe o tipo de algoritmo escolhido
    if (!tipoOrdenacao.value) return;

    estado.estaOrdenando = true;
    seletorAlgoritmos.disabled = true; //Desabilita a seleção de algoritmos até que a ordenação atual tenha terminado

    switch (tipoOrdenacao.options[tipoOrdenacao.selectedIndex].text){// verifica qual foi o algoritmo escolhido e realiza a ordenação de acordo com o tipo escolhido
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
    
}

//----------------------------------------------------------------------------------------
// Funções relacionadas com a aplicação

// função que adiciona um passo de acordo com cada ordenação
function atualizarPassos(){
    passos = passos + 1; // adiciona um passo
    contadorPassos.innerHTML = "Passos: " + passos; // atualiza o contador de passos
}

//função que gera uma lista aleatória
function gerarListaAleatoria(tamanho) {
    seletorAlgoritmos.disabled = false;

    lista = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100) + 1); //gera uma lista com barras de tamanho entre 1 a 300
    listaAtual = Array.from(lista); // cria uma cópia da lista atual para reset
    mostrarLista(); // exibe a lista gerada

}

//função para exibir a lista 
function mostrarLista() {
    const barrasAtivas = document.querySelectorAll('.barra.ativo');
    barrasAtivas.forEach(barra => barra.classList.remove('ativo'));

    containerLista.innerHTML = '';
    lista.forEach((valor) => {
        const barraContainer = document.createElement('div');
        barraContainer.className = 'barra-container';

        const barra = document.createElement('div');
        barra.className = 'barra';
        barra.style.height = `${valor * 3}px`;

        const valorTexto = document.createElement('span');
        valorTexto.className = 'valor-barra';
        valorTexto.textContent = valor;

        barraContainer.appendChild(barra);
        barraContainer.appendChild(valorTexto);
        containerLista.appendChild(barraContainer);
    })
}

//função que é executada ao clicar no botão de gerar lista
export async function gerarLista() {

    estado.estaOrdenando = false;//define que a lista não está ordenada

    await new Promise(resolve => setTimeout(resolve, duracaoPasso))

    containerLista.innerHTML = '';//define o elemento como um texto vazio

    gerarListaAleatoria(quantElementos);//gera uma lista aleatória
    
    passos = 0;//reinicia a contagem de passos
    contadorPassos.innerHTML = "Passos: " + passos;
}

//função que é executada ao clicar no botão de reiniciar lista
export function reiniciarLista(){
    estado.estaOrdenando = false;//define que a lista não está ordenada
    seletorAlgoritmos.disabled = false;//habilita a seleção de algoritmos
    lista = Array.from(listaAtual);//cria uma cópia dos valores registrados na lista auxiliar para a lista principal
    mostrarLista();// exibe a lista reiniciada
    
    const barrasAtivas = document.querySelectorAll('.barra.ativo');
    barrasAtivas.forEach(barra => barra.classList.remove('ativo'));

    passos = 0;// reinicia a contagem de passos
    contadorPassos.innerHTML = "Passos: " + passos;
}

export function alternarPausa(){
    estado.estaPausado = !estado.estaPausado;
    const botaoPausa = document.querySelector('#botao-pausa');
    botaoPausa.textContent = estado.estaPausado ? '▶' : '❚❚';
}

//Função para exibir a explicação do algoritmo de ordenação escolhido
document.getElementById('selec-algoritmos').addEventListener('change', function() {
    const elementoTooltip = document.querySelector('.botao-duvida');
    const explicacoes = {
        bubbleSort: "Este algoritmo funciona realizando comparações partindo do elemento mais à esquerda com o elemento seguinte, com o objetivo de transportar os maiores elementos para a direita. Quando um elemento maior é comparado com o seguinte, o qual é menor, o algoritmo realiza a troca do mesmo.",
        quickSort: "Este algoritmo realiza a divisão dos elementos a partir de um pivô, o qual pode ser o elemento central, e separa os elementos menores ao lado esquerdo e maiores do lado direito. A partir disso, os lados são ordenados recursivamente utilizando o mesmo algoritmo.",
        mergeSort: "Este algoritmo utiliza duas listas para combiná-las em uma lista única. Utilizando o menor valor de ambas as listas, o valor é inserido em uma lista auxiliar, então o próximo menor valor é comparado entre ambas as listas e o menor é inserido na lista auxiliar. A mesclagem continua sendo realizada até que haja apenas uma lista única.",
        selectionSort: "Este algoritmo realiza a seleção do menor valor da lista para trocá-lo pelo valor da primeira posição e a partir disso o próximo menor valor é selecionado e trocado pelo valor da segunda posição, esse processo é repetido até que a lista esteja ordenada completamente.",
        insertionSort: "Este algoritmo funciona desde a inserção do primeiro elemento ou a partir de uma lista já ordenada previamente. Cada elemento é inserido na sua devida posição para que a lista continue ordenada.",
        bogoSort: "Este algoritmo é considerado como ineficiente. Seu funcionamento embaralha os elementos da lista repetidamente até que estejam ordenados, podendo realizar a ordenação na primeira tentativa ou após muitas tentativas, dependendo da quantidade de elementos."
    };

    elementoTooltip.setAttribute('data-tooltip', explicacoes[this.value] || 'Selecione um algoritmo para ver sua explicação');
});


// Código executado ao iniciar o programa, gerando uma lista inicial com valores aleatórios
gerarListaAleatoria(quantElementos);