import mongoose from "mongoose";

const ConvSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
      },
    ],
    message: [{
      type: String,
      required: true, // Message content is mandatory
    }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export const Conversation = mongoose.model("Conversation", ConvSchema);
