import { Schema, model } from 'mongoose';
import { TCategory } from './categories.interface';

const categoriesSchema = new Schema<TCategory>(
  {
    name: { type: String, unique: true, trim: true, required: true },
    createdBy: {type: Schema.Types.ObjectId, ref: "User"}
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, modified) {
        delete modified.__v;
      },
    },
  },
);

export const CategoryModel = model<TCategory>('Category', categoriesSchema);
