

// function init() {
//     var windowlocation = window.location.pathname.split('/')
//     //console.log(windowlocation)

//     var arrayurl = windowlocation[2].split('%20')
//     console.log(arrayurl)
//     joinarray = arrayurl.join(' ')
//     console.log(joinarray)

//     fetch('/'+joinarray, {
//         where: {
// 			trail_name: req.params.name,
// 		},
// 		include: [{
// 			model:Playlist
// 			}] 
//     })    
// }




const resultFormHandler = async (e) => {

    e.preventDefault()
	const searchTerm = document.querySelector('#searchBar').value

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
        const trailId = document.querySelector('#playlistForm').getAttribute("data-id")
        if (playlistTitle && playlistLink) {
            //send post req to api endpoint
            const res = await fetch('/api/playlist', {
                method: 'POST',
                body: JSON.stringify({playlistTitle,playlistLink,trailId}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if (res.ok) {
                location.reload();
                console.log('success playlist added')
                console.log(await res.json())
                //add to table from databse here

                // render 


                // on click create and appened 

                //get our object 
                //lives inside the playlist API
                //then should be added the playlist that trail has 
                //
                
            } else {
                alert(res.statusText)
            }
        }
}

// init();

// const playlistPageload = async (e) => {
//     await fetch('/api/trail/:id', (req, res) => {
//         include: [{

//         }]
//     })


	

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
