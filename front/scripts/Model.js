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
    getData(url){
        //getData renvoie les données de la requête fetch
        return fetch(url)
        .then( (response) => {
            if(response.ok){
                // la reponse de fetch est ensuite renvoyée en format json s'il n'y pas eu d'erreur
                return response.json();   
            }
        })
        //En cas d'erreur, la console affiche un message d'erreur
         .catch(function(error){
            console.log("Une erreur est survenue")
        })
    }

    getProductPageData(url){
        //On récupère l'adresse du navigateur
        let searchParams = new URLSearchParams(window.location.search);
        //on récupère la partie id de l'adresse du navigateur
        let id = searchParams.get("id");
        return fetch(url + id)
        .then( (response) =>{
            if (response.ok) {
                return response.json();
            }
        })
        .catch(function(error){
            console.log("Une erreur est survenue")
        })
    }

    // addToCart(){
    //     let submitButton = document.getElementById('addToCart')
    //     submitButton.addEventListener('onClick', function(){
    //         localStorage.setItem('id', searchParams.get("id"))
    
    //     })
    // }
}






