let timer;
let centesimos = 0;
let isRunning = false;

document.getElementById('iniciarBtn').addEventListener('click', () => {
    isRunning = true;
    document.getElementById('iniciarBtn').style.display = 'none';
    document.getElementById('pararBtn').style.display = 'inline-block';
    timer = setInterval(() => {
        centesimos += 1;
        document.getElementById('cronometro').textContent = (centesimos / 100).toFixed(2);
    }, 10);
});

document.getElementById('pararBtn').addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    document.getElementById('pararBtn').style.display = 'none';
    document.getElementById('continuarBtn').style.display = 'inline-block';
});

document.getElementById('continuarBtn').addEventListener('click', () => {
    isRunning = true;
    document.getElementById('continuarBtn').style.display = 'none';
    document.getElementById('pararBtn').style.display = 'inline-block';
    timer = setInterval(() => {
        centesimos += 1;
        document.getElementById('cronometro').textContent = (centesimos / 100).toFixed(2);
    }, 10);
});

document.getElementById('calcularBtn').addEventListener('click', () => {
    const tempo = centesimos / 100;
    const radios = document.getElementsByName('diametro');
    let diametroSelecionado;

    for (let radio of radios) {
        if (radio.checked) {
            diametroSelecionado = parseFloat(radio.value);
            break;
        }
    }

    if (diametroSelecionado === 1.90) {
        if (tempo >= 55 && tempo <= 100) {
            viscosidade = 0.49 * (tempo - 35);
        } else {
            alert('Para um diâmetro de 1.90 mm, o tempo necessário deve estar entre 55 e 100 segundos!');
            return;
        }
    } else if (diametroSelecionado === 2.53) {
        if (tempo >= 40 && tempo <= 100) {
            viscosidade = 1.44 * (tempo - 18);
        } else {
            alert('Para um diâmetro de 2.53 mm, o tempo necessário deve estar entre 40 a 100 segundos!');
            return;
        }
    } else if (diametroSelecionado === 3.40 || diametroSelecionado === 4.12 || diametroSelecionado === 5.20) {
        if (tempo >= 20 && tempo <= 100) {
            if (diametroSelecionado === 3.40) {
                viscosidade = 2.31 * (tempo - 6.58);
            } else if (diametroSelecionado === 4.12) {
                viscosidade = 3.85 * (tempo - 4.49);
            } else if (diametroSelecionado === 5.20) {
                viscosidade = 12.1 * (tempo - 2);
            }
        } else {
            alert('Para os diâmetros de 3.40 mm, 4.12 mm e 5.20 mm, o tempo necessário deve estar entre 20 a 100 segundos!');
            return;
        }
    } else {
        alert('Selecione um diâmetro.');
        return;
    }

    document.getElementById('resultado').textContent = viscosidade.toFixed(2) + ' cSt';
    responsiveVoice.speak(String(viscosidade.toFixed(2)) + 'centistokes', 'Brazilian Portuguese Female', { rate: 1.2 });
    document.getElementById('resetarBtn').style.display = 'inline-block';
});

document.getElementById('resetarBtn').addEventListener('click', () => {
    clearInterval(timer);
    centesimos = 0;
    document.getElementById('cronometro').textContent = '0.00';
    document.getElementById('resultado').textContent = '---';
    document.getElementById('iniciarBtn').style.display = 'inline-block';
    document.getElementById('pararBtn').style.display = 'none';
    document.getElementById('continuarBtn').style.display = 'none';
    document.getElementById('resetarBtn').style.display = 'none';
    isRunning = false;
});