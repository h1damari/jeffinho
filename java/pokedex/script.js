
const btnAdicionar = document.querySelector('#btnAdicionar');
const PilotoEscolhido = document.querySelector('#Piloto');
const VoltaEscolhida = document.querySelector('#voltaEscolhida');

const NomePiloto = document.querySelector('#nomePiloto');
const NumeroPiloto = document.querySelector('#numeroPiloto');
const ImgPiloto = document.querySelector('#imgPiloto');
const EquipePiloto = document.querySelector('#equipePiloto');

const Corrida = document.querySelector('#corrida');
const TempoPiloto = document.querySelector('#tempoPiloto');
const Setor1 = document.querySelector('#setor1');
const Setor2 = document.querySelector('#setor2');
const Setor3 = document.querySelector('#setor3');
const Velocidade = document.querySelector('#velocidade');

function SelecionarPiloto() {

    const piloto = PilotoEscolhido.value;
    const volta = VoltaEscolhida.value;
    const sessao = 9839;

    if (piloto == "") {
        alert('Digite o número de um piloto');
        return;
    }

    //exibe informações da corrida
    fetch(`https://api.openf1.org/v1/sessions?session_key=${sessao}`)
        .then(resposta => resposta.json())
        .then(dados => {
            Corrida.textContent = dados[0].circuit_short_name + " - " +
                                  dados[0].session_name + " - " +
                                  dados[0].year;
        });
    
    //exibe informações do piloto
    fetch(`https://api.openf1.org/v1/drivers?session_key=${sessao}&driver_number=${piloto}`)
        .then(resposta => resposta.json())
        .then(dados => {

            if (dados.length == 0) {
                alert('Piloto não encontrado');
                return;
            }

            NomePiloto.textContent = dados[0].full_name;
            NumeroPiloto.textContent = "#" + dados[0].driver_number;
            ImgPiloto.src = dados[0].headshot_url;
            EquipePiloto.textContent = "Equipe: " + dados[0].team_name;

            //exibe informações da volta
            fetch(`https://api.openf1.org/v1/laps?session_key=${sessao}&driver_number=${piloto}&lap_number=${volta}`)
                .then(resposta => resposta.json())
                .then(dados => {

                    TempoPiloto.textContent = "Tempo: " + dados[0].lap_duration + " segundos";
                    Setor1.textContent = "Setor 1: " + dados[0].duration_sector_1;
                    Setor2.textContent = "Setor 2: " + dados[0].duration_sector_2;
                    Setor3.textContent = "Setor 3: " + dados[0].duration_sector_3;
                    Velocidade.textContent = "Velocidade: " + dados[0].st_speed + " km/h";

                });
        });
}

btnAdicionar.addEventListener('click', SelecionarPiloto);
