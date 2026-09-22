import mongoose, { Document, Model } from "mongoose";

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  logo?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new mongoose.Schema<IExperience>(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    logo: { type: String, required: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Experience: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;
