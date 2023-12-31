
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const document = dom.window.document;

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
            const url = `${process.env.URL}${language}`;
            const headers = {
                'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
                'Ocp-Apim-Subscription-Region': process.env.SUBSCRIPTION_REGION,
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
    }

    obterConselhoBtn.addEventListener('click', async function () {
        obterConselhoBtn.disabled = true;
        exibirConselho.innerHTML = '<img src="./src/img/loading.gif" alt="Loading..." width="50" height="50">';

        const conselhoResponse = await fetch('https://api.adviceslip.com/advice');
        const conselhoData = await conselhoResponse.json();
        const conselho = conselhoData.slip.advice;

        const conselhoTraduzido = await traduzir(conselho);

        numeroConselhoSpan.textContent = conselhoData.slip.id;
        exibirConselho.textContent = `"${conselhoTraduzido}"`;

        obterConselhoBtn.disabled = false;
    });
});
