class AccueilView{
    //création d'une fonction affichant les données de la page d'accueil
    displayData(kanapList){
        //création d'une boucle qui créer
        for(let i=0; i<kanapList.length ; i++){
            console.log(kanapList[i])
            //création d'une variable contenant l'emplacement dans lequel on va placer nos canapés
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

