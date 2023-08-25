const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('_id');
const API_URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0N2M5ZGRmZmI4YjAwMTQ0MTNiOWYiLCJpYXQiOjE2OTI2OTU3MDksImV4cCI6MTY5MzkwNTMwOX0.axZpS7dRbLk519HLKSPjQU8qtZSRkC9yRx42oAu_n1c"
    

// Chiamata alla funzione per recuperare e visualizzare i dettagli del prodotto
fetchProductDetails(productId);

function fetchProductDetails(productId){
    fetch(`${API_URL}${productId}` , {
    headers: {
    "Authorization": `Bearer ${token}`
    }
    })
        .then(response => response.json())
        .then(product => {
            const productDetailsContainer = document.getElementById('product-details-container');
            
            const card = document.createElement('div');
            card.classList.add('card','text-bg-light', 'p-0', 'mb-3', 'h-100', 'border-light', 'dtlCard');

            const img = document.createElement('img');
            img.classList.add('card-img-top');
            img.src = product.imageUrl;
            //productDetailsContainer.appendChild(img);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'd-flex', 'align-items-center','justify-content-between', 'flex-column');

            const title = document.createElement('h2');
            title.textContent = product.name;
            //productDetailsContainer.appendChild(title);
            
            const description = document.createElement('p');
            description.textContent = product.description;
            //productDetailsContainer.appendChild(description);

            const price = document.createElement('p');
            price.textContent = `Prezzo: ${product.price}€`;
            //productDetailsContainer.appendChild(price);

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('btn', 'btn-dark', 'my-1');
            addToCartButton.textContent = 'BUY NOW';

            cardBody.appendChild(title)
            cardBody.appendChild(description)
            cardBody.appendChild(price)
            cardBody.appendChild(addToCartButton)

            card.appendChild(img)
            card.appendChild(cardBody)

            productDetailsContainer.appendChild(card)
            

        })
        .catch(error => {
            console.log('Si è verificato un errore durante la richiesta dei dettagli del prodotto');
        });
    }
        