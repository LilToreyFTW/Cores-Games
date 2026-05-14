import { Types } from "mongoose";

export function toId(value: string) {
  return new Types.ObjectId(value);
}

export function serializeId<T extends { _id?: Types.ObjectId | string }>(doc: T) {
  return {
    ...doc,
    id: String(doc._id),
  };
}
