const $ = document;
const html = $.querySelector('html');


function smoothScrollOptions() {
    return {
        behavior: 'smooth',
        block: 'start'
    };
}

// getiing current user

async function  getCurrentUser() {

  try {

    const res = await fetch("http://localhost:3000/user");
    if (!res.ok) return null;

    const arr = await res.json();

    if (!Array.isArray(arr) || arr.length === 0) return null;
    
    return arr[0];

  } catch (err) {
    console.error('Error fetching current user:', err);
    return null;
    
  }
}


export { $, html, smoothScrollOptions ,getCurrentUser};
