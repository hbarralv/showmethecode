const mongoose = require('mongoose');

const partidaSchema = new mongoose.Schema({
    idPartida: { type: String, required: true },
    estado: { type: Boolean, default: true },
    jugadores: [{ type: String, required: false }],
});

module.exports = mongoose.model('Sala', partidaSchema);