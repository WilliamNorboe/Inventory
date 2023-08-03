const Pokemon = require("../models/pokemon");
const asyncHandler = require("express-async-handler");

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
  res.send("NOT IMPLEMENTED: Pokemon create GET");
});

// Handle pokemon create on POST.
exports.pokemon_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon create POST");
});

// Display pokemon delete form on GET.
exports.pokemon_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon delete GET");
});

// Handle pokemon delete on POST.
exports.pokemon_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon delete POST");
});

// Display pokemon update form on GET.
exports.pokemon_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update GET");
});

// Handle pokemon update on POST.
exports.pokemon_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Pokemon update POST");
});