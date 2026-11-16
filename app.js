let cart = JSON.parse(localStorage.getItem("karigarCart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("karigarWishlist") || "[]");
let orders = JSON.parse(localStorage.getItem("karigarOrders") || "[]");
let activeCategory = "All", activeCoupon = null, modalQty = 1, selectedProduct = null, latestOrder = null;

const money = n => "₹" + Math.round(n).toLocaleString("en-IN");
const save = () => localStorage.setItem("karigarCart", JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem("karigarWishlist", JSON.stringify(wishlist));
const saveOrders = () => localStorage.setItem("karigarOrders", JSON.stringify(orders));
const findProduct = id => PRODUCTS.find(p => p.id === Number(id));

function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function cartQty(){return cart.reduce((s,i)=>s+i.qty,0)}
function subtotal(){return cart.reduce((s,i)=>{const p=findProduct(i.id);return s+p.price*i.qty},0)}
function getDelivery(sub, pincode=""){if(sub===0)return 0; const zone=String(pincode||"").startsWith("40")?0:70; return sub>=1499?0:50+zone}
function couponDiscount(sub){
  if(!activeCoupon)return 0;
  const c=COUPONS[activeCoupon];
  if(c.type==="percent")return sub*c.value/100;
  if(c.type==="flat")return Math.min(c.value,sub);
  if(c.type==="shipping")return 0;
  if(c.type==="b2g1"){
    const eligible=cart.filter(i=>findProduct(i.id).category===c.category);
    return eligible.reduce((sum,i)=>sum+findProduct(i.id).price*Math.floor(i.qty/3),0);
  }
  return 0;
}
function couponShippingDiscount(sub,pin){return activeCoupon==="FREESHIP"&&sub>=COUPONS.FREESHIP.min?getDelivery(sub,pin):0}
function totals(pincode=""){
  const sub=subtotal(), disc=couponDiscount(sub), delivery=Math.max(0,getDelivery(sub,pincode)-couponShippingDiscount(sub,pincode));
  const gst=(sub-disc)*.05, total=sub-disc+delivery+gst;
  return {sub,disc,delivery,gst,total};
}

function renderProducts(){
  const q=(document.getElementById("headerSearch").value||"").toLowerCase().trim();
  const max=Number(document.getElementById("priceRange").value);
  let list=PRODUCTS.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&p.price<=max&&(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));
  const sort=document.getElementById("sortSelect").value;
  if(sort==="priceLow")list.sort((a,b)=>a.price-b.price);
  if(sort==="priceHigh")list.sort((a,b)=>b.price-a.price);
  if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);
  document.getElementById("resultCount").textContent=list.length;
  document.getElementById("productGrid").innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><button class="heart" title="Wishlist" onclick="event.stopPropagation();toggleWish(${p.id})">${wishlist.includes(p.id)?"♥":"♡"}</button></div>
      <div class="product-info" onclick="openProduct(${p.id})" style="cursor:pointer">
        <h3>${p.name}</h3><div class="rating">★ ${p.rating} <span>(${p.reviews})</span></div>
        <div class="price">${money(p.price)}</div>
        <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id})">🛒 Add to Cart</button>
      </div>
    </article>`).join("");
}
function showShop(){document.getElementById("orders").classList.add("hidden");document.getElementById("shop").classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});renderProducts()}
function openOrders(){document.getElementById("shop").classList.add("hidden");document.getElementById("orders").classList.remove("hidden");renderOrders();window.scrollTo({top:0,behavior:"smooth"})}

document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));btn.classList.add("active");activeCategory=btn.dataset.category;renderProducts()}));
document.getElementById("headerSearch").addEventListener("input",renderProducts);
document.getElementById("priceRange").addEventListener("input",e=>{document.getElementById("priceValue").textContent=money(e.target.value);renderProducts()});
document.getElementById("sortSelect").addEventListener("change",renderProducts);

function addToCart(id,qty=1){
  const p=findProduct(id), existing=cart.find(i=>i.id===id), wanted=(existing?.qty||0)+qty;
  if(wanted>p.stock){toast(`Only ${p.stock} available for ${p.name}`);return}
  if(existing)existing.qty=wanted; else cart.push({id,qty});
  save(); renderCart(); toast(`${p.name} added to cart`);
}
function changeQty(id,delta){
  const item=cart.find(i=>i.id===id), p=findProduct(id); if(!item)return;
  const next=item.qty+delta;
  if(next<=0)cart=cart.filter(i=>i.id!==id);
  else if(next<=p.stock)item.qty=next; else toast(`Only ${p.stock} available in stock`);
  save();renderCart();
}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save();renderCart()}
function renderCart(){
  const count=cartQty();document.getElementById("cartBadge").textContent=count;document.getElementById("cartCount").textContent=count;
  const box=document.getElementById("cartItems");
  box.innerHTML=cart.length?cart.map(i=>{const p=findProduct(i.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${i.qty}</b><button onclick="changeQty(${p.id},1)">+</button></div></div><button class="remove" onclick="removeItem(${p.id})">♙</button></div>`}).join(""):`<div style="padding:40px 10px;text-align:center;color:#777">Your cart is waiting for a little Goan magic ✨</div>`;
  const t=totals();document.getElementById("subtotal").textContent=money(t.sub);document.getElementById("discount").textContent="−"+money(t.disc);document.getElementById("delivery").textContent=money(t.delivery);document.getElementById("gst").textContent=money(t.gst);document.getElementById("total").textContent=money(t.total);
}
function openCart(){renderCart();document.getElementById("cartOverlay").classList.remove("hidden");document.getElementById("cartDrawer").classList.add("open")}
function closeCart(){document.getElementById("cartOverlay").classList.add("hidden");document.getElementById("cartDrawer").classList.remove("open")}
function applyCoupon(){
  const code=document.getElementById("couponInput").value.trim().toUpperCase(), msg=document.getElementById("couponMessage"), sub=subtotal();
  if(!COUPONS[code]){msg.innerHTML=`<div class="coupon-error">Invalid coupon code. Try WELCOME10, SAVE150, FREESHIP or B2G1POTTERY.</div>`;return}
  const c=COUPONS[code];
  if(c.min && sub<c.min){msg.innerHTML=`<div class="coupon-error">This coupon needs a minimum order of ${money(c.min)}.</div>`;return}
  if(c.type==="b2g1"&&!cart.some(i=>findProduct(i.id).category==="Pottery"&&i.qty>=3)){msg.innerHTML=`<div class="coupon-error">Add at least 3 Pottery items to use this coupon.</div>`;return}
  activeCoupon=code;msg.innerHTML=`<div class="coupon-success">✓ ${c.description} applied!</div>`;renderCart()
}
function startCheckout(){if(!cart.length){toast("Add something to your cart first.");return}closeCart();document.getElementById("checkoutOverlay").classList.remove("hidden");goToStep(1)}
function closeCheckout(){document.getElementById("checkoutOverlay").classList.add("hidden")}
function goToStep(n){
  [1,2,3].forEach(i=>document.getElementById("checkoutStep"+i).classList.toggle("hidden",i!==n));
  document.querySelectorAll(".step").forEach(s=>s.classList.toggle("active",Number(s.dataset.step)<=n));
}
function validDelivery(){
  const name=document.getElementById("fullName").value.trim(), mob=document.getElementById("mobile").value.trim(), pin=document.getElementById("pincode").value.trim(), addr=document.getElementById("address").value.trim();
  const err=document.getElementById("deliveryError");let errors=[];
  if(!name)errors.push("Full name is required."); if(!/^\d{10}$/.test(mob))errors.push("Enter a valid 10-digit mobile number.");
  if(!/^\d{6}$/.test(pin))errors.push("Enter a valid 6-digit pincode."); if(addr.length<5)errors.push("Enter your delivery address.");
  err.textContent=errors.join(" ");return !errors.length;
}
function goToPayment(){if(validDelivery())goToStep(2)}
function goToReview(){
  const payment=document.querySelector('input[name="payment"]:checked'), err=document.getElementById("paymentError");
  if(!payment){err.textContent="Please select a payment method.";return}
  err.textContent="";const t=totals(document.getElementById("pincode").value);
  document.getElementById("reviewContent").innerHTML=`<div class="review-box">
    <div class="review-row"><span>Delivery to</span><b>${document.getElementById("fullName").value}, ${document.getElementById("city").value}</b></div>
    <div class="review-row"><span>Payment</span><b>${payment.value}</b></div>
    ${cart.map(i=>{const p=findProduct(i.id);return `<div class="review-row"><span>${p.name} × ${i.qty}</span><b>${money(p.price*i.qty)}</b></div>`}).join("")}
    <div class="review-row"><span>Subtotal</span><b>${money(t.sub)}</b></div>
    <div class="review-row"><span>Discount</span><b>−${money(t.disc)}</b></div>
    <div class="review-row"><span>Delivery</span><b>${money(t.delivery)}</b></div>
    <div class="review-row"><span>GST (5%)</span><b>${money(t.gst)}</b></div>
    <div class="review-row review-total"><span>Total</span><b>${money(t.total)}</b></div>
  </div>`;goToStep(3)
}
function placeOrder(){
  const t=totals(document.getElementById("pincode").value), orderNo="KC"+Date.now().toString().slice(-9);
  latestOrder={id:orderNo,date:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),status:"Processing",items:cart.map(i=>({...i})),total:t.total,delivery:t.delivery,discount:t.disc,customer:{name:document.getElementById("fullName").value,mobile:document.getElementById("mobile").value,address:document.getElementById("address").value,pincode:document.getElementById("pincode").value,payment:document.querySelector('input[name="payment"]:checked').value}};
  orders.unshift(latestOrder);saveOrders();cart=[];activeCoupon=null;save();closeCheckout();document.getElementById("successOrderNo").textContent=orderNo;document.getElementById("successOverlay").classList.remove("hidden");renderCart()
}
function closeSuccess(){document.getElementById("successOverlay").classList.add("hidden")}
function shareWhatsApp(){if(!latestOrder)return;const text=`Hi! I just placed a Karigar Coast order ${latestOrder.id} for ${money(latestOrder.total)}. Handmade with Goan Soul ♥`;window.open("https://wa.me/?text="+encodeURIComponent(text),"_blank")}
function openLatestOrder(){closeSuccess();openOrders()}
function renderOrders(){
  const q=(document.getElementById("orderSearch")?.value||"").toLowerCase();
  const list=orders.filter(o=>o.id.toLowerCase().includes(q));
  document.getElementById("ordersList").innerHTML=list.length?list.map(o=>`<div class="order-card"><div>
    <div class="order-top"><strong>#${o.id}</strong><span class="status">${o.status}</span><span>${o.date}</span></div>
    <div class="order-items">${o.items.map(i=>{const p=findProduct(i.id);return `<img src="${p.image}" title="${p.name}" alt="${p.name}">`}).join("")}</div>
    <div style="margin-top:9px;font-size:13px">Total: <b>${money(o.total)}</b> • ${o.items.reduce((s,i)=>s+i.qty,0)} item(s)</div>
  </div><div class="order-actions"><button class="reorder" onclick="reorder('${o.id}')">↻ Reorder</button></div></div>`).join(""):`<div style="text-align:center;padding:55px;color:#777;background:#fff;border:1px solid var(--line);border-radius:14px">No orders found yet.<br><br><button class="primary-btn" onclick="showShop()">Shop the coast →</button></div>`
}
function reorder(orderId){
  const o=orders.find(x=>x.id===orderId);if(!o)return;
  let added=0;o.items.forEach(i=>{const p=findProduct(i.id), existing=cart.find(c=>c.id===i.id), current=existing?.qty||0, allowed=Math.min(i.qty,p.stock-current);if(allowed>0){if(existing)existing.qty+=allowed;else cart.push({id:i.id,qty:allowed});added+=allowed}});
  save();renderCart();showShop();openCart();toast(`${added} item(s) restored to cart`);
}
document.getElementById("orderSearch").addEventListener("input",renderOrders);

