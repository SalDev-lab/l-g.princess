import foodModel from "../models/foodModel.js";
import { bucket } from "../firebase.js";

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// add food
const addFood = async (req, res) => {
  try {
    // Upload image to Firebase
    const filename = `${Date.now()}_${req.file.originalname}`;
    const file = bucket.file(filename);

    await file.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype },
    });

    // Get public URL
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491", // far future date
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: url, // store Firebase URL
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// delete food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // remove from Firebase
    const fileName = food.image.split("/").pop().split("?")[0]; 
    await bucket.file(fileName).delete().catch(() => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listFood, addFood, removeFood };
