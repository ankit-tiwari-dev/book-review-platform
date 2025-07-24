import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    review_text: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

export const Review = mongoose.model("Review", reviewSchema);