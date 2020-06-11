window.onload = function() {

    // Prompt to store player's name 
    var player = prompt("Please enter your name", "Jon Snow");

    /*
     * Create a list that holds all of your cards
     */ 

    if (player != null && player !== '')
    {
        // Play Careless Whisper
        x = document.getElementById("myAudio");
        console.log(x);
        x.play();

        // List of cards
        var class_list = ['fa-car', 'fa-diamond', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-hourglass', "fa-bicycle", "fa-cube", "fa-car", "fa-diamond", "fa-hourglass", "fa-bolt", "fa-anchor", "fa-leaf"];

        /*
         * Display the cards on the page
         *   - shuffle the list of cards using the provided "shuffle" method below
         *   - loop through each card and create its HTML
         *   - add each card's HTML to the page
         */

        // Shuffle cards using shuffle function
        var shuffledClass_list = shuffle(class_list);

        console.log(shuffledClass_list);

        // Adding each card's HTML
        for (var i = 0; i < shuffledClass_list.length; i++) {
            var deck = $(".deck");

            var cardHTML = "<li class='card'> <i class='fa " +
                shuffledClass_list[i] +
                " fa-5x hide' ></i> </li>";

            console.log(cardHTML);
            $(deck).append(cardHTML);
        }

        // Shuffle function from http://stackoverflow.com/a/2450976
        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }


        /*
         * set up the event listener for a card. If a card is clicked:
         *  - display the card's symbol (put this functionality in another function that you call from this one)
         *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
         *  - if the list already has another card, check to see if the two cards match
         *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
         *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
         *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
         *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
         */

        // Listener for hover on card
        $(".card").hover(function(event) {
            // If card is open cursor type will be pointer
            if ($(this).children().hasClass('hide')) {
                $(this).css('cursor', 'pointer');
            }
            // If card is closed cursor type will be default
            else {
                $(this).css('cursor', 'default');
            }
        });

        // Listener for click on card
        $(".card").on('click', function(event) {
            event.preventDefault();
            // When card is clicked openCard function is called
            openCard(event.target);
        });

        // openCard function
        var openCard = function(target) {
            var target = $(target);
            // Checks if one or no card is open
            if (checkCardArr.length < 2) {
                // The card becomes visible
                if (target.children().hasClass('hide')) {
                    target.children().removeClass('hide');
                    // addCardToArr Function is called 
                    addCardToArr(target);
                }
            }
        };

        // Stores the open cards
        var checkCardArr = [];

        // Keeps the count of moves
        var moveCounter = 0;
        $('#moves').text("Moves: " + moveCounter);

        // addCardToArr Function
        var addCardToArr = function(target) {

            // If no card is open
            if (checkCardArr.length === 0) {
                var target1 = target;
                // Card is added to checkCardArr
                checkCardArr.push(target1);
                // console.log("1");
                // If one card is open
            } else if (checkCardArr.length === 1) {
                var target2 = target;
                // Second card is added to checkCardArr
                checkCardArr.push(target2);
                // console.log(checkCardArr);
                // console.log("2");
                // When two cards are open checkEqual is called to check if they are equal 
                checkEqual();
                // If two cards are open
            } else {
                // console.log("more than 3 elements");
            }
        };

        // Function checkEqual checks if two open cards are equal
        var checkEqual = function() {

            // Increases the number of moves
            moveCounter++;
            $('#moves').text("Moves: " + moveCounter);

            // After 16 moves, rating will become 2 star
            if (moveCounter == 16) {
                $('#star3').toggleClass('checked');
            }

            // After 21 moves, rating will become 1 star
            if (moveCounter == 21) {
                $('#star2').toggleClass('checked');
            }

            // Storing the classes of card 1 and 2,to equate them later
            var card1class = checkCardArr[0].children().attr('class');
            var card2class = checkCardArr[1].children().attr('class');

            // If cards are equal cardsEqual method is called
            if (card1class === card2class) {
                cardsEqual();
                // If cards are not equal cardsNotEqual method is called
            } else {
                cardsNotEqual();
            }
        };

        // Keeps a count of how many pairs have been matched
        var pairCounter = 0;

        // Function cardsEqual
        var cardsEqual = function() {
            checkCardArr.length = 0;
            pairCounter += 1;
            // If 8 pairs have been matched, gameEnd is called
            if (pairCounter === 8) {
                gameEnd();
            }
        };

        // Function cardsNotEqual
        var cardsNotEqual = function() {
            // If not equal, cards are hidden again after 1sec
            setTimeout(function() {
                checkCardArr[0].children().addClass('hide');
                checkCardArr[1].children().addClass('hide');
                checkCardArr.length = 0;
            }, 1000);
        };

        // The game has been won, show congratulations,score,stars, time
        var gameEnd = function() {

            leaderBoard();
            $(".modal-body.congratsModalBody").append("You completed the game in " + hr + " hour(s)" + " : " + min + " min(s)" + " : " + sec + " sec(s)" + " with " + moveCounter + " moves");
            $('#congratsModal').modal();
        };

        // STOPWATCH STARTS
        var sec = 0,
            min = 0,
            hr = 0;

        var stopWatch = function() {
            setTimeout(function() {
                sec = sec + 1;
                // console.log(sec);
                if (sec == 59) {
                    min += 1;
                    sec = 0;
                }
                if (min == 59) {
                    hr += 1;
                    min = 0;
                }
                // console.log(hr +' : ' + min +' : ' +sec);
                $('#stopwatch').empty();
                $('#stopwatch').append(hr + ' : ' + min + ' : ' + sec);

                if (pairCounter < 8) {
                    stopWatch();
                }

            }, 1000);
        };

        $('#stopwatch').append(hr + ' : ' + min + ' : ' + sec);
        stopWatch();
        // STOPWATCH ENDS


        // LeaderBoard

        var leaderBoard = function() {
            //If prev scores exist, get them and store them in scores
            if (localStorage.highScores !== undefined) {
                //Converting the scores back into array from JSON  
                scores = JSON.parse(localStorage.highScores);
                console.log("exist kart hai1");
                // console.log(scores);
            } else {
                // Initiate empty highScores array;
                scores = [];
                console.log("Does not exist1");
            }

            //Name, score and date are sent to scores array 
            scores.push({ name: player, moves: moveCounter });
            // Scores array is sorted in ascending order
            scores.sort(function(a, b) {
                return a.moves - b.moves;
            });
            // Only top 5 scores are saved
            if (scores.length === 6) {
                scores = scores.slice(0, 5);
            }

            console.log(scores);
            //Score is converted into JSON to be saved on client local machine
            localStorage.highScores = JSON.stringify(scores);

        };

        // Functions called on button click

        $("#leaderBoardBtn").click(function(event) {
            // Checking if highScores are present
            if (localStorage.highScores !== undefined) {
                //Converting the scores back into array from JSON  
                scores = JSON.parse(localStorage.highScores);
            }

            // To avoid appending of the same scores
            $("#LBBody").empty();

            // Scores being added to modal table
            for (i = 0; i < scores.length; i++) {
                $("#LBBody").append("<tr><td>" + scores[i].name + "</td>" +
                    "<td>" + scores[i].moves + " </td> </tr>");
            }
        });

    }
    else{
        location.reload();
    }
};
    
// Resetting high Scores
var empty = function() {
    scores = [];
    //Score is converted into JSON to be saved on client local machine
    localStorage.highScores = JSON.stringify(scores);
    $("#LBBody").empty();
};