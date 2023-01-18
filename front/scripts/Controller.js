class Controller{
    //on déclare une fonction asynchrone qui nous permettra d'afficher les produits de la page d'accueil avec les données reçues de l'API
    async displayAccueil(){
        //on initie une variable qui contient une instance de la classe Model
        let model = new Model
        //on initie une variable qui contient le résulat de la promise de model.getData()
        let json = await model.getData("http://localhost:3000/api/products")
        //on initie une variable qui contient une instance de la classe AccueilView
        let accueilView = new AccueilView
        //on execute la fonction accueilView.displayData avec comme argument la variable json qui contient les données de l'API
        accueilView.displayData(json)
    }
    //on déclare une variable asynchrone qui nous permettra d'afficher la page produit, avec le canapé sélectionné
    async displayProductPage(){
        //on initie une variable qui contient une instance de la classe Model
        let model = new Model
        //on initie une variable qui contient le résultat de la promise de model.getProductData()
        let json = await model.getProductPageData("http://localhost:3000/api/products/")
        console.log(json)
        //on initie une variable qui contient une instance de la classe ProductView
        let productView = new ProductView
        //on execute la fonction poductView.displayData avec pour argument la variable json qui contient les données de l'API
        productView.displayData(json)
    }
}


