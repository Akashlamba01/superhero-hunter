// function goDetails() {
//   console.log("heooooooooooooooooo");
// }

// LocalStorage = window.localStorage;
const card = document.getElementById("card");
// const dataId = LocalStorage.getItem("heroId");

var dataId = JSON.parse(localStorage.getItem("heroId"));
console.log(dataId, " data");

//add to details card
function addToCard(hero) {
  document.querySelector(".details-heading h1").innerHTML = hero.name;

  document.querySelector(".superhero-picture img").src = hero.image.url;

  var about = document.getElementById("about");
  about.innerHTML = `
    gender:${hero.appearance.gender}, 
    eyecolor:${hero.appearance["eye-color"]}, 
    haircolor:${hero.appearance["hair-color"]},
    height:[${hero.appearance.height[0]}, ${hero.appearance.height[1]}], 
    race:${hero.appearance.race}, 
    weight:${hero.appearance.weight[1]}
  `;

  var aliasData = document.getElementById("aliases");
  function goAliases(arr) {
    aliasData.innerHTML = "";
    for (let i in arr) {
      var res = arr[i];
      aliasData.append(res + ", ");
    }
  }
  goAliases(hero.biography.aliases);

  var nameOther = document.getElementById("biography");
  nameOther.innerHTML = `
    full-name: ${hero.biography["full-name"]},  
    alignment: ${hero.biography.alignment}, 
    Birth-place: ${hero.biography["place-of-birth"]},  
    publisher: ${hero.biography.publisher}
  `;

  var powerstats = document.getElementById("powerstats");
  powerstats.innerHTML = `
    combat: ${hero.powerstats.combat}, 
    durability: ${hero.powerstats.durability}, 
    intelligence: ${hero.powerstats.intelligence},
    power: ${hero.powerstats.power}, 
    speed: ${hero.powerstats.speed}, 
    strength: ${hero.powerstats.strength}
  `;

  var works = document.getElementById("works");
  works.innerHTML = `
  occupation: ${hero.work.occupation},
  base: ${hero.work.base}

  `;

  console.log(hero.id, " idddddddd");
}

async function fetchData(heroId) {
  var res = await fetch(
    "https://superheroapi.com/api.php/1265087454088782/" + heroId
  );
  let data = await res.json();
  //   arr[0] = data;
  console.log(data.name + " errrrrrrrrrrrrrrr");

  addToCard(data);
}

fetchData(dataId);
