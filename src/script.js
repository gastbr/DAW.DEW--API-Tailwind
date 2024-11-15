const DOMproductList = document.querySelector('#product-list');
const DOMselectProductsPerPage = document.querySelector('#products-per-page');
let fetchList = [];

fetch(`https://fakestoreapi.com/products`)
  .then(res => res.json())
  .then(json => {
    fetchList = json;
    loadPage();
  });

function loadPage() {
  printProducts(10);
  DOMselectProductsPerPage.addEventListener('change', changeProductsQty);
}

function changeProductsQty(e) {
  printProducts(e.target.value);
}

function printProducts(qty) {
  emptyDOMList();
  const sliced = fetchList.slice(0, qty);
  console.log(sliced);
  sliced.forEach((e, i) => {
    const article = document.createElement('div');
    article.classList.add('bg-white', 'dark:bg-gray-800', 'dark:text-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow');
    article.setAttribute('data-id', `id${i}`);
    article.innerHTML = /*html*/ `
        <img src="${e.image}" alt="Product 1" class="w-full h-48 object-cover rounded-md mb-4">
        <h3 class="text-lg font-semibold mb-2">${e.title}</h3>
        <p class="text-xl mb-4">${e.price} EUR</p>
        <button data-id="${i}" class="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition-all">More info</button>
        `;
    DOMproductList.appendChild(article);
  });
}

//    article.querySelector('button').addEventListener('click', moreInfo);

function emptyDOMList() {
  while (DOMproductList.lastChild) {
    DOMproductList.removeChild(DOMproductList.lastChild);
  }
}

function moreInfo(e) {
  console.log(e.target.outerHTML);

}