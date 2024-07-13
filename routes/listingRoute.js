import express from "express";
const router = express.Router();
import Listing from "../Model/product.js";

router.get("/listings", async (req, res) => {
  try {
    const allListing = await Listing.find({});
    res.render("index", { allListing }); // Corrected file extension
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).send("Error fetching listing");
  }
});

router.get("/listings/new", (req, res) => {
  res.render("new");
});
router.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    res.render("show", { listing });
  } catch (error) {
    console.error("Error fetching listing:", error);
  }
});

router.post("/listings", async (req, res) => {
  try {
    const listing = req.body;
    console.log(listing); // Log the incoming listing data
    const newListing = new Listing(listing);
    await newListing.save(); // Save the new listing to the database
    res.redirect("/listings");
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).send("Error creating listing");
  }
});

router.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
      const listing = await Listing.findById(id);
      res.render('edit', { listing });
  } catch (error) {
      console.error('Error fetching listing:', error);
      res.status(500).send('Internal Server Error');
  }
});


router.put('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = req.body;

  try {
      await Listing.findByIdAndUpdate(id, listing);
      res.redirect(`/listing/${id}`);
  } catch (error) {
      console.error('Error updating listing:', error);
      res.status(500).send('Internal Server Error');
  }
});
export default router;
