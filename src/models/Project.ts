import mongoose, { Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
  technologies: string;
  role: string;
  challenge: string;
  solution: string;
  result: string;
  isFeatured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: String, required: true },
    role: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    result: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
