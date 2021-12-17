//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
let positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart() {
    if (produitLocalStorage === null || produitLocalStorage === 0) {
        let emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let produit in produitLocalStorage) { // Boucle des Elements de l'article

            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);

            const articleProduit = `
                    <div class="cart__item__img">
                        <img src=${produitLocalStorage[produit].imgProduit} alt=${produitLocalStorage[produit].altImgProduit}>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${produitLocalStorage[produit].nomProduit}</h2>
                            <p>${produitLocalStorage[produit].couleurProduit}</p>
                            <p>${produitLocalStorage[produit].prixProduit} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[produit].quantiteProduit}">
                            </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                `;
            
            productArticle.innerHTML = articleProduit;
            
        }
    }
}



getCart();

function getTotals() {

    // Récupération du total des quantités
    let elementQuantity = document.getElementsByClassName('itemQuantity');
    let myLength = elementQuantity.length,
    totalProduct = 0;

    for (let i = 0; i < myLength; ++i) {
        totalProduct += elementQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalProduct;

    // Récupération du prix total
    totalPrice = 0;

    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elementQuantity[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}

getTotals();

// Modification d'une quantité de produit
function modifyQuantity() {
    const quantityModify = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < quantityModify.length; i++) {
        quantityModify[i].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection element à modifier en fonction de son id et sa couleur
            let quantityModif = produitLocalStorage[i].quantiteProduit;
            let quantityModifyValue = quantityModify[i].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.quantityModifyValue !== quantityModif);

            resultFind.quantiteProduit = quantityModifyValue;
            produitLocalStorage[i].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // rafraichissement
            location.reload();
            
        })
    }
}

modifyQuantity();

// Suppression produit
function deleteProduct() {
    const btnDelete = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click" , (e) => {
            e.preventDefault();

            //Selection element à supprimer en fonction de son id et sa couleur
            let idDelete = produitLocalStorage[i].idProduit;
            let colorDelete = produitLocalStorage[i].colorProduct;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.colorProduct !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            location.reload();

        })
    }
}

deleteProduct();

// Formulaire
let form = document.querySelector(".cart__order__form");

//Création expressions régulières
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


// Ecoute de modification prenom + message erreur
form.firstName.addEventListener('change', function() {
    let firstNameErrorMsg = inputName.nextElementSibling;

    if (charRegExp.test(inputName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
});

// Ecoute de modification nom + message erreur
form.lastName.addEventListener('change', function() {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
});

// Ecoute de modification adresse + message erreur
form.address.addEventListener('change', function() {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
});

// Ecoute modification ville + message erreur
form.city.addEventListener('change', function() {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
});

// Ecoute de modification du Email + message erreur
form.email.addEventListener('change', function() {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
});

//Récupération des coordonnées du formulaire client
let inputName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputMail = document.getElementById('email');

//Envoi des informations au localstorage
function postForm() {
    let btnCommande = document.getElementById("order");

    //Ecouter le panier
    btnCommande.addEventListener("click", (event)=> {

        event.preventDefault();

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        // test de validation formulaire
        const validName = charRegExp.test(inputName.value);
        const validLastName = charRegExp.test(inputLastName.value);
        const validAddress = addressRegExp.test(inputAddress.value);
        const validCity = charRegExp.test(inputCity.value);
        const validMail = emailRegExp.test(inputMail.value);

        // condition d'envoi du formulaire
        if(validName && validLastName && validAddress && validCity && validMail) {
            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json', 
                    "Content-Type": "application/json" 
                },
            };
    
            fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);
    
                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
            });
        } else {
            alert("Oups\ud83d\ude05 le formulaire est incorrect !");
        }
        
    })
}

postForm()
