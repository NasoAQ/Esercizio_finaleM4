const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("_id");
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJkZWZjNzJiYzY0NjAwMTlkYmJhY2YiLCJpYXQiOjE3MDY5NDY1MDQsImV4cCI6MTcwODE1NjEwNH0.OFx1rdhiosl1TXwQVfg1hShUVaELUPJDAavLAhozedE";
const spinnerContainer = document.getElementById("spinner-container");

spinnerContainer.classList.remove("d-none");

// Chiamata alla funzione per recuperare e visualizzare i dettagli del prodotto
fetchProductDetails(productId);

// Funzione per creare la card
function fetchProductDetails(productId) {
	fetch(`${API_URL}${productId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => response.json())
		.then(product => {
			spinnerContainer.classList.add("d-none");

			const productDetailsContainer = document.getElementById(
				"product-details-container"
			);

			const card = document.createElement("div");
			card.classList.add(
				"card",
				"text-bg-light",
				"p-0",
				"mb-3",
				"h-100",
				"border-light",
				"dtlCard"
			);

			const img = document.createElement("img");
			img.classList.add("card-img-top");
			img.src = product.imageUrl;
			//productDetailsContainer.appendChild(img);

			const cardBody = document.createElement("div");
			cardBody.classList.add(
				"card-body",
				"d-flex",
				"justify-content-between",
				"flex-column"
			);

			const title = document.createElement("h2");
			title.textContent = product.name;
			//productDetailsContainer.appendChild(title);

			const brand = document.createElement("h5");
			brand.textContent = product.brand;
			//productDetailsContainer.appendChild(brand);

			const description = document.createElement("p");
			description.textContent = product.description;
			//productDetailsContainer.appendChild(description);

			const price = document.createElement("h4");
			price.classList.add("fw-bold", "text-warning-emphasis");
			price.textContent = `${product.price}€`;
			//productDetailsContainer.appendChild(price);

			const addToCartButton = document.createElement("button");
			addToCartButton.classList.add(
				"btn",
				"btn-outline-warning",
				"text-dark",
				"my-1"
			);
			addToCartButton.textContent = "Add to Cart";
			addToCartButton.addEventListener("click", function () {
				window.location.href = "index.html";
			});

			cardBody.appendChild(title);
			cardBody.appendChild(brand);
			cardBody.appendChild(description);
			cardBody.appendChild(price);
			cardBody.appendChild(addToCartButton);

			card.appendChild(img);
			card.appendChild(cardBody);

			productDetailsContainer.appendChild(card);
		})
		.catch(error => {
			console.log(
				"Si è verificato un errore durante la richiesta dei dettagli del prodotto"
			);
		});
}
// Funzione per reinderizzare nella pagina di gestione
function addUser() {
	window.location.href = "product-form.html";
}
