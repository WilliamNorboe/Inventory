const Pokemon = require("../models/pokemon");
const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of pokemons, pokemon instances, authors and genre counts (in parallel)
    const [
      numPokemons,
    ] = await Promise.all([
      Pokemon.countDocuments({}).exec(),
    ]);
  
    res.render("index", {
      title: "Inventory Home",
      pokemon_count: numPokemons,
    });
  });

// Display list of all pokemons.
exports.pokemon_list = asyncHandler(async (req, res, next) => {
    const allPokemons = await Pokemon.find({}, "name type")
      .sort({ name: 1 })
      .populate("type")
      .exec();
  
    res.render("pokemon_list", { name: "Pokemon List", pokemon_list: allPokemons });
  });

// Display detail page for a specific pokemon.
exports.pokemon_detail = asyncHandler(async (req, res, next) => {
    // Get details of pokemons, pokemon instances for specific pokemon
    const [pokemon] = await Promise.all([
      Pokemon.findById(req.params.id).populate("type").populate("Number").exec()
    ]);
  
    if (pokemon === null) {
      // No results.
      const err = new Error("Pokemon not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("pokemon_detail", {
      title: pokemon.name,
      pokemon: pokemon,
    });
  });

// Display pokemon create form on GET.
exports.pokemon_create_get = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our pokemon.

  res.render("pokemon_form", {
    name: "Create Pokemon",
  });
});

// Handle pokemon create on POST.
exports.pokemon_create_post = [
  // Convert the genre to an array.

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("type", "Type must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("Number", "Number must not be empty").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Pokemon object with escaped and trimmed data.
    const pokemon = new Pokemon({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      Number: req.body.Number,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Mark our selected genres as checked.
      res.render("pokemon_form", {
        name: "Create Pokemon",
        pokemon: pokemon,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save pokemon.
      await pokemon.save();
      res.redirect(pokemon.url);
    }
  }),
];

// Display Pokemon delete form on GET.
exports.pokemon_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of pokemon and all their books (in parallel)
  const [pokemon] = await Promise.all([
    Pokemon.findById(req.params.id).exec(),
  ]);

  if (pokemon === null) {
    // No results.
    res.redirect("/catalog/pokemons");
  }

  res.render("pokemon_delete", {
    title: "Delete Pokemon",
    pokemon: pokemon,
  });
});

// Handle Pokemon delete on POST.
exports.pokemon_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of pokemon and all their books (in parallel)
  const [pokemon] = await Promise.all([
    Pokemon.findById(req.params.id).exec(),
  ]);

  // Pokemon has no books. Delete object and redirect to the list of pokemons.
  await Pokemon.findByIdAndRemove(req.body.pokemonid);
  res.redirect("/catalog/pokemons");
});

// Display pokemon update form on GET.
exports.pokemon_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update GET");
});

// Handle pokemon update on POST.
exports.pokemon_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update POST");
});