const DOMproductList = document.querySelectorAll('#product-list>div');
let fetchList = [];

await fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    fetchList = json;
  });

console.log(fetchList);

function fetchProducts() {
  DOMproductList.forEach((e, i) => {
    e.querySelector('img').src = `${fetchList[i].image}`;
    e.querySelector('h3').textContent = `${fetchList[i].title}`;
    e.querySelector('p').textContent = `€${fetchList[i].price}`;
  });
}

fetchProducts();