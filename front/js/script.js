
// Appel de l'API
const dataProduct = () => fetch('http://localhost:3000/api/products')
.then(res => res.json())

// Récuperation des données de l'API
const main = async () => {
    const resquestData = await dataProduct()
    
    .then(function(getProductApi) {

        const articles = getProductApi;
        console.table(articles);

        // Boucle qui génére les articles
        for (let article in articles) {

            // Insertion de l'élément "a"
            const productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${getProductApi[article]._id}`;

            // Insertion de l'élément "article"
            const productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            const productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = getProductApi[article].imageUrl;
            productImg.alt = getProductApi[article].altTxt;

            // Insertion du titre "h3"
            const productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = getProductApi[article].name;

            // Insertion de la description "p"
            const productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = getProductApi[article].description;
        }
    })
    .catch(err => console.log("L'API ne repond pas.", err)) 
}

main();