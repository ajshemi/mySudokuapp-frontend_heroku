// console.log("%c loaded", "color:blue")
// console.log("👎")

//falsey function
function falsey(input) {
  let array = [false, 0, "", null, undefined, NaN, {}];
  if (array.includes(input)) {
    return true;
  } else {
    return false;
  }
}

//get a row
function getRow(sGrid, arg) {
  return sGrid[arg];
}

// get a column of multidimensional array
function getColumn(sGrid, arg) {
  let colArray = [];
  for (i = 0; i < sGrid.length; i++) {
    colArray.push(sGrid[i][arg]);
  }
  return colArray;
}

// get a subarray of multidimensional array
function getSection(sGrid, arg1, arg2) {
  let newArr = [];
  for (i = 3 * arg1; i < 3 + 3 * arg1; i++) {
    newArr.push(sGrid[i].slice(3 * arg2, 3 + 3 * arg2));
  }
  return flatArray(newArr);
}

//return a flat array
function flatArray(arr) {
  let newArray = [];
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr[i].length; j++) {
      newArray.push(arr[i][j]);
    }
  }
  return newArray;
}
// flatArray(arr1); //does not flatten all the way?

// check for duplicate number in an array
function repeatsChecker(array) {
  let newArr = [];
  for (i = 0; i < array.length; i++) {
    //check for duplicate
    if (newArr.indexOf(array[i]) === -1) {
      newArr.push(array[i]);
    }
  }
  if (newArr.length === 9) {
    return true; //true means no repeat
  } else {
    return false;
  }
}
// repeatsChecker(getRow(puzzle,8))
// repeatsChecker(getColumn(puzzle,8))
// repeatsChecker(getSection(puzzle, 1, 1))

// check for duplicate number in a row array
function rowsChecker(puzzle) {
  for (let i = 0; i < 9; i++) {
    if (repeatsChecker(getRow(puzzle, i)) === false) {
      return false;
    }
  }
  return true;
}

// check for duplicate number in a column array
function columnsChecker(puzzle) {
  for (let i = 0; i < 9; i++) {
    if (repeatsChecker(getColumn(puzzle, i)) === false) {
      return false;
    }
  }
  return true;
}

// check for duplicate number in a sub section array
function subGridChecker(puzzle) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (repeatsChecker(getSection(puzzle, i, j)) === false) {
        return false;
      }
    }
  }
  return true;
}

// console.log(rowsChecker(puzzle3));
// console.log(columnsChecker(puzzle3));
// console.log(subGridChecker(puzzle3));

//sudoku check
function sudokuChecker(puzzle) {
  return rowsChecker(puzzle) && columnsChecker(puzzle) && subGridChecker(puzzle)
    ? true
    : false;
}

//html element definition

let gridContainer = document.querySelector(".container");
let userNameForm = document.querySelector(".username");
// userNameForm.style.display="none"

let obj = {};
let outerArray = [];

// LOAD GAMES FROM THE SERVER

// fetch('http://localhost:3000/games/random')
fetch("https://mysudokubackendapi.herokuapp.com/games/random")
  .then((response) => response.json())
  .then((gameObject) => {
    formCodeBlock(gameObject, gridContainer);
  });
// setTimeout(console.log(document.querySelector("form").id.split("-")[2]),20000)
// })

