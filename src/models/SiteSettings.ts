import mongoose, { Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  heroTitle: string;
  heroIntro: string;
  contactMail: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new mongoose.Schema<ISiteSettings>(
  {
    heroTitle: { type: String, required: true },
    heroIntro: { type: String, required: true },
    contactMail: { type: String, required: true },
    github: { type: String, required: false },
    linkedin: { type: String, required: false },
    twitter: { type: String, required: false },
    instagram: { type: String, required: false },
    facebook: { type: String, required: false },
    whatsapp: { type: String, required: false },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
