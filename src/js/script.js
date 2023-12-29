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

    async function traduzir(texto) {
        if (language === 'en') {
            return texto;
        } else {
            const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${language}`;
            const headers = {
                'Ocp-Apim-Subscription-Key': 'd7d183a0e2c74f0682149639e89e9bae',
                'Ocp-Apim-Subscription-Region': 'brazilsouth',
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4()
            };        
            const body = [{ 'Text': texto }];

            try {
                const response = await axios({
                    baseURL: url,
                    method: 'post',
                    headers: headers,
                    data: body,
                    responseType: 'json'
                });
                return response.data[0].translations[0].text;
            } catch (error) {
                console.error(error);
            }
        }
    }

    obterConselhoBtn.addEventListener('click', async function () {
        obterConselhoBtn.disabled = true;
        obterConselhoBtn.innerHTML = '<img src="https://loading.io/asset/712330" alt="Loading...">';

        const conselhoResponse = await fetch('https://api.adviceslip.com/advice');
        const conselhoData = await conselhoResponse.json();
        const conselho = conselhoData.slip.advice;

        const conselhoTraduzido = await traduzir(conselho);

        numeroConselhoSpan.textContent = conselhoData.slip.id;
        exibirConselho.textContent = `"${conselhoTraduzido}"`;

        obterConselhoBtn.innerHTML = 'Obter Conselho';
        obterConselhoBtn.disabled = false;
    });
});
