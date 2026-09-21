const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("results");

searchButton.addEventListener("click", search);

searchInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        search();
    }
})

function search(){
    const query = searchInput.value.trim();
    if(query==""){
        return;
    }

    const url =
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const searchResults = data.query.search;

            results.innerHTML = "";

            searchResults.forEach(result => {

                const resultElement = document.createElement("div");

                resultElement.classList.add("result");

                resultElement.innerHTML = `
                    <h2>${result.title}</h2>
                    <p>${result.snippet}</p>
                `;

                results.appendChild(resultElement);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
