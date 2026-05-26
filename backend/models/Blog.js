import { createModelProxy } from './modelHelper.js';

const BlogSchemaDefinition = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, required: true }, // e.g. "Study Abroad", "Scholarships", "Admissions"
  author: { type: String, default: "Bright Spot Advisor" },
  image: { type: String },
  readTime: { type: String, default: "3 min read" },
  publishedAt: { type: Date, default: Date.now }
};

export const Blog = createModelProxy('Blog', BlogSchemaDefinition);
export default Blog;
