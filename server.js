var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MMTDatabase');
var schema = new mongoose.Schema({
	name:String,
	dest:String,
	origin:String,
	deptTime:String,
	arivTime:String,
	numOfSeats:Number,
	price:String
});
var Train = mongoose.model('Train', schema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/trains', function(req, res){
	Train.find(function(err, trains){
		if(err)
			res.send(err);
		res.json(trains);
	});
});

app.get('/api/trains/:id', function(req, res){
	Train.findOne({_id:req.params.id}, function(err, train){
		if(err)
			res.send(err);
		res.json(train);
	});
});

app.get('/api/trains/:id', function(req, res) {
	console.log("in server book");
    Train.findOneAndUpdate({_id: req.params.id}, {$inc: {numOfSeats: -1}}, function(err, train) {
		console.log("in server update");
        if(err)
			res.send(err);
		res.json(train);
    });
});

app.post('/api/trains', function(req, res){
	var train1 = new Train({
		name:req.body.name,
		dest:req.body.dest,
		origin:req.body.origin,
		deptTime:req.body.deptTime,
		arivTime:req.body.arivTime,
		numOfSeats:req.body.numOfSeats,
		price:req.body.price
	});
	train1.save(function(err, trains){
		console.log("adding train deets");
		console.log(req.body);
		if(err)
			res.send(err);
		res.json(trains);
	});
});

app.post('/api/trains/:id', function(req, res) {
	console.log("in server book");
	Train.findOneAndUpdate({_id: req.params.id}, 
		{$inc: {numOfSeats: -1}},{upsert:true, returnOriginal:false}, function(err, train) {
		console.log("in server update");
		//console.log(req.body);
        if(err)
			res.send(err);
		res.json(train);
    });
});


app.delete('/api/trains/:id', function(req, res){
	Train.findOneAndRemove({_id:req.params.id}, function(err, train){
		if(err)
			res.send(err);
		res.json(train);
	});
});
app.put('/api/trains/:id', function(req, res){
	var query = {
		name:req.body.name,
		dest:req.body.dest,
		origin:req.body.origin,
		deptTime:req.body.deptTime,
		arivTime:req.body.arivTime,
		numOfSeats:req.body.numOfSeats,
		price:req.body.price
	};
	Train.findOneAndUpdate({_id:req.params.id}, query, function(err, train){
		if(err)
			res.send(err);
		res.json(train);
	});
});

app.listen(3000, function(){
	console.log('server is running on port 3000..');
});