const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
  type: { type: String },
  Number: { type: Number },
});

// Virtual for pokemon's full name
// PokemonSchema.virtual("name").get(function () {
//   // To avoid errors in cases where an pokemon does not have either a family name or first name
//   // We want to make sure we handle the exception by returning an empty string for that case
//   let fullname = "";
//   if (this.first_name && this.family_name) {
//     fullname = `${this.family_name}, ${this.first_name}`;
//   }

//   return fullname;
// });

// Virtual for pokemon's URL
PokemonSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/pokemon/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pokemon", PokemonSchema);