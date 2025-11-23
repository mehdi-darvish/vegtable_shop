const $ = document;

const form = $.getElementById('signupForm');
const firstName = $.getElementById('first_name');
const lastName = $.getElementById('last_name');
const email = $.getElementById("email");
const phoneNumber = $.getElementById("mobile");

let firstNameValid = null;
let lastNameValid = null;
let phoneNumberValid = null;
let emailValid = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();


  if (firstName.value.trim().length < 2) {
    document.getElementById("firstNameError").textContent = "First name must be at least 2 characters.";
    firstNameValid = false;
  } else {
    document.getElementById("firstNameError").textContent = '';
    firstNameValid = true;
  }

  if (lastName.value.trim().length < 2) {
    document.getElementById("lastNameError").textContent = "Last name must be at least 2 characters.";
    lastNameValid = false;
  } else {
    document.getElementById("lastNameError").textContent = '';
    lastNameValid = true;
  }

  if (!/^\d{10,15}$/.test(phoneNumber.value.trim())) {
    document.getElementById("mobileError").textContent = "Enter a valid phoneNumber number (10-15 digits).";
    phoneNumberValid = false;
  } else {
    document.getElementById("mobileError").textContent = '';
    phoneNumberValid = true;
  }

  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    document.getElementById("emailError").textContent = "Enter a valid email address.";
    emailValid = false;
  } else {
    document.getElementById("emailError").textContent = '';
    emailValid = true;
  }

  if (firstNameValid && lastNameValid && phoneNumberValid && emailValid) {

    sessionStorage.setItem('isSignedUp', 'true');

  try {
    let res = await fetch("http://localhost:3000/users");
    let users = await res.json();

    let newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    let newUser = {
      id: newUserId,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      email: email.value
    };

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    await fetch("http://localhost:3000/user", { method: "DELETE" });

    await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    sessionStorage.setItem("isSignedUp", "true");
    sessionStorage.setItem("loggedInUser", JSON.stringify(newUser));

    window.location.href = "main.html";
  } catch (err) {
    console.error("خطا در ثبت‌نام:", err);
}

  }
});
