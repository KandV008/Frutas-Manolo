/*########################
##### General Aspects ####
########################*/
const getIdForm = (selector) => document.getElementById(selector);
const getClassForm = (selector) => document.querySelector("." + selector);
const getArrayClassForm = (selector) => document.querySelectorAll("." + selector);

/*######################
##### SubElements  #####
######################*/
let IdInputsCounter = 0;

/**
 * Creates a div type parent container 
 * @returns {String} Return a div container
 */
function createNutrientContainer() {
    let divParent = document.createElement('div');
    divParent.classList.add('input-group', 'mb-3');

    return divParent;
}

/**
 * Creates a text type input
 * @returns {String} Return a text input
 */
function createNutrientInput() {
    let childInput = document.createElement('input');
    childInput.type = 'text';
    childInput.classList.add('form-control', 'nutriente', 'texto-input');
    childInput.placeholder = 'Nutriente';
    childInput.setAttribute('aria-label', childInput.placeholder);
    childInput.required = true;

    return childInput;
}

/**
 * Creates a button type input
 * @returns {String} Return a button input
 */
function createNutrientButton() {
    let childButton = document.createElement('button');
    childButton.classList.add('btn', 'btn-secondary');
    childButton.type = "button";
    childButton.textContent = 'Eliminar';

    return childButton;
}

/**
 * Creates a new HTML fragment to store a new nutrient
 */
function addNutrient() {

    let newNutrient = getIdForm("divNutrientesForm");

    let nutrientContainer = createNutrientContainer();
    let nutrientContainerID = 'wrapper' + IdInputsCounter;
    nutrientContainer.id = nutrientContainerID;
    newNutrient.appendChild(nutrientContainer);

    let nutrientInput = createNutrientInput();
    let idInput = 'entrada' + IdInputsCounter;
    nutrientInput.id = idInput;
    nutrientInput.name = 'nutr' + IdInputsCounter;
    nutrientInput.required = true;
    nutrientContainer.appendChild(nutrientInput);

    let nutrientButton = createNutrientButton();
    let idButton = 'eliminarInput' + IdInputsCounter;
    nutrientButton.id = idButton;
    nutrientButton.onclick = function () { deleteNutrientInput(nutrientContainerID) };
    nutrientContainer.appendChild(nutrientButton);

    IdInputsCounter++;
}

/**
 * Delete a current input and the button associated to store a new nutrient
 * @param {String} idParent A HTML fragment containing an input and a button
 */
function deleteNutrientInput(idParent) {
    let wantToBeErased = confirm("¿Deseas borrar este nutriente?");

    if (wantToBeErased) {
        let divParent = getIdForm(idParent);
        divParent.remove();
    }
}

/*###################################
##### Formulary Characteristics #####
###################################*/
const formTitle = getIdForm("titleForm");
const normalTitle = "Introduzca el nuevo producto";
const editTitle = "Actualice el producto";

const imageInput = getIdForm("imagenFruta");
const textImageInput = getIdForm("textFileInput");
const addImageText = "Añadir una imagen";
const editImageText = "Cambiar la imagen";

const nameInput = getIdForm("nombreFruta");

/**
 * Prepare the formulary depending of the situation
 * @param {String} mode of the formulary
 * @param {String} season to show
 * @param {String} type to show
 * @param {Array} nutrients to show
 */
function onloadOperations(mode, season, type, nutrients) {
    changeTitleOfFormulary(mode);
    requiredImage(mode);
    disableNameInput(mode);
    putOptionArchieved(season, type);
    loadNutrientsInput(nutrients);
}

/**
 * Change the header of the form depending of the situation
 * @param {String} typeForm String that can be 'add' or 'edit'
 */
function changeTitleOfFormulary(typeForm) {
    let text = normalTitle;

    if (typeForm == "edit") {
        text = editTitle;
    }

    formTitle.innerText = text;
}

/**
 * Depending of the mode, the formulary will required an image or not
 * @param {String} mode os the formulary
 * @returns void
 */
function requiredImage(mode) {

    if (mode == "edit") {
        imageInput.required = false;
        textImageInput.innerHTML = editImageText;
        return;
    }

    imageInput.required = true;
    textImageInput.innerHTML = addImageText;
}

/**
 * Depending of the mode, it will be possible edit the text input with the name
 * @param {String} mode of the formulary
 * @returns 
 */
function disableNameInput(mode) {
    if (mode === "edit") {
        nameInput.readOnly = true;
        return;
    }

    nameInput.readOnly = false;
}

/**
 * Load the arguments in inputs value
 * @param {String} season Season of the fruit/veggie that will be edited
 * @param {String} type Type of the fruit/veggie that will be edited
 */
function putOptionArchieved(season, type) {
    getIdForm("temporadaFruta").value = season;
    getIdForm("tipoFruta").value = type;
}

/**
 * If the formulary is to edit a fruit/veggie, will load his nutrients
 * @param {String} stringNutrients Array of nutrients in form of an array
 */
function loadNutrientsInput(stringNutrients) {
    let arrayNutrients = stringNutrients.split(',');
    let counter = 0;

    for (let element of arrayNutrients) {
        addNutrient();
        getIdForm('entrada' + counter).value = element;
        counter++;
    }
}

/*##########################
### Formulary Validation ###
##########################*/
/**
 * Check if the new fruit/veggie is not repeated.
 * @returns {boolean} Returns if is repeated or not
 */
async function isFruitRepeated() {
    let isRepeated = false;

    if (formTitle.innerText == normalTitle) {
        let fruitName = getIdForm("nombreFruta").value;
        isRepeated = await fetch(`/search_fruit?fruitToSearch=${fruitName}`);
        isRepeated = await isRepeated.json();

        if (isRepeated.hasTheFruit) {
            alert("Esta fruta ya existe, cambia el nombre de la fruta, por favor");
        }

    }

    return isRepeated.hasTheFruit;
}

/**
 * Checks if exist any nutrient input
 * @returns boolean about if it is valid
 */
function validations() {
    let nutrients = getArrayClassForm("nutriente");

    if (nutrients.length !== 0) {
        return true;
    }

    alert("Añade un nutriente como mínimo, por favor");
    return false;
}

/**
 * Change the type of the button to submit the information
 */
function submitFruit() {
    let buttonToChange = getIdForm("saveButton");
    buttonToChange.type = "submit";
}

/**
 * Check if all the inputs are filled and correct to avoid inconsistency in the database
 */
async function uploadInformation() {
    let isValid = validations();
    let isRepeated = await isFruitRepeated();

    if (isValid && !isRepeated) {
        submitFruit();
    }
}

