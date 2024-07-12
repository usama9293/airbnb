import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1559837627-de5ea80a1f43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c291cmNlfGVufDB8fDB8fHww",
      set: (v) => (v === "https://images.unsplash.com/photo-1559837627-de5ea80a1f43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c291cmNlfGVufDB8fDB8fHww" ? "default link" : v),
    },
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const ListModel = mongoose.model("Listing", listSchema);

export default ListModel;
