import { $, getCurrentUser, smoothScrollOptions } from './utilities/utilities.js';

const introduction_btn = $.getElementById('introduction-btn')
const AllProductsContainer = $.querySelector('.All-products-container')

const GoTopButton = $.querySelector('.go-top-button')

const PopularProductsCountainer = $.getElementById('popular-products-container')
let AllProducts = []
let PopularProducts = []



// fething products

fetch("http://localhost:3000/AllProducts")
    .then(res=>res.json())
    .then(data =>{
            AllProducts = data
            DisplayAllProducts()
             

             data.forEach(product => {
                if(product.mostSold){
                    PopularProducts.push(product)
                }
            })
            DisplayPopularProducts()

            $.dispatchEvent(new Event("popularProductsRendered"))
})



// main

introduction_btn.addEventListener('click',()=>{

    $.getElementById('Popular_products-header').scrollIntoView(smoothScrollOptions ())
})
function DisplayPopularProducts() {
    PopularProducts.forEach(product => {
        PopularProductsCountainer.insertAdjacentHTML('beforeend',
            `
            <div class="swiper-slide item-transition" id="products-list">
                ${showingDiscount(product.discount)}
                <article class="product-article">
                    <img src="${product.src}" >
                    <span class="product-title">${product.title}</span>
                    <p><span class="By">By</span><span class="company-name">${product.company}</span></p>
                </article>
                <div class="price-shop-holder">
                    <span class="item-price">${product.price}$</span>
                    <button type="button" class="add-btn" data-id="${product.id}">
                        <span>Add</span>
                        <svg style="width: 20px; height:20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            `
        )
    })
}


function DisplayAllProducts() {

    AllProducts.forEach(product => {

        AllProductsContainer.insertAdjacentHTML('beforeend', `
            <section class="item-transition" id="products-list">
                ${showingDiscount(product.discount)}
                <article class="product-article">
                    <img src="${product.src}" >
                    <span class="product-title">${product.title}</span>
                    <p><span class="By">By</span><span class="company-name">${product.company}</span></p>
                </article>
                <div class="price-shop-holder">
                    <span class="item-price">${product.price+'$'}</span>
                    <button type="button" class="add-btn" data-id="${product.id}">
                        <span>Add</span>
                    </button>
                </div>
            </section>
        `)
    })

}
// add to basket handler


PopularProductsCountainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn")
    if(btn){
        e.preventDefault()
        e.stopPropagation();
        const id = btn.dataset.id
        AddToBasket(id)
    }
})


AllProductsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn")
    if(btn){
        e.preventDefault()
        e.stopPropagation();
        const id = btn.dataset.id
        AddToBasket(id)
    }
})


async function AddToBasket(productId){
    
    let basketRes = await fetch('http://localhost:3000/basket')
    let basket = await basketRes.json()
    
    let productsRes = await fetch('http://localhost:3000/AllProducts')
    let products = await productsRes.json()
    
    let currentUser = await getCurrentUser()
    
    let wantedProduct = products.filter(item=>item.id == productId)
    let isProduct = basket.find(item=>item.id == productId)
    
    if(!isProduct){

        
        fetch('http://localhost:3000/basket',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...wantedProduct[0], userId: currentUser.userId })
        })
        .then(res=> res.json())
        .then(data=> console.log(data))
    }
    
}


// go top button

GoTopButton.addEventListener('click',()=>{
    $.getElementById('navbar').scrollIntoView(smoothScrollOptions ())
})
window.addEventListener('scroll',()=>{
    
    window.scrollY>300? GoTopButton.classList.add('show'): GoTopButton.classList.remove('show')
    
})

// displaying discount

function showingDiscount(discount){
    
    return discount?`<div id="product-discount">${discount}%</div>`:''
}

// deleting current user

// window.addEventListener("beforeunload", async() => {

//     let res = await fetch("http://localhost:3000/user");
//     let users = await res.json();

//     if (users.length > 0) {
//       let userId = users[0].id;

     
//       try {
//         await fetch(`http://localhost:3000/user/${userId}`, {
//           method: "DELETE"
//         });
//       } catch (err) {
//         console.warn("fetch DELETE جواب نداد، استفاده از sendBeacon...");
//       }
//     }  

//   fetch("http://localhost:3000/user")
//     .then(res => res.json())
//     .then(users => {

//       if (users.length > 0) {
//         let userId = users[0].id;

//         let url = `http://localhost:3000/user/${userId}`;

       
//         navigator.sendBeacon(url, JSON.stringify({ method: "DELETE" }));
//       }
//     })
//     .catch(err => console.error("خطا در گرفتن user:", err));
// });


