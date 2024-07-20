document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('eyeIcon');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });
  
  document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const eyeConfirmIcon = document.getElementById('eyeConfirmIcon');
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      eyeConfirmIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      confirmPasswordInput.type = 'password';
      eyeConfirmIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });
  
  document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const password = document.getElementById('passwordInput').value;
    const confirmPassword = document.getElementById('confirmPasswordInput').value;
  
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
  
    if (password !== confirmPassword) {
      Toastify({
        text: "Les mots de passe ne correspondent pas.",
        backgroundColor: "linear-gradient(to right, #FF4B2B, #FF416C)",
      }).showToast();
      return;
    }
  
    axios.post(`http://localhost:8000/reset-password/${token}`, { password })
      .then(response => {
        Toastify({
          text: response.data.msg,
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      })
      .catch(error => {
        const errorMsg = error.response ? error.response.data.errors[0].msg : 'Erreur de serveur';
        Toastify({
          text: errorMsg,
          backgroundColor: "linear-gradient(to right, #FF4B2B, #FF416C)",
        }).showToast();
      });
  });
  