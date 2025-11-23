import {$ ,html ,smoothScrollOptions } from './utilities/utilities.js';


const hamburgerIcon = $.getElementById('hamburger-icon')
const closeSidemenu = $.getElementById('side-menu-X')
const sideMenu = $.getElementById('side-menu')
const isSignedUp_btn = $.getElementById('sign-account')
const Userbasket_link = $.getElementById('userbasket_link')



$.addEventListener('click' , e=>{
    if(!hamburgerIcon.contains(e.target) && !sideMenu.contains(e.target)){
       closeSideMenu()
    }
})
window.addEventListener('load',()=>{

    let isSignedUp = sessionStorage.getItem('isSignedUp')
    let isloggedin = sessionStorage.getItem('isloggedin')
    
    if(isSignedUp || isloggedin){
        isSignedUp_btn.innerHTML = `
            Log out
            <svg style='width:23px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg>


        `
    }else{
        isSignedUp_btn.innerHTML = `
            
            <a href="signUp.html">
                <span id="loggincheck">Sign Up</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
              </svg>
            </a>
        
        `
        DeleteCurrentUser()    
        
    }
})
// navbar

isSignedUp_btn.addEventListener("click", async () => {
  let isSignedUp = sessionStorage.getItem("isSignedUp");
  let isloggedin = sessionStorage.getItem("isloggedin");

  if (isSignedUp || isloggedin) {
    sessionStorage.clear();

    try {

      let res = await fetch("http://localhost:3000/user");
      let currentUser = await res.json();

      if (currentUser.length > 0) {
        let userId = currentUser[0].id; 
        await fetch(`http://localhost:3000/user/${userId}`, { method: "DELETE" });
      }
      
    } catch (err) {
      console.error("خطا در حذف user:", err);
    }

    location.href = "main.html";
  }
});


Userbasket_link.addEventListener('click',()=>{

    let isSignedUp = sessionStorage.getItem('isSignedUp')
    let isloggedin = sessionStorage.getItem('isloggedin')

    !isSignedUp? location.href = 'signUp.html': location.href = 'userbasket.html'
    !isloggedin? location.href = 'signUp.html': location.href = 'userbasket.html'
    
})

$.querySelector('.aboutUs-link').addEventListener('click',()=>{
   
    $.getElementById('footer').scrollIntoView(smoothScrollOptions ())
})
$.querySelector('.sidebar-aboutUs-link').addEventListener('click',()=>{
    
    closeSideMenu()
    $.getElementById('footer').scrollIntoView(smoothScrollOptions ())
})

hamburgerIcon.addEventListener('click',(e)=>{
    
    sideMenu.style.display = 'flex'
    sideMenu.classList.add('side-active')
    
    html.style.overflowY = 'hidden'
    if(!hamburgerIcon.contains(e.target) && !sideMenu.contains(e.target)){
        e.target.classList.add('darker-body')
        e.target.style.userSelect = 'none'
     }
})

closeSidemenu.addEventListener('click', ()=>{
    closeSideMenu()
})

function closeSideMenu(){
    html.style.overflowY = 'scroll'

    sideMenu.classList.remove('side-active')
    sideMenu.classList.add('side-close')

    setTimeout(function(){
        sideMenu.style.display = 'none'
        sideMenu.classList.remove ('side-close')
    },700)
}

async function DeleteCurrentUser(){

    let res = await fetch("http://localhost:3000/user");
    let users = await res.json();

    if (users.length > 0) {
      let userId = users[0].id;

     
      try {
        await fetch(`http://localhost:3000/user/${userId}`, {
          method: "DELETE"
        });
      } catch (err) {
        console.warn("fetch DELETE جواب نداد، استفاده از sendBeacon...");
      }
    }  
    
  fetch("http://localhost:3000/user")
    .then(res => res.json())
    .then(users => {

      if (users.length > 0) {
        let userId = users[0].id;

        let url = `http://localhost:3000/user/${userId}`;

       
        navigator.sendBeacon(url, JSON.stringify({ method: "DELETE" }));
      }
    })
    .catch(err => console.error("خطا در گرفتن user:", err));
        
}
