const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJkZWZjNzJiYzY0NjAwMTlkYmJhY2YiLCJpYXQiOjE3MDY5NDY1MDQsImV4cCI6MTcwODE1NjEwNH0.OFx1rdhiosl1TXwQVfg1hShUVaELUPJDAavLAhozedE";
const form = document.getElementById("product-form");
const editForm = document.getElementById("product-form");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

const addButton = document.getElementById("add-button");
const addModal = new bootstrap.Modal(document.getElementById("addModal"));
const confirmAddButton = document.getElementById("confirmAdd");
//Gestisco gli elementi per la modifica del prodotto
const editButton = document.getElementById("save-edit-button");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const confirmEditButton = document.getElementById("confirmEdit");
//Recupero il valore dell'input nel campo di ricerca
const searchInput = document.getElementById("searchInput");
let productsList = [];

//Aggiungo un listener per aprire la modale di aggiunta
addButton.addEventListener("click", event => {
	event.preventDefault();
	const isFormValid = handelFormValidation();
	if (!isFormValid) {
		alert("Si è verificato un errore durante l'aggiunta del prodotto");
		return;
	}
	addModal.show();
	//console.log('modale aperta');
});

// Aggiungo l'event listener per il pulsante di conferma nella modale di aggiunta
confirmAddButton.addEventListener("click", async () => {
	addModal.hide(); // Chiudo la modale

	// Continuo con l'aggiunta del prodotto
	const isFormValid = handelFormValidation();
	if (!isFormValid) {
		alert("Si è verificato un errore durante l'aggiunta del prodotto");
		return;
	}

	const newProduct = {
		name: nameInput.value,
		description: descriptionInput.value,
		brand: brandInput.value,
		imageUrl: imageUrlInput.value,
		price: priceInput.value,
	};

	try {
		const response = await fetch(`${API_URL}`, {
			method: "POST",
			body: JSON.stringify(newProduct),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json; charset=UTF-8",
			},
		});

		if (response.ok) {
			fetchProducts(); // Aggiorno la tabella dei prodotti
			clearForm();
			const successAlert = document.getElementById("success-alert");
			successAlert.classList.remove("d-none");
			setTimeout(() => {
				successAlert.classList.add("d-none");
			}, 3000);

			window.scrollTo(0, 0);
		} else {
			alert("Si è verificato un errore durante l'aggiunta del prodotto.");
		}
	} catch (error) {
		console.log("Errore durante l'aggiunta: ", error);
		alert("Si è verificato un errore durante l'aggiunta.");
	}
});

//Funzione per svuotare il form
function clearForm() {
	nameInput.value = "";
	descriptionInput.value = "";
	brandInput.value = "";
	imageUrlInput.value = "";
	priceInput.value = "";
}

//Funzione per controllare se il form è valido
function handelFormValidation() {
	const validation = validateForm();
	let isValid = true;

	if (!validation.isValid) {
		for (const field in validation.errors) {
			const errorElement = document.getElementById(`${field}-error`);
			errorElement.textContent = "";
			errorElement.textContent = validation.errors[field];
		}

		isValid = false;
	}

	return isValid;
}

//Funzione per i messaggi di errore nei campi obbligatori del form
function validateForm() {
	const errors = {};

	const name = document.getElementById("name").value;
	const description = document.getElementById("description").value;
	const brand = document.getElementById("brand").value;
	const imageUrl = document.getElementById("imageUrl").value;
	const price = document.getElementById("price").value;

	if (!name) errors.name = "Il campo nome è obbligatorio.";
	else errors.name = "";

	if (!description) errors.description = "Il campo descrizione è obbligatorio.";
	else errors.description = "";

	if (!brand) errors.brand = "Il campo brand è obbligatorio.";
	else errors.brand = "";

	if (!imageUrl) errors.imageUrl = "Il campo imageUrl è obbligatorio.";
	else errors.imageUrl = "";

	if (!price) errors.price = "Il campo prezzo è obbligatorio.";
	else errors.price = "";

	return {
		isValid: Object.values(errors).every(value => value === ""),
		errors,
	};
}

//Funzione PRINCIPALE per effettuare la chiamata GET
async function fetchProducts() {
	const spinnerContainer = document.getElementById("spinner-container");
	const mainContent = document.getElementById("Lista");
	spinnerContainer.classList.remove("d-none");

	try {
		const response = await fetch(`${API_URL}`, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJkZWZjNzJiYzY0NjAwMTlkYmJhY2YiLCJpYXQiOjE3MDY5NDY1MDQsImV4cCI6MTcwODE1NjEwNH0.OFx1rdhiosl1TXwQVfg1hShUVaELUPJDAavLAhozedE",
				"Content-type": "application/json; charset=UTF-8",
			},
		});
		const data = await response.json();
		productsList = data;

		setTimeout(() => {
			spinnerContainer.classList.add("d-none");
			mainContent.style.display = "block";
			// AGGIUNGERE PRODOTTI ALLA TABELLA
			displayProducts(productsList);
		}, 500);
	} catch (error) {
		console.log("Errore nel recupero dei prodotti: ", error);
	}
}

