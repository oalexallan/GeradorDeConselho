document.addEventListener('DOMContentLoaded', function () {
    const obterConselhoBtn = document.getElementById('obterConselho');
    const numeroConselhoSpan = document.getElementById('numeroConselho');
    const exibirConselho = document.getElementById('exibirConselho');
    const radios = document.querySelectorAll('input[name="ChackLanguage"]');
    let language = 'pt';

    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            language = this.value === 'Portugues' ? 'pt' : 'en';
        });
    });

    obterConselhoBtn.addEventListener('click', async function () {
        obterConselhoBtn.disabled = true;
        exibirConselho.innerHTML = '<img src="./src/img/loading.gif" alt="Loading..." width="50" height="50">';

        const conselhoResponse = await fetch('https://api.adviceslip.com/advice');
        const conselhoData = await conselhoResponse.json();
        const conselho = conselhoData.slip.advice;

        const conselhoTraduzidoResponse = await fetch(`/api/conselho?texto=${encodeURIComponent(conselho)}&language=${encodeURIComponent(language)}`);
        const conselhoTraduzido = await conselhoTraduzidoResponse.text();

        numeroConselhoSpan.textContent = conselhoData.slip.id;
        exibirConselho.textContent = `"${conselhoTraduzido}"`;

        obterConselhoBtn.disabled = false;
    });
});
