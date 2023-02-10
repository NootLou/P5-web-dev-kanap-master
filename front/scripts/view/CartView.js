class CartView{
    displayData(cartItemsInfos){
        // //On déclare une variable contenant le L.S, que l'on converti en objet grâce à JSON.parse()
        let localStorageContent = JSON.parse(localStorage.getItem('cart'));
        //On déclare une variable contenant l'emplacement où l'on doit afficher les items du panier
        let cartItemsDiv = document.getElementById('cart__items')
        //on déclare une variable =0 qui contiendra plus tard la somme de tous les produits du panier
        let sumOfAllItems = 0;
        let numberOfItems = 0;
        //on initie une boucle for ou i=0 , i< que le nb de canap dans le L.S, i++
        if (localStorageContent == null || localStorageContent.length == 0){
            //on déclare une variable contenant l'emplacement du titre de la page
            let cartTitle = document.querySelector('#cartAndFormContainer h1')
            console.log('cartTitle : ', cartTitle.textContent)
            //On modifie le contenu du texte du titre de la page en ajoutant à la fin 'est vide.' / ('Votre panier' + ' est vide.')
            cartTitle.textContent += ' est vide.'
            console.log('new cartTitle : ', cartTitle.textContent)
            return
        } else {
            for (let i=0; i<cartItemsInfos.length; i++){
                //on déclare une variable contenant la somme total du nombre de même canap sélectionné (PAS LA SOMME DE TOUS LES DIFFERENDS CANAPE)
                let sumOfOneCanap = cartItemsInfos[i].quantity * cartItemsInfos[i].price;
                //pour chaque itération on ajoute la somme de tous les canapé de même id et même couleur à la somme de tous les produits du panier
                sumOfAllItems = sumOfAllItems + sumOfOneCanap;
                // pour chaque itération on ajoute le nombre d'article à la variable contenant le nombre total de tous les article
                numberOfItems = numberOfItems + cartItemsInfos[i].quantity;
                //Pour chaque canapé du L.S, on créer son html/css en utilisant les données reçues de l'API
                cartItemsDiv.innerHTML += `
                    <article class="cart__item" data-id=${cartItemsInfos[i].id} data-color=${cartItemsInfos[i].color}>
                        <div class="cart__item__img">
                            <img src=${cartItemsInfos[i].image} alt=${cartItemsInfos[i].altTxt}>
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${cartItemsInfos[i].name}</h2>
                                <p>${cartItemsInfos[i].color}</p>
                                <p>${sumOfOneCanap} (${cartItemsInfos[i].quantity}x${cartItemsInfos[i].price})</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cartItemsInfos[i].quantity}>
                                </div>
                                <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
            }
            //on déclare une variable contenant l'emplacement du prix total de tous les produits du panier
            let sumOfAllItemsDiv = document.querySelector("#totalPrice");
            //Puis on injecte la somme totale de tous les produits dans le html
            sumOfAllItemsDiv.innerHTML = sumOfAllItems;
            console.log('sumOfAllItems : ', sumOfAllItems)
            //on déclare une variable contenant l'emplacement du nombre total d'articles dans le panier
            let numberOfItemsDiv = document.querySelector("#totalQuantity");
            //puis on injecte le nombre total d'articles
            numberOfItemsDiv.innerHTML = numberOfItems;
        }
    }
}