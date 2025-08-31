const form = document.querySelector("form");
const cardContainer = document.getElementById("cardContainer");
// local storage
let storeData = JSON.parse(localStorage.getItem("storeData")) || {
  allNotes: [],
};
// varibles to track edit
let tid = "";
let isUpdate = false;
// Event listner to take input and set it into local storage
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("titleInput").value;
  let content = document.getElementById("content").value;
  if (!title && !content) {
    Toastify({
      text: "Please fill at least Title or Content before adding a note.",
      duration: 2000,
      gravity: "top",
      position: "center",
      background: "linear-gradient(to right, #4caf50, #81c784)",
    }).showToast();
    return;
  } else {
    title = title ? title : "Title";
    content = content ? content : "Content";
  }
  const note = {
    id: tid ? tid : Math.floor(Math.random() * 100),
    T: title,
    C: content,
  };

  if (isUpdate) {
    storeData.allNotes[index] = note;
    localStorage.setItem("storeData", JSON.stringify(storeData));
    isUpdate = false;
    tid = null;
  } else {
    storeData.allNotes.push(note);
    localStorage.setItem("storeData", JSON.stringify(storeData));
  }
  templateRender();
  form.reset();
});
// fn to render cards and text formatting
const templateRender = () => {
  cardContainer.innerHTML = "";
  storeData.allNotes.forEach((note) => {
    const { id, T, C } = note;
    const Id = id;
    let title = T;
    let content = C;

    if (title.length >= 25) {
      splitTitle = title.split(" ");
      sliceTitle = splitTitle.slice(0, 3);
      joinSliceTitle = sliceTitle.join(" ");
      finalTitle = joinSliceTitle + "...";
      title = finalTitle;
    }
    if (content.length >= 50) {
      splitContent = content.split(" ");
      sliceContent = splitContent.slice(0, 12);
      joinSliceContent = sliceContent.join(" ");
      finalContent = joinSliceContent + "...";
      content = finalContent;
    }
    const boldT = title.replace(/\*\*(.*?)\*\*/g, `<b>$1</b>`);
    const boldC = content.replace(/\*\*(.*?)\*\*/g, `<b>$1</b>`);
    const underlineT = boldT.replace(/\__(.*?)\__/g, `<u>$1</u>`);
    const underlineC = boldC.replace(/\__(.*?)\__/g, `<u>$1</u>`);
    const italicT = underlineT.replace(/\_(.*?)\_/g, `<i>$1</i>`);
    const italicC = underlineC.replace(/\_(.*?)\_/g, `<i>$1</i>`);
    const formatedTitle = italicT;
    const formatedContent = italicC;
    const card = `<div class="card" id="${id}">
    <p id="cardTitle">${formatedTitle}</p>
    <p id="cardContent">${formatedContent}</p>
    <p class="seeAll" onclick="seeFull(${id})">See all</p>
    <div id="cardBtns">
      <button id = "edit" onclick = "editItem(${id})">Edit</button>
      <button id = "del" onclick = "delItem(${id})">Delete</button>
    </div>
  </div>`;
    cardContainer.innerHTML += card;
  });
};
templateRender();
//  To show content of note card
const showContent = document.querySelector(".showContent");
const seeFull = (id) => {
  showContent.style.display = "block";
  cardContainer.style.display = "none";
  const showItem = storeData.allNotes.find((t) => t.id === id);
  const { ID, T, C } = showItem;
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  const boldT = T.replace(/\*\*(.*?)\*\*/g, `<b>$1</b>`);
  const boldC = C.replace(/\*\*(.*?)\*\*/g, `<b>$1</b>`);
  const underlineT = boldT.replace(/\__(.*?)\__/g, `<u>$1</u>`);
  const underlineC = boldC.replace(/\__(.*?)\__/g, `<u>$1</u>`);
  const italicT = underlineT.replace(/\_(.*?)\_/g, `<i>$1</i>`);
  const italicC = underlineC.replace(/\_(.*?)\_/g, `<i>$1</i>`);
  const formatedT = italicT;
  const formatedC = italicC;
  title.innerHTML = formatedT;
  text.innerHTML = formatedC;
};

// Event Listener to back in card container
const backToCards = document.getElementById("backToCards");
backToCards.addEventListener("click", () => {
  showContent.style.display = "none";
  cardContainer.style.display = "grid";
});

// To delete item
const delItem = (id) => {
  const index = storeData.allNotes.findIndex((t) => t.id === id);
  storeData.allNotes.splice(index, 1);
  localStorage.setItem("storeData", JSON.stringify(storeData));
  templateRender();
};

// To edit the note
let index = "";
const editItem = (Id) => {
  index = storeData.allNotes.findIndex((t) => t.id === Id);
  const { id, T, C } = storeData.allNotes[index];
  const title = document.getElementById("titleInput");
  const content = document.getElementById("content");
  title.value = T;
  content.value = C;
  tid = Id;
  isUpdate = true;
};

// Change mode of color
faSun = document.querySelector(".fa-sun");
faMoon = document.querySelector(".fa-moon");
const body = document.querySelector("body");
let lightMode = true;
faMoon.addEventListener("click", () => {
  if (!lightMode) {
    Toastify({
      text: "Already in dark mode.",
      duration: 1000,
      gravity: "top",
      position: "right",
      background: "linear-gradient(to right,#4caf50, #81c784)",
    }).showToast();
  }
  body.classList.add("dark-mode");
  lightMode = false;
  localStorage.setItem("lightMode",JSON.stringify(lightMode));
});

faSun.addEventListener("click", () => {
  if(lightMode){
  Toastify({
    text: "Already in light mode.",
    duration: 1000,
    gravity: "top",
    position: "right",
    background: "linear-gradient(to right, #4caf50, #81c784)",
  }).showToast();
}
  body.classList.remove("dark-mode");
  lightMode = true;
  localStorage.setItem("lightMode",JSON.stringify(lightMode));
});
// on window loading mode color remain
window.onload = function(){
  lightMode = JSON.parse(localStorage.getItem("lightMode")) || "";
  if(lightMode){
      body.classList.add("dark-mode");
      lightMode = false;
      localStorage.setItem("lightMode",JSON.stringify(lightMode));
  }
  else{
     body.classList.remove("dark-mode");
     lightMode = true;
     localStorage.setItem("lightMode",JSON.stringify(lightMode));
  }
  
}