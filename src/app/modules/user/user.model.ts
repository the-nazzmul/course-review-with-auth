/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Types, model } from 'mongoose';
import { TPasswordChange, TUser, UserMethod } from './user.interface';
import { userRole } from './user.constants';
import bcrypt from 'bcrypt';
import config from '../../config';

const passwordValidator = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const passwordChangeSchema = new Schema<TPasswordChange>({
  timestamp: { type: Date, required: true },
  password: { type: String, required: true },
});

const userSchema = new Schema<TUser, UserMethod>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: true,
      select: 0,
      validate: {
        validator: passwordValidator,
        message:
          'Password must have one lowercase letter, one uppercase letter, one special character, one number and be at least 8 characters in length',
      },
    },
    passwordHistory: {
      type: [passwordChangeSchema],
      default: [],
      select: 0,
    },
    role: { type: String, enum: userRole, default: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, modified) {
        delete modified.__v;
        delete modified.password;
        delete modified.passwordHistory;
      },
    },
  },
);

/*_______________________middlewares___________________________*/

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

/*___________________________statics___________________________*/

userSchema.statics.existingUser = async function (username: string) {
  return await UserModel.findOne({ username }).select(
    '+password -createdAt -updatedAt',
  );
};

userSchema.statics.doesPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.updatePassword = async function (
  id: Types.ObjectId,
  newPassword: string,
) {
  const updatedUser = await this.findByIdAndUpdate(
    id,
    {
      $set: {
        password: newPassword,
      },
      $push: {
        passwordHistory: {
          $each: [
            {
              timestamp: new Date(),
              password: newPassword,
            },
          ],
          $position: 0,
          $slice: 3,
        },
      },
    },
    { new: true },
  );
  return updatedUser;
};

export const UserModel = model<TUser, UserMethod>('User', userSchema);
