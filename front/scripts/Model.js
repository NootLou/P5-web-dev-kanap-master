// fetch("http://localhost:3000/api/products")
// .then(function(response){
//     if( response.ok){
//         return response.json();
//     }
// })
// .then(function(value){
//     console.log(value);
//     console.log(value[0]);
//     document.getElementById('items')
//     let itemsDiv = document.getElementById('items')
//     itemsDiv.innerHTML = value[0]
// })
// .catch(function(error){
//     console.log("Une erreur est survenue");
// })

class Model{
    //déclaration d'une fonction récupérant les données de l'API
    //La fonction prend comme argument l'Url de l'API
    getData(url){
        //On retourne le résultat de la requête de type get (grâce à fetch)
        return fetch(url)
        // puis on déclare une fonction fléchée qui prend comme argument la réponse de fetch
        .then( (response) => {
            //Si la réponse est bien récupérée (response.ok)
            if(response.ok){
                // la reponse de fetch est ensuite retournée au format json s'il n'y pas eu d'erreur
                return response.json();   
            }
        })
        //En cas d'erreur, la console affiche un message d'erreur
         .catch(function(error){
            console.log("Une erreur est survenue lors de la récupération de toutes les données de l'API")
        })
    }

    //On déclare une fonction qui va seulement récupérer les données du canapé sélectionner sur la page d'accueil
    getProductPageData(url){
        //On récupère l'adresse du navigateur
        let searchParams = new URLSearchParams(window.location.search);
        //on récupère la partie id de l'adresse du navigateur
        let id = searchParams.get("id");
        //on retourne les données reçues de l'api grâce à  la fonction fetch() qui prend en paramètre l'url de l'api
        return fetch(url + id)
        //puis on déclare une fonction fléchée qui prend en paramètre les données retournées précédemment
        .then( (response) =>{
            //si la response est bien reçue
            if (response.ok) {
                //on la retourne au format JSON
                return response.json();
            }
        })
        //si une erreur se produit
        .catch(function(error){
            //on affiche un message d'erreur dans la console
            console.log("Une erreur est survenue lors de la récupération des données pour la page Produit.");
        })
    }

    //On déclare une fonction qui retourne le contenu du L.S dans un tableau
    getCart(){
        //on déclare une variable qui contiendra les données du L.S dans un tableau
        let cartArray = [];
        //On rempli le tableau de cartArray avec les données parsée du L.S
        cartArray = JSON.parse(localStorage.getItem('cart'));
        //on retourne le tableau qui contient à présent les données du L.S
        return cartArray;
    }

    //on déclare une fonction qui enregistre le panier/L.S
    saveCart(cartArray){
        localStorage.setItem('cart', JSON.stringify(cartArray));
    }

