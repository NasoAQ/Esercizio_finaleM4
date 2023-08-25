const API_URL = 'https://striveschool-api.herokuapp.com/api/product/'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0N2M5ZGRmZmI4YjAwMTQ0MTNiOWYiLCJpYXQiOjE2OTI2OTU3MDksImV4cCI6MTY5MzkwNTMwOX0.axZpS7dRbLk519HLKSPjQU8qtZSRkC9yRx42oAu_n1c"
const form = document.getElementById('product-form');

const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('imageUrl');
const priceInput = document.getElementById('price');

form.addEventListener('submit', async (event) => {

    event.preventDefault();
  
    const isFormValid = handelFormValidation();
    if (!isFormValid) return false;
  
    const product = {
      name: nameInput.value,
      description: descriptionInput.value,
      brand: brandInput.value,
      imageUrl: imageUrlInput.value,
      price: priceInput.value,
    }
    try {
    
        const response = await fetch(`${API_URL}`, {
          method: 'POST',
          body: JSON.stringify(product),
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0N2M5ZGRmZmI4YjAwMTQ0MTNiOWYiLCJpYXQiOjE2OTI2OTU3MDksImV4cCI6MTY5MzkwNTMwOX0.axZpS7dRbLk519HLKSPjQU8qtZSRkC9yRx42oAu_n1c",
            'Content-type': 'application/json; charset=UTF-8'
            }
        })
    
        if (response.ok) {
          //window.location.href = 'product-form.html'
        } else {
          alert('Si è verificato un errore durante la creazione dell\'utente.')
        }
      } catch (error) {
        console.log('Errore durante il salvataggio: ', error);
        alert('Si è verificato un errore durante il salvataggio.')
      };
      fetchProducts()
})

function handelFormValidation() {
  
        const validation = validateForm()
        let isValid = true;
      
        if (!validation.isValid) {
      
          for (const field in validation.errors) {
            const errorElement = document.getElementById(`${field}-error`)
            errorElement.textContent = '';
            errorElement.textContent = validation.errors[field]
          }
      
          isValid = false
          
        }
      
        return isValid
      
}

function validateForm() {
    const errors = {}
  
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const brand = document.getElementById('brand').value
    const imageUrl = document.getElementById('imageUrl').value
    const price = document.getElementById('price').value
  
    if (!name) errors.name = "Il campo nome è obbligatorio."
    else errors.name = "";
  
    if (!description) errors.description = "Il campo descrizione è obbligatorio."
    else errors.description = "";
  
    if (!brand) errors.brand = "Il campo brand è obbligatorio."
    else errors.brand = "";
  
    if (!imageUrl) errors.imageUrl = "Il campo imageUrl è obbligatorio."
    else errors.imageUrl = "";
  
    if (!price) errors.price = "Il campo prezzo è obbligatorio."
    else errors.price = "";
  
    return {
      isValid: Object.values(errors).every(value => value === ''),
      errors
    }
    
}

async function fetchProducts() {

    try {
      const response = await fetch(`${API_URL}`, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0N2M5ZGRmZmI4YjAwMTQ0MTNiOWYiLCJpYXQiOjE2OTI2OTU3MDksImV4cCI6MTY5MzkwNTMwOX0.axZpS7dRbLk519HLKSPjQU8qtZSRkC9yRx42oAu_n1c",
            'Content-type': 'application/json; charset=UTF-8'
            }
      });
      const data = await response.json()
  
      // AGGIUNGERE PRODOTTI ALLA TABELLA
      displayProducts(data);
  
    } catch (error) {
      console.log('Errore nel recupero dei prodotti: ', error);
    }
}


function displayProducts(products) {
  
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = ''
  
    products.forEach(product => {
      
      const row = `
        <tr>
          <td>${product._id}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>${product.brand}</td>
          <td>${product.imageUrl}</td>
          <td>${product.price} €</td>
          <td>
            <!-- Inserire pulsanti per modifica e cancellazione -->
            <button type="reset" class="delete-button my-btn btn btn-outline-danger" data-product-id="${product._id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></button>
            <button data-product-id="${product._id}" type="reset" class="edit-button my-btn btn btn-outline-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg></button>
          </td>
  
        </tr>
      `
  
      tableBody.innerHTML += row
    });

    const deleteBtn = document.querySelectorAll('.delete-button');
    deleteBtn.forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-product-id');
            deleteProduct(productId);
        });
    });
    
    const editBtn = document.querySelectorAll('.edit-button');
    editBtn.forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-product-id');
            editProduct(productId);
            document.getElementById('Form').scrollIntoView({behavior: 'smooth'});
        });
        
    });
}

function editProduct(productId) {
    fetch(`${API_URL}${productId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-type': 'application/jason; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(product => {
        // Popola i campi del form con i dati del prodotto
        nameInput.value = product.name;
        descriptionInput.value = product.description;
        brandInput.value = product.brand;
        imageUrlInput.value = product.imageUrl;
        priceInput.value = product.price;
    })
    .catch(error => {
        console.log('Errore nel recupero dei dettagli',error);
    })
}

function deleteProduct(productId) {
    const deleteButton = document.querySelector(`button[data-product-id="${productId}"]`);
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const confirmDeleteButton = document.getElementById('confirmDelete');

    // Apri la modale di conferma
    deleteModal.show();

    // Aggiungi l'event listener per il pulsante di conferma nella modale
    confirmDeleteButton.addEventListener('click', () => {
        deleteModal.hide(); // Chiudi la modale

        // Continua con la cancellazione
        const deleteUrl = `${API_URL}${productId}`;
        const deleteMethod = {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'content-type': 'application/json; charset=UTF-8'
            }
        };

        fetch(deleteUrl, deleteMethod)
        .then(res => res.json())
        .then(deleteData => {
            console.log(deleteData);
            fetchProducts();
        })
        .catch(err => console.log(err));
    });

    // Aggiungi l'event listener per il pulsante di annullamento nella modale
    const cancelDeleteButton = document.getElementById('cancelDelete');
    cancelDeleteButton.addEventListener('click', () => {
        deleteButton.disabled = false; // Riattiva il pulsante di eliminazione
    });
    fetchProducts()
}


fetchProducts() 

//displayProducts(products);


