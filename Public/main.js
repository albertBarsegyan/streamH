const but = document.querySelector('.content-button');
console.log(but);
//post request
but.addEventListener('click', () => {
    fetch('/users/newUser', {
        method: 'post',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: 'Satenik',
            surname: 'Karapetyan',
            age: 22,
            id: 6
        })
    })

})

fetch('/users/delete', {
    method: 'delete',
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        id: 8
    })
})