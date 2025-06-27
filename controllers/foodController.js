import foodModel from "../models/foodModel.js";
import Fs from 'fs';

const addFood = async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Get the filename from the uploaded file
    const image_filename = req.file.filename;

    // Create a new food document
    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });

    try {
        // Save the food item to the database
        await food.save();
        res.status(201).json({ success: true, message: "Food item added successfully", food });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ success: false, message: "Failed to add food item" });
    }
}

// all food list items
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log (error);
        res.json({success:false,message: "Error"});
    }

}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        Fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food item Removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
export {addFood,listFood,removeFood};
