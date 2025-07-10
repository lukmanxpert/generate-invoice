import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// connect db
export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  // promise is not available
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => mongoose.connection);
  }
  //   promise is available
  try {
    cached.conn = await cached.promise;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    cached.promise = null;
    process.exit(1);
  }
}
