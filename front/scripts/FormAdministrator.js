class FormAdministrator{
    //On déclare une fonction qui retournera true ou false si le champs est bien/mal renseigné
    //la fonction prend en parametre le texte renseigné dans le formulaire
    checkTextField(text){
        let textRegExp = /^[a-zA-Z- ']+$/;
        console.log(textRegExp.test(text))
        return textRegExp.test(text);
    }
    //on creer une fonction check pour chaque regex nécessaire au formulaire (ici text, adress, email)

    checkAddressField(address){
        let addressRegExp = /^[\w\u00C0-\u017F- ']+$/;
        console.log(addressRegExp.test(address));
        return addressRegExp.test(address);
    }
    
    checkEmailField(email){
        let emailRegExp = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,3}/;
        console.log(emailRegExp.test(email))
        return emailRegExp.test(email); 
    }
    
    //on déclare une fonction qui affichera ou non un message d'erreur en fonction de la validité du champs renseigné
    //la fonction prend 3 paramètres : le champs , la validité de la réponse (true/false), le message à afficher
    manageErrorMessage(inputTarget, isValid, message){
        let container = inputTarget.closest("div");
        let errorTag = container.querySelector('p');
        if (isValid){
            errorTag.innerText = '';
        } else {
            errorTag.innerText = message;
        }
    }

    //on déclare une fonction qui teste la validité des informations renseignées dans le formulaire 
    //et afficher un message d'erreur si necessaire
    checkFormData(){
        let formDiv = document.querySelector('form');
        console.log('formDiv : ', formDiv);
        let inputFirstName = formDiv.firstName;
        let inputLastName = formDiv.lastName;
        let inputAddress = formDiv.address;
        let inputCity = formDiv.city;
        let inputEmail = formDiv.email;

        inputFirstName.addEventListener('change', (event) =>{
            let isValid = this.checkTextField(event.target.value);
            this.manageErrorMessage(event.target, isValid,'Veuillez renseigner un nom valide');
        })

        inputLastName.addEventListener('change', (event) =>{
            let isValid = this.checkTextField(event.target.value);
            this.manageErrorMessage(event.target, isValid,'Veuillez renseigner un nom valide');
        })

        inputAddress.addEventListener('change', (event) =>{
            let isValid = this.checkAddressField(event.target.value);
            this.manageErrorMessage(event.target, isValid, "Veuiller renseigner une adresse valide");
        })

        inputCity.addEventListener('change', (event) =>{
            let isValid = this.checkAddressField(event.target.value);
            this.manageErrorMessage(event.target, isValid, "Veuiller renseigner une ville valide");
        })

        inputEmail.addEventListener('change', (event) =>{
            let isValid = this.checkEmailField(event.target.value);
            this.manageErrorMessage(event.target, isValid, "Veuiller renseigner une adresse email valide")
        })
        
    }
}