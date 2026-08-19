/*    JavaScript 7th Edition
      Chapter 2
      Project 02-02

      Application to test for completed form
      Author: Leslie Brockman
      Date:   08/18/2026
      giggles

      Filename: project02-02.js
 */

let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", verifyForm);

function verifyForm() {

   let name = document.getElementById("name").value;

   let email = document.getElementById("email").value;

   let phone = document.getElementById("phone").value;

   if (name && email && phone) {

      window.alert("Thank you!");

   } else {

      window.alert("Please fill in all fields");
   }
}

//I need these notes here.

//Claim:
//addEventListener("click", verifyForm) rather than being called directly from an inline onclick — this matches standard practice and satisfies the requirement that it runs on submit.

//Evidence:
//Runs in a slightly different scope and is generally discouraged in modern JS because it couples structure (HTML) with behavior (JS), Runs in a slightly different scope and is generally discouraged in modern JS because it couples structure (HTML) with behavior (JS),

//Why:
//The event listener is added to the submit button, and when the button is clicked, it triggers the verifyForm function. This approach keeps the HTML clean and separates the structure from the behavior, which is a best practice in web development.Lets the deferred script attach behavior after the DOM loads, and follows the "unobtrusive JavaScript" convention this textbook chapter is teaching.

//use this assignment to experiement with the code (archives) and see if we can get repos with minimal script and style in the html on downloading problems, {Fortran overlay research} easy linking--faster speeds, and accessibility.
