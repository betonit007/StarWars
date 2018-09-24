//////////////Declaring Variables//////////////
function aa() {
    alert("hello");
}


/////////////Players on Click/////////////////
$(document).ready(function() {
    $(".player").on("click", function(event) {
    ///////get attacker////////
    var attacker = event.target;
    console.log(attacker.id);
    //////get defenders////////
    var pool = $(".player");
    console.log(pool);
    console.log(pool[1].id);
    console.log(pool.length);
    var defenders = [];
    for (var i = 0; i < pool.length; i++) {
        if (attacker.id !== pool[i].id) {
            var next = document.getElementById(pool[i].id);
            console.log(next);
            $(next).removeClass("player");
            $(next).addClass("villian");
            $("#enemyfield").append(next);

           
        }
    }

    });
    
});