var bcounter = 0;
var playerChosen;
var enemyChosen;
var heroHp = 1;
var heroHit;
var heroHitMult;
var emenyHp
var enemyHit;
var gameOver = false;
////////////functions/////////////////////////////

/////////////reset attributes//////////////////////
function resetHpById(p1, p2, p3, p4) {
    $(p1).attr("data-hp", $(p1).attr("data-hpB"));
    $(p2).attr("data-hp", $(p2).attr("data-hpB"));
    $(p3).attr("data-hp", $(p3).attr("data-hpB"));
    $(p4).attr("data-hp", $(p4).attr("data-hpB"));
}

////////////get hp attributes///////////////////
function getHpAttributesById(p1, p2, p3, p4) {
    $(p1).text($(p1).attr("data-hp"));
    $(p2).text($(p2).attr("data-hp"));
    $(p3).text($(p3).attr("data-hp"));
    $(p4).text($(p4).attr("data-hp"));
}

//////////reset classes/////////////////////
function resetClassesById() {
var resets = $(".reset");
for (var i = 0; i < resets.length; i++) {
    console.log(resets[i]);
}
}





////////////////////////////////////////////////////////Main Body//////////////////////////////////////////

$(document).ready(function() {
    /////////////show players hit points//////////
    getHpAttributesById("#Bossk", "#Dengar", "#Greedo", "#BobbaFett");

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

           enemyHp = enemyHp - (heroHit * bcounter);
           enemyChosen.attr("data-hp", enemyHp);
           $(enemyChosen).text(enemyHp);
           
           
           if (enemyHp > 0 && heroHp > 0) {
             heroHp = heroHp - enemyHit;
             playerChosen.attr("data-hp", heroHp);
             $(playerChosen).text(heroHp);
             bcounter++; 
              ////////send text update////////////////
              $("#update").text("You attacked " + enemyChosen.attr("id") +" for " + (heroHit * bcounter) + " damage, he attacked you for " + enemyChosen.attr("data-catk") + " damage.");
            }
           if (enemyHp <= 0 && heroHp >= 0) {
               $("#update").text("You have defeated " + enemyChosen.attr("id") +"!");
               enemyChosen.addClass("dead");
               $("#hide").append(enemyChosen);
               /////////WINNER////////////////////////////////
               if ($("#hide > div").length === 3) {
                 $("#update").text("You won the Battle of the BountyHunters!");
                 $("#resetField").append("<button id='reset' value='button'>Reset</button>");
                }
           }
           if (heroHp <= 0 && enemyHp > 0) {
              $("#update").text("You have been defeated, press reset button to try again.");
              ///////dont add a second reset button//////
              if (gameOver === false) {
                 $("#resetField").append("<button id='reset' value='button'>Reset</button>");
                 
              }
           }
        }
    }); 
    ////////////////Reset Game////////////////////
    $("#resetField").on("click", function(event) { 
        ////////reset hp attribute////////////////
        resetHpById("#Bossk", "#Dengar", "#BobbaFett", "#Greedo");
        getHpAttributesById("#Bossk", "#Dengar", "#Greedo", "#BobbaFett");

       $("#resetField").empty();
       ////////reset hero class character/////////
       $(".hero").addClass("one");
       $(".hero").removeClass("hero");
       $("#update").empty();
       $("#playerField1").append($(".one"));
       bcounter = 1;
       heroHp = 1;
       gameover = false;
    });
});

