$(function() {
	alert("Let's Play Tic Tac Toe!");
  // YOUR CODE GOES HERE
var player = 1;
var clarr = $('.buton').toArray();

function Player(symbol){
  this.symbol = symbol;
}
 
function TicTacToe(){
  this.playerX = new Player('X');
  this.playerO = new Player('O');
  this.boxes = $('.buton');
  this.box = $('#btn1,#btn2,#btn3,#btn4,#btn5,#btn6,#btn7,#btn8,#btn9');
  this.resetone = $('#reset');
}   

newGame = new TicTacToe();

//newGame.boxes.call();

 TicTacToe.prototype.init = function() {
  this.boxes.click(function(){
      if(player === 1){
        $(event.target).val("X").css("background-color","#3366CC").attr('disabled','disabled'); 
        player -= 1;
          alert("It is O's turn!");
    } else{
        $(event.target).val("O").css("background-color","#990033").attr('disabled','disabled');
        player += 1;
          alert("It is X's turn!");
    }
    
  });
};

TicTacToe.prototype.newstart = function() {
      this.resetone.click(function(){     
      $('.buton').val("").css("background-color", "rgba(0,0,0,.25)").removeAttr('disabled');
   });
}

TicTacToe.prototype.wiNner = function(){
        var arr = this.box;
        arr.each(function(index){
         if(arr[0] === "X" && arr[1] === "X" && arr[2] === "X"){
        
          alert("X is the winner!");
    };
    });
    
}



newGame.init();
newGame.newstart();
newGame.wiNner();


// Jquery version
// //non-objectversion of click event
//     $('.buton').click(function(){
//       if(player === 1){
//         $(event.target).val("X").css("background-color","#3366CC").attr('disabled','disabled'); 
//         player -= 1;
//           alert("It is O\'s turn!");
//     }else{
//         $(event.target).val("O").css("background-color","#990033").attr('disabled','disabled');
//         player += 1;
//           alert("It is X's turn!");
//     }
//   //});
    
//   });   

//   $('#reset').click(function(){     
//      $('.buton').val('').css("background-color", "rgba(0,0,0,.25)").removeAttr('disabled');
//   }); 



//this adds a base image.
$('#ryu').append('<img src="http://i.imgur.com/90Mmdcm.png">');

//this starts a gif when the mosue is hovering over ryu.
$('#ryu img').hover( function() {
    this.src = 'http://i.imgur.com/nTj3Fxx.gif'
}, function() {
    this.src = 'http://i.imgur.com/90Mmdcm.png'
});
//when clicked changes pose to shoot hadouken.
$('#ryu img').mousedown( function() {
    this.src = 'http://i.imgur.com/Rfj0a80.png' 
});
//hadouken fires
$('#ryu img').mousedown(function() {
    $('#ryu').append(
    '<img class="demo-hadouken" src="http://i.imgur.com/oTyQRvX.gif">'
    );
});

$('#ryu img').mousedown(function() {
    $('.demo-hadouken').animate( {
        "margin-left": "600px"
    }, 1000, 'swing', function() {
        this.remove();
    });
});
//rest animation
$('#ryu img').mouseup(function() {
    this.src = 'http://i.imgur.com/90Mmdcm.png'
});

});




 
 

   /*var clickBtn = function(btn){
    console.log(btn);
	if(player === 1){
		//document,getElementById(btn).appendChild(x);
		document.getElementById(btn).value = "X";
		document.getElementById(btn).style.backgroundColor = "#3366CC";
		document.getElementById(btn).disabled = "disabled";
		player -= 1;
		alert("It is O\'s turn.");
		
	    
  }	else{
  		document.getElementById(btn).value = "O";
  		document.getElementById(btn).style.backgroundColor = "#990033";
  		document.getElementById(btn).disabled = "disabled";
  	    player += 1;
  	    alert("It is X\'s turn.");
  	    

  }
  wiNner();
};

var xOrO = ["X","O"];
 var startGame = function(choice){
 	reSet();
 	prompt("Who would like to go first X or O?");
 		for (var i = 0; i < xOrO.length; i++) {
 			
 		};
 	   if (choice === xOrO[0]){
 	   	player = 1;
 	   }else if(choice === xOrO[1]){
 	   	player = 0;
 	   }
 	   alert("Ok, Let\'s begin!");
 };


 function wiNner(){
     if (
  		document.getElementById("btn1").value === "X" &&
  		document.getElementById("btn2").value === "X" &&
  		document.getElementById("btn3").value === "X" ||
  		document.getElementById("btn4").value === "X" &&
  		document.getElementById("btn5").value === "X" &&
  		document.getElementById("btn6").value === "X" ||
  		document.getElementById("btn7").value === "X" &&
  		document.getElementById("btn8").value === "X" &&
  		document.getElementById("btn9").value === "X" ||
  		document.getElementById("btn1").value === "X" &&
  		document.getElementById("btn4").value === "X" &&
  		document.getElementById("btn7").value === "X" ||
  		document.getElementById("btn2").value === "X" &&
  		document.getElementById("btn5").value === "X" &&
  		document.getElementById("btn8").value === "X" ||
  		document.getElementById("btn3").value === "X" &&
  		document.getElementById("btn6").value === "X" &&
  		document.getElementById("btn9").value === "X" ||
  		document.getElementById("btn1").value === "X" &&
  		document.getElementById("btn5").value === "X" &&
  		document.getElementById("btn9").value === "X" ||
  		document.getElementById("btn3").value === "X" &&
  		document.getElementById("btn5").value === "X" &&
  		document.getElementById("btn7").value === "X" 
     	) {
			alert("The winner is X!");
	}else if (
 		document.getElementById("btn1").value === "O" &&
  		document.getElementById("btn2").value === "O" &&
  		document.getElementById("btn3").value === "O" ||
  		document.getElementById("btn4").value === "O" &&
  		document.getElementById("btn5").value === "O" &&
  		document.getElementById("btn6").value === "O" ||
  		document.getElementById("btn7").value === "O" &&
  		document.getElementById("btn8").value === "O" &&
  		document.getElementById("btn9").value === "O" ||
  		document.getElementById("btn1").value === "O" &&
  		document.getElementById("btn4").value === "O" &&
  		document.getElementById("btn7").value === "O" ||
  		document.getElementById("btn2").value === "O" &&
  		document.getElementById("btn5").value === "O" &&
  		document.getElementById("btn8").value === "O" ||
  		document.getElementById("btn3").value === "O" &&
  		document.getElementById("btn6").value === "O" &&
  		document.getElementById("btn9").value === "O" ||
  		document.getElementById("btn1").value === "O" &&
  		document.getElementById("btn5").value === "O" &&
  		document.getElementById("btn9").value === "O" ||
  		document.getElementById("btn3").value === "O" &&
  		document.getElementById("btn5").value === "O" &&
  		document.getElementById("btn7").value === "O" 

		) {
			alert("The winner is O!");
};

}

  



		/*document.getElementById("btn1").value = "" 
  		document.getElementById("btn2").value = "" 
  		document.getElementById("btn3").value = "" 
  		document.getElementById("btn4").value = "" 
  		document.getElementById("btn5").value = "" 
  		document.getElementById("btn6").value = "" 
  		document.getElementById("btn7").value = ""
  		document.getElementById("btn8").value = "" 
  		document.getElementById("btn9").value = ""

        document.getElementById("btn1").style.backgroundColor = "white"
  		document.getElementById("btn2").style.backgroundColor = "white"
  		document.getElementById("btn3").style.backgroundColor = "white"
  		document.getElementById("btn4").style.backgroundColor = "white"
  		document.getElementById("btn5").style.backgroundColor = "white"
  		document.getElementById("btn6").style.backgroundColor = "white"
  		document.getElementById("btn7").style.backgroundColor = "white"
  		document.getElementById("btn8").style.backgroundColor = "white"
  		document.getElementById("btn9").style.backgroundColor = "white"

  		document.getElementById("btn1").disabled = false 
  		document.getElementById("btn2").disabled = false
  		document.getElementById("btn3").disabled = false 
  		document.getElementById("btn4").disabled = false
  		document.getElementById("btn5").disabled = false
  		document.getElementById("btn6").disabled = false
  		document.getElementById("btn7").disabled = false
  		document.getElementById("btn8").disabled = false
  		document.getElementById("btn9").disabled = false

};
*/