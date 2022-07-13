function eraseLastContent(data) {

    const container = document.querySelector(".results");

    while (container.firstChild) {
        
        container.removeChild(container.firstChild);
    }
}

function showResults(data) {
    
    const container = document.querySelector(".results");
    const template = document.querySelector("#result-item-template");
    const totalResults = document.querySelector(".results-count");
    
    totalResults.textContent = data.paging.total;

    for (const r of data.results) {

        const imgEl = template.content.querySelector(".result-item-img");
        imgEl.src = r.thumbnail;

        const titleEl = template.content.querySelector(".result-item-title");
        titleEl.textContent = r.title;

        const conditionEl = template.content.querySelector(".result-item-condition");
        conditionEl.textContent = r.condition;

        const soldEl = template.content.querySelector(".result-item-sell-count");
        soldEl.textContent = r.sold_quantity;

        const priceEl = template.content.querySelector(".result-item-price");
        priceEl.textContent = `$${r.price}`;     
        
        const clone = document.importNode(template.content, true);
        container.appendChild(clone);
    }
}

function main() {

    const formEl = document.querySelector(".search-form");

    formEl.addEventListener("submit", function (e) {

        e.preventDefault();

        eraseLastContent();

        const searchWord = formEl.search.value;

        fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchWord}`)
            .then( resp => resp.json())
            .then( data => showResults(data))
    });
}

main();

