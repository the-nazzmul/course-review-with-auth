/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../errors/AppError';

const buildQueryAggregation = (query: Record<string, any>) => {
  const pipeline: any[] = [];

  const {
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  const validSortFields = [
    'title',
    'price',
    'startDate',
    'endDate',
    'language',
    'durationInWeeks',
  ];

  if (query.sortBy && !validSortFields.includes(query.sortBy)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Can't sort with this value",
      "You're not allowed to sort with this value",
    );
  }

  const page = query.page || 1;
  const limit = Number(query.limit) || 10;
  const sortBy =
    query.sortBy && validSortFields.includes(query.sortBy) && query.sortBy
      ? query.sortBy
      : 'title';
  const sortOrder = (query.sortOrder === 'desc' && -1) || 1;

  // Match stage for filtering
  const matchStage: any = { $match: {} };

  //   normal fields
  if (startDate) {
    matchStage.$match.startDate = { $gte: startDate };
  }
  if (endDate) {
    matchStage.$match.endDate = { $lte: endDate };
  }

  if (language) {
    matchStage.$match.language = new RegExp(language, 'i');
  }
  if (provider) {
    matchStage.$match.provider = new RegExp(provider, 'i');
  }
  if (durationInWeeks) {
    matchStage.$match.durationInWeeks = Number(durationInWeeks);
  }

  // price
  if (minPrice || maxPrice) {
    // Add price range filter
    matchStage.$match.price = {};
    if (minPrice) {
      matchStage.$match.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      matchStage.$match.price.$lte = Number(maxPrice);
    }
  }

  // tags
  if (tags) {
    const tagsArray = tags.split(',');
    matchStage.$match['tags.name'] = {
      $in: tagsArray.map((tag: string | RegExp) => new RegExp(tag, 'i')),
    };
  }

  // level
  if (level) {
    matchStage.$match['details.level'] = new RegExp(level, 'i');
  }

  pipeline.push(matchStage);

  // Add projection stage
  const projectStage = {
    $project: { __v: 0, isDeleted: 0, createdAt: 0, updatedAt: 0 },
  };
  pipeline.push(projectStage);

  // Add $facet stage
  const facetStage = {
    $facet: {
      documents: [
        ...pipeline,
        { $sort: { [sortBy]: sortOrder } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        projectStage,
      ],
      // for finding out the total count of matched documents
      totalCount: [...pipeline],
    },
  };

  pipeline.push(facetStage);

  return pipeline;
};

export default buildQueryAggregation;