let formCodeBlock = function (gamePuzzle, gridContainer) {
  gridContainer.innerHTML = "";
  let lineBreak = document.createElement("br");
  gridContainer.append(lineBreak);

  //new game button
  // let newGameButton=document.createElement("button")
  // newGameButton.classList.add("ui","button","active")
  // newGameButton.textContent="New Game"
  // newGameButton.id="new-game"

  //play game button
  let playGameButton = document.createElement("button");
  playGameButton.classList.add("ui", "button", "active");
  playGameButton.textContent = "Play Game";
  playGameButton.style = "margin-bottom: 2%; margin-left: 10%;";
  playGameButton.id = "play-game";

  //game on button
  let gameOnButton = document.createElement("button");
  gameOnButton.classList.add("ui", "button", "active");
  gameOnButton.textContent = "Game On";
  gameOnButton.id = "game-on";
  gameOnButton.style.display = "none";

  gridContainer.append(playGameButton, gameOnButton);

  let newFormElement = document.createElement("form"); //create form
  newFormElement.id = `game-form-${gamePuzzle.id}`;
  newFormElement.classList.add("grid-container");
  newFormElement.style = "margin-left:10%;";

  let arrayRowLength = gamePuzzle.game_array_start.length; //row length
  let arrayColumnLength = gamePuzzle.game_array_start.length; //column length
  let subDivElement = document.createElement("div");
  subDivElement.classList.add("ui", "grid");

  for (let i = 0; i < arrayRowLength; i++) {
    for (let j = 0; j < arrayColumnLength; j++) {
      let divElement = document.createElement("div");
      divElement.classList.add("grid-item");

      if (
        (i === 0 && j === 2) ||
        (i === 0 && j === 5) ||
        (i === 0 && j === 8)
      ) {
        divElement.style = "border-top-width: thick;border-right-width: thick;";
      }
      if (
        (i === 3 && j === 2) ||
        (i === 3 && j === 5) ||
        (i === 3 && j === 8)
      ) {
        divElement.style = "border-top-width: thick;border-right-width: thick;";
      }
      if (
        (i === 6 && j === 2) ||
        (i === 6 && j === 5) ||
        (i === 6 && j === 8)
      ) {
        divElement.style = "border-top-width: thick;border-right-width: thick;";
      }
      if (
        (i === 0 && j === 0) ||
        (i === 3 && j === 0) ||
        (i === 6 && j === 0)
      ) {
        divElement.style = "border-top-width:thick;border-left-width:thick;";
      }
      if (
        (i === 8 && j === 2) ||
        (i === 8 && j === 5) ||
        (i === 8 && j === 8)
      ) {
        divElement.style =
          "border-bottom-width:thick;border-right-width:thick;";
      }
      if (i === 8 && j === 0) {
        divElement.style = "border-bottom-width:thick;border-left-width:thick;";
      }
      if (i === 8 && j === 1) {
        divElement.style = "border-bottom-width:thick";
      }
      if (
        (i === 8 && j === 3) ||
        (i === 8 && j === 4) ||
        (i === 8 && j === 6) ||
        (i === 8 && j === 7)
      ) {
        divElement.style = "border-bottom-width:thick";
      }
      if (
        (i === 6 && j === 1) ||
        (i === 6 && j === 3) ||
        (i === 6 && j === 4) ||
        (i === 6 && j === 6) ||
        (i === 6 && j === 7)
      ) {
        divElement.style = "border-top-width:thick";
      }
      if (
        (i === 3 && j === 1) ||
        (i === 3 && j === 3) ||
        (i === 3 && j === 4) ||
        (i === 3 && j === 6) ||
        (i === 3 && j === 7)
      ) {
        divElement.style = "border-top-width:thick";
      }
      if (
        (i === 0 && j === 1) ||
        (i === 0 && j === 3) ||
        (i === 0 && j === 4) ||
        (i === 0 && j === 6) ||
        (i === 0 && j === 7)
      ) {
        divElement.style = "border-top-width:thick";
      }

      if (
        (i === 1 && j === 0) ||
        (i === 2 && j === 0) ||
        (i === 4 && j === 0) ||
        (i === 5 && j === 0) ||
        (i === 7 && j === 0)
      ) {
        divElement.style = "border-left-width:thick";
      }

      if (
        (i === 4 && j === 2) ||
        (i === 4 && j === 5) ||
        (i === 4 && j === 8)
      ) {
        divElement.style = "border-right-width:thick";
      }

      if (
        (i === 5 && j === 2) ||
        (i === 5 && j === 5) ||
        (i === 5 && j === 8)
      ) {
        divElement.style = "border-right-width:thick";
      }
      if (
        (i === 7 && j === 2) ||
        (i === 7 && j === 5) ||
        (i === 7 && j === 8)
      ) {
        divElement.style = "border-right-width:thick";
      }
      if (
        (i === 2 && j === 2) ||
        (i === 2 && j === 5) ||
        (i === 2 && j === 8)
      ) {
        divElement.style = "border-right-width:thick";
      }
      if (
        (i === 1 && j === 2) ||
        (i === 1 && j === 5) ||
        (i === 1 && j === 8)
      ) {
        divElement.style = "border-right-width:thick";
      }

      if (gamePuzzle.game_array_start[i][j]) {
        divElement.textContent = gamePuzzle.game_array_start[i][j];
        divElement.dataset.id = `element ${i}${j}`;
        obj[`element ${i}${j}`] = gamePuzzle.game_array_start[i][j];
        // console.log(obj)
        newFormElement.append(divElement);
      } else {
        let inputElement = document.createElement("input");
        inputElement.type = "number";
        inputElement.id = "number";
        inputElement.dataset.id = `element ${i}${j}`;
        obj[`element ${i}${j}`] = gamePuzzle.game_array_start[i][j];
        inputElement.max = "9";
        inputElement.min = "1";
        inputElement.classList.add("grid-item");
        inputElement.value = "";

        divElement.append(inputElement);
        newFormElement.append(divElement);
      }
    }
  }

  let submitInputElement = document.createElement("input");
  submitInputElement.type = "submit";
  submitInputElement.value = "Submit";
  submitInputElement.style = "margin-left:10%;margin-bottom:2%;";
  submitInputElement.classList = "ui button active";
  submitInputElement.id = "submitId";
  // submitInputElement.style.display = "block";
  // let newFormElement=document.querySelector("form")
  // newFormElement.append(submitInputElement)

  //RESET BUTTON
  let resetButton = document.createElement("button");
  resetButton.classList = "ui button active";
  resetButton.innerText = "Reset";
  resetButton.style = "margin-bottom:2%"; //margin-left:10%;
  resetButton.id = "resetId";
  // resetButton.style.display = "block";

  //SOME BUTTON
  // let someButton=document.createElement('button')
  // someButton.classList="ui button"
  // someButton.innerText="9"

  // newFormElement.append(submitInputElement,resetButton)
  subDivElement.append(newFormElement);
  gridContainer.append(
    subDivElement,
    lineBreak
    // submitInputElement,
    // resetButton
  );
  gridContainer.append(submitInputElement, resetButton);
  // console.log(gridContainer)
};
//SUBMIT BUTTON

