// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('emailInput');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const email = emailInput.value;
  
      try {
        await fetch('http://localhost:8000/api/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
  
        Toastify({
          text: `Un mail avec lien de confirmation est envoyé sur votre compte ${email}`,
        }).showToast();
  
      } catch (err) {
        console.error(err);
        Toastify({
          text: 'Erreur lors de la demande de réinitialisation',
          backgroundColor: "red",
          duration: 3000
        }).showToast();
      }
    });
  });
  