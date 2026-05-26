import { createModelProxy } from './modelHelper.js';

const UniversitySchemaDefinition = {
  name: { type: String, required: true },
  logo: { type: String },
  location: { type: String, required: true },
  rankings: { type: String },
  feesRange: { type: String },
  placements: { type: String }, // e.g. "95% Placement Rate"
  overview: { type: String },
  campusImages: [{ type: String }],
  courses: [{
    name: { type: String, required: true },
    duration: { type: String },
    fee: { type: Number },
    description: { type: String },
    curriculum: [{ type: String }] // List of topics/subjects
  }],
  academicStructure: { type: String },
  hostelDetails: { type: String },
  facultyHighlights: [{ type: String }],
  brochureUrl: { type: String }
};

export const University = createModelProxy('University', UniversitySchemaDefinition);
export default University;
