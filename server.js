var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//train db
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
//train db end

//flight db
var schema2 = new mongoose.Schema({
	name:String,
	dest:String,
	origin:String,
	deptTime:String,
	arivTime:String,
	class:String,
	numOfSeats:Number,
	price:String
});
var Flight = mongoose.model('Flight', schema2);
//flight db end


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));


//train server
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

//Flight server
app.get('/api/flights', function(req, res){
	console.log("inside get flights");
	Flight.find(function(err, flights){
		if(err)
			res.send(err);
		res.json(flights);
	});
});

app.get('/api/flights/:id', function(req, res){
	Flight.findOne({_id:req.params.id}, function(err, flight){
		if(err)
			res.send(err);
		res.json(flight);
	});
});

/*
app.post('/api/flights', function(req, res){
	Flight.create(req.body, function(err, flights){
		console.log("adding flight deets");
		console.log(req.body);
		if(err)
			res.send(err);
		res.json(flights);
	});
});
*/
app.post('/api/flights', function(req, res){
	var flight1 = new Flight({
		name:req.body.name,
		dest:req.body.dest,
		origin:req.body.origin,
		deptTime:req.body.deptTime,
		arivTime:req.body.arivTime,
		class:req.body.class,
		numOfSeats:req.body.numOfSeats,
		price:req.body.price
	});
	flight1.save(function(err, flights){
		console.log("adding flight deets");
		console.log(req.body);
		if(err)
			res.send(err);
		res.json(flights);
	});
});

app.post('/api/flights/:id', function(req, res) {
	console.log("in server book");
	Flight.findOneAndUpdate({_id: req.params.id}, 
		{$inc: {numOfSeats: -1}},{upsert:true, returnOriginal:false}, function(err, flight) {
		console.log("in server update");
		//console.log(req.body);
        if(err)
			res.send(err);
		res.json(flight);
    });
});

app.delete('/api/flights/:id', function(req, res){
	Flight.findOneAndRemove({_id:req.params.id}, function(err, flight){
		if(err)
			res.send(err);
		res.json(flight);
	});
});
app.put('/api/flights/:id', function(req, res){
	var query = {
		name:req.body.name,
		dest:req.body.dest,
		origin:req.body.origin,
		deptTime:req.body.deptTime,
		arivTime:req.body.arivTime,
		class:req.body.class,
		numOfSeats:req.body.numOfSeats,
		price:req.body.price
	};
	Flight.findOneAndUpdate({_id:req.params.id}, query, function(err, flight){
		if(err)
			res.send(err);
		res.json(flight);
	});
});

app.listen(3000, function(){
	console.log('server is running on port 3000..');
});