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

	if (username == '') {
		alert('Username required')
		return
	} else if (password == '') {
		alert('password required')
		return
	}
	if (username === 'user' && password === 'web_dev') {
		alert('Successfully logged in')
		//change to homepage
		window.location.replace(
			'file:///Users/rainierdotulong/Desktop/project-two/frontend/homePage.html'
		)
	} else {
		loginErrorMsg.style.opacity = 1
	}
}
