document.querySelector('#searchForm').addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector('#searchBar').value
    console.log(searchTerm)
    if (searchTerm) {
        document.location.replace('/results/' + searchTerm)
    } else {
        console.log("ooops")
    }
})