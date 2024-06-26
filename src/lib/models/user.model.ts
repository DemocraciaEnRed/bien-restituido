import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import crypto from "crypto";

const Token = require("../models/token");

interface User {
  email: string;
  password: string;
  name: string;
  bio: string;
  role: string;
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  lastLogin: Date;
  deletedAt: Date;
}

const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Your email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
      max: 100,
    },
    name: {
      type: String,
      required: true,
      max: 255,
    },
    bio: {
      type: String,
      required: false,
      max: 255,
    },
    role: {
      type: String,
      enum: ["user", "moderator", "author", "admin"],
      required: true,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
    lastLogin: {
      type: Date,
      required: false,
      default: null,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * Pre-save hook to hash the password
 */
UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err as CallbackError);
  }
});

/**
 * Compare the passed password with the value in the database.
 * @param {String} password
 * @returns {Boolean} True if the password matches the user's password
 */
UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Generate the JWT for the user
 * @returns {Object} The signed JWT token for the user
 */
UserSchema.methods.generateJWT = async function () {
  const expiresIn = "2d";

  this.lastLogin = Date.now();
  await this.save();

  let payload = {
    _id: this._id,
    email: this.email,
    name: this.name,
    role: this.role,
    lang: this.lang,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: expiresIn,
  });
};

/**
 * Instance method for generating password reset token.
 * Remember to save the user after calling this method
 */
UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

/**
 * It generates a verification token for the user
 * @returns {Object} The reset password token (remember to save!)
 */
UserSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    event: "email-verification",
    token: crypto.randomBytes(20).toString("hex"),
  };
  return new Token(payload);
};

// Add secondary index for email
UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
