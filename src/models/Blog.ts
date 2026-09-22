import mongoose, { Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  date: string;
  author: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, default: "Manoj Panta" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
