export async function bubbleSort(lista, estado, getDuracaoPasso, trocar, atualizarPassos) {
    try{
        for (let i = 0; i < lista.length - 1 && estado.estaOrdenando; i++) {
            for (let j = 0; j < lista.length - i - 1 && estado.estaOrdenando; j++) {
    
                if (!estado.estaOrdenando) return;
    
                while (estado.estaPausado) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    if (!estado.estaOrdenando) return;
                }
    
                // Seleciona novamente as barras em cada passo para garantir ordem atualizada
                const barras = document.querySelectorAll('.barra');
    
                // Destaca as barras atuais
                barras[j].classList.add('ativo');
                barras[j + 1].classList.add('ativo');
    
                // Aguarda para mostrar a comparação
                await new Promise(resolve => setTimeout(resolve, getDuracaoPasso()));
    
                // Verifica se deve trocar
                if (lista[j] > lista[j + 1]) {
                    trocar(j, j + 1); // faz a troca lógica e visual
                    atualizarPassos(); // incrementa contador de passos
                }
    
                // Remove destaque após a comparação/troca
                barras[j].classList.remove('ativo');
                barras[j + 1].classList.remove('ativo');
    
                
            }
        }
    } finally{
        const botao = document.getElementById('botaoIniciarPausa');
        botao.textContent = '▶';

        estado.estaOrdenando = false;
    }

    
}