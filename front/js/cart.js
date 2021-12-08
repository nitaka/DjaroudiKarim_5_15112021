//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");


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
        
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
        
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = produitLocalStorage[produit].imgProduit;
            productImg.alt = produitLocalStorage[produit].altImgProduit;
            
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";
        
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";
            
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = produitLocalStorage[produit].nomProduit;
        
            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
            productColor.style.fontSize = "20px";
        
            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";
        
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";
        
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            
            // Insertion de "Qté : "
            let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = "Qté : ";
        
            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = produitLocalStorage[produit].quantiteProduit;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
        
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
        
            // Insertion de "p" supprimer
            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";

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
    console.table(totalProduct);

    // Récupération du prix total
    totalPrice = 0;

    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elementQuantity[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.table(totalPrice);
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
        console.log(idProducts);

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
                console.log(data);
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