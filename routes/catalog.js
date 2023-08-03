const express = require("express");
const router = express.Router();

// Require controller modules.
const pokemon_controller = require("../controllers/pokemonController");

/// POKEMON ROUTES ///

// GET catalog home page.
router.get("/", pokemon_controller.index);

// GET request for creating a Pokemon. NOTE This must come before routes that display Pokemon (uses id).
router.get("/pokemon/create", pokemon_controller.pokemon_create_get);

// POST request for creating Pokemon.
router.post("/pokemon/create", pokemon_controller.pokemon_create_post);

// GET request to delete Pokemon.
router.get("/pokemon/:id/delete", pokemon_controller.pokemon_delete_get);

// POST request to delete Pokemon.
router.post("/pokemon/:id/delete", pokemon_controller.pokemon_delete_post);

// GET request to update Pokemon.
router.get("/pokemon/:id/update", pokemon_controller.pokemon_update_get);

// POST request to update Pokemon.
router.post("/pokemon/:id/update", pokemon_controller.pokemon_update_post);

// GET request for one Pokemon.
router.get("/pokemon/:id", pokemon_controller.pokemon_detail);

// GET request for list of all Pokemon items.
router.get("/pokemons", pokemon_controller.pokemon_list);


module.exports = router;