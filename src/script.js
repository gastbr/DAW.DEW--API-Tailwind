const productQty = 5;
const DOMproductList = document.querySelector('#product-list');
let fetchList = [];

fetch(`https://fakestoreapi.com/products?limit=${productQty}`)
  .then(res => res.json())
  .then(json => {
    fetchList = json;
    fetchProducts(json);
  });


function fetchProducts(array) {
  console.log(array);
  array.forEach((e) => {
    const article = document.createElement('div');
    article.classList.add('bg-white', 'dark:bg-gray-800', 'dark:text-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow');
    article.innerHTML = /*html*/ `
        <img src="${e.image}" alt = "Product 1" class="w-full h-48 object-cover rounded-md mb-4">
        <h3 class="text-lg font-semibold mb-2">${e.title}</h3>
        <p class="text-xl mb-4">${e.price}</p>
        <button class="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition-all">More info</button>
        `;
    article.querySelector('button').addEventListener('click', moreInfo, e);
    DOMproductList.appendChild(article);
  });
}

function moreInfo(e) {
  e.target.
}