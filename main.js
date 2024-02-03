const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJkZWZjNzJiYzY0NjAwMTlkYmJhY2YiLCJpYXQiOjE3MDY5NDY1MDQsImV4cCI6MTcwODE1NjEwNH0.OFx1rdhiosl1TXwQVfg1hShUVaELUPJDAavLAhozedE";
const spinnerContainer = document.getElementById("spinner-container");
const productsContainer = document.getElementById("products-container");

spinnerContainer.classList.remove("d-none");

const searchInput = document.getElementById("searchInputHome");
let productsList = [];

//Funzione per creare la card
function createProductCard(product) {
	const card = document.createElement("div");
	card.classList.add("card", "text-bg-light", "mb-3", "h-100", "border-light");

	const img = document.createElement("img");
	img.classList.add("card-img-top");
	img.src = product.imageUrl;

	const cardBody = document.createElement("div");
	cardBody.classList.add(
		"card-body",
		"d-flex",
		"justify-content-between",
		"flex-column"
	);

	const title = document.createElement("h6", "m-0");
	title.classList.add("card-title");
	title.textContent = product.name;

	const brand = document.createElement("p");
	brand.classList.add("card-text");
	brand.textContent = `Brand: ${product.brand}`;

	// const description = document.createElement('p');
	// description.classList.add('card-text');
	// description.textContent = product.description;

	const price = document.createElement("p");
	price.classList.add(
		"card-text",
		"fw-bold",
		"text-warning-emphasis",
		"m-0",
		"h5"
	);
	price.textContent = `${product.price}€`;

	// Creo il pulsante "Dettagli"
	const detailsButton = document.createElement("button");
	detailsButton.classList.add(
		"btn",
		"btn-outline-warning",
		"text-dark",
		"btn-sm",
		"m-0"
	);
	detailsButton.textContent = "Dettagli";
	//Definisco l'url della pagina "dettagli"
	//const detailsUrl = `/dettagli.html?id=${book.asin}`;

	//Aggiungo un listener al pulsante per un evento di tipo click
	detailsButton.addEventListener("click", () => {
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

//Funzione per reindirizzare nella pagina dettagli
function goDetails(productId) {
	window.location.href = `dettagli.html?_id=${productId}`;
}

//Funzione per disporre le card
function renderProducts(products) {
	productsContainer.innerHTML = "";

	products.forEach(product => {
		const col = document.createElement("div");
		col.classList.add("col-6", "col-md-3");
		const productCard = createProductCard(product);

		col.appendChild(productCard);
		productsContainer.appendChild(col);
	});
}

//Chiamata fetch per recuperare i prodotti da mostrare
fetch(`${API_URL}`, {
	headers: {
		Authorization: `Bearer ${token}`,
	},
})
	.then(response => response.json())
	.then(productList => {
		spinnerContainer.classList.add("d-none");

		productsList = productList;
		//Listener per il campo di ricerca
		searchInput.addEventListener("input", () => {
			const searchText = searchInput.value.trim().toLowerCase();

			if (searchText.length >= 3) {
				// Filtra i prodotti in base al testo di ricerca
				const filteredProducts = productsList.filter(product =>
					product.brand.toLowerCase().includes(searchText)
				);

				// Aggiorna la visualizzazione con i prodotti filtrati
				renderProducts(filteredProducts);
			} else {
				// Se il testo di ricerca è troppo breve, mostra tutti i prodotti
				renderProducts(productsList);
			}
		});
		renderProducts(productList);
	})
	.catch(_error => {
		console.log("Si è verificato un errore durante la richiesta");
	});
//Funzione per reindirizzare nella pagina di gestione
function addUser() {
	window.location.href = "product-form.html";
}

const backToTopButton = document.getElementById("backToTopButton");

// Mostra il pulsante quando l'utente scende oltre una certa altezza
window.addEventListener("scroll", () => {
	if (window.scrollY > 100) {
		backToTopButton.classList.add("show");
	} else {
		backToTopButton.classList.remove("show");
	}
});

// Torna all'inizio quando il pulsante viene cliccato
backToTopButton.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth", // Scorrimento fluido
	});
});
