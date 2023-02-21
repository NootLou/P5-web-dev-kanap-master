class Controller{
    //on déclare une fonction asynchrone qui nous permettra d'afficher les produits de la page d'accueil 
    //avec les données reçues de l'API
    async displayAccueil(){
        let model = new Model;
        let json = await model.getData("http://localhost:3000/api/products");
        console.log('response JSON : ', json);
        let accueilView = new AccueilView;
        accueilView.displayData(json);
    }
    //on déclare une fonction asynchrone qui nous permettra d'afficher la page produit, 
    //avec le canapé sélectionné
    async displayProductPage(){
        let model = new Model;
        let canapInfos = await model.getProductPageData("http://localhost:3000/api/products/");
        console.log('canapInfos', canapInfos);
        let productView = new ProductView;
        productView.displayData(canapInfos);
        //on éxecute la fonction d'écoute du bouton d'ajout au panier
        productView.listenProductOptions();
    }
    
    //on déclare une fonction qui permet d'ajouter un produit dans le L.S
    addToCart(productOptions){
        let model= new Model;
        model.addToCart(productOptions);
    }

    //On déclare une fonction async qui permet d'afficher les produits du panier ainsi que le prix et le nombre d'articles dans le panier
    //Cette fonction permet également de vérifier les données du formulaire avant de les envoyer à l'API
    //Enfin cette fonction redirige vers la page confirmation une fois la réponse de l'API reçue.
    async displayCartPage(){
        let model = new Model;
        let cartItemsInfos = await model.getAllCartItemsData();
        let cartView = new CartView;
        cartView.displayData(cartItemsInfos);
        cartView.displayTotalPrice();
        cartView.listenQuantityInput();
        cartView.listenDeleteInput();
        let formAdministrator = new FormAdministrator;
        formAdministrator.checkFormData();
        let formDiv = document.querySelector('form');
        let formErrorMessages = document.querySelectorAll('form p');
        console.log('formErrorMeggages', formErrorMessages)
        formDiv.order.addEventListener('click', async(event) =>{
            event.preventDefault();
            formAdministrator.checkFormData(); 
            if(formErrorMessages[0].innerText !== '' || formErrorMessages[1].innerText !== '' || formErrorMessages[2].innerText !== '' || formErrorMessages[3].innerText !== '' || formErrorMessages[4].innerText !== ''){
                //on empêche le déclement de l'évènement du bouton et on affiche un message d'erreur
                event.preventDefault();
                alert('Veuillez remplir le formulaire avec des données valides')
            }else if(model.getCart() == [] || model.getCart() == null){
                event.preventDefault();
                alert('Votre panier est vide.');
            }else{
                let orderData = {
                    contact : {
                        firstName : formDiv.firstName.value,
                        lastName : formDiv.lastName.value,
                        address : formDiv.address.value,
                        city : formDiv.city.value,
                        email : formDiv.email.value
                    },
                    products : model.getCartItemId()
                }
                console.log('orderData : ', orderData)
                let orderConfirm = await model.getOrderConfirm("http://localhost:3000/api/products/order", orderData);
                console.log('orderConfirm.id', orderConfirm.orderId);
                localStorage.clear();
                window.location.href = `../html/confirmation.html?id=${orderConfirm.orderId}`;
            }
        })
    }

    //On déclare une fonction qui permet de changer la quantité d'un produit dans le L.S
    changeQuantity(newItemQuantity){
        let model= new Model;
        model.changeProductQuantity(newItemQuantity);
    }

    //On déclare une fonction qui permet de supprimer un produit dans le L.S
    deleteItem(itemData){
        let model= new Model;
        model.deleteItemFromCart(itemData);
    }

    //on déclare une fonction qui permet d'afficher la page de confirmation avec le numéro de commande
    displayConfirmationView(){
        let model = new Model;
        let orderId = model.getUrlId();
        console.log('UrlId : ', orderId);
        let confirmationView = new ConfirmationView;
        confirmationView.displayData(orderId);
    }
}


