import mongoose from "mongoose";
import Data from "./data.js";
import Listing from "../Model/product.js";
import mongodb from "../config/db.js";

const initDb = async () => {
    mongodb();
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(Data.data);
        console.log("Data imported successfully");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
initDb();


export default initDb;
