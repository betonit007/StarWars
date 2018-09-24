//////////////Declaring Variables//////////////
function aa() {
    alert("hello");
}


/////////////Players on Click/////////////////
$(document).ready(function() {
    $(".player").on("click", function(event) {   
    ///////get attacker////////
    var attacker = event.target;
    console.log(attacker.className);
    if (attacker.className === "player box") {
       $(attacker).removeClass("player");
       //////get defenders////////
       var pool = $(".player");
       var defenders = [];
       for (var i = 0; i < pool.length; i++) {
           if (attacker.id !== pool[i].id) {
               var next = document.getElementById(pool[i].id);
               $(next).addClass("villian");
               $("#enemyfield").append(next);

           }
       }
    }
    
    if (attacker.className === "player box villian") {
      console.log(attacker);
    }

    });

});  