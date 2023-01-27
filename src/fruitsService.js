import loadInformation from "./insertionFile.js";
/*#############################
##### Fruit/Veggie Object #####
#############################*/
/**
 * Class that store all the information concerning to fruits/veggies
 */
export class Fruit {
    /**
     * @param {String} fruitName Nombre de la Fruta/Verdura
     * @param {String} fruitImage Link que hace referencia a una imagen
     * @param {String} fruitPrice Precio por kilo de la Fruta/Verdura
     * @param {String} fruitOrigin Sitio donde se ha cosechado
     * @param {String} fruitSeason Temporada característica de la Fruta/Verdura
     * @param {String} fruitType Determina si es una fruta o una verdura
     * @param {String} fruitDescription Texto con información referente a la Fruta/Verdura
     * @param {Set} fruitSetNutrients Conjunto de nutrientes de la Fruta/Verdura
     */
    constructor(fruitName, fruitImage, fruitPrice, fruitOrigin, fruitSeason, fruitType, fruitDescription, fruitSetNutrients) {
        this.name = fruitName;
        this.image = fruitImage;
        this.price = fruitPrice;
        this.origin = fruitOrigin;
        this.season = fruitSeason;
        this.type = fruitType;
        this.description = fruitDescription;
        this.nutrients = fruitSetNutrients;
    }

    /**
     * Get the name of the current fruit/veggie
     * @returns String with the name of the fruit/veggie
     */
    getName() {
        return this.name;
    }

    /**
     * Get the directory to the image
     * @returns String with a directory
     */
    getImage() {
        return this.image;
    }

    /**
     * Set the attribute image with another value
     * @param {String} newImage New value of image
     */
    setImage(newImage) {
        this.image = newImage;
    }

    /**
     * Set the attribute price with another value
     * @param {String} newPrice New value of price
     */
    setPrice(newPrice) {
        this.price = newPrice;
    }

    /**
     * Set the attribute origin with another value
     * @param {String} newOrigin New value of origin
     */
    setOrigin(newOrigin) {
        this.origin = newOrigin;
    }

    /**
     * Set the attribute season with another value
     * @param {String} newSeason New value of season
     */
    setSeason(newSeason) {
        this.season = newSeason;
    }

    /**
     * Set the attribute type with another value
     * @param {String} newType New value of type
     */
    setType(newType) {
        this.type = newType;
    }

    /**
     * Set the attribute description with another value
     * @param {String} newDescription New value of description
     */
    setDescription(newDescription) {
        this.description = newDescription;
    }

    /**
     * Get a set with nutrients
     * @returns Set of nutrients
     */
    getNutrients() {
        return this.nutrients;
    }

    /**
     * Set the attribute setNutrients with another value
     * @param {String} newSetNutrients New value of setNutrients
     */
    setNutrients(newSetNutrients) {
        this.nutrients = newSetNutrients;
    }
}

/*#########################
### Data Base Operation ###
#########################*/
export let dataBaseFruits = new Map();
loadInformation();

/**
 * Delete a fruit/veggie from the data base
 * @param {String} fruitName Name of the fruit/veggie that will be deleted
 */
export function deleteFruit(fruitName) {
    dataBaseFruits.delete(fruitName);
}

/**
 * Convert a Set of nutrients to an Array of nutrients and return it
 * @returns Array of nutrients
 */
export function getAllFruits() {
    return dataBaseFruits.values();
}

/**
 * Obtain a fruit/veggie from the data base and return it
 * @param {String} name Name of the fruit/veggie wanted
 * @returns An Object Fruit
 */
export function getFruit(name) {
    return dataBaseFruits.get(name);
}

/**
 * Add a new element to the data base
 * @param {Fruit} newFruit New fruit/veggie that will be added
 */
export function addFruit(newFruit) {
    dataBaseFruits.set(newFruit.getName(), newFruit);
}

/**
 * Obtain a maximun of 5 elements from the data base and return it
 * @param {Number} from Index to start
 * @param {Number} to Index to end
 * @returns A fractionated array of fruits/veggies
 */
export function getSomeFruits(from, to) {
    let values = [...dataBaseFruits.values()];
    values.reverse();
    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values;
    }
}

/**
 * Update the information of the fruit/veggie selected
 * @param {Fruit} fruitTarget Fruit/Veggie that will be updated
 */
export function updateFruit(fruitTarget) {
    dataBaseFruits[fruitTarget.getName()] = fruitTarget;
}

/**
 * Delete all the fruit in the data base
 */
export function deleteAllFruits() {
    dataBaseFruits.clear();
}