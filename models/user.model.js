const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estado: { type: Boolean, default: true },
});

//Funcion que permite encriptar password
UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

//funcion que compara password creado
UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

//funcion aternativa (Usando la librería PASSPORT):
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


//Exportación del modelo
module.exports = mongoose.model('User', UserSchema);