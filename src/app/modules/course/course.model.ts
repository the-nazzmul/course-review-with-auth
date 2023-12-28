import { Schema, model } from 'mongoose';
import { TCourse, TCourseDetails, TTags } from './course.interface';

const tagsSchema = new Schema<TTags>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { _id: false },
);

const courseDetailsSchema = new Schema<TCourseDetails>(
  {
    level: {
      type: String,
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced'],
        message: `{VALUE} is not a valid level`,
      },
      required: true,
    },
    description: { type: String, required: true },
  },
  { _id: false },
);

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: { type: Number, required: true },
    tags: [{ type: tagsSchema }],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: { type: courseDetailsSchema, required: true },
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

/*______________________________Middlewares____________________________________ */

courseSchema.pre('save', function (next) {
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
  const timeDifference = endDate.getTime() - startDate.getTime();

  const durationInWeeks = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));

  this.durationInWeeks = durationInWeeks;

  next();
});

/*_______________________________Model___________________________________ */

export const CourseModel = model<TCourse>('Course', courseSchema);
