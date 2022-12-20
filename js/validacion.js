const VALIDATION_FORM = document.getElementById("validationForm");
const REPEATED_PASSWORD = document.getElementById("password2");
const PASSWORD = document.getElementById("password1");
const TERMINOS = document.getElementById("terminos");
const ETIQUETA_TERMINOS = document.getElementById("TOSLabel")

// Se encarga de que si la contraseña está validada pero las contraseñas no
// son iguales se muestra un mensaje, y de que si la contraseña no es válida
// se muestre otro mensaje
function checkRepeatedPassword() {
    const repeatedPwMsg = document.getElementById("repeatedPwMsg");

    if (PASSWORD.checkValidity()) {
        if (REPEATED_PASSWORD.value !== PASSWORD.value) {
            REPEATED_PASSWORD.setCustomValidity("Las contraseñas no coinciden.");
        }else{
            REPEATED_PASSWORD.setCustomValidity("");
        }
    }
    else {
        REPEATED_PASSWORD.setCustomValidity("La contraseña no es válida");
    }
    repeatedPwMsg.innerHTML = REPEATED_PASSWORD.validationMessage;

}

// Le cambia el formato al botón de los términos y servicios
function checkTOS() {
    if (!TERMINOS.checked) {
        document.getElementById("termsOfService").classList.add("link-danger");
        document.getElementById("TOS_invalid_feedback").classList.add("d-inline");
    }
    else {
        document.getElementById("termsOfService").classList.remove("link-danger");
        document.getElementById("TOS_invalid_feedback").classList.remove("d-inline");
    }
}

// Verifica si se cumplieron los requisitos del formulario de registro
function checkValidation() {
    VALIDATION_FORM.addEventListener("submit", function(event) {
        if (!VALIDATION_FORM.checkValidity() || !TERMINOS.checked) {
            event.preventDefault()
            event.stopPropagation()

            checkTOS()

            TERMINOS.addEventListener("change", () => {
                checkTOS();
            })

            VALIDATION_FORM.classList.add("was-validated");
            document.getElementById("TOS_form_check").classList.add("was-validated")
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    // Cuando la página cargue se le agrega la validación customizada
    // al campo de repetir contraseña. 
    checkRepeatedPassword()

    // Cada que se modifique cualquiera de las contraseñas se comprueban
    // las validaciones.
    REPEATED_PASSWORD.addEventListener("input", () => {
        checkRepeatedPassword();
    })
    PASSWORD.addEventListener("input",() => {
        checkRepeatedPassword()
    })


    checkValidation();
})