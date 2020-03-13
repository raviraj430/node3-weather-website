// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
        
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

msg1.textContent = 'Loading...'
msg2.textContent = ''

weatherForm.addEventListener('submit',(e) => {
    console.log('testing');
    e.preventDefault();
    const location = search.value;
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
            msg1.textContent = data.error;
        } else {
            console.log(data.location);
            console.log(data.forecast);
            msg1.textContent = data.location ;
            msg2.textContent = data.forecast ;
        }
        
    })
})
    
    
})