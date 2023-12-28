import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { userRole } from './user.constants';

const passwordValidator = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: passwordValidator,
        message:
          'Password must have one lowercase letter, one uppercase letter, one special character, one number and be at least 8 characters in length',
      },
    },
    role: { type: String, enum: userRole, default: 'user' },
  },
  { timestamps: true },
);

export const UserModel = model<TUser>('User', userSchema);
