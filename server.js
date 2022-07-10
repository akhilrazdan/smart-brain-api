const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'akhilz',
    password : '',
    database : 'smart-brain'
  }
});

db.select('name' )
  .from('users').then(data => {
  	console.log(data);
  });


const app = express();
app.use(bodyParser.json())
app.use(cors())

const database = {
	users: [
		{
			id: '123',
			name: 'John', 
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0, 
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally', 
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0, 
			joined: new Date()
		}	
	]
}

app.get('/', (req, res) => {
	res.json(database.users)
});

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	database.users.forEach(user => {
		if (user.id === id){
			return res.json(user);
		}
	})
	res.status(404).json('no such user')
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	console.log(id);
	database.users.forEach(user => {
		if (user.id === id){
			user.entries++
			return res.json(user.entries);
		}
	})
	res.status(404).json('no such user')
})

app.post('/signin', (req, res) => {
	hash = 
	bcrypt.compare("applesa", '$2a$10$TQsWbwVsBJ.0RUCwieVZa.FeF9vUbH50Zn/5XYr57vilz27LVedAO', function(err, res){
		console.log("Passwords matched", res)
	})
	console.log(req.body.email);
	console.log(req.body.password);

	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
		res.json(database.users[0]);
		return
	} else{
		res.status(400).json('error logging in');
		return
	}
	
});

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash){
		// store password in your db
		console.log(hash);
	})
	database.users.push({
			id: '125',		
			name: name,
			email: email,
			entries: 0, 
			joined: new Date()
	})
	res.json(database.users[database.users.length - 1]);
	return;
});

app.listen(3000, () => {
	console.log('app is running on port 3000')
})

bcrypt.hash("bacon", null, null, function(err, hash){
	// store password in your db

})