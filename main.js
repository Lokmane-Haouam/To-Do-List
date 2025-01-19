function add() {
  let now = new Date();
  let original = document.getElementById("or");
  original.style.display = "flex";
  let cloned = original.cloneNode(true);
  document.getElementById("cont").appendChild(cloned);
  original.style.display = "none";
  cloned.querySelector("input").focus();
  let time = " ";
  time +=
    " " +
    now.getFullYear() +
    " / " +
    String(now.getMonth() + 1).padStart(2, "0") +
    "  /" +
    now.getDate() +
    " - " +
    String(now.getHours()).padStart(2, "0") +
    " : " +
    String(now.getMinutes()).padStart(2, "0");
  cloned.querySelector("span").textContent += time;
}
function save(input) {
  input.readOnly = true;
  if (input.value === "") {
    input.parentNode.parentNode.remove();
  }
}
function deletefn(button) {
  button.parentNode.parentNode.remove();
}
let checkCont = 0;
function check(button) {
  checkCont++;
  if (checkCont % 2 === 1) {
    button.querySelector("i").className = "fa-solid fa-circle-check";
    button.style.color = "#32CD32";
  } else {
    button.querySelector("i").className = "fa-regular fa-circle-check";
    button.style.color = "#000000";
  }
}
let toggelCont = 0;
function toggel() {
  toggelCont++;
  if (toggelCont % 2 === 1) {
    document.getElementById("tIcon").style.transform = "rotate(0deg)";
    document.getElementById("sit").style.width = "calc(100% - 100px)";
  } else {
    document.getElementById("tIcon").style.transform = "rotate(180deg)";
    document.getElementById("sit").style.width = "0";
  }
}
let datesArr = [];
let datesIdenArr = [];
function saveDate(inputd) {
  let now = new Date();
  let inv = inputd.value;
  let disv = "";
  let datesIden = "";
  for (let i = 0; i < inv.length; i++) {
    if (inv[i] === "-") {
      disv += " / ";
    } else if (inv[i] === "T") {
      disv += " - ";
    } else if (inv[i] === ":") {
      disv += " : ";
    } else {
      disv += inv[i];
    }
  }
  for (let j = 0; j < 14; j++) {
    datesIden += disv[j];
  }
  let time =
    disv[17] + disv[18] + disv[19] + disv[20] + disv[21] + disv[22] + disv[23];
  if (disv !== "") {
    if (
      datesIden ===
      now.getFullYear() +
        " / " +
        String(now.getMonth() + 1).padStart(2, "0") +
        " / " +
        String(now.getDate()).padStart(2, "0")
    ) {
      inputd.parentNode.textContent += time;
    } else {
      datesArr.push(inputd.parentElement.parentElement);
      datesIdenArr.push(datesIden);
      inputd.parentElement.parentElement.remove();
      inputd.parentNode.textContent += time;
    }
  }
}
function scheduledDisplay() {
  let now = new Date();
  let currentDay =
    now.getFullYear() +
    " / " +
    String(now.getMonth() + 1).padStart(2, "0") +
    " / " +
    String(now.getDate()).padStart(2, "0");
  for (let i = 0; i < datesIdenArr.length; i++) {
    if (currentDay === datesIdenArr[i]) {
      document.getElementById("cont").appendChild(datesArr[i]);
      datesArr.splice(i, 1);
      datesIdenArr.splice(i, 1);
      i--;
    }
  }
}
setInterval(scheduledDisplay, 1000);
// 2025-01-23T14:49
// 2025 / 01 / 18
function scheduledCleanup() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // Iterate through datesIdenArr and remove past dates
  for (let i = datesIdenArr.length - 1; i >= 0; i--) {
    const dateParts = datesIdenArr[i].split(" / "); // Split by " / "
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10); // Month is already 1-based
    const day = parseInt(dateParts[2], 10);

    // Check if the date is in the past
    if (
      year < currentYear ||
      (year === currentYear && month < currentMonth) ||
      (year === currentYear && month === currentMonth && day < currentDay)
    ) {
      // Remove from both arrays
      datesArr.splice(i, 1);
      datesIdenArr.splice(i, 1);
    }
  }
}

setInterval(scheduledCleanup, 10000);
