var cat = {
  name: "Sir Meows Alot",
  age: 2,
  meow: function() { console.log("Meow"); }
};

cat.purr = function(times) {
  for (var i = 0; i < times; i++) {
    console.log("Purr...");
  }
};

function Person(firstName,lastName){
	this.first = firstName;
	this.last = lastName;
	this.fullname = firstName + '' + lastName;
}
Person.prototype.greet = function(name) {
	console.log('Hi ' + name + ', I\'m' + this.fullname)
};

function Queue()
	this.items =[];
	this.enqueue = function(item){
		this.items.unshift(item);
	};
	this.dequeue = function(){
		return this.items.pop();
	};

function Queue(){}

Queue..prototype.enqueue = Array.prototype {
	// body...
};

function Queue() {}
Queue.prototype.enqueue = Array.prototype.unshift;
Queue.prototype.dequeue = Array.prototype.pop;