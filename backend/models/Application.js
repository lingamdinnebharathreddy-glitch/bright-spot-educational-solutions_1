import { createModelProxy } from './modelHelper.js';

const ApplicationSchemaDefinition = {
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  universityId: { type: String, required: true },
  universityName: { type: String, required: true },
  courseName: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Under Review', 'Approved', 'Completed'], 
    default: 'Pending' 
  },
  documents: [{
    name: { type: String },
    url: { type: String }
  }],
  adminComments: { type: String, default: '' },
  admissionLetterUrl: { type: String, default: '' },
  appliedAt: { type: Date, default: Date.now }
};

export const Application = createModelProxy('Application', ApplicationSchemaDefinition);
export default Application;
