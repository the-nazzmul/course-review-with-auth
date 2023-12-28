import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './categories.interface';
import { CategoryModel } from './categories.model';

const createCategoryIntoDB = async (payload: TCategory, user: JwtPayload) => {
  payload.createdBy = user._id;
  const result = await CategoryModel.create(payload);

  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await CategoryModel.find().populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
