async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('http://localhost:8000/api/auth', {
            email,
            password
        });

        if (response.status === 201) {
            console.log('Login successful:', response.data);
            localStorage.setItem('authToken', response.data.token);
            showToast('Connexion réussie !', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.errors);
            showToast('Erreur de connexion : ' + error.response.data.errors.map(err => err.msg).join(', '), 'danger');
        } else {
            console.error('Server error:', error);
            showToast('Une erreur est survenue, veuillez réessayer.', 'danger');
        }
    }
}

function showToast(message, type) {
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const loginToast = new bootstrap.Toast(document.getElementById('loginToast'));

    toastTitle.textContent = type === 'success' ? 'Succès' : 'Erreur';
    toastMessage.textContent = message;

    loginToast.show();
}
