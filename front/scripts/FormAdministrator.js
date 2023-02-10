class FormAdministrator{
    textTest(text, input){
        let textRegExp = new RegExp("^[a-zA-Z0-9' .-]{1,}");
        if(!textRegExp.test(text)){
            this.getErrorMessage(input);
        }
    }
    
    emailTest(email){
        let emailRegExp = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+.[a-z]{2,3}");
        if(!emailRegExp.test(email)){
            this.getErrorMessage(document.getElementById('emailErrorMsg'));
        }
    }
    
    
    getErrorMessage(errorDiv){
        let errorMessage = errorDiv;
        if(errorDiv.closest("input") == document.getElementById('firstName')){
            errorMessage.innerText = 'Veuillez saisir un Prénom valide'
        } else {
            if (errorDiv.closest("input") == document.getElementById('lastName')){
                errorMessage.innerText = 'Veuillez saisir un Nom valide'
            } else {
                if ( errorDiv.closest("input") == document.getElementById('address')){
                    errorMessage.innerText = 'Veuillez saisir une adresse valide'
                } else {
                    if ( errorDiv.closest("input") == document.getElementById('city')){
                        errorMessage.innerText = 'Veuillez saisir une ville valide'
                    } else {
                        if ( errorDiv.closest("input") == document.getElementById('email')){
                            errorMessage.innerText = 'Veuillez saisir une adresse email valide'
                        }
                    }
                }
            }
        }
    }

    getFormData(){
        // on déclare une variable qui contient l'emplacement du formulaire complet
        let formDiv = document.querySelector('form');
        console.log('formDiv : ', formDiv);

        let inputFirstName = formDiv.firstName;
        let inputLastName = formDiv.lastName;
        let inputAddress = formDiv.address;
        let inputCity = formDiv.city;
        let inputEmail = formDiv.email;
        let buttonSubmit = formDiv.order;

        let clientDataObjet = {
            firstName : inputFirstName.value,
            lastName : inputLastName.value,
            address : inputAddress.value,
            city : inputCity.value,
            email : inputEmail.value,
        }
        console.log('clientDataObjet : ', clientDataObjet)

        inputFirstName.addEventListener('change', (event) =>{
            let inputValue = event.target.value;
            this.textTest(inputValue, inputFirstName);
        })

        inputLastName.addEventListener('change', (event) =>{
            let inputValue = event.target.value;
            this.textTest(inputValue, inputLastName);
        })

        inputAddress.addEventListener('change', (event) =>{
            let inputValue = event.target.value;
            this.textTest(inputValue, inputAddress);
        })

        inputCity.addEventListener('change', (event) =>{
            let inputValue = event.target.value;
            this.textTest(inputValue, inputCity);
        })

        inputEmail.addEventListener('change', (event) =>{
            let inputValue = event.target.value;
            this.emailTest(inputValue);
        })

        buttonSubmit.addEventListener('submit', (event) => {
            event.preventDefault();
            if (clientDataObjet.firstName == '' | clientDataObjet.lastName == '' | clientDataObjet.address == '' | clientDataObjet.city == '' | clientDataObjet.email == ''){
                alert('Veuillez remplir le formulaire')
            }else {
                localStorage.setItem('clientFormData', JSON.stringify(clientDataObjet));
                console.log('clientForm L.S : ', JSON.parse(localStorage.getItem('clientFormData')));
            }
            return JSON.parse(localStorage.getItem('clientFormData'));
        }) 
        
    }
}