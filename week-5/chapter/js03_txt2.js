/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: Leslie Brockman
     Date:   09/13/2026

     Filename: js03.js
 */

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.addEventListener("load", addWeekDays);

function addWeekDays() {
    let headCells = document.querySelectorAll("#calendar thead th");

    for (let i = 0; i < headCells.length; i++) {
        headCells[i].textContent = weekDays[i];
    }
}

window.addEventListener("load", showGames);

// Function to write game information into the calendar
function showGames () {
    for (let i = 0; i < gameDates.length; i++) { 
        let gameInfo;

        switch (gameResults[i]) {
            case "W":
                gameInfo = "<p class='win'>";
                break;
            case "L":
                gameInfo = "<p class='lose'>";
                break;
            case "S":
                gameInfo = "<p class='suspended'>";
                break;
            case "P":
                gameInfo = "<p class='postponed'>";
                break;
        }

        if (gameLocations[i] === "h") {
            gameInfo += "vs. ";
        } else if (gameLocations[i] === "a") {
            gameInfo += "@ ";
        }

        //Include the opponent
        gameInfo += gameOpponents[i] + "<br> ";
        //Include the game result and score
        gameInfo += gameResults[i] + ": (" + runsScored[i] + "-" + runsAllowed[i] + ")";

        if (gameResults[i] === "S") {
            gameInfo += "Suspended";
        } else if (gameResults[i] === "P") {
            gameInfo += "Postponed";
        }

        //close the paragraph
        gameInfo += "</p>";

        //write the game information into the correct table cell
        let tableCell = document.getElementById(gameDates[i]);
        tableCell.insertAdjacentHTML("beforeend", gameInfo);
    }
}
