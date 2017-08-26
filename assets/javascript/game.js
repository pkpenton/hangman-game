// TODO: make everything on key up
// TODO: keep score (play again vs. start over button)

// TODO: add warning to "play Again" button
// TODO: show the secret word when you lose
// TODO: make buttons uppercase

// TODO: add animations (maybe a balloon pop)

window.onload = function() {

    var usStates = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    var stateCapitals = [
        "Albany",
        "Annapolis",
        "Atlanta",
        "Augusta",
        "Austin",
        "Baton Rouge",
        "Bismarck",
        "Boise",
        "Boston",
        "Carson City",
        "Charleston",
        "Cheyenne",
        "Columbia",
        "Columbus",
        "Concord",
        "Denver",
        "Des Moines",
        "Dover",
        "Frankfort",
        "Harrisburg",
        "Hartford",
        "Helena",
        "Honolulu",
        "Indianapolis",
        "Jackson",
        "Jefferson City",
        "Juneau",
        "Lansing",
        "Lincoln",
        "Little Rock",
        "Madison",
        "Montgomery",
        "Montpelier",
        "Nashville",
        "Oklahoma City",
        "Olympia",
        "Phoenix",
        "Pierre",
        "Providence",
        "Raleigh",
        "Richmond",
        "Sacramento",
        "Saint Paul",
        "Salem",
        "Salt Lake City",
        "Santa Fe",
        "Springfield",
        "Tallahassee",
        "Topeka",
        "Trenton",
    ];

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var secretWord;
    var guess;
    var guesses = [];
    var lives;
    var counter;
    var showLives = document.getElementById('my-lives');


    function displayThemeButtons() {
        themeButtonsDiv = document.getElementById('theme-buttons');
        themeOneButton = document.createElement('button');
        themeTwoButton = document.createElement('button');
        themeButtonsDiv.appendChild(themeOneButton);
        themeButtonsDiv.appendChild(themeTwoButton);
        themeOneButton.innerHTML = 'US States';
        themeTwoButton.innerHTML = 'State Capitals';
    };


    function displayAlphabetButtons(firstLetterIndex, lastLetterIndexPlusOne, secretWord) {
        letterButtonsDiv = document.getElementById('buttons');
        letterButtonsUL = document.createElement('ul');
        for (var i = firstLetterIndex; i < lastLetterIndexPlusOne; i++) {
            if ((firstLetterIndex === 7) || (firstLetterIndex === 20)) {
                letterButtonsUL.id = 'alphabet-offset-row';
            } else {
                letterButtonsUL.id = 'alphabet';
            }
        letterButtonsLI = document.createElement('li');
        letterButtonsLI.id = 'letter';
        letterButtonsLI.innerHTML = alphabet[i];
        collectLetterGuesses();
        letterButtonsDiv.appendChild(letterButtonsUL);
        letterButtonsUL.appendChild(letterButtonsLI);
        };
    };


    function displayPlayAgainButton() {
        var playAgainButtonDiv = document.getElementById('reset');
        var playAgainButton = document.createElement('button');
        playAgainButtonDiv.appendChild(playAgainButton);
        playAgainButton.setAttribute('onClick', 'window.location.reload()');
        playAgainButton.innerHTML = 'Play Again';
    };


    function pickRandomItemFromList(themeList) {
        var randomWord = Math.round(Math.random() * 100000) % themeList.length;
        return(themeList[randomWord]);
    };


    function result(secretWord) {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');
        for (var i = 0; i < secretWord.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (secretWord[i] === ' ') {
                guess.innerHTML = ' ';
            } else {
                guess.innerHTML = '_';
            };
            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        };
    };


    function spacesInString(secretWord) {
        var spacesInSecretWord = 0;
        for(var j = 0; j < secretWord.length; j++) {
            if (secretWord[j] === ' ')
                spacesInSecretWord++;
        };
        return spacesInSecretWord;
    };


    function comments() {
        showLives.innerHTML = 'Number of guesses remaining: ' + lives;
        if (lives < 1) {
            showLives.innerHTML = 'Game Over';
        };
        for (var i = 0; i < guesses.length; i++) {
            if (counter + spacesInSecretWord === guesses.length) {
                showLives.innerHTML = 'You Win!';
            };
        };
    };


    function collectLetterGuesses() {
        letterButtonsLI.onclick = function() {
            var guess = (this.innerHTML);
            displayLettersAlreadyGuessed(guess);
            this.setAttribute('class', 'active');
            this.onclick = null;
            for (var i = 0; i < secretWord.length; i++) {
                if (secretWord[i] === guess) {
                    guesses[i].innerHTML = guess;
                    counter += 1;
                };
            };
            if ((secretWord.indexOf(guess)) === -1) {
                lives -= 1;
                comments();
            } else {
                comments();
            };
        };
    };


    function displayLettersAlreadyGuessed(guess) {
        var alreadyGuessedDiv = document.getElementById('already-guessed');
        var alreadyGuessedParagraph = document.createElement('p');
        alreadyGuessedDiv.appendChild(alreadyGuessedParagraph);
        alreadyGuessedParagraph.innerHTML = guess;
    };


    function displayLettersAlreadyGuessedTitle() {
        var alreadyGuessedDiv = document.getElementById('already-guessed');
        var alreadyGuessedTitle = document.createElement('div');
        alreadyGuessedDiv.appendChild(alreadyGuessedTitle);
        alreadyGuessedTitle.setAttribute('class', 'already-guessed-title');
        alreadyGuessedTitle.innerHTML = 'Letters already guessed:';
    };


    function revealChosenTheme(chosenTheme) {
        var themeButtonsDiv = document.getElementById('theme-buttons');
        var displayChosenThemeDiv = document.createElement('div');
        themeButtonsDiv.replaceWith(displayChosenThemeDiv);
        displayChosenThemeDiv.setAttribute('class', 'container');
        displayChosenThemeParagraph = document.createElement('p');
        displayChosenThemeDiv.appendChild(displayChosenThemeParagraph);
        displayChosenThemeParagraph.innerHTML = ('Your theme is ' + chosenTheme);
        displayChosenThemeParagraph.id = ('theme-reveal');
    };


    function playGame(secretWord) {
        displayAlphabetButtons(0, 7);
        displayAlphabetButtons(7, 13);
        displayAlphabetButtons(13, 20);
        displayAlphabetButtons(20, 26);
        spacesInSecretWord = spacesInString(secretWord);
        displayLettersAlreadyGuessedTitle();
        displayPlayAgainButton();
        result(secretWord);
        comments();
    };


    function setUpGame() {
        guesses = [];
        lives = 7;
        counter = 0;
        displayThemeButtons();
        themeOneButton.onclick = function() {
            secretWord = pickRandomItemFromList(usStates).toLowerCase();
            var chosenTheme = 'US States';
            revealChosenTheme(chosenTheme);
            // console.log(secretWord);
            playGame(secretWord);
        };
        themeTwoButton.onclick = function() {
            secretWord = pickRandomItemFromList(stateCapitals).toLowerCase();
            var chosenTheme = 'US State Capitals';
            revealChosenTheme(chosenTheme);
            // console.log(secretWord);
            playGame(secretWord);
        };
    };

    setUpGame();

};