//TIMER CODE BLOCK
let theTimer = document.querySelector(".timer"); //also reset button
console.log(theTimer.innerHTML);
// timer=0
let timer = [0, 0, 0, 0];
let interval;
// let timerRunning = false; // not running on load
let timerStart = document.querySelector("#timerStart");
// console.log(timerStart.innerHTML)

let timerReset = document.querySelector("#timerReset");
// console.log(timerReset.innerHTML)

// start=(event) => {
//   console.log(event.target.innerHTML)
//   console.log(event.target.tagName)
//   if(event.target.tagName==="BUTTON" && event.target.innerHTML==="Start"){
//     interval=setInterval(runTimer,10)
//   }
//   // if (event.target.value===)
// }

// timerStart.addEventListener('click',start)

reset = () => {
  console.log("reset button was clicked");
  clearInterval(interval);
  // interval=null;
  // timer=[0,0,0,0];
  // theTimer.innerHTML='00:00:00'
};

// timerReset.addEventListener('click',reset)

// // Leading zero
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}
// // Run a standard minute/second/hundredths timer:
function runTimer() {
  theTimer.innerHTML = timer;
  // timer++

  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60); //minute
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60); // seconds
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000); //hundredths
}

gridContainer.addEventListener("click", (event) => {
  // debugger
  let game_level;

  // console.log(event.target)
  if (
    event.target.tagName === "BUTTON" &&
    event.target.innerText === "Play Game"
  ) {
    interval = setInterval(runTimer, 10);
    let game_number = parseInt(
      event.target.parentElement.querySelector("form").id.split("-")[2]
    );
    // console.dir(event.target.innerText)}
    fetch(`https://mysudokubackendapi.herokuapp.com/games/${game_number}`)
      .then((response) => response.json())
      .then((gamePuzzle) => {
        game_level = gamePuzzle.difficulty;
        console.log(`return GET: ${gamePuzzle.difficulty}`);
        fetch("https://mysudokubackendapi.herokuapp.com/games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            difficulty: gamePuzzle.difficulty,
            game_array_start: gamePuzzle.game_array_start,
            game_array_end: gamePuzzle.game_array_end,
          }),
        })
          .then((response) => response.json())
          .then((gameObject) => {
            console.log(`return POST: ${gameObject.difficulty}`);
            formCodeBlock(gameObject, gridContainer);
            document.getElementById("play-game").style.display = "none";
          }); //{formCodeBlock(returnedObject,gridContainer)})
      });

    // playGameButton.classList.add("ui","button","disabled")
    // playGameButton.style.display="none"
    // newGame.style.display="none"
    // gameOn.style.display="block"
    // debugger
    // let submitButton = document.querySelectorAll(".ui.button.active")[3];
    // console.log(submitButton)
    // let resetButton = document.querySelectorAll(".ui.button.active")[4];
    // console.log(resetButton)
    // submitButton.style.display="block"
    // resetButton.style.display="block"

    // debugger
  }

  if (event.target.tagName === "INPUT" && event.target.type === "submit") {
    event.preventDefault();
    console.log(event.target.type);
    // console.log(game_number)
    // console.log(obj)
    // debugger
    // event.target.reset()

    //check if any element of the array of arrays is falsey
    let targetForm = event.target.parentElement.querySelector("form");
    let obj1 = {};
    for (let i = 0; i < targetForm.elements.length; i++) {
      if (falsey(targetForm.elements[i].value)) {
        return;
      } else {
        obj1[`${targetForm.elements[i].dataset.id}`] = parseInt(
          targetForm.elements[i].value
        );
      }
    }
    let obj2 = { ...obj, ...obj1 }; //merge with spread operator
    let flatArray = Object.values(obj2);

    for (let j = 0; j < 9; j++) {
      outerArray.push(flatArray.slice(9 * j, 9 * j + 9));
    }
    if (!falsey(obj1)) {
      console.log("not falsey");
      // submitInputElement.style.display = "none";

      // submitButton.style.display = "none";
      // console.log(submitInputElement.style.display);
      clearInterval(interval);
      userNameForm.style.display = "block";
      let game_number = parseInt(
        event.target.parentElement.querySelector("form").id.split("-")[2]
      );

      // sudokuChecker(outerArray) ? console.log("👎") : console.log(`👍`)
      // console.log(`%c ${sudokuChecker(outerArray)}`,"color:blue")

      // debugger
      // POST IS WORKING!

      // debugger
      // // console.log(gamePuzzle.id)
      let time_elapsed;
      fetch(`https://mysudokubackendapi.herokuapp.com/games/${game_number}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // difficulty: game_level,
          game_array_start: outerArray,
          game_array_end: outerArray,
        }),
      })
        .then((response) => response.json())
        .then((gameObject) => {
          console.log(gameObject);
          time_elapsed = gameObject.time_elapsed;
          formCodeBlock(gameObject, gridContainer);
          document.getElementById("play-game").style.display = "none";
          document.getElementById("submitId").style.display = "none";
          document.getElementById("resetId").style.display = "none";
        });
      // newGame.style.display='block'
      // event.target.reset()

      //CODE BLOCK FOR SCORES
      // let game_id=parseInt(event.target.parentElement.querySelector("form").id.split("-")[2])

      userNameForm.addEventListener("submit", (event) => {
        event.preventDefault();
        userNameForm.style.display = "none";
        // debugger
        let gamer_name = event.target.querySelector("input").value;
        fetch(`https://mysudokubackendapi.herokuapp.com/scores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gamer_name: gamer_name,
            game_score: time_elapsed,
            game_id: game_number,
            game_pass: sudokuChecker(outerArray),
            // game_score: time_passed
          }),
        })
          .then((response) => response.json())
          .then((scoreObject) => {
            scoreOutput(scoreObject);
          }); //gameScore=>console.log(gameScore))
      });
    }

    //  submitButton.style.display="block"
  }

  if (event.target.tagName === "BUTTON" && event.target.innerText === "Reset") {
    event.target.parentElement.querySelector("form").reset();
  }

  // if(event.target.tagName==="INPUT" && event.target.type ==='submit'){

  /*debugger
    console.log(event.target.innerText)
    let game_number=parseInt(event.target.parentElement.querySelector("form").id.split("-")[2])

    let outerArray = [[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9,9]]
    fetch(`http://localhost:3000/games/${game_number}`,{
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
          game_array_start: outerArray,
      })
      })
      .then(response=>response.json())
      .then(gameObject=>{formCodeBlock(gameObject,gridContainer)})
      */
  // }
});
let asideElement = document.querySelector("aside");
let scoreOutput = function (scoreObject) {
  let divElement = document.createElement("div");
  let pElement = document.createElement("p");
  pElement.innerText = `gamer_name: ${scoreObject.gamer_name}`;
  divElement.append(pElement);
  pElement = document.createElement("p");
  pElement.innerText = `game_number: ${scoreObject.game_id}`;
  divElement.append(pElement);
  pElement = document.createElement("p");
  pElement.innerText = `game_score/time_elapsed: ${scoreObject.game_score}`;
  divElement.append(pElement);
  pElement = document.createElement("p");
  scoreObject.game_pass
    ? (pElement.innerText = "PASS 👍")
    : (pElement.innerText = "FAIL 👎");
  divElement.append(pElement);
  asideElement.append(divElement);
};

