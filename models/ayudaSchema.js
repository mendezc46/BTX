const mongoose = require("mongoose");

const ayudaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    contenido: { type: String, required: true },
});

module.exports = mongoose.model("Ayuda", ayudaSchema);
