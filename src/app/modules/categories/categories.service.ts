import { TCategory } from './categories.interface';
import { CategoryModel } from './categories.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);
  const modifiedResult = {
    _id: result._id,
    name: result.name
  }
  return modifiedResult;
};

const getAllCategoriesFromDB = async()=>{
    const result = await CategoryModel.find().select('-createdAt -updatedAt');
    return result
}

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
