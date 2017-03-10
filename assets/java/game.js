$(document).ready(function() {

    $('#hero, #opponent, #attack').hide();

    var players = [{
        name: 'Chewbaca',
        ap  : 105,
        cap : 50,
        hp  : 200,
        exp : 1,
        img : 'assets/images/chew.jpg'
    }, {
        name: 'Darth Maul',
        ap  : 125,
        cap : 50,
        hp  : 250,
        exp : 1,
        img : 'assets/images/darth maul.jpg'
    }, {
        name: 'Darth Vader',
        ap  : 165,
        cap : 50,
        hp  : 300,
        exp : 1,
        img : 'assets/images/darth.png'
    }, {
        name: 'Kylo Ren',
        ap  : 165,
        cap : 50,
        hp  : 900,
        exp : 1,
        img : 'assets/images/kylo.png'
    }, {
        name: 'Obi Wan',
        ap  : 165,
        cap : 50,
        hp  : 450,
        exp : 1,
        img : 'assets/images/obi.png'
    }, {
        name: 'Yoda',
        ap  : 185,
        cap : 50,
        hp  : 400,
        exp : 1,
        img : 'assets/images/yoda.png'
    }];
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    $.each(players, function(index, player) {
        $("<div>")
            .data('player', player)
            .appendTo('#players')
            .on('click', function() {
                var $hero = $("#hero");
                if ($hero.find("div").length == 0) {
                    $(this).appendTo("#hero");
                    $hero.fadeIn(500);
                } else if ($("#opponent").find("div").length == 0) {
                    $(this).appendTo("#opponent");
                    $('#opponent').fadeIn(750, function() {
                        $("#attack").animate({'width': 'show'}, 500);
                    });
                    $("#players").hide();
                } else {
                    console.warn('Hero & Opponent already selected');
                }
            })
            .on('refresh', function() {
                var player = $(this).data('player');
                $(this)
                    .empty()
                    .append('<h1>' + player.name + '</h1>')
                    .append('<img src="' + player.img+ '"/>')
                    .append('<p>HitPoints: ' + player.hp + '</p>')
                    .append('<p>Attack: ' + ( player.ap * player.exp ) + '</p>')
                    .append('<p>Counter: ' + player.cap + '</p>')
            }).trigger('refresh');
    });
    $("#attack").find("button").on('click', function() {
        var $hero = $('#hero');
        var hero = $hero.find('div').data('player');
        var $opponent = $('#opponent');
        var opponent = $opponent.find('div').data('player');
        opponent.hp -= ( hero.ap * hero.exp);
        if (opponent.hp <= 0) {
            console.log('opponent dead');
            var $players = $("#players");
            if ($players.find("div").length == 0) {
                var reload = confirm("You won!\n\nPlay again?");
                if (reload) {
                    window.location.reload();
                }
            }
            $players.show();
            $opponent.find('div').remove();
        } else {
            //Counter attack!
            hero.hp -= opponent.cap;
        }
        if (hero.hp <= 0) {
            console.log('hero died from counter attack!');
        }
        hero.exp ++;

        $hero.find('div').data('player', hero).trigger('refresh');
        $opponent.find('div').data('player', opponent).trigger('refresh');
        console.log('hero object', hero);
        console.log('opponent object', opponent);
    });

});