    //On déclare une fonction qui permet d'ajouter des produits dans le panier/L.S au clic sur le bouton d'ajout au panier de la page produit
    //changer le nom 
    addToCartButton(product){
        //on déclare une variable contenant l'emplacement du bouton d'ajout au panier
        let addButton = document.getElementById('addToCart');
        //on écoute l'évènement qui se déclenche au clic sur le bouton d'ajout
        addButton.addEventListener("click", (event) => {
            //on déclare 4 variables contenant les données du produit que l'on veut enregistrer dans le LocalStorage
            let id = product._id;
            let name = product.name;
            let colorOption = document.querySelector('select').value;
            let quantity = document.getElementById('quantity').value;

            //on vérifie si les options du produit son bien définies (couleur + quantité )
            if (colorOption === "" || colorOption == undefined || quantity < 1 || quantity > 100 ){
                //si la couleur n'est pas renseignée ou si la quantité n'est pas valide
                //on affiche un message d'erreur
                alert('Veuillez sélectionner une couleur et une quantité valide');
            }else { //sinon, on enregistre les données du produit dans l'objet productOptions
                let productOptions = {
                    id : id,
                    name : name,
                    color : colorOption,
                    quantity : parseInt(quantity)
                };
                console.log("produit cliqué : ", productOptions);

                //on déclare une variable contenant le L.S
                let localStorageContent = this.getCart();
                console.log('localStorageContent : ', localStorageContent)
                
                //Si le L.S est vide,
                if(localStorageContent == null){
                    //on créer un tableau vide
                    localStorageContent = [];
                    // auquel on ajoute l'objet productOptions
                    localStorageContent.push(productOptions)
                    //ensuite on créer la key/valeur du panier avec les données linéarisées du tableau LocalStorageContent
                    this.saveCart(localStorageContent);
                    console.log("ajout du premier objet dans localStorageContent : ", localStorageContent)
                    //On affiche un message à l'écran pour informer l'utilisateur que le produit a été ajuoté au panier
                    alert("Vous venez d'ajouter un produit dans le panier")
                } else{ // Si le L.S n'est pas vide
                    //et si LocalStorageContent n'est pas vide
                    if(localStorageContent){
                        //on déclare une variable contenant le résultat de la recherche dans le L.S
                        //on cherche si le produit n'est pas déjà dans le L.S avec la même couleur en parcourant les données du L.S grâce à localStorageContent.find()
                        //si aucun produit similaire n'est trouvé, la variable = undefined
                        let searchProductInLocalStorage = localStorageContent.find(kanap => kanap.id == productOptions.id && kanap.color == productOptions.color);
                        console.log("Produit identique trouvé dans le L.S : ", searchProductInLocalStorage);
                        // si un produit similaire est trouvé
                        if(searchProductInLocalStorage != undefined){
                            //on déclare une variable contenant la nouvelle quantité du produit
                            let newQuantity = productOptions.quantity + searchProductInLocalStorage.quantity;
                            //puis on met à jour la quantité du produit dans la variable searchProductInLocalStorage
                            searchProductInLocalStorage.quantity = newQuantity;
                            console.log('nouvelle quantité du produit ajouté: ', searchProductInLocalStorage.quantity);
                            //enfin on met à jour le L.S en remplaçant les valeurs de la key 'cart'
                            this.saveCart(localStorageContent);
                            console.log('nouvelle quantité mise à jour dans le L.S : ', localStorageContent);
                            //On affiche un message à l'écran pour informer l'utilisateur que le produit a été ajuoté au panier
                            alert("Vous venez d'ajouter un produit déjà présent dans le panier")
                        } else{ // si la variable de recherche dans le tableau du L.S renvoie undefined, donc vide, donc pas d'objet similaire
                            //on ajoute les données du nouveau produit sélectionné dans le tableau du L.S
                            localStorageContent.push(productOptions)
                            //puis on met à jour la key 'cart' du L.S avec la nouvelle entrée dans le tableau
                            this.saveCart(localStorageContent);
                            console.log('un nouvel objet a été ajouté : ', localStorageContent)
                            //On affiche un message à l'écran pour informer l'utilisateur que le produit a été ajuoté au panier
                            alert("Vous venez d'ajouter un nouveau produit dans le panier")
                        }
                    }
                }
            }
        })
    }

    // On déclare une fonction qui nous permettra de récupérer les données de l'API pour un seul canapé présent dans le L.S
    // La fonction prend un argument qui correspondra au tableau du L.S
    getCanapData(canapInCartList){
        //on retourne les données du canapé (grâce à son id), récupérée de l'API avec fetch
        return fetch("http://localhost:3000/api/products/" + canapInCartList.id)
        //puis on initie une fonction fléchée qui prend comme paramètre la réponse de fetch
        .then( (response) =>{
            //si la réponse est récupérée (response.ok)
            if (response.ok) {
                //on retourne la réponse au format JSON
                return response.json();
            }
        })
        //S'il y a une erreur, on affiche un message d'erreur dans la console
        .catch(function(error){
            console.log("Une erreur est survenue lors de la récupération des données du canapé présent dans le L.S ");
        })
    }

