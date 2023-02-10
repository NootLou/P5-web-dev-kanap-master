class Controller{
    //on déclare une fonction asynchrone qui nous permettra d'afficher les produits de la page d'accueil avec les données reçues de l'API
    async displayAccueil(){
        //on déclare une variable qui contient une instance de la classe Model
        let model = new Model;
        //on déclare une variable qui contient le résulat de la promise de model.getData()
        let json = await model.getData("http://localhost:3000/api/products");
        console.log('response JSON : ', json);
        //on déclare une variable qui contient une instance de la classe AccueilView
        let accueilView = new AccueilView;
        //on execute la fonction accueilView.displayData avec comme argument la variable json qui contient les données de l'API
        accueilView.displayData(json);
    }
    //on déclare une fonction asynchrone qui nous permettra d'afficher la page produit, avec le canapé sélectionné
    async displayProductPage(){
        //on déclare une variable qui contient une instance de la classe Model
        let model = new Model;
        //on déclare une variable qui contient le résultat de la promise de model.getProductData()
        let json = await model.getProductPageData("http://localhost:3000/api/products/");
        console.log(json);
        //on déclare une variable qui contient une instance de la classe ProductView
        let productView = new ProductView;
        //on execute la fonction productView.displayData avec pour argument la variable json qui contient les données de l'API
        productView.displayData(json);
        //on execute la fonction  addToCartButton avec pour argument la variable json qui contient les données du produit sélectionné sur la page d'accueil
        model.addToCartButton(json);
    }

    //On déclare une fonction async qui nous permettra d'afficher la page Panier
    async displayCartPage(){
        //on déclare une variable qui contient une instance de la classe Model
        let model = new Model;
        //on déclare une variable qui contient le résultat de la promise de model.getAllCartItemsData
        //Le résultat contient un tableau avec les infos de chaque produit dans le L.S
        let cartItemsInfos = await model.getAllCartItemsData();
        //on déclare une variable qui contient une instance de la classe CartView
        let cartView = new CartView;
        //on execute la fonction displayData de l'instance de la classe CartView
        //Cette fonction permet d'afficher les infos de chaque produit du L.S sur la page panier
        cartView.displayData(cartItemsInfos);
        //On execute la fonction quantityInputButton() qui permet de modifier la quantité des produits dans le panier
        //directement depuis la page Panier
        model.quantityInputButton();
        //On execute la fonction deleteButton() qui permet de supprimer un item du panier depuis la page panier.
        model.deleteButton(); 
        // model.getFormData();
        let formAdministrator = new FormAdministrator;
        formAdministrator.getFormData();
    }
}


