//definição das variáveis
const containerLista = document.getElementById('container-lista'); //recebendo o elemento que exibe as barras da lista
const contadorPassos = document.getElementById('contador-passos')  //recebendo o elemento que exibe a contagem de passos
var duracaoPasso = 50; //duração do passo (1000 = 1 segundo)
let lista = []; // inicializando a lista
let listaAtual = []; // utilizado para armazenar a lista atual para reiniciar
let passos = 0; // inicializando o contador de passos
let quantElementos = 4; // define a quantidade de elementos a serem ordenados

// função que adiciona um passo de acordo com cada ordenação
function atualizarPassos(){
    passos = passos + 1; // adiciona um passo
    contadorPassos.innerHTML = "Passos: " + passos; // atualiza o contador de passos
}

//função que gera uma lista aleatória
function gerarListaAleatoria(tamanho) {
    lista = Array.from({ length: tamanho }, () => Math.floor(Math.random() * 100) + 1); //gera uma lista com barras de tamanho entre 1 a 300
    listaAtual = Array.from(lista); // cria uma cópia da lista atual para reset
    mostrarLista(); // exibe a lista gerada
}

//função para exibir a lista 
function mostrarLista() {
    containerLista.innerHTML = ''; // define o elemento como um texto vazio
    //para cada valor da lista
    lista.forEach((value) => {
        const barra = document.createElement('div'); // cria-se uma div para ser utilizada como uma barra
        barra.className = 'barra'; // adiciona a classe "barra" para estilização no css
        barra.style.height = `${value * 3}px`; // Escala o valor para conter a altura do elemento
        containerLista.appendChild(barra); // adiciona a barra ao container da lista
    });
}

//função para realizar trocas em diferentes algoritmos de ordenação
function trocar(i, j) {
    [lista[i], lista[j]] = [lista[j], lista[i]];
}

//implementação do bubble sort
async function bubbleSort() {
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras
    for (let i = 0; i < lista.length - 1; i++) {
        for (let j = 0; j < lista.length - i - 1; j++) { // verifica-se a lista duplamente para verificar a ordenação
            barras[j].classList.add('ativo'); // troca a cor da barra atual e a posterior para demonstrar que estão sendo comparadas
            barras[j + 1].classList.add('ativo');

            if (lista[j] > lista[j + 1]) { //caso o elemento atual seja maior que o próximo
                trocar(j, j + 1); // troca-se de lugar o elemento atual pelo próximo
                atualizarPassos();// incrementa-se o contador de passos
                await new Promise(resolve => setTimeout(resolve, duracaoPasso)); // atrasa a visualização na velocidade escolhida
                mostrarLista(); // exibe a lista após realizar a troca
            }

            //remove a cor da barra a qual foi efetuada a comparação
            barras[j].classList.remove('ativo');
            barras[j + 1].classList.remove('ativo');
        }
    }
}

//implementação do bogo sort
async function bogoSort(){
    const barras = document.querySelectorAll('.barra'); // seleciona-se todas as barras
    
    //função que verifica se a lista está ordenada
    function estaOrdenada(){
        for (let i = 0; i < lista.length - 1; i++){ // para cada elemento da lista
            if (lista[i] > lista[i + 1]){ //se o elemento atual for maior que o próximo elemento
                return false;// a lista não está ordenada
            }
        }
        return true;// caso a lista esteja ordenada, retorna verdadeiro
    }

    //função que embaralha a lista aleatoriamente
    function embaralhar(){
        for (let i = lista.length - 1; i > 0; i--){ //para cada elemento da lista
            const j = Math.floor(Math.random() * (i + 1));// em uma variável auxiliar, gera-se uma nova posição para o elemento atual
            trocar(i, j);//realiza a troca do elemento atual para a nova posição
        }
    }

    while (!estaOrdenada()){// enquanto a lista não está ordenada
        embaralhar();// embaralha os elementos novamente
        atualizarPassos()// incrementa o contador de passos
        await new Promise(resolve => setTimeout(resolve, duracaoPasso)); // atraso para visualização
        mostrarLista();// exibe a lista após embaralhar

        for (let i = 0; i < lista.length; i++) {// adiciona a cor para os elementos que estão selecionados atualmente
            barras[i].classList.add('ativo');
        }
        
    }
    for (let i = 0; i < lista.length; i++) {// retorna a cor original das barras
        barras[i].classList.remove('ativo');
    }
}

//função que inicia a ordenação ao clicar no botão
function iniciarOrdenacao() {
    var tipoOrdenacao = document.getElementById("selec-algoritmos"); //recebe o tipo de algoritmo escolhido
    switch (tipoOrdenacao.options[tipoOrdenacao.selectedIndex].text){// verifica qual foi o algoritmo escolhido e realiza a ordenação de acordo com o tipo escolhido
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

//função que é executada ao clicar no botão de gerar lista
function gerarLista() {
    gerarListaAleatoria(quantElementos);//gera uma lista aleatória
    passos = 0;//reinicia a contagem de passos
}

//função que é executada ao clicar no botão de reiniciar lista
function reiniciarLista(){
    lista = Array.from(listaAtual);//cria uma cópia dos valores registrados na lista auxiliar para a lista principal
    mostrarLista();// exibe a lista reiniciada
    passos = 0;// reinicia a contagem de passos
}

// Código executado ao iniciar o programa, gerando uma lista inicial com valores aleatórios
gerarListaAleatoria(quantElementos);