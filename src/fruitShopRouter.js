import express from 'express';
import * as fruitsService from './fruitsService.js';
import { __dirname } from './dirname.js';
const router = express.Router();

/**
 * Sends to ajax.js the number of fruits in the database.
 */
router.get('/fetch_dataBaseSize', (req, res) => {
    res.send('{"dataBaseSizeNum":"' + fruitsService.dataBaseFruits.size + '"}');
});

/**
 * Load the main page of the website
 */
router.get('/', (req, res) => {
    const fruits = fruitsService.getSomeFruits(0, 5);

    res.render('index', {
        fruits: fruits
    });
});

/**
 * Load an specific quantity of elements with the finality to be added at the list
 */
router.get('/fruits', (req, res) => {

    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const fruits = fruitsService.getSomeFruits(from, to);
    res.render('fruits', {
        fruits: fruits
    });
});

/**
 * Sends to form.js if the data base has an specific fruit
 */
router.get('/search_fruit', (req, res) => {
    let fruitToFind = req.query.fruitToSearch;
    let dataBaseHas = fruitsService.dataBaseFruits.has(fruitToFind);
    res.send('{"hasTheFruit":' + dataBaseHas + '}');
});

/**
 * Load the formulary with the correspondient data
 */
router.get('/formulary/:mode', (req, res) => {
    let valuesToEdit = null;
    let nutrients = null;

    let splitedString = req.params.mode.split("_");
    let isEditMode = splitedString.length != 1;

    if (isEditMode) {
        valuesToEdit = fruitsService.getFruit(splitedString[1]);
        nutrients = [...valuesToEdit.getNutrients()];
    }

    res.render('formulary', {
        valuesToEdit,
        nutrients,
        mode: splitedString[0]
    });
});

/**
 * Delete the fruit/veggie selected from the Data Base
 */
router.get('/delete/:fruitName', (req, res) => {
    fruitsService.deleteFruit(req.params.fruitName);
    res.render('resetURL');
});

/**
 * Delete all the fruits from the Data Base
 */
router.get('/delete_all', (req, res) => {
    fruitsService.deleteAllFruits();
    res.render('resetURL');
});

/**
 * Add the new fruit/veggie to the Data Base
 */
router.post('/add', (req, res) => {

    let setNutrients = obtainSetNutrients(req.body);
    let fruit = new fruitsService.Fruit(req.body.fruitName, "", req.body.fruitPrice, req.body.fruitOrigin,
        req.body.fruitSeason, req.body.fruitType, req.body.fruitDescription, setNutrients);

    let imageDir = loadImageFile(fruit, req, res);
    fruit.setImage(imageDir);

    fruitsService.addFruit(fruit);

    res.render('resetURL');
});

/**
 * Load more information about the fruit/veggie selected
 */
router.get('/moreInfo/:id', (req, res) => {

    let fruit = fruitsService.getFruit(req.params.id);
    let nutrients = [...fruit.getNutrients(fruit)];
    res.render('moreInfo', { fruit, nutrients });
});

/**
 * Update the fruit/veggie selected on the Data Base
 */
router.post('/edit', (req, res) => {
    let setNutrients = obtainSetNutrients(req.body);
    let fruit = fruitsService.getFruit(req.body.fruitName);
    let imageDir = loadImageFile(fruit, req, res);

    fruit.setImage(imageDir);
    fruit.setPrice(req.body.fruitPrice);
    fruit.setOrigin(req.body.fruitOrigin);
    fruit.setSeason(req.body.fruitSeason);
    fruit.setType(req.body.fruitType);
    fruit.setDescription(req.body.fruitDescription);
    fruit.setNutrients(setNutrients);

    fruitsService.updateFruit(fruit);

    res.render('resetURL');
});

export default router;

/**
 * Filter the JSON Object to only have the nutrients added
 * @param {JSON} JSONobject Contains all the information send to the Data Base
 * @returns Set
 */
function obtainSetNutrients(JSONobject) {
    let setNutrients = new Set();

    for (let i in JSONobject) {

        if (i.startsWith('nutr')) {
            setNutrients.add(JSONobject[i]);
        }

    }

    return setNutrients;
}

/**
 * Store the image in a directory and store the path in the fruit
 * @param {Fruit} fruit to store the paht file
 * @param {*} req 
 * @param {*} res 
 * @returns String with the path
 */
function loadImageFile(fruit, req, res) {
    if (req.files) {
        let imageFile = req.files.fruitImage;
        const path = '../public/uploads/' + imageFile.name;
        let imagePath = '/uploads/' + imageFile.name

        imageFile.mv(path, (err) => {

            if (err) {
                return res.status(500).send(err);
            }

            fruit.setImage(imagePath);
        });
    }

    return fruit.getImage();
}