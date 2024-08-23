import { ObjectId } from "mongodb";

export class Identifiable {
  _id: string;
  constructor() {
    this._id = new ObjectId().toString();
  }
  getId(): string {
    return this._id;
  }
}
