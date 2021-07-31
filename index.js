import express from "express"

const app = express();
const PORT = 8000;
let result;
const Users = [
        { name: 'Marcel', surname: 'Saven', age: 22, id: 1 },
        { name: 'Sofia', surname: 'Karapetyan', age: 23, id: 2 },
        { name: 'Masis', surname: 'Karapetyan', age: 26, id: 3 },
        { name: 'Hanna', surname: 'Obeck', age: 22, id: 4 }
    ]
    //GET

app.get('/users', (req, res) => {
    res.send(Users)
})

function checkingId(req, res, next) {
    result = Users.find(el => {
        return el.id == req.params.id
    })
    if (result) {
        next()
    }
    next(`do not exist this ${req.params.id} id `)
}
app.get('/users/:id', checkingId, (req, res) => {
    res.send(result)
})


// Post
app.use(express.static('Public'));
app.use(express.json())
app.get('/', (req, res) => {
    res.redirect('index.html')
})

function checkingExistId(req, res, next) {
    Users.some(el => {
        if (el.id == req.body.id) {
            next("A user with that id already exists")
        }
    })
    Users.push(req.body)
    next()
}

app.post('/users/newUser', checkingExistId, (req, res) => {
    res.send(req.body)
})


//delete request from MAIN.JS
function deleteIdFromUsers(req, res, next) {
    let response;
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].id == req.body.id) {
            Users.splice(i, 1)
            response = 'deleted';
        }
    }
    if (response === 'deleted') {
        next()
    } else {
        next(`A user with that ${req.body.id} id do not exists`)
    }

}

app.delete('/users/delete', deleteIdFromUsers, (req, res) => {
    console.log(Users);
    res.send('deleted')
})



//PATCH REQUEST FROM POSTMAN
function updateUserAge(req, res, next) {
    let result = Users.some(el => {
        if (el.id == req.params.id) {
            el.age = +req.params.age;
            next()
        }
    })

}

app.patch('/users/:age/:id', updateUserAge, (req, res) => {
    console.log(Users);
    res.send('Changed')
})

app.listen(PORT, () => {
    console.log(`listening on http:localhost:${PORT}`);
})