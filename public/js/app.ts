const weatherForm = document.querySelector('form') as HTMLFormElement
const search = document.querySelector('input') as HTMLInputElement

const messageOne = document.querySelector('#message-1') as HTMLParagraphElement
const messageTwo = document.querySelector('#message-2') as HTMLParagraphElement

const headers = { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    window.location.replace('/weather?adress=' + location);
})