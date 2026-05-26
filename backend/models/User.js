import { createModelProxy } from './modelHelper.js';

const UserSchemaDefinition = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  documents: [{
    name: { type: String },
    url: { type: String },
    uploadedAt: { type: Date, default: Date.now }
  }],
  notifications: [{
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  }]
};

export const User = createModelProxy('User', UserSchemaDefinition);
export default User;
