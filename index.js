import express from "express"

const app = express();
const PORT = 8000;

const Persons = [
    { name: 'Marcel', surname: 'Saven', age: 22, id: 1 },
    { name: 'Sofia', surname: 'Karapetyan', age: 23, id: 2 },
    { name: 'Masis', surname: 'Karapetyan', age: 26, id: 3 },
    { name: 'Hanna', surname: 'Obeck', age: 22, id: 4 }
]

app.get('/persons', (req, res) => {
    res.send(Persons)
})
let result;

function checkingId(req, res, next) {
    result = Persons.find(el => {
        return el.id == req.params.id
    })
    if (result) {
        next()
    }
    next(`do not exist this ${req.params.id} id `)
}
app.get('/persons/:id', checkingId, (req, res) => {
    res.send(result)
})


// Post
app.use(express.static('Public'));
app.use(express.json())
app.get('/', (req, res) => {
    res.redirect('index.html')
})

function checkingExistId(req, res, next) {
    Persons.some(el => {
        if (el.id == req.body.id) {
            next("A person with that id already exists")
        }
    })
    Persons.push(req.body)
    next()
}

app.post('/persons/newPerson', checkingExistId, (req, res) => {
    res.send(req.body)
})


app.listen(PORT, () => {
    console.log(`listening on http:localhost:${PORT}`);
})