var bcounter = 1;
var playerChosen;
var enemyChosen;
var heroHp = 1;
var heroHit;
var heroHitMult;
var emenyHp
var enemyHit;
var gameOver = false;
var randomBonusPlayer;
var randomBonusEnemy;
///////////////////sounds//////////////////////////////
var blaster =  new Audio("assets/sounds/blasterfire.mp3");
var winning = new Audio("assests/sounds/cantina.mp3");
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
       ///////if all characters already defeated//////
       if ($("#hide > div").length === 3) {
        $("#update").text("The battle is over, press reset to play again.");  
       }
       ///////get attacker////////
       else if ($("#enemyField > div").length < 1 && $("#defenderField > div").length < 1) {
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
        /////////Clear Update Field///////////
        $("#update").text("");
        /////////attack if opponent present in defenderField/////
        if ($("#defenderField > div").length > 0 && heroHp > 0) {
           heroHp = playerChosen.attr("data-hp");
           heroHit = playerChosen.attr("data-atk");
           enemyHp = enemyChosen.attr("data-hp");
           enemyHit = enemyChosen.attr("data-catk");
           
           randomBonusPlayer = (Math.floor(Math.random() * 10));
           randomBonusEnemy = (Math.floor(Math.random() * 5));
           enemyHp = enemyHp - ((heroHit * bcounter) + randomBonusPlayer);
           enemyChosen.attr("data-hp", enemyHp);
           $(enemyChosen).text(enemyHp);
           blaster.play();
           ///////add class fire to make player shake/////////////
           playerChosen.addClass("fire");
           setTimeout("playerChosen.removeClass('fire')", 700);
           
           if (enemyHp > 0 && heroHp > 0) {
             heroHp = heroHp - (parseInt(enemyHit) + randomBonusEnemy);
             playerChosen.attr("data-hp", heroHp);
             setTimeout(function(){ $(playerChosen).text(heroHp); }, 1500);
             ///////Enemy fires back at player//////////////////////
             setTimeout("blaster.play()", 1200);
             ///////add class fire to make player shake/////////////
             setTimeout("enemyChosen.addClass('fire')", 1200);
             setTimeout("enemyChosen.removeClass('fire')", 1900);
             ////////send text update////////////////
             setTimeout(function(){ $("#update").text("You attacked " + enemyChosen.attr("id") +" for " + ((heroHit * bcounter) + randomBonusPlayer) + " damage, he attacked you for " + (parseInt(enemyHit)+randomBonusEnemy)); }, 2000);
             setTimeout("bcounter++;", 2000);

            }
           if (enemyHp <= 0 && heroHp >= 0) {
               setTimeout(function(){ $("#update").text("You have defeated " + enemyChosen.attr("id") +"!"); }, 1000);
               enemyChosen.addClass("dead");
               $("#hide").append(enemyChosen);
               /////////WINNER////////////////////////////////
               if ($("#hide > div").length === 3) {
                 setTimeout("playerChosen.addClass('fire')", 1000);
                 setTimeout(function(){ winning.play(); }, 1100);
                 setTimeout(function(){ $("#update").text("You won the Battle of the BountyHunters!"); }, 1200);
                 setTimeout(function(){  $("#resetField").append("<button id='reset' value='button'>Reset</button>"); }, 1200);
                }
           }
           if (heroHp <= 0 && enemyHp > 0) {
              setTimeout(function(){ $("#update").text("You have been defeated, press reset button to try again."); }, 2000);
              ///////dont add a second reset button//////
              if (gameOver === false) {
                 $("#resetField").append("<button id='reset' value='button'>Reset</button>");
                 
              }
           }
        }
    }); 
    ////////////////Reset Game////////////////////
    $("#resetField").on("click", function(event) { 
        ////////remove shake if player just won///
        if ($(playerChosen).hasClass("fire")) {
            $(playerChosen).removeClass("fire");
        }
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