    //on déclare une fonction async qui nous retournera les données chaque canap présent dans le L.S sous forme d'objets dans un tableau
    async getAllCartItemsData(){
        //On déclare une variable contenant le L.S, que l'on converti en objet grâce à JSON.parse()
        let localStorageContent = this.getCart();
        console.log('localStorageContent : ', localStorageContent);  
        //on déclare une variable contenant un tableau vide qui contiendra plus tard les infos de chaque produit contenu dans le L.S
        let cartItemsInfosArray = [];
        // Si le L.S est vide (variable contenant le L.S = null)
        if(localStorageContent == null){
            //on met fin à l'execution de la fonction
            return
        //Si le L.S n'est pas vide
        } else{
            //on initie une boucle for où i=0, i < que la taille du L.S, i++
            for (let i=0; i<localStorageContent.length; i++){
                //on attend le résultat de la fonction getCanapData() pour l'item [i] du L.S . Le résultat de la promise contiendra les infos de l'API pour l'item[i]
                await this.getCanapData(localStorageContent[i])
                //Puis on déclare une fonction fléchée qui prend comme paramètre les infos de l'item
                .then( (canapInfos) =>{
                    //On déclare une fonction contenant un objet avec les donnée du canap, nécessaires à l'affichage du panier
                    let infos = {
                        name : canapInfos.name,
                        id : canapInfos._id,
                        color : localStorageContent[i].color,
                        quantity : localStorageContent[i].quantity,
                        price : canapInfos.price,
                        image : canapInfos.imageUrl,
                        altTxt : canapInfos.altTxt
                    }
                    //On ajoute l'objet contenant les données du canap dans le tableau cartItemsInfosArray
                    cartItemsInfosArray.push(infos);
                })
            }
            console.log('cartItemsInfosArray : ', cartItemsInfosArray)
            //A la fin de la boucle for, on retourne les données du tableau cartItemsInfosArray
            return cartItemsInfosArray
        }
    }
    
    //on déclare une fonction qui permettra de changer la quantité des items du panier
    quantityInputButton(){
        //on déclare une variable qui contient le L.S
        let localStorageContent = this.getCart();
        //On déclare une variable qui contient la liste des inputs de chaque item du panier dans un tableau
        let quantityInputButtonList = document.querySelectorAll('.cart__item__content__settings__quantity > input')
        console.log('liste des quantity input : ', quantityInputButtonList)
        //on initie une boucle for ou i va parcourir chaque input du tableau quantityInputButton
        for  (let i=0; i<quantityInputButtonList.length; i++){
            //on déclare une variable qui contient l'emplacement de l'input quantityInputButtonList[i] 
            let inputButton = quantityInputButtonList[i];
            //on déclare une variable contenant l'emplacement de l'<article> le plus proche de quantityInputButtonList[i]
            let itemArticle = inputButton.closest('article');
            console.log('itemArticle datas', itemArticle) 
            //on écoute l'évènement pour chaque bouton
            inputButton.addEventListener('change', (event)=>{
                //quand l'evenement se déclenche, on déclare une variable contenant la nouvelle quantité de l'input
                let newQuantity = event.target.value;
                console.log(`la nouvelle quantité dans newQuantity est : `, newQuantity);
                //On déclare une variable contenant l'item que l'on recherche dans le L.S 
                //(il doit avoir la même ID et la même couleur que l'ID de l'<article> le plus proche de l'input)
                let itemInLocalStorage = localStorageContent.find(item => item.id == itemArticle.dataset.id && item.color == itemArticle.dataset.color);
                console.log('itemInLocalStorage : ', itemInLocalStorage)
                //on modifie la quantité du produit situé dans le L.S
                itemInLocalStorage.quantity = parseInt(newQuantity);
                console.log('itemInLocalStorage.quantity : ', itemInLocalStorage.quantity);
                //On enregistre le L.S avec la nouvelle quantité
                this.saveCart(localStorageContent);
                console.log('localStorageContent', localStorageContent);
                //On recharge la page pour mettre à jour l'affichage avec les nouvelles données du L.S
                window.location.reload();
                //A CHANGER : RECHARGER SEULEMENT LES INFOS NECESSAIRES
                //On met fin à l'execution de la fonction
                return
            })
        }
    }

