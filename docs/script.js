const DOMproductList = document.querySelector('#product-list');
const DOMselectProductsPerPage = document.querySelector('#products-per-page');
const DOMselectFilter = document.querySelector('#filter');
let fetchList = [];
let my_modal;
let productQuantity;

fetch(`https://fakestoreapi.com/products`)
  .then(res => res.json())
  .then(json => {
    fetchList = json;
    loadPage();
  });

function loadPage() {
  printProducts(10);
  DOMselectProductsPerPage.addEventListener('change', changeProductsQty);
  DOMselectFilter.addEventListener('change', changeFilter);
}

function changeProductsQty(e) {
  productQuantity = e.target.value;
  printProducts(productQuantity);
}

function changeFilter(e) {
  const selectedFilter = e.target.value;
  switch (selectedFilter) {
    case 'price-asc':
      fetchList.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      fetchList.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      fetchList.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      fetchList.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break;
  }
  printProducts(productQuantity);
}

function printProducts(qty) {
  emptyDOMList();
  const sliced = fetchList.slice(0, qty);
  sliced.forEach((e, i) => {
    const article = document.createElement('div');
    article.classList.add('bg-white', 'dark:bg-gray-800', 'dark:text-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow');
    article.setAttribute('data-id', `id${i}`);
    const modalId = `my_modal_${i}`;
    article.innerHTML = /*html*/ `
      <img src="${e.image}" alt="Product 1" class="w-full h-48 object-contain rounded-md mb-4">
      <h3 class="text-lg font-semibold mb-2">${e.title}</h3>
      <p class="text-xl mb-4">${e.price} EUR</p>
      <button class="btn bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition-all" onclick="document.getElementById('${modalId}').showModal()">View Details</button>
      
      <!-- Modal -->
      <dialog id="${modalId}" class="modal">
        <div class="modal-box p-5 max-w-lg bg-white dark:bg-gray-800 rounded-lg flex flex-col gap-3">
          <h3 class="text-xl font-bold">${e.title}</h3>
          <img src="${e.image}" alt="Product Image" class="w-full h-48 object-contain rounded-md mb-4">
          <p class="py-4 text-4xl">${e.price} EUR</p>
          <p>${e.description || "No description available."}</p>
          <div class="modal-action">
            <button class="btn border-solid border-2 border-slate-500 bg-slate-500 text-white py-2 px-4 rounded-lg hover:bg-slate-400 hover:border-orange-500 transition-all" onclick="document.getElementById('${modalId}').close()">Close</button>
            <button class="btn border-solid border-2 border-orange-500 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-400 hover:border-slate-500 transition-all" onclick="document.getElementById('${modalId}').close()">Add to cart ></button>
          </div>
        </div>
      </dialog>
    `;

    DOMproductList.appendChild(article);
  });
}

function emptyDOMList() {
  while (DOMproductList.lastChild) {
    DOMproductList.removeChild(DOMproductList.lastChild);
  }
}