"use strict";

const inputBox = document.querySelector("#inputBox");
const btnAddItem = document.querySelector("#btnAddItem");
const itemListEl = document.querySelector("#itemList");
const btnClearItems = document.querySelector("#btnClearItems");
const errorMessage = document.querySelector("#error");
const itemEl = document.querySelector(".item");

let itemList = [];

function removeAllChildNodes(parent) {
  // newer approach
  [...parent.childNodes].forEach((el) => el.remove());

  // while (parent.firstChild) {
  //   parent.removeChild(parent.firstChild);
  // }
}

function displayFeedbackMessage(text) {
  errorMessage.textContent = text;

  errorMessage.style.display = "block";
  setTimeout(() => (errorMessage.style.display = "none"), 1300);
}

itemListEl.addEventListener("click", function (e) {
  const itemContent = document.querySelector(".itemContent");
  // completing task
  if (e.target.matches(".fa-check-circle-o")) {
    e.target.closest(".item").children[0].classList.toggle("done");
    e.target.closest(".item").children[0].classList.contains("done")
      ? (e.target.style.opacity = "30%")
      : (e.target.style.opacity = "100%");
  }

  // editing task
  if (e.target.matches(".fa-pencil-square-o")) {
    inputBox.value = e.target.closest(".item").children[0].textContent;
    e.target.closest(".item").remove();

    itemList = itemList.filter(
      (item) => item !== e.target.closest(".item").children[0].textContent
    );
  }

  // deleting task
  if (e.target.matches(".fa-window-close-o")) {
    e.target.closest(".item").remove();

    //removing from itemList
    itemList = itemList.filter(
      (item) => item !== e.target.closest(".item").children[0].textContent
    );

    displayFeedbackMessage("Item Removed");
  }
});

function newItem(itemName) {
  const items = itemListEl.querySelectorAll(".item");

  itemList.push(itemName);

  itemListEl.insertAdjacentHTML(
    "beforeend",
    `
        <div class="item">
    <div class="itemContent">${itemName}</div>
    <div class="itemControls">
      <i class="fa fa-check-circle-o" aria-hidden="true"></i>
      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      <i class="fa fa-window-close-o" aria-hidden="true"></i>
    </div>
  </div>`
  );
}

document.addEventListener("keypress", function (e) {
  const itemName = inputBox.value;

  if (e.key === "Enter") {
    if (!itemName) return displayFeedbackMessage("Please Enter Valid Value");
    newItem(itemName);
    inputBox.value = "";
  }
});

btnAddItem.addEventListener("click", function () {
  const itemName = inputBox.value;

  if (!itemName) return displayFeedbackMessage("Please Enter Valid Value");

  newItem(itemName);

  inputBox.value = "";
});

btnClearItems.addEventListener("click", function () {
  itemList = [];

  // deletes also event handlers
  removeAllChildNodes(itemListEl);

  // alternative
  // itemListEl.innerHTML = "";

  displayFeedbackMessage("All Item Removed");
});
