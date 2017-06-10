const express = require('express')
const app = express();

// bodyparser import
const bodyParser = require('body-parser');

// mongodriver
const MongoClient = require('mongodb').MongoClient()
const ObjectId = require('mongodb').ObjectID

// jsonwebtoken
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

// token

// ES6 - works will babel
// import { TOKEN_SECRET } from './token'

const TOKEN_SECRET = "MODOGA"
   
const DB_URL = "mongodb://ant-hack:replug2017@ds115712.mlab.com:15712/ant-hack";



/*for static files */
app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

/*token middleware */
app.use(expressJWT({secret: TOKEN_SECRET}))



app.get('/', function(req, res){
	res.send("This is a Connection test url")
})
app.post('/login', function(req, res){
	MongoClient.connect(DB_URL, (err, db) => {
	db.collection('users').findOne({
			$and: [
				{ email: {$eq : req.body.email}},
				{ password: {$eq : req.body.password}}
			]
		}, (error, response) => {
			if(response){
				res.json(
					{
						status: "success",
					 	message:"Login Successful",
					 	user: {_id:response._id,
					 			email: response.email,
					 			phone: response.phone,
					 			role: response.role
					 			}
					 });
			}
			else{
				res.json(
					{
						status: "error",
					 	message:"Login Failed"
					 });
			}
			
		})
	db.close();
	})
})
app.post('/register', function(req, res){

	MongoClient.connect(DB_URL, (err, db) => {
		db.collection('users').findOne({email: {$eq: req.body.email}}, (error, response) => {
			if(response){
				res.json(
					{
						status: "error",
					 	message:"Email Exist"
					 });
			}
		})
		db.collection('users').insert(req.body, (in_err, in_res) => {
			if(in_res){
				res.json(
					{
						status: "success",
					 	message:"Registration Successful"
					 });
			}
			else{
				res.json(
					{
						status: "error",
					 	message:"Failed"
					 });
			}
		})
		db.close();
	})
})
app.get('/note', function(req, res){
	MongoClient.connect(DB_URL, (err, db) => {
		db.collection('notes').find().toArray((error, response) => {
			if(response){
				res.json(
					{
						status: "success",
					 	notes: response
					 });
			}else{
				res.json(
					{
						status: "error",
					 	message: "Could not get list"
					 });
			}
		})
	})
})
app.post('/note', function(req, res){
	MongoClient.connect(DB_URL, (err, db) => {
		db.collection('notes').insert(req.body, (error, response) => {
			console.log(response)
			if(response){
				res.json(
					{
						status: "success",
					 	message: "Note Added"
					 });
			}else{
				res.json(
					{
						status: "error",
					 	message: "Failed"
					 });
			}
		})
	})
})
app.get('/note/:id', function(req, res){
	MongoClient.connect(DB_URL, (err, db) => {
		db.collection('notes').findOne({"_id" : ObjectId(req.params.id)}, (error, response) => {
			console.log(response)
			if(response){
				res.json(
					{
						status: "success",
					 	note: response
					 });
			}else{
				res.json(
					{
						status: "error",
					 	message: "Could not get list"
					 });
			}
		})
	})
})
app.put('/note/:id', function(req, res){
	MongoClient.connect(DB_URL, (err, db) => {
		db.collection('notes').update({"_id" : ObjectId(req.params.id)}, req.body, (error, response) => {
			console.log(response)
			if(response){
				res.json(
					{
						status: "success",
					 	message: "Updated"
					 });
			}else{
				res.json(
					{
						status: "error",
					 	message: "Update Failed"
					 });
			}
		})
	})

})
app.delete('/note/:id', function(req, res){
	MongoClient.connect(DB_URL, (err, db) => {
		db.collection('notes').findOneAndDelete({"_id" : ObjectId(req.params.id)}, (error, response) => {
			console.log(response)
			if(response){
				res.json(
					{
						status: "success",
					 	message: "Delete Successful"
					 });
			}else{
				res.json(
					{
						status: "error",
					 	message: "Failed"
					 });
			}
		})
	})

})

app.listen(3000, function(){
	console.log("Server Running on port 3000");
})