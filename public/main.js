/*####################
##### Transition #####
####################*/
const TRANSITION_TIME = 500;
const transitionObject = document.querySelector(".transicion");

/**
 * Starts the animation of transition
 */
function startTransition() {
    transitionObject.classList.toggle("esta-activa");
}

/**
 * Ends the animation of transition
 */
function endTransition() {
    changeVisibility(transitionObject);
    setTimeout(() => {
        startTransition();
        changeVisibility(transitionObject);
    }, TRANSITION_TIME);
}

/**
 * Process the animation
 * @param {String} link to the next page
 */
function transition(link) {
    startTransition();
    setTimeout(() => {
        endTransition();
        window.location.href = link;
    }, TRANSITION_TIME);
}

/**
 * Change the visibility of the current element
 * @param {String} element Element that will be affected
 */
function changeVisibility(element) {
    element.classList.toggle("ocultar");
}

/*########################
##### Web Navigation #####
########################*/
/**
 * Change the current page to another with more information about the element clicked
 * @param {String} fruitName Name of the fruit/veggie that will be show
 */
function showMoreInformation(fruitName) {
    let link = '/moreInfo/' + fruitName;
    transition(link);
}

/**
 * Change the current page to another where you can add a new element or update one
 * @param {String} mode Type of formulary, can be 'add' or 'edit_{...}'
 */
function changeToFormulary(mode) {
    let link = '/formulary/' + mode;
    transition(link);
}

/**
 * Go back from the formulary page 
 * @param {String} placeToReturn It can be any fruit or nothing
 */
function returnBack(placeToReturn) {
    let link;

    if (placeToReturn !== "") {
        link = '/moreInfo/' + placeToReturn;
    } else {
        link = '/';
    }

    transition(link);
}

/*####################
### Navigation Bar ###
####################*/
/**
 * Change the current page to the index
 */
function changePageToIndex() {
    let link = '/';
    transition(link);
}

/**
 * Change the current page to the ContacUs.html page
 */
function changePageToContactUs() {
    let link = 'contactUs.html';
    transition(link);
}

/**
 * Change the current page to the AboutUs.html page
 */
function changePageToAboutUs() {
    let link = 'aboutUs.html';
    transition(link);
}

/*###################
##  Delete fruits  ##
###################*/
/**
 * Show an alert to confirm the delete operation 
 * @param {String} fruitName Fruit/Veggie that will be eliminated
 */
function askDeleteFruit(fruitName) {
    let link = '/delete/' + fruitName;
    let isDeleting = confirm("¿Desea eliminar esta fruta?");

    if (isDeleting) {
        transition(link);
    }
}

/**
 * Show an alert to confirm the "delete all" operation
 */
function askDeleteAll() {
    let link = '/delete_all';
    let isDeletingAll = confirm("Desea eliminar todas las frutas?");

    if (isDeletingAll) {
        transition(link);
    }
}


