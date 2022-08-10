
const resultFormHandler = async (e) => {
    e.preventDefault()
	const searchTerm = document.querySelector('#resultSearchBar').value
	console.log(searchTerm)
	if (searchTerm) {
		document.location.replace('/result/' + searchTerm)
	} else {
		console.log('ooops')
	}
}
const playlistFormHandler = async (e) => {
    e.preventDefault();
        console.log("--------SUBMIT PLAYLIST PRESSED----------")
        const playlistTitle = document.querySelector('#playlistTitle').value
        const playlistLink = document.querySelector('#playlistLink').value

        if (playlist_title && playlist_link) {
            //send post req to api endpoint
            const res = await fetch('/playlist', {
                method: 'POST',
                body: JSON.stringify({playlist_title,playlist_Link}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if (res.ok) {
                console.log('success playlist thing')

            } else {
                alert(res.statusText)
            }
        }
}
document.querySelector('#resultSearchForm').addEventListener('submit', resultFormHandler)
document.querySelector('#playlistForm').addEventListener("submit", playlistFormHandler)
