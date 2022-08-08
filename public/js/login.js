document.querySelector('#form').addEventListener('submit', (e) => {
	e.preventDefault()
	const userObj = {
		username: document.querySelector('#username-field').value,
		password: document.querySelector('#password-field').value,
	}
	fetch('/login', {
		method: 'POST',
		body: JSON.stringify(userObj),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => {
		if (res.ok) {
			location.href = '/home'
		} else {
			alert('trumpet sound')
		}
	})
})
