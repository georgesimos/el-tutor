const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: [true, 'email is required']
    },
    password: {
      type: String,
      trim: true,
      minlength: [7, 'Too few letters'],
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password should not contain word: password');
        }
      },
      required: [true, 'password id is required']
    },
    name: { type: String, trim: true, required: [true, 'name id is required'] },
    role: {
      type: String,
      default: 'student',
      enum: ['student', 'teacher', 'admin']
    },
    _student: { type: Schema.Types.ObjectId, ref: 'Student' },
    _teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    tokens: [{ token: { type: String, required: true } }]
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * Hide properties of Mongoose User object.
 */
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  if (!userObject.role === 'superadmin') {
    delete userObject.updatedAt;
    delete userObject.__v;
  }
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

/**
 * Helper method for generating Auth Token
 */
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

/**
 * Helper static method for finding user by credentials
 */
userSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login');

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