//Funzione per creare gli elementi in tabella
function displayProducts(products) {
	const tableBody = document.getElementById("products-table-body");
	tableBody.innerHTML = "";

	products.forEach(product => {
		const row = `
        <tr>
          <td>${product._id}</td>
          <td><a class="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover" href="dettagli.html?_id=${product._id}">${product.name}</a></td>
          <td>${product.description}</td>
          <td>${product.brand}</td>
          <td>${product.imageUrl}</td>
          <td>${product.price} €</td>
          <td>
            <!-- Inserire pulsanti per modifica e cancellazione -->
            <button type="reset" class="delete-button my-btn btn btn-outline-danger" data-product-id="${product._id}" data-bs-toggle="tooltip" title="Cancella" placement="top"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></button>
            <button data-product-id="${product._id}" type="reset" class="edit-button my-btn btn btn-outline-success" data-bs-toggle="tooltip" title="Modifica"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg></button>
          </td>
  
        </tr>
      `;

		tableBody.innerHTML += row;
	});

	const deleteBtn = document.querySelectorAll(".delete-button");
	deleteBtn.forEach(button => {
		button.addEventListener("click", event => {
			const productId = event.currentTarget.getAttribute("data-product-id");
			console.log("Hai clickato delete per ID:", productId);
			deleteProduct(productId);
		});
	});

	const editBtn = document.querySelectorAll(".edit-button");
	editBtn.forEach(button => {
		button.addEventListener("click", event => {
			const productId = event.currentTarget.getAttribute("data-product-id");
			console.log("Hai clickato edit per ID:", productId);
			editProduct(productId);

			editButton.setAttribute("data-product-id", productId);

			document.getElementById("Form").scrollIntoView({ behavior: "smooth" });
		});
	});
}

//Funzione per recuperare i dati del prodotto da modificare
function editProduct(productId) {
	fetch(`${API_URL}${productId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then(response => response.json())
		.then(product => {
			// Popola i campi del form con i dati del prodotto
			nameInput.value = product.name;
			descriptionInput.value = product.description;
			brandInput.value = product.brand;
			imageUrlInput.value = product.imageUrl;
			priceInput.value = product.price;

			const editForm = document.getElementById("product-form");
			editForm.setAttribute("data-product-id", productId);
		})
		.catch(error => {
			console.log("Errore nel recupero dei dettagli", error);
		});
}
//Aggiungo un listener al pulsante di modifica
editButton.addEventListener("click", async event => {
	event.preventDefault();

	const productId = editButton.getAttribute("data-product-id"); // Recupera l'ID del prodotto dal form

	const isFormValid = handelFormValidation();
	if (!isFormValid) {
		alert("Si è verificato un errore durante la modifica del prodotto");
		return;
	}

	editModal.show();

	// Aggiungi l'event listener per il pulsante di conferma nella modale
	confirmEditButton.addEventListener("click", async () => {
		editModal.hide(); // Chiudi la modale

		const updatedProduct = {
			name: nameInput.value,
			description: descriptionInput.value,
			brand: brandInput.value,
			imageUrl: imageUrlInput.value,
			price: priceInput.value,
		};

		try {
			const response = await fetch(`${API_URL}${productId}`, {
				method: "PUT",
				body: JSON.stringify(updatedProduct),
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-type": "application/json; charset=UTF-8",
				},
			});

			if (response.ok) {
				fetchProducts(); // Aggiorna la tabella dei prodotti
				clearForm(); // Svuota il form
				const editAlert = document.getElementById("edit-alert");
				editAlert.classList.remove("d-none");
				setTimeout(() => {
					editAlert.classList.add("d-none");
				}, 3000);

				window.scrollTo(0, 0);
			} else {
				alert("Si è verificato un errore durante la modifica del prodotto.");
			}
		} catch (error) {
			console.log("Errore durante la modifica: ", error);
			alert("Si è verificato un errore durante la modifica.");
		}
	});
});

//Funzione per eliminare un prodotto con il metodo DELETE
function deleteProduct(productId) {
	const deleteModal = new bootstrap.Modal(
		document.getElementById("deleteModal")
	);
	const confirmDeleteButton = document.getElementById("confirmDelete");
	const cancelDeleteButton = document.getElementById("cancelDelete");

	// Memorizza l'ID del prodotto nella variabile productIdToDelete
	let productIdToDelete = productId;

	// Aggiungi l'event listener per il pulsante di conferma nella modale
	confirmDeleteButton.addEventListener("click", async event => {
		event.preventDefault();

		// Utilizza l'ID del prodotto memorizzato in productIdToDelete
		console.log("ID prodotto:", productIdToDelete);
		const deleteUrl = `${API_URL}${productIdToDelete}`;
		const deleteMethod = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/json; charset=UTF-8",
			},
		};

		try {
			const response = await fetch(deleteUrl, deleteMethod);
			const deleteData = await response.json();
			console.log(deleteData);
			fetchProducts();
			const deleteAlert = document.getElementById("delete-alert");
			deleteAlert.classList.remove("d-none");
			setTimeout(() => {
				deleteAlert.classList.add("d-none");
			}, 3000);

			window.scrollTo(0, 0);
		} catch (err) {
			console.log("Operazione annullata", err);
		}

		deleteModal.hide(); // Chiudi la modale
	});

	// Aggiungi l'event listener per il pulsante di annullamento nella modale
	cancelDeleteButton.addEventListener("click", () => {
		deleteModal.hide(); // Chiudi la modale
	});

	// Apri la modale di conferma dopo un breve timeout
	setTimeout(() => {
		deleteModal.show();
	}, 100);
}

// Aggiungi un event listener per l'evento 'input' al campo di ricerca
searchInput.addEventListener("input", () => {
	const searchText = searchInput.value.trim().toLowerCase();

	if (searchText.length >= 3) {
		// Filtra i prodotti in base al testo di ricerca
		const filteredProducts = productsList.filter(product =>
			product.brand.toLowerCase().includes(searchText)
		);

		// Aggiorna la visualizzazione con i prodotti filtrati
		displayProducts(filteredProducts);
	} else {
		// Se il testo di ricerca è troppo breve, mostra tutti i prodotti
		displayProducts(productsList);
	}
});

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

fetchProducts();

//displayProducts(products);
