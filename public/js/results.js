
document.querySelector('#resultSearchForm').addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector('#resultSearchBar').value
    console.log(searchTerm)
    if (searchTerm) {
        document.location.replace('/' + searchTerm)
    } else {
        console.log("ooops")
    }
})