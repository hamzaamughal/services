const { Schema, model } = require("mongoose");

const PromotionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = model("Promotion", PromotionSchema);
