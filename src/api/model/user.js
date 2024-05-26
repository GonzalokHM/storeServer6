const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, require: true, trim: true },
    rol: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'products' }],
  },
  { timestamps: true, collection: 'users' }
);

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;
