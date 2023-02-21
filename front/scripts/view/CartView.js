class CartView{
    //on déclare une fonction qui affiche les produits ajoutés au L.S sur la page Panier
    //Elle prend comme paramètre les données des produits dans le L.S
    displayData(cartItemsInfos){
        this.cartItemsInfos = cartItemsInfos;
        console.log('this.cartItemsInfos ', this.cartItemsInfos)
        let cartItemsDiv = document.getElementById('cart__items')
        if (cartItemsInfos == null || cartItemsInfos.length == 0){
            let cartTitle = document.querySelector('#cartAndFormContainer h1')
            console.log('cartTitle : ', cartTitle.textContent)
            cartTitle.textContent += ' est vide.'
            console.log('new cartTitle : ', cartTitle.textContent)
            return
        } else {
            for (let i=0; i<cartItemsInfos.length; i++){
                cartItemsDiv.innerHTML += `
                    <article class="cart__item" data-id=${cartItemsInfos[i]._id} data-color=${cartItemsInfos[i].color}>
                        <div class="cart__item__img">
                            <img src=${cartItemsInfos[i].image} alt=${cartItemsInfos[i].altTxt}>
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${cartItemsInfos[i].name}</h2>
                                <p>${cartItemsInfos[i].color}</p>
                                <p id="price">${cartItemsInfos[i].price} €</p>
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
        }
    }


    //On déclare une fonction qui affiche sur la page Panier le prix total et le nombre d'article ajoutés
    displayTotalPrice(){
        let itemsPriceArray = document.querySelectorAll('#price');
        let itemsQuantityArray = document.querySelectorAll(".itemQuantity");
        console.log('itemsPriceArray', itemsPriceArray, 'itemsQuantityArray', itemsQuantityArray);
        let totalItems = 0;
        let totalPrice = 0;
        for(let i=0; i<itemsQuantityArray.length; i++){
            totalItems = totalItems + parseInt(itemsQuantityArray[i].value);
            console.log('totalItems : ', totalItems)
            let oneItemSum = parseInt(itemsQuantityArray[i].value) * parseInt(itemsPriceArray[i].innerText)
            console.log('oneItemSum : ', oneItemSum)
            totalPrice = totalPrice + oneItemSum
            console.log('totalPrice : ', totalItems)
        }
        let totalPriceDiv = document.querySelector("#totalPrice");
        totalPriceDiv.innerHTML = totalPrice;
        let totalQuantity = document.querySelector("#totalQuantity");
        totalQuantity.innerHTML = totalItems
    }

    //On déclare une fonction qui écoute l'input de changement de quantité des produits du panier
    //Cette fonction créer un objet qui contient les données de l'item modifié puis 
    //fait appel à la fonction chageQuantity du Controller qui enregistre les nouvelles données dans le L.S
    listenQuantityInput(){
        let quantityInputButtonList = document.querySelectorAll('.cart__item__content__settings__quantity > input')
        console.log('liste des quantity input : ', quantityInputButtonList)
        for  (let i=0; i<quantityInputButtonList.length; i++){
            let inputButton = quantityInputButtonList[i];
            console.log('inputButton[i] : ', inputButton)
            let itemArticle = inputButton.closest('article');
            console.log('itemArticle datas', itemArticle) 
            inputButton.addEventListener('change', (event)=>{
                let newOptionsProduct = {
                    _id : itemArticle.dataset.id,
                    newQuantity : parseInt(event.target.value),
                    color : itemArticle.dataset.color,
                }
                console.log(`la nouvelle quantité dans newQuantity de l'article ${i+1} est : `, newOptionsProduct);
                controller.changeQuantity(newOptionsProduct);
                this.displayTotalPrice();
            })
        }
    }

    //On déclare une fonctio qui écoute le bouton de suppression des produits du panier
    //cette fonction créer un objet avec les données de l'item à supprimer puis
    //fait appel à la fonction deleteItem du Controller qui permet de supprimer un produit dans le L.S
    listenDeleteInput(){
        let deleteDivList = document.querySelectorAll('.deleteItem');
        console.log('deleteDivList', deleteDivList)
        for (let i=0; i<deleteDivList.length; i++){
            let deleteDiv = deleteDivList[i];
            let deleteArticle = deleteDiv.closest('article');
            deleteDiv.addEventListener('click', (event) =>{
                let itemData = {
                    _id : deleteArticle.dataset.id, 
                    color : deleteArticle.dataset.color,
                }
                console.log('itemsData to delete : ', itemData)
                controller.deleteItem(itemData);
            })
        }
    }
}