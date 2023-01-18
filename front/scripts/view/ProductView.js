class ProductView{
    displayData(kanapInfos){
        let productImage = document.querySelector('.item__img')
        productImage.innerHTML = `<img src=${kanapInfos.imageUrl} alt=${kanapInfos.altText}>`
        // on initie une variable qui contient l'emplacement du titre puis on lui assigne le texte correspondant
        let titleDiv = document.getElementById('title')
        titleDiv.innerHTML = kanapInfos.name
        //on initie une variable qui contient l'emplacement du prix puis on y ajoute le nombre/montant
        let priceDiv = document.getElementById('price')
        priceDiv.innerHTML = kanapInfos.price
        //on initie une variable qui contient l'emplacement de la description puis on y intègre le texte de description 
        let descriptionDiv = document.getElementById('description')
        descriptionDiv.innerText = kanapInfos.description
        //on initie une variable qui contient l'emplacement des options de couleurs du canapé
        let choiceOfColor = document.getElementById('colors')
        //on initie une boucle où i++ et i est plus petit que le tableau contenant les options de couleurs
        for (let i=0; i<kanapInfos.colors.length ; i++){
            //pour chaque élément du tableau on créer une balise <option> qui affiche l'élément du tableau[i]
            choiceOfColor.innerHTML += `<option value = ${kanapInfos.colors[i]}>${kanapInfos.colors[i]}</option>`
        }
    }
}