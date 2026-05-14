import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    avatar: { type: String, required: true },
    favoriteGames: [{ type: String, required: true }],
    level: { type: Number, default: 1, min: 1, max: 999 },
    bio: { type: String, default: "", maxlength: 280 },
    headline: { type: String, default: "" },
    location: { type: String, default: "" },
    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema> & {
  _id: string;
};

export const UserModel =
  (models.User as Model<InferSchemaType<typeof UserSchema>>) ||
  model("User", UserSchema);
