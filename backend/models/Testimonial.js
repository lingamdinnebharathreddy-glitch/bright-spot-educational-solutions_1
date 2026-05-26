import { createModelProxy } from './modelHelper.js';

const TestimonialSchemaDefinition = {
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  course: { type: String },
  university: { type: String },
  avatar: { type: String }
};

export const Testimonial = createModelProxy('Testimonial', TestimonialSchemaDefinition);
export default Testimonial;
