let pokemonRepository = (function () {
    let pokemonList = [
    { name: "Balbasure", height: 0.7, type: "grass" },
    { name: "Charizard", height: 1.7, type: ['fire', 'flying'] },
    { name: "Ivysour", height: 1, type: ['grass', 'poison'] },
    { name: "Venusour", height: 2, type: ['grass', 'poison'] },
    { name: "Charmander", height: 0.6, type: "fire" }
    ];

    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        }
    }
})();


pokemonRepository.getAll().forEach(pokemon => document.write ('<p>' + pokemon.name + " " + "is" + " " + pokemon.height + "m" ));
   
    



// for (let i = 0; i < pokemonList.length; i++) {
//     let pokemon = pokemonList[i];
//         document.write ('<p>' + pokemon.name + ' (height: '+ pokemon.height +')');
//     if (pokemon.height > 1.7) {
//         document.write ('<strong> - Wow, that is huge! </strong>');
//     }
// }

// pokemonList.forEach(function(pokemon) {
//     document.write ('<p>' + pokemon.name + " " + "is" + " " + pokemon.height + "m" );

// })

// function PokemonLoop(pokemon) {
//     document.write ('<p>' + pokemon.name + " " + "is" + " " + pokemon.height + "m" );

// }

 




// function divide (dividend, divisor){
//     if (divisor === 0){
//         return "You're trying to divide by zero."
//     }else{
//         let result = dividend / divisor;
//         return result;   
//     }
//     document.write(divide(4,2));
// }


