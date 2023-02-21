class Model{
    //on déclare une fonction qui retourne au format JSON les données de l'API
    //La fonction prend comme argument l'url
    getData(url){
        return fetch(url)
        .then( (response) => {
            if(response.ok){
                return response.json();   
            }
        })
        .catch(function(error){
            console.log("Une erreur est survenue lors de la récupération de toutes les données de l'API")
        })
    }

    //on déclare une fonction qui récupere et retourne l'id  dans l'url de la page 
    getUrlId(){
        let searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get("id");
        return id
    }

    //On déclare une fonction qui va retourner les données d'un seul produit de l'API au format JSON,
    //grâce à l'ID du produit récupéré dans l'url de la page
    getProductPageData(url){
        let id = this.getUrlId();
        return fetch(url + id)
        .then( (response) =>{
            if (response.ok) {
                return response.json();
            }
        })
        .catch(function(error){
            console.log("Une erreur est survenue lors de la récupération des données pour la page Produit.");
        })
    }

    //On déclare une fonction qui retourne le contenu de la key 'cart' du LocalStorage dans un tableau
    //'cart' contient le contenu du panier
    getCart(){
        let cartArray = [];
        cartArray = JSON.parse(localStorage.getItem('cart'));
        return cartArray;
    }

    //on déclare une fonction qui enregistre les données de la key 'cart' dans le L.S
    //la fonction prend comme paramètre un tableau contenant les produits à enregistrer
    saveCart(cartArray){
        localStorage.setItem('cart', JSON.stringify(cartArray));
    }

    //On déclare une fonction qui permet d'ajouter un produit dans le L.S. Elle prend comme paramètres les options du produit (id,name,color,quantity)
    //Si le L.S est vide, il ajoute le premier produit, sinon, 
    //la fonction va chercher s'il y a un produit similaire dans le L.S (même ID et même couleur)
    //Si un produit similaire est déjà présent, la fonction va seulement modifier/ajouter la quantité
    //Sinon, la fonction va ajouter le nouveau produit au L.S
    addToCart(productOptions){
        let localStorageContent = this.getCart();
        if(localStorageContent == null){
            localStorageContent = [];
            localStorageContent.push(productOptions)
            this.saveCart(localStorageContent);
            console.log("ajout du premier objet dans localStorageContent : ", localStorageContent)
            alert("Vous venez d'ajouter un produit dans le panier")
        } else{ 
            let searchProductInLocalStorage = localStorageContent.find(kanap => kanap._id == productOptions._id && kanap.color == productOptions.color);
            console.log("Produit identique trouvé dans le L.S : ", searchProductInLocalStorage);
            if(searchProductInLocalStorage != undefined){
                let newQuantity = productOptions.quantity + searchProductInLocalStorage.quantity;
                searchProductInLocalStorage.quantity = newQuantity;
                console.log('nouvelle quantité après ajout : ', searchProductInLocalStorage.quantity);
                this.saveCart(localStorageContent);
                console.log('nouvelle quantité mise à jour dans le L.S : ', localStorageContent);
                alert("Vous venez d'ajouter un produit déjà présent dans le panier")
            } else{ 
                localStorageContent.push(productOptions)
                this.saveCart(localStorageContent);
                console.log('un nouvel objet a été ajouté : ', localStorageContent)
                alert("Vous venez d'ajouter un nouveau produit dans le panier")
            }
        }
    }

    // On déclare une fonction qui permet de récupérer les données de l'API pour un seul canapé présent dans le L.S
    // La fonction prend comme argument le L.S sous forme de tableau
    getCanapData(canapInCartList){
        return fetch("http://localhost:3000/api/products/" + canapInCartList._id)
        .then( (response) =>{
            if (response.ok) {
                return response.json();
            }
        })
        .catch(function(error){
            console.log("Une erreur est survenue lors de la récupération des données du canapé présent dans le L.S ");
        })
    }

    //on déclare une fonction async qui retourne les données de chaque canap présent dans le L.S 
    //sous forme d'objets dans un tableau
    async getAllCartItemsData(){
        let localStorageContent = this.getCart();
        console.log('localStorageContent : ', localStorageContent);  
        let cartItemsInfosArray = [];
        if(localStorageContent == null){
            return
        } else{
            for (let i=0; i<localStorageContent.length; i++){
                await this.getCanapData(localStorageContent[i])
                .then( (canapInfos) =>{
                    let infos = {
                        name : canapInfos.name,
                        _id : canapInfos._id,
                        color : localStorageContent[i].color,
                        quantity : localStorageContent[i].quantity,
                        price : canapInfos.price,
                        image : canapInfos.imageUrl,
                        altTxt : canapInfos.altTxt
                    }
                    cartItemsInfosArray.push(infos);
                })
            }
            console.log('cartItemsInfosArray : ', cartItemsInfosArray)
            return cartItemsInfosArray
        }
    }

    //on déclare une fonction qui permet de changer la quantité d'un produit dans le panier/L.S
    changeProductQuantity(newOptionsProduct){
        let localStorageContent = this.getCart();
        let itemInLocalStorage = localStorageContent.find(item => item._id == newOptionsProduct._id && item.color == newOptionsProduct.color);
        console.log('itemInLocalStorage : ', itemInLocalStorage);
        itemInLocalStorage.quantity = newOptionsProduct.newQuantity;
        console.log('itemInLocalStorage.quantity : ', itemInLocalStorage.quantity);
        this.saveCart(localStorageContent);
        // window.location.reload();
    }

    //On déclare uen fonction qui permet de supprimer un item du panier/L.S 
    deleteItemFromCart(itemData){
        let localStorageContent = this.getCart();
        console.log('localStorageContent', localStorageContent);
        if (localStorageContent.length == 0){
            localStorage.removeItem('cart');
            window.location.reload();
        } else{
            let itemInLocalStorage = localStorageContent.find(item => item._id == itemData._id && item.color == itemData.color);
            console.log('itemInLocalStorage à supprimer: ', itemInLocalStorage);
            let deleteItemIndex = localStorageContent.indexOf(itemInLocalStorage);
            console.log('deleteItemIndex', deleteItemIndex);
            localStorageContent.splice(deleteItemIndex, 1);
            console.log(`l'item [${deleteItemIndex+1}] du localStorageContent a été supprimé`, localStorageContent);
            this.saveCart(localStorageContent);
            window.location.reload();
        }
    } 

    //on déclare une fonction qui retournera un tableau contenant l'id de chaque produit du panier
    getCartItemId(){
        let cartArray = this.getCart();
        let idArray = [];
        for (let i=0; i<cartArray.length; i++){
            let itemId = cartArray[i]._id;
            idArray.push(itemId)
        }
        console.log('idArray', idArray);
        return idArray
    }
    
    //on déclare une fonction qui envoie les données  de la commande (contact+productsId) à l'api grâce à la méthode POST
    //et retourne la réponse de l'api
    //cette fonction prend comme parametre l'url de l'api et les données à envoyer
    async getOrderConfirm(url, body){
        let response = await fetch(url , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        let result = await response.json();
        console.log('confirm : ', result);
        console.log('result.orderId : ', result.orderId);
        return result;
    }

    // rediction(){

    // }
}
