const but = document.querySelector('.content-button');
console.log(but);

but.addEventListener('click', () => {
    fetch('/persons/newPerson', {
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