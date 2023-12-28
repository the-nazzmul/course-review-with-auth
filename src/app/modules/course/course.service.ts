import { ReviewModel } from '../review/review.model';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import buildQueryAggregation from '../../builder/QueryBuilder';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const pipeline = buildQueryAggregation(query);

  const result = await CourseModel.aggregate(pipeline);

  const courses = result[0].documents;
  const totalCount = result[0].totalCount.length;

  if (!totalCount) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not Found',
      'No courses matches your search query',
    );
  }

  if (courses.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No more data',
      'No more data. Please go to the previous page',
    );
  }

  return { courses, totalCount };
};

const getCourseReviewFromDB = async (id: string) => {
  const course = await CourseModel.findById(id);
  const reviews = await ReviewModel.find({ courseId: id });

  return { course, reviews };
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { details, tags, ...remainingCourseData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  //breakdown object and turn them into normal field
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdateData[`details.${key}`] = value;
    }
  }

  // transaction and rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //update normal fields
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      modifiedUpdateData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update course',
        `Failed to update fields`,
      );
    }

    //Converting array of object
    if (tags && tags.length > 0) {
      // select the tags that is to be deleted
      const tagsToDelete = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      //delete tags from database
      const deletedTags = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: tagsToDelete } },
          },
        },
        { new: true, runValidators: true, session },
      );
      if (!deletedTags) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update course',
          'Failed to delete tags!',
        );
      }

      // select the new tags that is to be added

      const tagsToAdd = tags.filter((el) => el.name && !el.isDeleted);

      // add new tags to the DB
      const newTags = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: tagsToAdd } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newTags) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update course',
          'Failed to add tags',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id).populate('tags');
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update course',
      'Failed to update course!',
    );
  }
};



export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getCourseReviewFromDB,
  updateCourseIntoDB,
};
