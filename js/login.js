    const $ = document
    const numberForm = $.getElementById('numberForm');
    const emailForm = $.getElementById('emailForm');
    const toEmail = $.getElementById('toEmail');
    const toNumber = $.getElementById('toNumber');
    const number_input = $.getElementById('numberInput')
    const email_input = $.getElementById('emailInput')
    
    function showView(view) {
      if (view === 'email') {
        numberForm.classList.add('hidden');
        emailForm.classList.remove('hidden');
        location.hash = 'email'; 
      } else {
        emailForm.classList.add('hidden');
        numberForm.classList.remove('hidden');
        location.hash = ''; 
      }
    }
    window.addEventListener('hashchange', () => {
      if (location.hash === '#email') {
        showView('email');
      } else {
        showView('number');
      }
    });


    if (location.hash === '#email') {
      showView('email');
    } else {
      showView('number');
    }

    
    toEmail.addEventListener('click', (e) => {

         e.preventDefault(); 
         showView('email'); 
         clearInputs()

        });
    toNumber.addEventListener('click', (e) => {

         e.preventDefault(); 
         showView('number'); 
         clearInputs()

        });

    numberForm.addEventListener('submit',async (e)=>{
        
        e.preventDefault()

        if (!/^\d{10,15}$/.test(number_input.value.trim())){

            $.querySelector('.number-error').textContent = "Enter a valid mobile number (10-15 digits).";

        }else{

            let res = await fetch("http://localhost:3000/users");
            let users = await res.json();
            
            let LoggedInUser = users.find(user=>user.phoneNumber === number_input.value.trim())
        
    
            if (LoggedInUser) {
                sessionStorage.setItem("isloggedin", "true");
                sessionStorage.setItem("loggedInUser", JSON.stringify(LoggedInUser));

                await fetch("http://localhost:3000/user", { method: "DELETE" });

                await fetch("http://localhost:3000/user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(LoggedInUser)
                });

                window.location.href = "main.html";
              }


            else{
                $.querySelector('.number-error').textContent = 'You have not signed up!'
            }

        }



    })

    emailForm.addEventListener('submit',async e=>{

        e.preventDefault()

        if (!/^\S+@\S+\.\S+$/.test(email_input.value.trim())){

            $.querySelector('.email-error').textContent = 'Enter a valid email address.'

        }else{

            let res = await fetch("http://localhost:3000/users");
            let users = await res.json();

            
            let LoggedInUser = users.find(user=>user.email === email_input.value.trim())
        
    
            if (LoggedInUser) {
                sessionStorage.setItem("isloggedin", "true");
                sessionStorage.setItem("loggedInUser", JSON.stringify(LoggedInUser));

                await fetch("http://localhost:3000/user", { method: "DELETE" });

                await fetch("http://localhost:3000/user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(LoggedInUser)
                });

                window.location.href = "main.html";
            }else{
                $.querySelector('.email-error').textContent = 'You have not signed up!'
            }

            
        }
    })
   
    

    function clearInputs(){
        email_input.value = ''
        number_input.value = ''
    }