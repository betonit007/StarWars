
var defenderCounter = 2;


$(document).ready(function() {
    /////////////show players hit points//////////
    $("#obi").text($("#obi").attr("data-hp"));
    $("#maul").text($("#maul").attr("data-hp"));
    $("#sid").text($("#sid").attr("data-hp"));
    $("#jin").text($("#jin").attr("data-hp"));

    /////////get attacker on Click/////////////////
    $(".player").on("click", function(event) {   
    ///////get attacker////////
    var attacker = event.target;
    if (attacker.className === "player box") {
       $(attacker).removeClass("player");
       //////add at1 class to note attacker
       $(attacker).addClass("at1");
       //////get defenders////////
       var pool = $(".player");
       var defenders = [];
       for (var i = 0; i < pool.length; i++) {
           if (attacker.id !== pool[i].id) {
               var next = document.getElementById(pool[i].id);
               $(next).addClass("villian");
               $("#enemyfield").append(next);
               console.log($("#defenderField"));

           }
       }
    }
    

    ///////add dender to defender field//////////////
    if (attacker.className === "player box villian" && (defenderCounter % 2) === 0) {
      $("#defenderField").append(attacker);
      //////add defenda class to denote in defenderbox///////
      $(attacker).addClass("defenda");
      defenderCounter++;


      /////console.log(attacker.dataset.hp);
      /////var g = attacker.dataset.hp - 50;
      /////console.log(g);
    
    }
    //////catch if player tries to add another defender///////////
    else if (attacker.className === "player box villian" && (defenderCounter % 2) === 1) {
      alert("Defender is already in postion, you must fight!");

    }

    }); 


    /////////
    $("#attack").on("click", function() {
    
    var pHp = $(".at1").data("hp");
    var dHp = $(".defenda").data("hp");
    var pAttack = $(".at1").data("atk");
    var dAttack = $(".defenda").data("catk");
 
    ////////////exchange of attack////////////
    dHp = dHp - pAttack;
    console.log("defenders HP: " + dHp);
    $(".defenda").attr("data-hp", dHp);
    $(".defenda").text($(".defenda").attr("data-hp"));
    
 
    
         pHp = pHp - dAttack;
         console.log("attacker HP: " + pHp);
         $(".at1").attr("data-hp", pHp);
         $(".at1").text($(".at1").attr("data-hp"));
    
        
 
 
 
   });


});
