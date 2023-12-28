import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    rating: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: `Rating must be between 1-5`,
      },
      required: true,
    },
    review: { type: String, required: true, trim: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, modified) {
        delete modified.__v;
        delete modified.isDeleted;
        delete modified.createdAt;
        delete modified.updatedAt;
      },
    },
  },
);

export const ReviewModel = model<TReview>('Review', reviewSchema);