function openProduct(id){
  selectedProduct=findProduct(id);modalQty=1;
  document.getElementById("productModal").innerHTML=`<img src="${selectedProduct.image}" alt="${selectedProduct.name}"><div class="modal-info"><div class="eyebrow">${selectedProduct.category.toUpperCase()}</div><h2>${selectedProduct.name}</h2><div class="rating">★ ${selectedProduct.rating} <span>(${selectedProduct.reviews} reviews)</span></div><div class="modal-price">${money(selectedProduct.price)}</div><p>Handcrafted with a coastal Goan feel. A cheerful, useful piece made to bring a little local character into your everyday life.</p><p><b>${selectedProduct.stock} pieces in stock</b></p><div class="modal-qty"><button onclick="modalQty=Math.max(1,modalQty-1);updateModalQty()">−</button><b id="modalQty">${modalQty}</b><button onclick="modalQty=Math.min(selectedProduct.stock,modalQty+1);updateModalQty()">+</button></div><button class="primary-btn full" onclick="addModalToCart()">🛒 Add ${modalQty} to Cart</button></div>`;
  document.getElementById("modalOverlay").classList.remove("hidden")
}
function updateModalQty(){document.getElementById("modalQty").textContent=modalQty;document.querySelector(".modal-info .primary-btn").textContent=`🛒 Add ${modalQty} to Cart`}
function addModalToCart(){addToCart(selectedProduct.id,modalQty);closeProductModal()}
function closeProductModal(e){if(!e||e.target.id==="modalOverlay")document.getElementById("modalOverlay").classList.add("hidden")}
function toggleWish(id){
  id=Number(id);
  if(wishlist.includes(id)){wishlist=wishlist.filter(x=>x!==id);toast("Removed from wishlist");}
  else {wishlist.push(id);toast("Saved to your wishlist ♥");}
  saveWishlist();renderWishlist();renderProducts();
}
function openWishlist(){renderWishlist();document.getElementById("wishlistOverlay").classList.remove("hidden");document.getElementById("wishlistDrawer").classList.add("open")}
function closeWishlist(){document.getElementById("wishlistOverlay").classList.add("hidden");document.getElementById("wishlistDrawer").classList.remove("open")}
function renderWishlist(){
  document.getElementById("wishCount").textContent=wishlist.length;
  document.getElementById("wishBadge").textContent=wishlist.length;
  const box=document.getElementById("wishlistItems");
  if(!wishlist.length){box.innerHTML=`<div style="padding:45px 10px;text-align:center;color:#777">Your wishlist is empty.<br><br>Tap ♡ on any Goan craft you love.</div>`;return}
  box.innerHTML=wishlist.map(id=>{
    const p=findProduct(id); if(!p)return "";
    return `<div class="wishlist-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="wish-actions"><button class="wish-add" onclick="addToCart(${p.id})">🛒 Add to Cart</button><button class="wish-remove" onclick="toggleWish(${p.id})">Remove</button></div></div></div>`;
  }).join("");
}

renderProducts();renderCart();renderWishlist();
