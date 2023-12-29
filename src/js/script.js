function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
        const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${language}`;
        const headers = {
            'Ocp-Apim-Subscription-Key': 'd7d183a0e2c74f0682149639e89e9bae',
            'Ocp-Apim-Subscription-Region': 'brazilsouth',
            'Content-type': 'application/json',
            'X-ClientTraceId': uuid.v4()
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

    obterConselhoBtn.addEventListener('click', async function () {
        const conselhoResponse = await fetch('https://api.adviceslip.com/advice');
        const conselhoData = await conselhoResponse.json();
        const conselho = conselhoData.slip.advice;

        const conselhoTraduzido = await traduzir(conselho);

        numeroConselhoSpan.textContent = conselhoData.slip.id;
        exibirConselho.textContent = `"${conselhoTraduzido}"`;
    });
});
