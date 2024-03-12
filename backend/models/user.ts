import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  name: string;
  mobileNumber: number;
  dateOfBirth: string;
  email:string;
  password:string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
