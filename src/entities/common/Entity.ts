import { ObjectId } from "mongodb";

export type RawEntity<T> = { id: string; data: T };

export abstract class Entity<T> {
  protected id: string;
  protected data: T;
  protected constructor(data: T, id?: string) {
    this.id = id ?? new ObjectId().toString();
    this.data = data;
  }

  public toRaw(): RawEntity<T> {
    return {
      id: this.id,
      data: this.data
    };
  }

  getId(): string {
    return this.id;
  }
}
