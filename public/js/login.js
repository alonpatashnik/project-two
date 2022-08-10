const loginFormHandler = async(e) => {
    e.preventDefault()

    //collect vqlues from login form
    const username = document.querySelector('#username-field').ariaValueMax.trim()
    const password = document.querySelector('#password-login').ariaValueMax.trim()

    if (username && password) {
        //send Post req to api endpoint
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
        })
        if (response.ok) {
            // if success, redirect to home
            document.location.replace('/home')
        } else {
            alert(response.statusText)
        }
    }
}

const registerFormHandler = async(e) => {
    e.preventDefault()
    const username = document.querySelector('#username-field')
    const password = document.querySelector('#password-field')
    const confirmPassword = document.querySelector('#confirmPassword-field')

    if(name && password && password) {
        const res = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify({username,password,confirmPassword}),
            headers: { 'Content-Type' : 'application/json'}
        })
        if (response.ok) {
            document.location.replace('/login')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)
document.querySelector('.register-form').addEventListener('submit',registerFormHandler)
