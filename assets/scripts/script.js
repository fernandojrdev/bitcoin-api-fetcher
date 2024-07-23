let currentTimezone = 'America/Sao_Paulo';
let currentValue = 'USD';

async function fetchData() {
    const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        const data = await response.json();
        // Valor
        const valueUSD = parseFloat(data.bpi.USD.rate.replace(',', '')).toFixed(2);
        const valueGBP = parseFloat(data.bpi.GBP.rate.replace(',', '')).toFixed(2);
        const valueEUR = parseFloat(data.bpi.EUR.rate.replace(',', '')).toFixed(2);

        let value;
        switch (currentValue) {
            case 'USD':
                value = "💵 $" + valueUSD;
                break;
            case 'GBP':
                value = "💷 £" + valueGBP;
                break;
            case 'EUR':
                value = "💶 €" + valueEUR;
                break;
            default:
                value = "💵 $" + valueUSD;
                break;
        }
        document.getElementById('valuePrice').textContent = `${value}`;
        // Data
        const dateString = data.time.updatedISO;
        const date = new Date(dateString);
        const dateOptions = {
            timeZone: currentTimezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const formatter = new Intl.DateTimeFormat('pt-BR', dateOptions);
        const formattedDate = formatter.format(date);

        document.getElementById('valueDate').textContent = `${formattedDate}`;

    } catch (error) {
        console.error('Erro:', error);
    }
}

function setValue(value) {
    currentValue = value;
    fetchData();
}

function setTimezone(timezone) {
    currentTimezone = timezone;
    fetchData();
}

function setActiveButton(buttons, activeButton) {
    buttons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

document.getElementById('btnUSD').addEventListener('click', () => {
    setValue('USD');
    setActiveButton(document.querySelectorAll('.btnValue'), document.getElementById('btnUSD'));
});

document.getElementById('btnGBP').addEventListener('click', () => {
    setValue('GBP');
    setActiveButton(document.querySelectorAll('.btnValue'), document.getElementById('btnGBP'));
});

document.getElementById('btnEUR').addEventListener('click', () => {
    setValue('EUR');
    setActiveButton(document.querySelectorAll('.btnValue'), document.getElementById('btnEUR'));
});

document.getElementById('btnBRT').addEventListener('click', () => {
    setTimezone('America/Sao_Paulo');
    setActiveButton(document.querySelectorAll('.btnDate'), document.getElementById('btnBRT'));
});

document.getElementById('btnUTC').addEventListener('click', () => {
    setTimezone('UTC');
    setActiveButton(document.querySelectorAll('.btnDate'), document.getElementById('btnUTC'));
});

document.getElementById('btnJST').addEventListener('click', () => {
    setTimezone('Asia/Tokyo');
    setActiveButton(document.querySelectorAll('.btnDate'), document.getElementById('btnJST'));
});

fetchData();
