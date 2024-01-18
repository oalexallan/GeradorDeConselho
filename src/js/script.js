document.addEventListener('DOMContentLoaded', function () {
    const obterConselhoBtn = document.getElementById('obterConselho');
    const numeroConselhoSpan = document.getElementById('numeroConselho');
    const exibirConselho = document.getElementById('exibirConselho');
    const selectLanguage = document.getElementById('Language');
    let language = 'pt';
    let conselhos;
    let numerosUtilizados = new Set();

    fetch('./src/js/conselhos.json')
        .then(response => response.json())
        .then(data => {
            conselhos = data;
        })
        .catch(error => console.error('Erro ao carregar conselhos:', error));

    selectLanguage.addEventListener('change', function() { 
        language = this.value === 'PT' ? 'pt' : 'en';
    });

    function obterNumeroConselho() {
        let numeroConselho;
        do {
            // Gerar um número aleatório entre 1 e 600
            numeroConselho = Math.floor(Math.random() * 600) + 1;
        } while (numerosUtilizados.has(numeroConselho));

        numerosUtilizados.add(numeroConselho);

        // Reiniciar quando todos foram utilizados
        if (numerosUtilizados.size === 600) {
            numerosUtilizados.clear();
        }

        return numeroConselho;
    }

    obterConselhoBtn.addEventListener('click', function () {
        obterConselhoBtn.disabled = true;
        exibirConselho.innerHTML = '<img src="./src/img/loading.gif" alt="Loading..." width="50" height="50">';

        if (conselhos[language].length > 0) {
            const conselho = conselhos[language].shift();
            const numeroConselho = obterNumeroConselho();

            numeroConselhoSpan.textContent = numeroConselho;
            exibirConselho.textContent = `"${conselho}"`;

        } else {
            exibirConselho.textContent = "Sem conselhos disponíveis no momento.";
        }

        obterConselhoBtn.disabled = false;
    });
});
