
const form = document.querySelector('#form-busca');
const campo = document.querySelector('#nome');
const resultado = document.querySelector('#resultado');


let pokemon = 'pikachu'

function buscarPokemon(pokemon) {}
fetch('https://pokeapi.co/api/v2/pokemon/${pokemon}')
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        nome.innerText = dados.name
        tipo.innerText = dados.types.map(t => t.type.name).join(' | ');
    
        
    
    
    
    
    });
