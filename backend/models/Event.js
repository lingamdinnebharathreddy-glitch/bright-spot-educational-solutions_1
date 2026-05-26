import { createModelProxy } from './modelHelper.js';

const EventSchemaDefinition = {
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Seminar', 'Webinar', 'Admission Drive', 'Workshop'], 
    required: true 
  },
  date: { type: String, required: true }, // formatted string or ISO
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  registrations: [{
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    registeredAt: { type: Date, default: Date.now }
  }]
};

export const Event = createModelProxy('Event', EventSchemaDefinition);
export default Event;
