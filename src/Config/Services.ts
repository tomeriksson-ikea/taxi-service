import { MongoDBService } from "../Services/MongoDB.service";

export class Services {
  private readonly mongodb: MongoDBService;
  private hasInitialized: boolean = false;
  constructor(mongodbConnectionString: string) {
    this.mongodb = new MongoDBService(mongodbConnectionString);
  }
  async initialize() {
    await this.mongodb.init();
    this.hasInitialized = true;
  }
  getMongoDB(): MongoDBService {
    this.throwIfNotInitialized();
    return this.mongodb;
  }

  private throwIfNotInitialized(): void {
    if (!this.hasInitialized) {
      throw new Error("Services has not been initialized");
    }
  }
}
