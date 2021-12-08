function main() {
    let idCommande = document.getElementById("orderId");
    idCommande.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    alert("Bravo votre commande est validé");
    localStorage.clear();
}

main();