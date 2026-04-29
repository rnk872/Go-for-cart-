let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load products
fetch('products.json')
.then(res => res.json())
.then(data => {
  allProducts = data;
  displayProducts(data);
});

// Show products
function displayProducts(list){
  if(!document.getElementById("products")) return;

  let html="";
  list.forEach((p,i)=>{
    html+=`
      <div class="product">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
  document.getElementById("products").innerHTML = html;
}

// Filter
function filterCategory(cat){
  if(cat==="all") return displayProducts(allProducts);
  displayProducts(allProducts.filter(p=>p.category===cat));
}

// Search
document.getElementById("search")?.addEventListener("input", function(){
  let val=this.value.toLowerCase();
  displayProducts(allProducts.filter(p=>p.name.toLowerCase().includes(val)));
});

// Add to cart
function addToCart(id){
  let item = allProducts.find(p=>p.id===id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// Load cart page
function loadCart(){
  let list = document.getElementById("cart-items");
  if(!list) return;

  let html="";
  cart.forEach(p=>{
    html+=`<li>${p.name} - ₹${p.price}</li>`;
  });
  list.innerHTML = html;
}

// WhatsApp order
function placeOrder(){
  let msg="Order:\n";
  cart.forEach(p=>{
    msg+=p.name+" ₹"+p.price+"\n";
  });

  window.open(`https://wa.me/917484820713?text=${encodeURIComponent(msg)}`);
}
