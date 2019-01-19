const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  uploads: [
    {
            type: Schema.Types.ObjectId,
            ref:"Upload"

    }
  ]
});

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
