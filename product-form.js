const API_URL = 'https://striveschool-api.herokuapp.com/api/product/'

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
          <td>${product.price}</td>
          <td>
            <!-- Inserire pulsanti per modifica e cancellazione -->
            <button type="reset" class="my-btn btn btn-outline-primary">Elimina</button>
            <button type="reset" class="my-btn btn btn-outline-info">Modifica</button>
          </td>
  
        </tr>
      `
  
      tableBody.innerHTML += row
    });
  
  }

fetchProducts() 
