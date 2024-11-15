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

            let viscosidade;
            if (diametroSelecionado === 1.90) {
                viscosidade = 0.49 * (tempo - 35);
            } else if (diametroSelecionado === 2.53) {
                viscosidade = 1.44 * (tempo - 18);
            } else if (diametroSelecionado === 3.40) {
                viscosidade = 2.31 * (tempo - 6.58);
            } else if (diametroSelecionado === 4.12) {
                viscosidade = 3.85 * (tempo - 4.49);
            } else if (diametroSelecionado === 5.20) {
                viscosidade = 12.1 * (tempo - 2);
            }

            if (viscosidade !== undefined) {
                document.getElementById('resultado').textContent = viscosidade.toFixed(2) + ' cSt';
                document.getElementById('resetarBtn').style.display = 'inline-block';
            } else {
                alert('Selecione um diâmetro.');
            }
        });

        document.getElementById('resetarBtn').addEventListener('click', () => {
            clearInterval(timer);
            centesimos = 0;
            document.getElementById('cronometro').textContent = '00.00';
            document.getElementById('resultado').textContent = '---';
            document.getElementById('iniciarBtn').style.display = 'inline-block';
            document.getElementById('pararBtn').style.display = 'none';
            document.getElementById('continuarBtn').style.display = 'none';
            document.getElementById('resetarBtn').style.display = 'none';
            isRunning = false;
        });