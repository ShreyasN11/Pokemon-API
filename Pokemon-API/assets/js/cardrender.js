function getRandomNumber(min, max) {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;
    return randomNumber;
}

async function createPokemonCards(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            createcard(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const el = document.getElementById("pager");
    el.style.display = "block";
}

function createcard(data) {
    var cardDiv = document.createElement("div");
    cardDiv.className = "card pokecards";
    cardDiv.style.width = "18rem";
    cardDiv.style.margin = "10px";
    cardDiv.id = "custom-pokemon";
    cardDiv.setAttribute("data-aos", "fade-up");

    // Create the image element with class "card-img-top" and alt attribute
    var image = document.createElement("img");
    image.className = "card-img-top";
    image.alt = "Pokemon image";
    image.src = data.sprites.other['official-artwork'].front_default;

    // Create the div element with class "card-body"
    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    // Create the heading element with class "card-title" and set its text content
    var title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = data.name.toUpperCase();

    // Create the paragraph element with class "card-text" and set its text content
    var paragraph = document.createElement("p");
    paragraph.className = "card-text";
    paragraph.textContent = `Pokedex No: ${data.id}`;

    // Create the anchor element with class "btn btn-primary" and href attribute
    var anchor = document.createElement("button");
    anchor.className = "btn btn-primary";
    //anchor.href = "Page.html";
    anchor.textContent = "Know More";
    anchor.onclick = ()=>{
        document.getElementById('card-container').style.display = 'none';
        pokemonstats(data);

    }

    // Append all elements to their respective parents
    cardBodyDiv.appendChild(title);
    cardBodyDiv.appendChild(paragraph);
    cardBodyDiv.appendChild(anchor);
    cardDiv.appendChild(image);
    cardDiv.appendChild(cardBodyDiv);

    // Append the entire card div to the container
    document.getElementById("card-container").appendChild(cardDiv);
}

function pokemonstats(data) {

    const typeColors = {
        normal: 'badge bg-light text-dark',
        fire: 'badge bg-danger',
        water: 'badge bg-primary',
        electric: 'badge bg-warning text-dark',
        grass: 'badge bg-success',
        ice: 'badge bg-info text-dark',
        fighting: 'fighting',
        poison: 'poison',
        ground: 'ground',
        flying: 'badge bg-secondary text-light',
        psychic: 'psychic',
        bug: 'badge bg-success text-dark',
        rock: 'rock',
        ghost: 'badge bg-dark text-light',
        dragon: 'badge bg-primary text-light',
        dark: 'badge bg-dark text-light',
        steel: 'badge bg-secondary text-light',
        fairy: 'fairy'
    };
    
    
    const el = document.getElementById("pager");
    el.style.display = "none";
    const details = document.createElement('div');
    details.id = 'details'
    details.className = 'container text-center justify-content-center mb-3';
    details.setAttribute("data-aos", "fade-right");
    details.innerHTML = `
        <div class="container text-center justify-content-center ">
            <div class="row justify-content-md-center">
                <div class="row">
                    <div class="col-md-auto text-center justify-content-center">
                        <img src="${data.sprites.other['official-artwork'].front_default}" class="img-fluid">
                    </div>
                    <div class="col col-lg-5">
                        <div class="card mt-4">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item font-weight-bold">${data.name.toUpperCase()}</li> 
                                <li class="list-group-item">
                                    <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                                        ${
                                            data.types.map(type => `
                                                <span class="badge ${typeColors[type.type.name]} me-1">${type.type.name.toUpperCase()}</span>
                                            `).join('')
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="card mt-4">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item stat-align">
                                    <div class="stat-label col-6">Attack</div>
                                    <div class="stat-bar" style="width: ${data.stats[1].base_stat}px;">
                                        <span class="stat-value">${data.stats[1].base_stat}</span>
                                    </div>
                                </li>
                                <li class="list-group-item stat-align">
                                    <div class="stat-label col-6">Special-Attack:</div>
                                    <div class="stat-bar" style="width: ${data.stats[3].base_stat}px;">
                                        <span class="stat-value">${data.stats[3].base_stat}</span>
                                    </div>
                                </li>
                                <li class="list-group-item stat-align">
                                    <span class="stat-label col-6">Defence:</span>
                                    <div class="stat-bar" style="width: ${data.stats[2].base_stat}px;">
                                        <span class="stat-value">${data.stats[2].base_stat}</span>
                                    </div>
                                </li>
                                <li class="list-group-item stat-align">
                                    <span class="stat-label col-6">Special-Defence:</span>
                                    <div class="stat-bar" style="width: ${data.stats[4].base_stat}px;">
                                        <span class="stat-value">${data.stats[4].base_stat}</span>
                                    </div>
                                </li>
                                <li class="list-group-item stat-align">
                                    <span class="stat-label col-6">Speed:</span>
                                    <div class="stat-bar" style="width: ${data.stats[5].base_stat }px;">
                                        <span class="stat-value">${data.stats[5].base_stat}</span>
                                    </div>
                                </li>
                                <li class="list-group-item stat-align">
                                    <span class="stat-label col-6">HP:</span>
                                    <div class="stat-bar" style="width: ${data.stats[0].base_stat}px;">
                                        <span class="stat-value">${data.stats[0].base_stat}</span>
                                    </div>
                                </li>
                            </ul>   
                        </div>

                    </div>
                </div>    
            </div>
        </div>
    `;

    document.getElementById("details-container").appendChild(details);
    document.getElementById('details-container').style.display = 'flex';
    console.log(data);
}

async function createstats(i){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        pokemonstats(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function hideCardContainer() {
    document.getElementById('card-container').style.display = 'none';
}

function renderthroughsearch(data){
    document.getElementById('card-container').style.display = 'none';
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    pokemonstats(data);
}

function renderPokemonCard(data) {
    createcard(data);
}

document.getElementById("homeButton").addEventListener("click", function() {
    document.getElementById('details-container').style.display = 'none';
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    document.getElementById('card-container').style.display = 'flex';
    const el = document.getElementById("pager");
    el.style.display = "block";

});

document.getElementById("og-btn").addEventListener("click", function() {
    document.getElementById('card-container').style.display = 'none';
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    const x = getRandomNumber(1, 151);
    createstats(x);
});

document.getElementById("latest-btn").addEventListener("click", function() {
    document.getElementById('card-container').style.display = 'none';
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    const x = getRandomNumber(906, 1024);
    createstats(x);
});

document.getElementById("any-btn").addEventListener("click", function() {
    document.getElementById('card-container').style.display = 'none';
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    const x = getRandomNumber(1, 1025);
    createstats(x);
});

document.getElementById("search-btn").addEventListener("click", async function(event) {
    event.preventDefault();
    
    const searchValue = document.getElementById("search-tab").value.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        hideCardContainer(); 
        renderthroughsearch(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

document.getElementById("b1").addEventListener("click", function() {
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    const elements2 = document.querySelectorAll(".card");
    if(elements2){
        for(let i = 0; i < elements2.length; i++){
            elements2[i].remove();
        }
    }
    createPokemonCards(1, 24);
});

document.getElementById("b2").addEventListener("click", function() {
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    const elements2 = document.querySelectorAll(".card");
    if(elements2){
        for(let i = 0; i < elements2.length; i++){
            elements2[i].remove();
        }
    }
    createPokemonCards(25, 48);
});

document.getElementById("b3").addEventListener("click", function() {
    const element = document.getElementById("details");
    if(element){
        element.remove();
    }
    const elements2 = document.querySelectorAll(".card");
    if(elements2){
        for(let i = 0; i < elements2.length; i++){
            elements2[i].remove();
        }
    }
    createPokemonCards(49, 72);
});

createPokemonCards(1, 24);

                                