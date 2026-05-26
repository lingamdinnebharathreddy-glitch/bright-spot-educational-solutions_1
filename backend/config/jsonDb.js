import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure database directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class JsonCollection {
  constructor(collectionName) {
    this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data || '[]');
    } catch (err) {
      return [];
    }
  }

  async write(data) {
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  // Matches a document against a Mongoose-like query object
  _matches(doc, query) {
    if (!query || Object.keys(query).length === 0) return true;
    for (const key in query) {
      const queryVal = query[key];
      const docVal = doc[key];

      if (queryVal && typeof queryVal === 'object' && !Array.isArray(queryVal)) {
        // Handle Mongoose operators like $or, $regex, $in, $gte, $lte
        if (key === '$or') {
          return queryVal.some(q => this._matches(doc, q));
        }
        // Operators for specific keys (e.g. fee: { $lte: 200000 })
        const operators = Object.keys(queryVal);
        for (const op of operators) {
          const val = queryVal[op];
          if (op === '$regex') {
            const regex = new RegExp(val, 'i');
            if (!regex.test(String(docVal))) return false;
          } else if (op === '$options') {
            // Ignored, handled in $regex
          } else if (op === '$in') {
            if (!Array.isArray(val) || !val.includes(docVal)) return false;
          } else if (op === '$gte') {
            if (Number(docVal) < Number(val)) return false;
          } else if (op === '$lte') {
            if (Number(docVal) > Number(val)) return false;
          } else if (op === '$gt') {
            if (Number(docVal) <= Number(val)) return false;
          } else if (op === '$lt') {
            if (Number(docVal) >= Number(val)) return false;
          }
        }
      } else {
        // Direct equality check
        if (docVal !== queryVal) return false;
      }
    }
    return true;
  }

  async find(query = {}) {
    const list = await this.read();
    return list.filter(doc => this._matches(doc, query));
  }

  async findOne(query = {}) {
    const list = await this.read();
    return list.find(doc => this._matches(doc, query)) || null;
  }

  async findById(id) {
    if (!id) return null;
    const stringId = String(id);
    const list = await this.read();
    return list.find(doc => String(doc._id || doc.id) === stringId) || null;
  }

  async create(data) {
    const list = await this.read();
    const newDoc = {
      _id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    list.push(newDoc);
    await this.write(list);
    return newDoc;
  }

  async findByIdAndUpdate(id, updateData, options = { new: true }) {
    const stringId = String(id);
    const list = await this.read();
    const index = list.findIndex(doc => String(doc._id || doc.id) === stringId);
    
    if (index === -1) return null;

    // Handle Mongoose $push operator if present (like pushing notifications)
    let updatedDoc = { ...list[index] };
    
    if (updateData.$push) {
      for (const field in updateData.$push) {
        if (!updatedDoc[field]) updatedDoc[field] = [];
        updatedDoc[field].push(updateData.$push[field]);
      }
      delete updateData.$push;
    }

    updatedDoc = {
      ...updatedDoc,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    list[index] = updatedDoc;
    await this.write(list);
    return updatedDoc;
  }

  async findByIdAndDelete(id) {
    const stringId = String(id);
    const list = await this.read();
    const index = list.findIndex(doc => String(doc._id || doc.id) === stringId);
    
    if (index === -1) return null;
    const deleted = list.splice(index, 1)[0];
    await this.write(list);
    return deleted;
  }

  async deleteMany(query = {}) {
    const list = await this.read();
    const remaining = list.filter(doc => !this._matches(doc, query));
    await this.write(remaining);
    return { deletedCount: list.length - remaining.length };
  }
}

const dbCollections = {};

export const getCollection = (name) => {
  if (!dbCollections[name]) {
    dbCollections[name] = new JsonCollection(name);
  }
  return dbCollections[name];
};

export default {
  getCollection
};
