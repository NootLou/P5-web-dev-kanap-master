class ProductView{
    //On déclare une fonction qui affiche les données d'un produit dans la page Produit
    //cette fonction prend comme paramètre les données du produit que l'on veut afficher
    displayData(kanapInfos){
        this.kanapInfos = kanapInfos;
        let productImage = document.querySelector('.item__img')
        productImage.innerHTML = `<img src=${kanapInfos.imageUrl} alt=${kanapInfos.altText}>`
        let titleDiv = document.getElementById('title')
        titleDiv.innerHTML = kanapInfos.name
        let priceDiv = document.getElementById('price')
        priceDiv.innerHTML = kanapInfos.price
        let descriptionDiv = document.getElementById('description')
        descriptionDiv.innerText = kanapInfos.description
        let choiceOfColor = document.getElementById('colors')
        for (let i=0; i<kanapInfos.colors.length ; i++){
            choiceOfColor.innerHTML += `<option value = ${kanapInfos.colors[i]}>${kanapInfos.colors[i]}</option>`
        }
    }

    //On déclare un fonction qui écoute les inputs d'option du produit (color/quantity)
    //Cette fonction créer un objet contenant les infos du produit à ajouter au panier.
    //Si la quantité ou la couleur n'est pas renseignée elle affiche un message d'erreur,
    //Sinon elle appelle la fonction addToCart du controller pour ajouter le produit au panier
    listenProductOptions(){
        console.log('controller : ', controller);
        let addToCartButton = document.getElementById('addToCart');
        addToCartButton.addEventListener('click', (event) =>{
            let options = {
                _id : this.kanapInfos._id,
                name : this.kanapInfos.name,
                color : document.querySelector('select').value,
                quantity : parseInt(document.getElementById('quantity').value)
            }
            if (options.color === "" || options.color == undefined || options.quantity < 1 || options.quantity > 100 ){
                alert('Veuillez sélectionner une couleur et une quantité valide');
            } else {
                console.log('options cliquées : ', options);
                controller.addToCart(options);
            }
        })
    }

}