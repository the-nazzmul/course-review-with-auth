import { ReviewModel } from "../review/review.model";

const getBestCourseFromDB = async () => {
  const result = await ReviewModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        avarageRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { avarageRating: -1 },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course',
      },
    },
    { $unwind: '$course' },
    {
      $project: {
        _id: 0,
        course: {
          _id: '$course._id',
          title: '$course.title',
          instructor: '$course.instructor',
          categoryId: '$course.categoryId',
          price: '$course.price',
          tags: '$course.tags',
          startDate: '$course.startDate',
          endDate: '$course.endDate',
          language: '$course.language',
          provider: '$course.provider',
          durationInWeek: '$course.durationInWeek',
          details: '$course.details',
        },
        averageRating: '$avarageRating',
        reviewCount: '$count',
      },
    },
  ]);

  return result;
};

export const BestCourseServices = {
  getBestCourseFromDB,
};
