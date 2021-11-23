let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
let article = "";
console.log(idProduct);

const colorSofa = document. querySelector("#colors");
const quantitySofa = document.querySelector("#quantity");


// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then(res => res.json())

    .then(async function (getProductApi) {
        article = await getProductApi;
        console.table(article);
        if (article){
            getProduct(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}

getArticle()


function getProduct(article){
    
    // Récupération image de l'article
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Récupération titre l'article
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Récupération du prix de l'article
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Récupération de la description de l'article
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }

    addToCart(article);
}

//Gestion du panier
function addToCart(article) {
    const btnPostPanier = document.querySelector("#addToCart");

    //Ecoute et initialisation couleur et quantité
    btnPostPanier.addEventListener("click", (e) => {
        if (quantitySofa.value > 0 && quantitySofa.value <=100 && quantitySofa.value != 0) {

        //Recupération du choix de la couleur
        let choiceColor = colorSofa.value;
                    
        //Recupération du choix de la quantité
        let choiceAmont = quantitySofa.value;

        //Récupération objet options de l'article à ajouter au panier
        let optionsProduit = {
            idProduit: idProduct,
            couleurProduit: choiceColor,
            quantiteProduit: Number(choiceAmont),
            nomProduit: article.name,
            prixProduit: article.price,
            descriptionProduit: article.description,
            imgProduit: article.imageUrl,
            altImgProduit: article.altTxt
        };

        //Initialisation du local storage
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

        //Ajout panier
        const addPanier = () => {
            window.location.href ="cart.html";
        }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choiceColor);
        
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            addPanier();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            addPanier();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        addPanier();
    }}
    });
}