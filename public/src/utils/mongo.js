"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
/** Demo connection mongo */
// export async function connect(): Promise<Mongoose> {
//   const mongoUri = config.get('mongo.uri');
//   const mongoose = new Mongoose();
//   await mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   });
//   return mongoose;
// }
async function connectToMongo() {
    try {
        await mongoose_1.default.connect(config_1.default.get('dbUri'));
        console.log('Connected to MongoDB 🥳🥳🥳');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
exports.connectToMongo = connectToMongo;
