var bcounter = 0;
var playerChosen;
var enemyChosen;
var heroHp;
var heroHit;
var heroHitMult;
var emenyHp
var enemyHit;


$(document).ready(function() {
    /////////////show players hit points//////////
    $("#obi").text($("#obi").attr("data-hp"));
    $("#maul").text($("#maul").attr("data-hp"));
    $("#sid").text($("#sid").attr("data-hp"));
    $("#jin").text($("#jin").attr("data-hp"));

    /////////get playerChosen on Click/////////////////
    $(".one").on("click", function(event) {   
       ///////get attacker////////
       if ($("#enemyField > div").length < 1) {
          playerChosen = $(this);
          playerChosen.removeClass("one");
          playerChosen.addClass("hero");
          $("#enemyField").append($(".one"));

       }
       else if ($("#defenderField > div").length < 1) {
          enemyChosen = $(this);
          $("#defenderField").append(enemyChosen);
       }
       console.log($("#enemyField > div").length);
       
    });

    ////////////////battle////////////////////
    $("#attack").on("click", function(event) { 
        /////////attack if opponent present in defenderField/////
        if ($("#defenderField > div").length > 0) {
           heroHp = playerChosen.attr("data-hp");
           heroHit = playerChosen.attr("data-atk");
           enemyHp = enemyChosen.attr("data-hp");
           enemyHit = enemyChosen.attr("data-catk");

           heroHp = heroHp - enemyHit;
           playerChosen.attr("data-hp", heroHp);
           $(playerChosen).text(heroHp);
           bcounter++;
           
           if (enemyHp > 0) {
              enemyHp = enemyHp - (heroHit * bcounter);
              enemyChosen.attr("data-hp", enemyHp);
              $(enemyChosen).text(enemyHp);
           }

           if (enemyHp <= 0) {
               $("#defenderField").empty();

           }
    

        }


    });   
});

