var arr = JSON.parse(localStorage.getItem("favId"));

// console.log(arr.length, " arrdaaaa");

for (let i in arr) {
  console.log(arr[i]);
  fetchData(arr[i]);
}

// fetch fav data
async function fetchData(data) {
  let res = await fetch(
    `https://superheroapi.com/api.php/1265087454088782/${data}`
  );
  let val = await res.json();
  rednerList(val);
  console.log(val);
}

var heroes = document.getElementById("superheroes");

// get and disply data and insert in fav.html
function rednerList(data) {
  let div = document.createElement("div");
  div.classList.add("hero-box");

  div.innerHTML = `
      <div class="hero-name-box">
        <h3>${data.name}</h3>
      </div>
      <div class="picture-porsen">
        <a href="./details.html">
          <img src="${data.image.url}" alt="" />
        </a>
      </div>
      <div class="inner-box">
        <p onclick='removeData(${data.id})'>
          remove
          <span><i class="fa fa-trash" aria-hidden="true"></i></span>
        </p>
      </div>
  `;

  heroes.append(div);
}

//remove from fav
function removeData(data) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == data) {
      arr.splice(i, 1);
    }
  }
  // console.log(arr.length + " after");
  alert("hero remove successfuly");

  localStorage.setItem("favId", JSON.stringify(arr));
  location.reload();
}
