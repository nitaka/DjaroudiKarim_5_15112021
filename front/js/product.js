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

