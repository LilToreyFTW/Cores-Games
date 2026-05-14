import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const SwipeSchema = new Schema(
  {
    fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    direction: { type: String, enum: ["left", "right"], required: true },
  },
  { timestamps: true }
);

SwipeSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export type SwipeDocument = InferSchemaType<typeof SwipeSchema>;

export const SwipeModel =
  (models.Swipe as Model<InferSchemaType<typeof SwipeSchema>>) ||
  model("Swipe", SwipeSchema);
