import mongoose from 'mongoose';
import { getCollection } from '../config/jsonDb.js';

export const createModelProxy = (modelName, schemaDefinition) => {
  let mongooseModel = null;
  // Pluralize for JSON database collections
  const collectionName = modelName.toLowerCase() + 's';

  const getMongooseModel = () => {
    if (!mongooseModel) {
      const schema = new mongoose.Schema(schemaDefinition, { timestamps: true });
      mongooseModel = mongoose.models[modelName] || mongoose.model(modelName, schema);
    }
    return mongooseModel;
  };

  return {
    find: async (query = {}) => {
      if (global.IS_MONGODB) {
        return await getMongooseModel().find(query).lean();
      } else {
        return await getCollection(collectionName).find(query);
      }
    },
    findOne: async (query = {}) => {
      if (global.IS_MONGODB) {
        return await getMongooseModel().findOne(query).lean();
      } else {
        return await getCollection(collectionName).findOne(query);
      }
    },
    findById: async (id) => {
      if (global.IS_MONGODB) {
        try {
          return await getMongooseModel().findById(id).lean();
        } catch (e) {
          return null; // Handle invalid Mongo ObjectIds gracefully
        }
      } else {
        return await getCollection(collectionName).findById(id);
      }
    },
    create: async (data) => {
      if (global.IS_MONGODB) {
        const item = new (getMongooseModel())(data);
        const saved = await item.save();
        return saved.toObject();
      } else {
        return await getCollection(collectionName).create(data);
      }
    },
    findByIdAndUpdate: async (id, updateData, options = { new: true }) => {
      if (global.IS_MONGODB) {
        try {
          return await getMongooseModel().findByIdAndUpdate(id, updateData, options).lean();
        } catch (e) {
          return null;
        }
      } else {
        return await getCollection(collectionName).findByIdAndUpdate(id, updateData, options);
      }
    },
    findByIdAndDelete: async (id) => {
      if (global.IS_MONGODB) {
        try {
          return await getMongooseModel().findByIdAndDelete(id).lean();
        } catch (e) {
          return null;
        }
      } else {
        return await getCollection(collectionName).findByIdAndDelete(id);
      }
    },
    deleteMany: async (query = {}) => {
      if (global.IS_MONGODB) {
        return await getMongooseModel().deleteMany(query);
      } else {
        return await getCollection(collectionName).deleteMany(query);
      }
    }
  };
};

export default createModelProxy;
