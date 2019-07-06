//questions and answers as objects within an array
var trivia = [{
    question: "Ireland accounts for 0.007% of the global population yet produces ___ of all CO2 emission released into the atmosphere (global emissions).",
    choices: ["0.7%", "0.001%", "0.03%", "0.15%"],
    answer: "0.15%"
},
{
    question: "Which sector produces the most CO2?",
    choices: ["Transportation", "Manufacturing and Construction", "Electricity and Heat Production", "Residences"],
    answer: "Electricity and Heat Production"
},
{
    question: "Coal, oil, natural gas, and propane are fossil fuels. They are called fossil fuels because: ",
    choices: ["They are nonrenewable and will run out", "They are burned to release energy and they cause air pollution", "They were formed from the buried remains of plants and tiny animals that lived hundred of millions of years ago", "They are mixed with fossils so they will burn better"],
    answer: "They were formed from the buried remains of plants and tiny animals that lived hundred of millions of years ago"
},
{
    question: "What is Geothermal Energy?",
    choices: ["Geothermal Energy is heat from the sun which can be stored and used as an efficient energy source.", "Geothermal Energy is heat from within the earth which can be used to heat buildings or generate electricity", "Geothermal Energy is concerned with extracting more fuels from the earth to provide heat and energy.", "Geothermal Energy is a method of monitoring global energy usage related to the heating and cooling of homes more efficiently."],
    answer: "Geothermal Energy is heat from within the earth which can be used to heat buildings or generate electricity"
},
{
    question: "The energy saved by recycling one aluminium drink can is enough to run a TV for how long?",
    choices: ["30 Minutes", "1.5 Hours", "3 Hours", "6 Hours"],
    answer: "3 Hours"
},
{
    question: "The amount of energy poured onto the Earth by the Sun every 15 minutes equivalent to what?",
    choices: ["World’s energy for a day", "World's energy for a week", "World’s energy for a month", "World’s energy for a year"],
    answer: "World’s energy for a year"
},
{
    question: "What is one example of Biomass?",
    choices: ["Solar", "Trees", "Wind", "Water"],
    answer: "Trees"
},
{
    question: "How is geothermal energy harvested? (How do we get it?)",
    choices: ["Solar panels collect the sunlight.", "The heat from the earth boils water to create steam.", "We pump it from the earth and refine it into gasoline.", "We drill for it and burn it like coal or wood."],
    answer: "The heat from the earth boils water to create steam."
},
{
    question: "What is one disadvantage of using hydropower?",
    choices: ["Hydropower is a renewable energy resource. There are no disadvantages.", "The power is used as electricity to power large buildings instead of homes.", "Building dams can damage natural wildlife and water systems like lakes and rivers.", "Most of the time there isn't enough water power to create electricity."],
    answer: "Building dams can damage natural wildlife and water systems like lakes and rivers."
},
{
    question: "Why is biomass still an important energy resource today?",
    choices: ["There is a lot of it and it is easy to get to.", "Many people don't have access to other energy resources.", "It is easy to replant and grow new biomass resources.", "It keeps lumberjacks employed."],
    answer: "Many people don't have access to other energy resources."
}];

// Main game variable that holds scores, timing, and changes the question
var game = {
    correct: 0,
    incorrect: 0,
    skipped: 0,
    timer: 5,
    questions: trivia,
    currentQuestion: 0,
};

// function to count down
function countDown(){
    game.timer--;
    $("#timer").text("Seconds Left: " + game.timer);
    if(game.timer === 0){
        outOfTime();
    }
};

//function to display first question
function newQuestion(){
    timerSet = setInterval(countDown, 1000);
    $("#question").text(trivia[game.currentQuestion].question);
    for (var i = 0; i < trivia[game.currentQuestion].choices.length; i++){
        $("#choices").append("<button class='choices-btns' id='button-"+i+"' data-name='"+trivia[game.currentQuestion].choices[i]+"' >" + trivia[game.currentQuestion].choices[i] + "</button>");
    }
};

//function to display next question
function nextQuestion() {
    game.timer = 5;
    $("#timer").text("Seconds Left: " + game.timer);
    game.currentQuestion++;
    $("#choices").text("");
    newQuestion();
}

//event listener to see if the user's guess (from clicking the button) matches the answer stored in the button
$(document).on("click", ".choices-btns", function(e){
    userGuess(e);
});

//function to check answer after click
function userGuess (e){
    if($(e.target).data("name")===trivia[game.currentQuestion].answer){
        correctGuess();
    } else {
        incorrectGuess();
    }
};

//function for correct answer
function correctGuess (){
    clearInterval(timerSet);
    console.log("correct");
    game.correct++;
    if (game.currentQuestion === trivia.length - 1){
        setTimeout(finalScore, 1000);
    } else {
        setTimeout(nextQuestion, 1000);
    }
};

//function for incorrect answer
function incorrectGuess (){
    clearInterval(timerSet);
    console.log("incorrect");
    game.incorrect++;
    if (game.currentQuestion === trivia.length - 1){
        setTimeout(finalScore, 1000); //still need results function
    } else {
        setTimeout(nextQuestion, 1000);
    }
};

//function for letting the timer run out
function outOfTime () {
    clearInterval(timerSet);
    console.log("Out of time");
    game.skipped++;
    if (game.currentQuestion === trivia.length - 1){
        setTimeout(finalScore, 1000); //still need results function
    } else {
        setTimeout(nextQuestion, 1000);
    }
};

//function to show final score
function finalScore (){
    clearInterval(timerSet);
    $("#triviaGame").html("See your results!");
    $("#triviaGame").append("Correct Answers: " + game.correct);
    $("#triviaGame").append("Incorrect Answers: " + game.incorrect);
    $("#triviaGame").append("Skipped Answers: " + game.skipped);
};

//function to remove start button after it is pressed and reset game
$("#start").on("click", function(){
    $("#start").remove();

    game.correct = 0;
    game.incorrect = 0;
    game.skipped = 0;
    
    clearInterval(game.timerCount);

    $("#triviaGame").show();
    $("#timer").text("Seconds Left: " + game.timer);

    newQuestion();

})
