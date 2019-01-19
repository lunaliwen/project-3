const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  comment: { type: String, required: true },
  link: { type: String, required: true },
  user: {
      type: Schema.Types.ObjectId,
      ref: "User"
  }
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;