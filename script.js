// ===== GLOBAL VARIABLES =====
let score = 0;
let attempts = parseInt(localStorage.getItem("total_attempts")) || 0;

// Display total attempts from localStorage
document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;

// Add event listener to the submit button
document.querySelector("button").addEventListener("click", gradeQuiz);

// ===== MAIN GRADING FUNCTION =====
function gradeQuiz() {
  // Clear previous validation feedback
  document.querySelector("#validationFdbk").textContent = "";

  // Validate form - stop if invalid
  if (!isFormValid()) {
    return;
  }

  // Reset score for this attempt
  score = 0;

  // ----- Question 1: Text Input -----
  let q1Response = document.querySelector("#q1").value.toLowerCase().trim();
  if (q1Response === "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  // ----- Question 2: Dropdown -----
  let q2Response = document.querySelector("#q2").value;
  if (q2Response === "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  // ----- Question 3: Checkboxes (Mount Rushmore) -----
  // Correct answer: Jefferson AND Roosevelt checked, Jackson AND Franklin NOT checked
  if (document.querySelector("#Jefferson").checked &&
      document.querySelector("#Roosevelt").checked &&
      !document.querySelector("#Jackson").checked &&
      !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  // ----- Question 4: Radio Buttons -----
  let selectedQ4 = document.querySelector("input[name='q4']:checked");
  if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }

  // ----- Question 5: Text Input (Nile River) -----
  let q5Response = document.querySelector("#q5").value.toLowerCase().trim();
  if (q5Response === "nile" || q5Response === "the nile") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  // ----- Question 6: Text Input (Tokyo) -----
  let q6Response = document.querySelector("#q6").value.toLowerCase().trim();
  if (q6Response === "tokyo") {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  // ----- Question 7: Radio Buttons (Great Pyramids) -----
  let selectedQ7 = document.querySelector("input[name='q7']:checked");
  if (selectedQ7 !== null && selectedQ7.value === "Egypt") {
    rightAnswer(7);
  } else {
    wrongAnswer(7);
  }

  // ----- Question 8: Radio Buttons (Country above Mexico) -----
  let selectedQ8 = document.querySelector("input[name='q8']:checked");
  if (selectedQ8 !== null && selectedQ8.value === "United States") {
    rightAnswer(8);
  } else {
    wrongAnswer(8);
  }

  // ----- Question 9: Text Input (London) -----
  let q9Response = document.querySelector("#q9").value.toLowerCase().trim();
  if (q9Response === "london") {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  // ----- Question 10: Radio Buttons (Golden Gate Bridge) -----
  let selectedQ10 = document.querySelector("input[name='q10']:checked");
  if (selectedQ10 !== null && selectedQ10.value === "San Francisco") {
    rightAnswer(10);
  } else {
    wrongAnswer(10);
  }

  // ----- Display Final Score -----
  document.querySelector("#totalScore").textContent = `Total Score: ${score}`;

  //----- Display Congrats message -----
  if (score >= 80) {   
    document.querySelector('#CongratsMessage').textContent = 'Congradulations!';
    document.querySelector('#CongratsMessage').className = "bg-success text-white p-2";
  } 

  // ----- Track Attempts -----
  attempts++;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);
}

// ===== FORM VALIDATION =====
function isFormValid() {
  let isValid = true;
  let validationFdbk = document.querySelector("#validationFdbk");
  
  // Check Question 1
  let q1Response = document.querySelector("#q1").value.trim();
  if (q1Response === "") {
    isValid = false;
    validationFdbk.textContent = "❌ Question 1 was not answered";
    validationFdbk.className = "bg-danger text-white p-2";
  }
  
  return isValid;
}

// ===== HELPER FUNCTIONS =====
function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  if (markContainer) {
    markContainer.textContent = "";
    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    img.style.width = "30px";
    img.style.height = "30px";
    markContainer.appendChild(img);
  }
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  if (feedback) {
    feedback.textContent = "✅ Correct!";
    feedback.className = "bg-success text-white p-2";
  }
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 20;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  if (feedback) {
    feedback.textContent = "❌ Incorrect!";
    feedback.className = "bg-warning text-dark p-2";
  }
  setMarkImage(index, "xmark.png", "X mark");
}

// ===== SHUFFLE FUNCTION =====
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// ===== DISPLAY QUESTION 4 CHOICES =====
function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  if (!choicesContainer) {
    console.error("Element #q4Choices not found!");
    return;
  }
  
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice.replace(/\s/g, "_");
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice.replace(/\s/g, "_");
    label.textContent = choice;
    label.style.marginRight = "15px";

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

// ===== DISPLAY QUESTION 7 CHOICES =====
function displayQ7Choices() {
  let q7ChoicesArray = ["Mexico", "Egypt", "Greece", "Italy"];
  shuffleArray(q7ChoicesArray);

  let choicesContainer = document.querySelector("#q7Choices");
  if (!choicesContainer) {
    console.error("Element #q7Choices not found!");
    return;
  }
  
  choicesContainer.textContent = "";

  for (let choice of q7ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q7";
    input.id = "q7_" + choice.replace(/\s/g, "_");
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = "q7_" + choice.replace(/\s/g, "_");
    label.textContent = choice;
    label.style.marginRight = "15px";

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

// ===== DISPLAY QUESTION 8 CHOICES =====
function displayQ8Choices() {
  let q8ChoicesArray = ["United States", "Canada", "Guatemala", "Brazil"];
  shuffleArray(q8ChoicesArray);

  let choicesContainer = document.querySelector("#q8Choices");
  if (!choicesContainer) {
    console.error("Element #q8Choices not found!");
    return;
  }
  
  choicesContainer.textContent = "";

  for (let choice of q8ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q8";
    input.id = "q8_" + choice.replace(/\s/g, "_");
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = "q8_" + choice.replace(/\s/g, "_");
    label.textContent = choice;
    label.style.marginRight = "15px";

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

// ===== DISPLAY QUESTION 10 CHOICES =====
function displayQ10Choices() {
  let q10ChoicesArray = ["Los Angeles", "San Francisco", "San Diego", "Sacramento"];
  shuffleArray(q10ChoicesArray);

  let choicesContainer = document.querySelector("#q10Choices");
  if (!choicesContainer) {
    console.error("Element #q10Choices not found!");
    return;
  }
  
  choicesContainer.textContent = "";

  for (let choice of q10ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q10";
    input.id = "q10_" + choice.replace(/\s/g, "_");
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = "q10_" + choice.replace(/\s/g, "_");
    label.textContent = choice;
    label.style.marginRight = "15px";

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

// ===== CALL DISPLAY FUNCTIONS ON LOAD =====
displayQ4Choices();
displayQ7Choices();
displayQ8Choices();
displayQ10Choices();