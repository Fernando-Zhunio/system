function infiniteLoop() {
  while (true) {

  }
}
infiniteLoop();



docReady(function() {
  const btnsProducts = document.querySelectorAll('#carousel-product .post-entry-content .box-button ');
  console.log(btnsProducts);
  btnsProducts.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const text = e.target.previousElementSibling.previousElementSibling;
      // alert(e.target.innerText);
      console.log(text);
      const message = `Hola FNN SERVICES quiero información sobre el ${text}`;
      window.open('https://api.whatsapp.com/send/?phone=%2B17866226589&app_absent=0&text='+ message, '_blank');
  })})
})

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}


