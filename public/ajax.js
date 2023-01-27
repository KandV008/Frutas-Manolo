const NUMBER_FRUITS_PER_LOAD = 5;

let counterMoreRequests = 0;

/**
 * Send a request to fruitsService and adds the news element loaded
 */
async function loadMore() {
    const from = (counterMoreRequests + 1) * NUMBER_FRUITS_PER_LOAD;
    const to = from + NUMBER_FRUITS_PER_LOAD;

    let dataBaseSizeNum = await fetch('/fetch_dataBaseSize');
    dataBaseSizeNum = await dataBaseSizeNum.json();
    const numberOfFruits = parseInt(dataBaseSizeNum.dataBaseSizeNum);

    if (numberOfFruits <= from) {
        changeVisibility(document.getElementById("loadMoreButton"));
        changeVisibility(document.getElementById("noMoreElements"));
        return;
    }

    const response = await fetch(`/fruits?from=${from}&to=${to}`);
    const newFruit = await response.text();
    const contenedor = document.getElementById("contenedor");

    contenedor.innerHTML += newFruit;
    counterMoreRequests++;
}

/**
 * Quit the pop up that is showed when had been loaded 
 * all the fruits/veggies
 */
function quitAlert() {
    changeVisibility(document.getElementById("noMoreElements"));
}