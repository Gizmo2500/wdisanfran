var express = require('express');


var app = express();


  app.get('/', function(req,res) {

res.send("Hello World");
});

app.get('/add/:x/:y', function(req,res){
	var x = Number(req.params.x);
	var y = Number(req.params.y);
	var sum = x + y;
  res.send("Sum is " + sum);
	
	
});


app.get('/sub/:x/:y', function(req,res){
	var x = Number(req.params.x);
	var y = Number(req.params.y);
	var diff = x - y;
  res.send("Difference is " + diff);
});

app.get('/mult/:x/:y', function(req,res){
	var x = Number(req.params.x);
	var y = Number(req.params.y);
	var mult = x * y;
  res.send("Multipule is " + mult);
});

app.get('/div/:x/:y', function(req,res){
	var x = Number(req.params.x);
	var y = Number(req.params.y);
	var div = x / y;
  res.send("Division is " + div);

});



app.listen(3000);