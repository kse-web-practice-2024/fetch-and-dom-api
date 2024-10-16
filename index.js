/*
* Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter
* e.g. 'api_key=live_1VUMu9BSNYl47tblQEIFRz98fMRvcw4D72qsTof1WkraV1OavzgGE2gyC7GLNmJd'
* */


/*
* <li class="cat-item">
        <img class="cat-item-photo" src="./images/cat.png" alt="Cat">
        <h2 class="cat-item-title">Cat</h2>
        <p class="cat-item-description">Some description</p>
    </li>
* */

const URL = 'https://api.thecatapi.com/v1/breeds?';
const API_KEY = "live_1VUMu9BSNYl47tblQEIFRz98fMRvcw4D72qsTof1WkraV1OavzgGE2gyC7GLNmJd";

const params = new URLSearchParams({
    api_key: API_KEY
})

// fetch(`${URL}${params.toString()}`, {
//     // headers: new Headers({
//     //    'x-api-key': API_KEY
//     // })
// })
//     .then(response => response.json())
//     .then(catsList => {
//         console.log('catsList', catsList)
//
//         const catListElement = document.querySelector('.cat-list');
//
//         catsList.forEach(cat => {
//             const catItem = createCatItem(cat);
//
//             catListElement.appendChild(catItem);
//         });
//
//
//
//
//     })
//     .catch(error => {
//         console.log(error)
//     })

function addLoader(element) {
    const loader = createLoader();
    element.appendChild(loader);
}

function hideLoader(element) {

}

async function fetchCats() {
    const catListElement = document.querySelector('.cat-list');
    const loader = createLoader();
    catListElement.appendChild(loader);

    try {
        const result  = await fetch(URL, {
            headers: new Headers({
                'x-api-key': API_KEY
            })
        });

        return await result.json();
    } catch (error) {
        // showError

    } finally {
        loader.classList.add('hide');
    }
}

async function fetchCatsAndAppendToList() {
    const catListElement = document.querySelector('.cat-list');
    // const loader = createLoader();
    // catListElement.appendChild(loader);


    const catsList = await fetchCats();


    catsList.forEach(cat => {
        const catItem = createCatItem(cat);

        catListElement.appendChild(catItem);
    });
}

fetchCatsAndAppendToList();

//
// function renderCatItem(cat) {
//     const { image: { url } = { url: null }, name, description } = cat;
//
//     return `
//         <li class="cat-item">
//             <img class="cat-item-photo" src=${url} alt="Cat">
//             <h2 class="cat-item-title">${name}</h2>
//             <p class="cat-item-description">${description}</p>
//         </li>
//     `;
// }

function createCatDescription(cat) {
    const { description } = cat;

    const catDescriptionElement = document.createElement('p');
    catDescriptionElement.innerText = description;

    return catDescriptionElement;
}

function createCatName(cat) {
    const { name } = cat;

    const catNameElement = document.createElement('h2');
    catNameElement.innerText = name;

    return catNameElement;
}

function createCatImage(cat) {
    const { image: { url } = { url: null }, name } = cat;

    const catImageElement = document.createElement('img');
    catImageElement.classList.add('cat-item-photo');
    catImageElement.setAttribute('src', url);
    catImageElement.setAttribute('alt', `Cat ${name}`);

    return catImageElement;
}


function createCatItem(cat) {
    const catItemElement = document.createElement('li');
    catItemElement.classList.add('cat-item');

    const catImage = createCatImage(cat);
    const catName = createCatName(cat);
    const catDescription = createCatDescription(cat);

    catItemElement.appendChild(catImage);
    catItemElement.appendChild(catName);
    catItemElement.appendChild(catDescription);

    return catItemElement;
}

function createLoader() {
    const loaderElement = document.createElement('div');
    loaderElement.innerText = 'CONTENT IS LOADING';

    return loaderElement;
}