    //On déclare uen fonction qui permettra de supprimer un item du panier/L.S quand on cliquera sur le texte "Supprimer"
    deleteButton(){
        //on déclare une variable contenant le L.S
        let localStorageContent = this.getCart();
        console.log('localStorageContent', localStorageContent)
        //On déclare une variable contenant la liste de tous les <p> ayant pour classe "deleteItem"
        let deleteDivList = document.querySelectorAll('.deleteItem');
        console.log('deleteDivList', deleteDivList)
        //On déclare une boucle fort où i=0, i < que le nombre de <p> dans la liste des boutons, i++
        for (let i=0; i<deleteDivList.length; i++){
            //On déclare une variable contenant le <p> de la boucle en cours
            let deleteDiv = deleteDivList[i];
            //On déclare une variable contenant l'<article> le plus proche du <p> de la boucle
            let deleteArticle = deleteDiv.closest('article');
            //on écoute l'evenement sur chaque <p> 
            deleteDiv.addEventListener('click', (event) =>{
                //Si le tableau du L.S n'a aucune entrée
                if (localStorageContent.length == 0){
                    //on supprime la key/item du L.S
                    localStorage.removeItem('cart');
                    //On recharge la page pour mettre à jour l'affichage avec les nouvelles données du L.S
                    window.location.reload();
                    //On met fin a l'execution de la fonction
                    return
                //Si le tableau du L.S n'est pas vide (localStorageContent.length != 0)
                } else{
                    //On déclare une variable contenant l'item dans le L.S qui a le même ID et la même couleur
                    let itemInLocalStorage = localStorageContent.find(item => item.id == deleteArticle.dataset.id && item.color == deleteArticle.dataset.color);
                    console.log('itemInLocalStorage a supprimer: ', itemInLocalStorage);
                    //On déclare une variable contenant l'index de l'item dans le L.S
                    let deleteItemIndex = localStorageContent.indexOf(itemInLocalStorage);
                    console.log('deleteItemIndex', deleteItemIndex);
                    //On supprime cet élément dans le tableau du L.S
                    localStorageContent.splice(deleteItemIndex, 1);
                    console.log(`l'item [${deleteItemIndex}] du localStorageContent a été supprimé`, localStorageContent);
                    //Puis on enregistre la nouvelle valeur du L.S
                    this.saveCart(localStorageContent);
                    //On recharge la page pour mettre à jour l'affichage avec les nouvelles données du L.S
                    window.location.reload();
                    //A CHANGER : event.target pour savior quel bouton a été cliqué, closest pour le parent à sup.
                    //NE pas charger toute la page.
                    //On met fin a l'execution de la fonction
                    return    
                }
            })
        }
    }  

    // on déclare une fonction qui va permettre de récupérer les données que l'utilisateur renseigne dans le formulaire de la page panier
    // getFormData(){
    //     let namesRegExp = new RegExp("^[a-zéèîïëêçA-Z]+[a-zéèîïëêçA-Z ]$|^[a-zéèîïëêçA-Z]+([ '-][a-zéèîïëêçA-Z]+){1,2}$");
    //     //Modif : adress
    //     let addressRegExp = new RegExp("^[0-9]+( [a-zéèîïëêçA-Z]+){2,}$");
    //     let numberRegExp = new RegExp("^[0-9]+");
    //     let cityRegExp = new RegExp("^[a-zéèîïëêçA-Z]+([- '][a-zéèîïëêçA-Z]+){0,} [0-9]{5}$|^[0-9]{5} [a-zéèîïëêçA-Z]+([- '][a-zéèîïëêçA-Z]+){0,}");
    //     let cityCodeRegExp = new RegExp("[0-9]{5}");
    //     let emailRegExp = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+.[a-z]{2,3}")
    //     // on déclare une variable qui contient l'emplacement du formulaire complet
    //     let formDiv = document.querySelector('form');
    //     console.log('formDiv : ', formDiv);

    //     let inputFirstName = formDiv.firstName;
    //     let inputLastName = formDiv.lastName;
    //     let inputAddress = formDiv.address;
    //     let inputCity = formDiv.city;
    //     let inputEmail = formDiv.email;
    //     let buttonSubmit = formDiv.order;
    //     console.log('inputs ', inputFirstName, inputLastName, inputAddress, inputCity, inputEmail, buttonSubmit);

    //     let clientDataObjet = {
    //         firstName : inputFirstName.value,
    //         lastName : inputLastName.value,
    //         address : inputAddress.value,
    //         city : inputCity.value,
    //         email : inputEmail.value,
    //         products : this.getCart(),
    //     }
    //     console.log('clientDataObjet : ', clientDataObjet)

        
    //     inputFirstName.addEventListener('change', (event) =>{
    //         let inputValue = event.target.value;
    //         let errorMessage = document.getElementById('firstNameErrorMsg');
    //         if(namesRegExp.test(inputValue)){
    //             errorMessage.innerText = '';
    //             clientDataObjet.firstName = inputValue;   
    //             console.log('new clientDataObject : ', clientDataObjet)            
    //         } else{
    //             errorMessage.innerText = 'Veuillez saisir un Prénom valide';
    //         }
    //     })
        
