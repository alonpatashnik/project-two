const loginForm = document.getElementById('form')
const loginButton = document.getElementById('login-form-submit')
const loginErrorMsg = document.getElementById('error-msg')

loginButton.addEventListener('click', (e) => {
	e.preventDefault()
	console.log('login pressed')
	login()
})

function login() {
	const username = loginForm.username.value
	const password = loginForm.password.value

	if (username === 'user' && password === 'web_dev') {
		alert('Successfully logged in')
		location.reload()
		//change to homepage
	} else {
		loginErrorMsg.style.opacity = 1
	}
}
