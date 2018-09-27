var bcounter = 0;
var playerChosen;
var enemyChosen;
var heroHp = 1;
var heroHit;
var heroHitMult;
var emenyHp
var enemyHit;
var gameOver = false;


$(document).ready(function() {
    /////////////show players hit points//////////
    $("#obi").text($("#obi").attr("data-hp"));
    $("#maul").text($("#maul").attr("data-hp"));
    $("#sid").text($("#sid").attr("data-hp"));
    $("#jin").text($("#jin").attr("data-hp"));

    /////////get playerChosen on Click/////////////////
    $(".one").on("click", function(event) {   
       ///////get attacker////////
       if ($("#enemyField > div").length < 1 && $("#defenderField > div").length < 1) {
          playerChosen = $(this);
          playerChosen.removeClass("one");
          playerChosen.addClass("hero");
          $("#enemyField").append($(".one"));
       }

       else if ($("#defenderField > div").length < 1) {
          enemyChosen = $(this);
          if (enemyChosen.attr("class") !== "hero" && enemyChosen.attr("class") !== "dead") {
             $("#defenderField").append(enemyChosen);
          }
       }
    });

    ////////////////battle////////////////////
    $("#attack").on("click", function(event) { 
        /////////attack if opponent present in defenderField/////
        if ($("#defenderField > div").length > 0 && heroHp > 0) {
           heroHp = playerChosen.attr("data-hp");
           heroHit = playerChosen.attr("data-atk");
           enemyHp = enemyChosen.attr("data-hp");
           enemyHit = enemyChosen.attr("data-catk");

           heroHp = heroHp - enemyHit;
           playerChosen.attr("data-hp", heroHp);
           $(playerChosen).text(heroHp);
           bcounter++; 
           
           if (enemyHp > 0 && heroHp > 0) {
              enemyHp = enemyHp - (heroHit * bcounter);
              enemyChosen.attr("data-hp", enemyHp);
              $(enemyChosen).text(enemyHp);
              ////////send text update////////////////
              $("#update").text("You attacked " + enemyChosen.attr("id") +" for " + (heroHit * bcounter) + " damage, he attacked you for " + enemyChosen.attr("data-catk") + " damage.");
            }
           if (enemyHp <= 0 && heroHp >= 0) {
               $("#update").text("You have defeated " + enemyChosen.attr("id") +"!");
               enemyChosen.addClass("dead");
               $("#hide").append(enemyChosen);
           }
           if (heroHp <= 0 && enemyHp > 0) {
              $("#update").text("You have been defeated, press reset button to try again.");
              ///////dont add a second reset button//////
              if (gameOver === false) {
                 $("#resetField").append("<button id='reset' value='button'>Reset</button>");
                 gameOver = true;
              }
           }
        }
    }); 
    ////////////////Reset Game////////////////////
    $("#resetField").on("click", function(event) { 
       $("#obi").text($("#obi").attr("data-hpB"));
       $("#maul").text($("#maul").attr("data-hpB"));
       $("#sid").text($("#sid").attr("data-hpB"));
       $("#jin").text($("#jin").attr("data-hpB"));
       

       alert("Game Over");
       $("#resetField").empty();
    });
});