/// LOAD GAMES ALREADY IN THE FRONT END

// let puzzleA=[[0,0,4,5,0,0,8,0,0],[0,0,5,0,6,0,4,7,0],[0,7,8,0,0,9,0,3,5],[3,1,0,4,5,0,0,0,8],[0,0,6,8,0,7,2,3,5],[7,0,9,0,0,0,5,0,4],[0,0,0,0,0,0,0,8,7],[8,6,0,0,0,0,0,4,1],[0,0,3,7,0,1,0,5,2]]
// let puzzleB=[[9,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,6,7,8],[0,0,0,2,3,4,0,0,9],[0,2,0,4,7,5,0,9,0],[4,6,5,3,0,8,0,1,7],[7,8,0,0,1,2,3,4,0],[3,0,0,5,0,0,0,0,4],[0,4,2,9,0,1,0,6,3],[8,9,0,0,0,0,0,0,0]]
// let puzzleC=[[0,0,0,0,0,9,4,0,1],[1,0,0,0,0,7,0,8,0],[0,5,0,0,3,0,0,0,0],[0,0,0,0,5,0,7,9,0],[3,7,0,0,0,1,6,2,0],[6,9,8,0,7,0,1,0,0],[5,0,0,0,0,2,0,4,0],[7,8,0,9,4,5,3,0,0],[0,0,0,6,0,3,8,7,5]]
// let puzzleD=[[0,0,0,0,0,0,0,0,4],[0,0,0,0,0,7,0,0,9],[0,6,0,0,4,0,2,3,7],[0,1,3,0,0,0,0,9,8],[4,5,0,7,8,0,0,2,0],[0,0,6,2,9,3,1,0,5],[3,4,0,0,7,0,0,6,0],[6,7,0,9,0,4,0,0,3],[0,0,5,6,0,0,0,7,0]]
// let puzzleE=[[0,0,1,0,4,7,2,0,0],[0,3,0,0,5,0,6,0,0],[0,0,9,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,9],[0,0,0,0,0,8,3,1,2],[8,0,7,0,1,2,0,5,6],[0,1,2,0,0,0,9,6,7],[0,4,0,9,7,0,8,0,0],[9,7,0,6,2,1,5,3,0]]
// // let puzzleD=[[0,0,0,0,0,9,3,0,8],[2,3,0,0,5,0,6,7,0],[0,0,0,0,0,0,0,0,0],[0,0,0,4,0,0,8,0,0],[0,6,5,0,9,7,2,1,0],[0,0,7,3,1,0,0,5,6],[0,1,6,0,0,0,9,0,0],[5,4,0,0,8,3,0,6,1],[9,7,8,6,2,1,0,0,0]]

// let newGame=document.querySelector(".ui.button.active")
// newGame.addEventListener('click',(event) => {
//     let puzzles=[puzzleA,puzzleB,puzzleC,puzzleD,puzzleE]
//     let onePuzzle=puzzles[Math.floor(Math.random()*puzzles.length)];
//     oneGameFormJsonToHtml(onePuzzle)

//     // oneGameJsonToHtml(onePuzzle)
// })
// oneGameFormJsonToHtml(puzzleA)  //automatically loaded with the page/window
// Add leading zero to numbers 9 or below (purely for aesthetics):

// function start() {
//   //triggers when playGame button is clicked(the eventListener on playGame)
//   //if timer is set to false if(!timerRunning) evaluates to true if timerRunning is false
//   if(!timerRunning){
//     timerRunning = true
//     interval = setInterval(runTimer, 10) //runTimer is called from here
//   }

// }
// function resetTime() {
//   //triggers when the reset button is clicked(the eventListener on reset button)
//   clearInterval(interval)
//   interval = null
//   timer = [0,0,0,0] //timer array to zero
//   timerRunning = false  //

//   theTimer.innerHTML="00:00:00"
// }
