"use strict";
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
if (messageOne) {
    messageOne.textContent = 'My new text';
}
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetch('/weather?adress=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                if (messageOne) {
                    messageOne.textContent = data;
                }
            }
        });
    });
});
