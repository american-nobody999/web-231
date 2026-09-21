/*    JavaScript 7th Edition
      Chapter 4
      Project 04-04

      Application to determine change from a cash amount
      Author: Leslie Brockman
      Date: 09/20/2026
     I had way too much fun with this. Seriously, I love games, and these are games on so many levels.
      Filename: project04-04.js
*/
"use strict";

// Global variables
let cashBox = document.getElementById("cash");
let billBox = document.getElementById("bill");
let changeBox = document.getElementById("change");

// Event handlers to be run when the cash or bill value changes
cashBox.addEventListener("change", runTheRegister);
billBox.addEventListener("change", runTheRegister);

// Function to reset the values in the web page
function zeroTheRegister() {
   changeBox.value = 0;
   document.getElementById("bill20").innerHTML = 0;
   document.getElementById("bill10").innerHTML = 0;
   document.getElementById("bill5").innerHTML = 0;
   document.getElementById("bill1").innerHTML = 0;
   document.getElementById("coin25").innerHTML = 0;
   document.getElementById("coin10").innerHTML = 0;
   document.getElementById("coin5").innerHTML = 0;
   document.getElementById("coin1").innerHTML = 0;
   document.getElementById("warning").innerHTML = "";
}

// Function to run the cash register
function runTheRegister() {
   zeroTheRegister();
   
   let cashValue = Number(cashBox.value);
   let billValue = Number(billBox.value);
   if (cashBox.value.trim() === "" || billBox.value.trim() === "" ||
       !Number.isFinite(cashValue) || !Number.isFinite(billValue) ||
       cashValue < 0 || billValue < 0) {
      document.getElementById("warning").innerHTML = "Enter valid, nonnegative cash and bill amounts.";
      return;
   }

   let changeValue = (Math.round(cashValue * 100) - Math.round(billValue * 100)) / 100;
   try {
      if (!(changeValue >= 0)) {
         throw "Cash amount doesn’t cover the bill";
      }

      changeBox.value = formatCurrency(changeValue);
      calcChange(changeValue);
   } catch (error) {
      document.getElementById("warning").innerHTML = error;
   }
}

// Function to calculate the change by each unit of currency
function calcChange(changeValue) {
   // Use whole cents to avoid decimal rounding errors in coin counts.
   let remainingCents = Math.round(changeValue * 100);
   const denominations = [
      ["bill20", 2000], ["bill10", 1000], ["bill5", 500], ["bill1", 100],
      ["coin25", 25], ["coin10", 10], ["coin5", 5], ["coin1", 1]
   ];

   for (const [id, cents] of denominations) {
      let count = determineCoin(remainingCents, cents);
      document.getElementById(id).innerHTML = count;
      remainingCents -= count * cents;
   }
}








/* ================================================================= */

// Function to determine the largest whole number of currency units that 
// can fit within the cash value
function determineCoin(cashValue, currencyUnit) {
   // The parseInt() function returns the integer value of the ratio
   return parseInt(cashValue/currencyUnit);
}

 // Function to display a numeric value as a text string in the format ##.## 
 function formatCurrency(value) {
    return value.toFixed(2);
 }

 //moving forward, using "use strict"; on all assignments to prevent accidental global variables. Basically, it enforces stricter parsing and error handling in your JavaScript code, helping to catch common coding mistakes and unsafe actions. It makes you fix the errors before running the code. Just put it at the top and forget about it.
 
