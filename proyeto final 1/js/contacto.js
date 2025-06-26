   // Simula envío de formulario y muestra mensaje de éxito
   document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('successMsg').style.display = "block";
    setTimeout(() => {
      document.getElementById('successMsg').style.display = "none";
      document.getElementById('contactForm').reset();
    }, 3000);
  });