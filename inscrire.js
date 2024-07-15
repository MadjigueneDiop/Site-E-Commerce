document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const number = document.getElementById('number').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
      alert('Les mot de passes ne correspondent pas!');
      return;
  }

  try {
      const response = await axios.post('http://localhost:8000/api/register', {
          firstName,
          lastName,
          email,
          number,
          password,
          confirmPassword
      });

      alert(response.data.msg);
  } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
          alert(error.response.data.errors.map(err => err.msg).join('\n'));
      } else {
          alert('An error occurred. Please try again later.');
      }
  }
});
