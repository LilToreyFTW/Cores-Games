import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const MatchSchema = new Schema(
  {
    userIds: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    roomKey: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

MatchSchema.index({ userIds: 1 });

export type MatchDocument = InferSchemaType<typeof MatchSchema>;

export const MatchModel =
  (models.Match as Model<InferSchemaType<typeof MatchSchema>>) ||
  model("Match", MatchSchema);
