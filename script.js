"use strict";
const url = "https://free-food-menus-api-production.up.railway.app/burgers";

const request = (uri) => fetch(uri).then((response) => response.json());

let menuCardEl;

const setElements = () => {
  menuCardEl = document.getElementById("menuCard");
};

setElements();

let menuItems = [];

let isLoading = false;

const setLoading = (status) => {
  isLoading = status;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const returnPromise = (items, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(items);
      resolve(items);
    }, time);
  });
};

function get3Items() {
  const MIN = 0;
  const MAX = menuItems.length - 1;
  const time = 2500;
  let items = [];
  if (MAX < 3) {
    return returnPromise(items, time);
  }
  while (items.length < 3) {
    const item = getRandomInt(MIN, MAX);
    if (!items.includes(item)) {
      items.push(item);
    }
  }
  return returnPromise(
    items.map((e) => menuItems[e]),
    time
  );
}

const createFoodItem = (doc) => {
  // {
  //     "id": "the-gramercy-tavern-burger-4-pack",
  //     "img": "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
  //     "name": "Gramercy Tavern",
  //     "dsc": "The Gramercy Tavern Burger - 4 Pack",
  //     "price": 99,
  //     "rate": 5,
  //     "country": "New York, NY"
  // }
  const foodItem = document.createElement("div");
  foodItem.setAttribute("id", doc.id);
  foodItem.setAttribute("class", "food-item");

  const foodTitle = document.createElement("h3");
  foodTitle.setAttribute("class", "food-title");
  foodTitle.innerText = doc.name;
  const foodImage = document.createElement("img");
  foodImage.setAttribute("class", "food-img");
  foodImage.src = doc.img;
  const foodDesc = document.createElement("p");
  foodDesc.setAttribute("class", "food-dsc");
  foodDesc.innerText = doc.dsc;
  const foodPrice = document.createElement("p");
  foodPrice.setAttribute("class", "food-price");
  foodPrice.innerText = doc.price;
  const foodRating = document.createElement("p");
  foodRating.setAttribute("class", "food-rating");
  foodRating.innerText = doc.rate;
  const foodOrigin = document.createElement("p");
  foodOrigin.innerText = doc.country;
  foodOrigin.setAttribute("class", "food-origin");

  const foodMeta = document.createElement("div");
  foodMeta.setAttribute("class", "food-meta");
  const foodAvatar = document.createElement("div");
  foodAvatar.setAttribute("class", "food-avatar");

  foodMeta.appendChild(foodTitle);
  foodMeta.appendChild(foodDesc);
  foodMeta.appendChild(foodPrice);
  foodMeta.appendChild(foodRating);
  foodMeta.appendChild(foodOrigin);
  foodAvatar.appendChild(foodImage);

  foodItem.appendChild(foodMeta);
  foodItem.appendChild(foodAvatar);

  return foodItem;
};

const getMenu = () => {
  setLoading(true);
  request(url)
    .then((v) => {
      console.log(v);
      menuItems = v;
      setLoading(false);
      menuItems.map((e) => {
        menuCardEl.appendChild(createFoodItem(e));
      });
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
    });
};

const takeOrder = async () => {
  await get3Items();
};

const prepareOrder = () => {
  const time = 1500;
  return returnPromise({ order_status: true, paid: false }, time);
};

const payOrder = async () => {
  const time = 1000;
  const result = await returnPromise({ order_status: true, paid: true }, time);
  sayThanks();
};

const sayThanks = () => {
  alert("Thank you");
};
