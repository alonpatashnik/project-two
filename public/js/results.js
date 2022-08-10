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
	e.preventDefault()
	console.log('--------SUBMIT PLAYLIST PRESSED----------')
	const playlistTitle = document.querySelector('#playlistTitle').value
	const playlistLink = document.querySelector('#playlistLink').value

	if (playlistTitle && playlistLink) {
		//send post req to api endpoint
		const res = await fetch('/api/playlist', {
			method: 'POST',
			body: JSON.stringify({ playlistTitle, playlistLink }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			console.log('success playlist added')
			console.log(await res.json())

			//get our object
			//lives inside the playlist API
			//then should be added the playlist that trail has
			//
		} else {
			alert(res.statusText)
		}
	}
}

var id = 'id'
var playlist_title = 'title'
var username = 'username'
var playlist_link = 'link'
var upvotes = 'upvotes'

function addPlaylistCode() {
	const addPlaylistHere = document.getElementById('addPlaylistHere')
	var playlistRow = `<tr id="playlistAppend">
				<th scope="row">${id}</th>
				<td>${playlist_title}</td>
				<td>${username}</td>
				<td>${playlist_link}</td>
				<td>${upvotes}</td>
			</tr>`
	addPlaylistHere.innerHTML += playlistRow
}

document
	.querySelector('#searchForm')
	.addEventListener('submit', resultFormHandler)
document
	.querySelector('#playlistForm')
	.addEventListener('submit', playlistFormHandler)
