let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';
    // let modalContainer = document.querySelector("#modal-container");

    function add(pokemon) {
        if (
            typeof pokemon === "object" && 
            "name" in pokemon && 
            "detailsUrl" in pokemon 
        ){
            pokemonList.push(pokemon);
        }else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.list-group');
        let listpokemon = document.createElement('li');
        listpokemon.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn-primary');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            showModal(
                pokemon.name, "height: " + pokemon.height, pokemon.imageUrl 
            );
        console.log(pokemon);
        });   
    } 

    function loadList() { // load list function with promise
        return fetch(apiUrl).then(function (responce) {
            return responce.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                    };

                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {     // load details function with promise
        let url = item.detailsUrl;
        return fetch(url).then(function(responce) {
            return responce.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(item) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        modalTitle.empty();
        modalHeader.empty();

        let nameElement = $('<h1>' + item.name + '</h1>');
        
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr('src', item.imageUrlFront);
        // let imageElementBack = $('<img class="modal-img" style="width:50%">');
        // imageElementBack.attr('src', item.imageUrlBack);

        let heightElement = $('<p>' + 'height : ' + item.height + '</p>');

        // let typesElement = $('<p>' + 'types : ' + item.types + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(heightElement);
        modalBody.append(typesElement);



    }

    $('[data-toggle="modal"]').on('click', function(){
        let targetSelector = $(this).attr('data-target');
        $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
      });

    //   $('[data-dismiss="modal"]').on('click', function(){
    //     let targetSelector = $(this).attr('data-target');
    //     $(targetSelector).modal('hide'); // Bootstrap’s own function to make the modal appear
    //   });



    // function showModal(title, text, img) {
        
        

    //     let modal = document.createElement("div");
    //     modal.classList.add("modal fade");

    //     let closeButtonElement = document.createElement("button");
    //     closeButtonElement.classList.add("btn btn-secondary");
    //     closeButtonElement.setAttribute()
    //     closeButtonElement.innerText = "Close";
    //     closeButtonElement.addEventListener("click", hideModal);

    //     let titleElement = document.createElement("modal-content");
    //     titleElement.classList.add("h5");
    //     h5.innerText = title;

    //     let contentElement = document.createElement("modal-body");
    //     contentElement.classList.add("p");
    //     pokemonImage.innerText = text;

    //     let pokemonImage = document.createElement("img")
    //     pokemonImage.classList.add()
    //     pokemonImage.setAttribute("src", img);
    //     pokemonImage.setAttribute("width", "100%");
    //     pokemonImage.setAttribute("height", "100%");
    //     pokemonImage.setAttribute("alt", "Pokemon picture");
          
    //     modal.appendChild(closeButtonElement);
    //     modal.appendChild(titleElement);
    //     modal.appendChild(contentElement);
    //     modal.appendChild(pokemonImage);
    //     modalContainer.appendChild(modal);

    //     modalContainer.classList.add("is-visible");

    //     // document.querySelector("#show-modal").addEventListener("click", () => {
    //     //     showModal("Modal tittle", "This is the modal content!"); 
    //     //      });
    // }
    
    // function hideModal() {
    //     modalContainer.classList.remove("is-visible");

    //     window.addEventListener("keydown", (e) => {
    //         if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
    //             hideModal();
    //         }
    //     });

    //     modalContainer.addEventListener("click", (e) => {
    //         let target = e.target;
    //         if (target === modalContainer) {
    //             hideModal();
    //         }
    //     });
    // }
     return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();
      
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