    //     inputLastName.addEventListener('change', (event) =>{
    //         let inputValue = event.target.value;
    //         let errorMessage = document.getElementById('lastNameErrorMsg');
    //         if(namesRegExp.test(inputValue)){
    //             errorMessage.innerText = '';
    //             clientDataObjet.lastName = inputValue;         
    //             console.log('new clientDataObject : ', clientDataObjet)            
    //         } else{
    //             errorMessage.innerText = 'Veuillez saisir un Nom valide';
    //         }
    //     })
    //     inputAddress.addEventListener('change', (event) =>{
    //         let inputValue = event.target.value;
    //         let errorMessage = document.getElementById('addressErrorMsg');
    //         if(addressRegExp.test(inputValue)){
    //             errorMessage.innerText = '';
    //             clientDataObjet.address = inputValue;         
    //             console.log('new clientDataObject : ', clientDataObjet)            
    //         } else{
    //             if(!numberRegExp.test(inputValue)){
    //                 errorMessage.innerText = 'Veuillez renseigner votre numéro de voie';
    //             } else{
    //                 errorMessage.innerText = 'Veuillez renseigner votre voie';
    //             }
    //         }
    //     })
    //     inputCity.addEventListener('change', (event) =>{
    //         let inputValue = event.target.value;
    //         let errorMessage = document.getElementById('cityErrorMsg');
    //         if(cityRegExp.test(inputValue)){
    //             errorMessage.innerText = '';
    //             clientDataObjet.city = inputValue;        
    //             console.log('new clientDataObject : ', clientDataObjet)            
    //         } else{
    //             if(!cityCodeRegExp.test(inputValue)){
    //                 errorMessage.innerText = 'Veuillez renseigner votre code postal';
    //             } else{
    //                 errorMessage.innerText = 'Veuillez renseigner le nom de votre ville';
    //             }
    //         }
    //     })
    //     inputEmail.addEventListener('change', (event) =>{
    //         let inputValue = event.target.value;
    //         let errorMessage = document.getElementById('emailErrorMsg');
    //         if(emailRegExp.test(inputValue)){
    //             errorMessage.innerText = '';
    //             clientDataObjet.email = inputValue;         
    //             console.log('new clientDataObject : ', clientDataObjet)            
    //         } else{
    //             errorMessage.innerText = 'Veuillez saisir un email valide';
    //         }
    //     })

    //     buttonSubmit.addEventListener('click', (event) => {
    //         event.preventDefault();
    //         if (clientDataObjet.firstName == '' | clientDataObjet.lastName == '' | clientDataObjet.address == '' | clientDataObjet.city == '' | clientDataObjet.email == ''){
    //             alert('Veuillez remplir le formulaire')
    //         }else {
    //             localStorage.setItem('clientFormData', JSON.stringify(clientDataObjet));
    //             console.log('clientForm L.S : ', JSON.parse(localStorage.getItem('clientFormData')));
    //         }
    //         return JSON.parse(localStorage.getItem('clientFormData'));
    //     }) 
        
        // buttonSubmit.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     if (clientDataObjet.firstName == '' | clientDataObjet.lastName == '' | clientDataObjet.address == '' | clientDataObjet.city == '' | clientDataObjet.email == ''){
        //         alert('Veuillez remplir le formulaire')
        //     }else {
        //         console.log('return clientDataObject', clientDataObjet)
        //         return clientDataObjet;
        //     }
        // }) 
    // }   

    // orderPostData(url){
    //     let buttonSubmit = document.getElementById('order');
    //     buttonSubmit.addEventListener('click', (event) =>{
    //         let orderData =  JSON.parse(localStorage.getItem('clientFormData'));
    //         console.log('orderData recup in L.S : ', orderData);
    //         return fetch(url, {
    //             method : 'POST',
    //             headers : {'Content-Type' : 'application/json'},
    //             body : orderData
    //         })
    //         .then( (response) =>{
    //             if (response.ok){
    //                 return response.json();
    //             }
    //         })
    //         .catch( (error) =>{
    //             console.log("Une erreur est survenue lors de l'envoie des infos de la commande")
    //         })
    //     })
    // }

    // orderPostData(){
    //     let buttonSubmit = document.getElementById('order');
    //     buttonSubmit.addEventListener('click', (event) =>{
    //         let orderData =  await this.getFormData();
    //         console.log('orderData récupérées : ', orderData);
    //     })
    // }
}
