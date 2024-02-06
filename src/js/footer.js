import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const subscriptionForm = document.getElementById('subscriptionForm');
const emailInput = document.getElementById('email');

subscriptionForm.addEventListener('submit', function (event) {
    event.preventDefault();


    const emailValue = emailInput.value.trim();


    if (!isValidEmail(emailValue)) {

        iziToast.error({
            title: 'error',
            message: 'Sorry, not valid email. Please try again!',
            position: 'bottomRight',
            messageColor: '#f6f6f6',
            backgroundColor: '#7e847f',
            maxWidth: 300
        });
        emailInput.value = '';
        return;
    }

    sendSubscriptionRequest(emailValue);
});


function isValidEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
}

function sendSubscriptionRequest(email) {

    const backendURL = 'https://energyflow.b.goit.study/api/subscription';
    const data = {
        email: email,

    };


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data),
    };


    fetch(backendURL, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Відповідь від бекенду:', data);
            emailInput.value = '';

        })
        .catch(error => {
            console.error('Помилка відправки запиту на бекенд:', error);
        });
}
