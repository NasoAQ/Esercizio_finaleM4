const API_URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0N2M5ZGRmZmI4YjAwMTQ0MTNiOWYiLCJpYXQiOjE2OTI2OTU3MDksImV4cCI6MTY5MzkwNTMwOX0.axZpS7dRbLk519HLKSPjQU8qtZSRkC9yRx42oAu_n1c"

fetch(`${API_URL}` , {
headers: {
"Authorization": `Bearer ${token}`
}
})
    .then(response => response.json())
    .then(productList => {
    const productsContainer = document.getElementById('products-container');

    function createProductCard(product) {

        const card = document.createElement('div');
        card.classList.add('card','text-bg-light', 'mb-3', 'h-100', 'border-light');

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = product.imageUrl;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex','justify-content-between', 'flex-column');

        const title = document.createElement('h6', 'm-0');
        title.classList.add('card-title');
        title.textContent = product.name;

        const brand = document.createElement('p');
        brand.classList.add('card-text');
        brand.textContent = `Brand: ${product.brand}`;
        
        // const description = document.createElement('p');
        // description.classList.add('card-text');
        // description.textContent = product.description;

        const price = document.createElement('p');
        price.classList.add('card-text', 'fw-bold', 'text-warning-emphasis', 'm-0', 'h5');        
        price.textContent = `${product.price}€`;
        
        
        // Creo il pulsante "Dettagli"
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('btn', 'btn-outline-warning', 'text-dark', 'btn-sm', 'm-0');
        detailsButton.textContent = 'Dettagli';
        //Definisco l'url della pagina "dettagli"
        //const detailsUrl = `/dettagli.html?id=${book.asin}`;

        //Aggiungo un listener al pulsante per un evento di tipo click
        detailsButton.addEventListener('click', () => {
          goDetails(product._id);
        });

        cardBody.appendChild(title);
        //cardBody.appendChild(brand);
        //cardBody.appendChild(description);
        cardBody.appendChild(price);
        cardBody.appendChild(detailsButton);

        card.appendChild(img);
        card.appendChild(cardBody);

        return card;

    }

    function goDetails(productId) {
        window.location.href = `dettagli.html?_id=${productId}`;
    }

    function renderProducts(products) {

        productsContainer.innerHTML = '';

        products.forEach(product => {
            const col = document.createElement('div');
            col.classList.add('col-6', 'col-md-3');
            const productCard = createProductCard(product);

            col.appendChild(productCard)
            productsContainer.appendChild(col);
        })
    }

    renderProducts(productList);
})
    .catch(_error => {
    console.log('Si è verificato un errore durante la richiesta');
});


// const deleteMethod = {
//     method: 'DELETE',
//     headers: {
//         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0N2M5ZGRmZmI4YjAwMTQ0MTNiOWYiLCJpYXQiOjE2OTI2OTU3MDksImV4cCI6MTY5MzkwNTMwOX0.axZpS7dRbLk519HLKSPjQU8qtZSRkC9yRx42oAu_n1c",
//         'Content-type': 'application/json; charset=UTF-8'
//         }
// }

// fetch(API_URL, deleteMethod)

// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.log(err))

function addUser() {
    window.location.href = 'product-form.html' 
   }

