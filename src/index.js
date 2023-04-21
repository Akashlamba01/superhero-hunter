const takeInput = document.querySelector(".search-bar input");
const superhero = document.getElementById("superheroes");

var heroes = [];

if (!localStorage.getItem("favId")) {
  var arr = [];
  localStorage.setItem("favId", JSON.stringify(arr));
}

//background img for mobile of small devices
var imgMob = [
  "avengers1.jpg",
  "avengers2.jpg",
  "deadpool1.jpg",
  "jocker1.jpg",
  "jocker2.jpg",
  "superman1.jpg",
  "superman2.jpg",
  "venom1.jpg",
  "venom2.jpg",
  "wonderWoman1.jpg",
  "xman1.webp",
];

//bg-img for above 900 width of screen
var img = [
  "avengers1.jpg",
  "avengers2.jpg",
  "avengers3.webp",
  "batman1.jpg",
  "captain1.jpg",
  "dcMarvel1.jpg",
  "dcMarvel2.jpg",
  "dcMarvel3.webp",
  "ironman1.jpg",
  "natasa1.jpg",
  "spiderman1.jpg",
  "xman1.jpg",
  "xman2.jpg",
];

// console.log(window.innerWidth + " heit");

// background select/////////////////////////////////////////////////////////
if (window.innerWidth <= 900) {
  var imgNum = Math.ceil(Math.random() * imgMob.length - 1);
  console.log(imgMob[imgNum]);
  document.body.style.backgroundImage = `url(../images/mobile/${imgMob[imgNum]})`;
} else {
  var imgNum = Math.ceil(Math.random() * img.length - 1);
  console.log(imgNum + " kjkjkjkk" + Math.random());
  document.body.style.backgroundImage = `url(../images/cover/${img[imgNum]})`;
  document.body.style.backgroundPositionX = "center";
}

//serarch hero/////////////////////////////////////////////////////////
var myHero;
function addHero(myHero) {
  // myHero.like = false;

  let div = document.createElement("div");
  div.classList.add("hero-box");

  div.innerHTML = `
      <div class="hero-name-box">
        <h3>${myHero.name}</h3>
      </div>
      <div class="picture-porsen" id=${myHero.id}>
        <a href="./details.html" >
          <img src="${myHero.image.url}"  alt="" />
        </a>
      </div>
      <div class="inner-box" onclick="addToFav(${myHero.id})">
        <p>
          add to favorites
          <span><i class="fa fa-plus" aria-hidden="true"></i></span>
        </p>
      </div>
  `;

  superhero.append(div);

  var pageLink = document.getElementById(`${myHero.id}`);
  // console.log(pageLink);

  pageLink.onclick = function () {
    // console.log(myHero.id + " idddddddddddddddddddd");
    goDetailsData(myHero.id);
  };
}

arr = JSON.parse(localStorage.getItem("favId"));

//add to fav
function addToFav(dataId) {
  if (!arr.includes(dataId) == true) {
    arr.push(dataId);
    localStorage.setItem("favId", JSON.stringify(arr));
    alert("add to favorites");
  } else {
    alert("already in here");
  }
}

//fetch all data using name
async function fetchData(heroName) {
  try {
    let response = await fetch(
      `https://www.superheroapi.com/api.php/1265087454088782/search/${heroName}`
    );
    let data = await response.json();
    heroes = data.results;
    console.log(heroes);
    renderData();
    // console.log("Data: ", heroes[0].image.url);
  } catch (e) {
    console.log(e, " there was some err");
  }
}

//get all data
function renderData() {
  try {
    superhero.innerHTML = "";
    for (let i in heroes) {
      addHero(heroes[i]);
    }
  } catch (e) {
    console.error(e);
  }
}

// https://superheroapi.com/api/1265087454088782/search/name
takeInput.addEventListener("keyup", (e) => {
  let target = e.target.value;
  fetchData(target);
});

//function for print first page
fetchData("j");

function goDetailsData(heroID) {
  localStorage.setItem("heroId", heroID);
  takeInput.value = "";
}
