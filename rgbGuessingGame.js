var colors;
var desiredColor;
var numSquares;
var colorDisplay = document.querySelector("#colorDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var message = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");

initializeGame();

function initializeGame()
{
    h1.style.backgroundColor = "steelblue";
    message.textContent = "";
    for(var i = 0; i < modeButtons.length; i++)
    {
        numSquares = (i+1)*3; // Not flexible
        if(modeButtons[i].classList.contains("selected"))
        {
            for(var j = 0; j < squares.length; j++)
            {
                squares[j].style.display = "block";
            }
            for(var j = numSquares; j < squares.length; j++)
            {
                squares[j].style.backgroundColor = "#232323";
                squares[j].style.display = "none";
            }
            colors = generateRandomColors(numSquares);
        }
    }
    desiredColor = pickColor();
    colorDisplay.textContent = desiredColor;
    resetButton.textContent = "New Colors";
    for(var i = 0; i < squares.length; i++)
    {
        // Add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
        // Add click listeners to squares
        squares[i].addEventListener("click",function()
        {
            // Grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // Compare color to desired color
            if(clickedColor === desiredColor)
            {
                changeColor(desiredColor);
                message.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
            }
            else
            {
                this.style.backgroundColor = "#232323";
                message.textContent = "Try again.";
            }
        });
    }
}

function changeColor(color)
{
    for(var i = 0; i < squares.length; i++)
    {
        squares[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

function pickColor()
{
    var randomNumber = Math.floor(Math.random()*colors.length);
    return colors[randomNumber];
}

function randomColor()
{
    var r = Math.floor(Math.random()*255 + 1);
    var g = Math.floor(Math.random()*255 + 1);
    var b = Math.floor(Math.random()*255 + 1);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num)
{
    var randomColors = [];
    // Fill randomColors with num random colors
    for(var i = 0; i < num; i++)
    {
        randomColors.push(randomColor());
    }
    return randomColors;
}

resetButton.addEventListener("click",function() 
{
    initializeGame();
});

for(var i = 0; i < modeButtons.length; i++)
{
    modeButtons[i].addEventListener("click",function()
    {
        if(!this.classList.contains("selected"))
        {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            initializeGame();
        }
    });
}