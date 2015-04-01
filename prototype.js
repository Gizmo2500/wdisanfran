

function Starship(model,ownerName){
	this.model = model;
	this.owner = ownerName;
	this.setTopspeed = null;
    this.curentSpeed = 0;
    this.accelerationrate = null;
};


Starship.prototype.getTopspeed = function(top){
	this.setTopspeed === top {
		return this.setTopspeed;
	};
}

Starship.prototype.accelerateTo = function(increase) {
		if(increase <= this.getTopspeed){
			this.curentSpeed = increase;			
		}else{
			console.log("Can't go that fast");
		}

		 	
};

function acceleRation() {
    accel = setInterval(function(){ console.log(); }, 10000);
    	return accel; 
};




function Dice(numofsides){

	this.sides = numofsides;
}

Dice.prototype.roll = function() {
	
	return Math.ceil(this.sides * Math.random() + 1);  
};


function Radio(ownerName, signalType){
	this.station = null;
	this.ownerName = ownerName;
	this.signalType = signalType;
}

Radio.prototype.setStation = function(station) {
	if (this.signalType === "AM") {
		if(station>= 535 && station <= 1705)
	}else {
		console.log('Not Available')
	}
};

//teacher's answers

unction Starship(model, ownerName) {
    this.model = model;
    this.ownerName = ownerName;
    this.currentSpeed = 0;
}

Starship.prototype.setTopSpeed = function(speed) {
    this.topSpeed = speed;
    return this;
};


Starship.prototype.getTopSpeed = function() {
    return this.topSpeed;
};

// Starship.prototype.accelerateTo = function(newSpeed) {
//     if (newSpeed < this.getTopSpeed()) {
//         this.currentSpeed = newSpeed;
//     } else {
//         console.log("Cant go that fast! Reached Top speed!");
//         this.currentSpeed = this.getTopSpeed();
//     }
// }

Starship.prototype.accelerateTo = function(newSpeed) {
    this.currentSpeed = (newSpeed < this.getTopSpeed()) ?
                                     newSpeed : this.getTopSpeed();
};

function Dice(numSides) {
    this.numberOfSides = numSides;
    this.lastRoll = null;
};

Dice.prototype.roll = function() {
    var randNum = Math.ceil(Math.random() * this.numberOfSides);
    this.lastRoll = randNum;
    return randNum;
};

function Radio(ownerName, signalType) {
    this.station = null;
    this.ownerName = ownerName;
    this.signalType = signalType;
}

Radio.prototype.setStation = function(station) {
    if (this.signalType === "AM") {
        if (station >= 535 && station <= 1705) {
            this.station = station;
        } else {
            console.log("Not available");
        }
    } else if (this.signalType === "FM") {
        if (station >= 88 && station <= 108) {
            this.station = station;
        } else {
            console.log("Not available");
        }
    } else {
        console.error("No Signal Type");
    }
};

Radio.prototype.listen = function() {
    if (this.signalType === "AM") {
        return "Distorted Music";
    } else if (this.signalType === "FM") {
        return "clear music";
    } else {
        return "no music";
    }
};





