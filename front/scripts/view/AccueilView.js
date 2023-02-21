class AccueilView{
    //On déclare une fonction qui affiche les produits et leurs infos sur la page d'accueil
    displayData(kanapList){
        for(let i=0; i<kanapList.length ; i++){
            console.log(`kanap n°${i+1}`, kanapList[i])
            let itemsDiv = document.getElementById('items')
            itemsDiv.innerHTML += `
                <a href="./product.html?id=${kanapList[i]._id}">
                    <article>
                        <img src="${kanapList[i].imageUrl}" alt="${kanapList[i].altTxt}">
                        <h3 class="productName">${kanapList[i].name}</h3>
                        <p class="productDescription">${kanapList[i].description}</p>
                    </article>
                </a>
            `
            console.log(document.querySelector("#items a"))
        }
    }

}

