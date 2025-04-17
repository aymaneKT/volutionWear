import { saveImage, HowManyImages } from "../models/images.js";
import { getproduct } from "../models/products.js";

export const setImage = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await getproduct(product_id);
    if (!product)
      return res.status(400).json({
        succes: false,
        message: "Product not found",
      });
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }
    const imagesQuantity = await HowManyImages(product_id);
    let mainPictureExist = false;
    if(imagesQuantity >= 1)
      mainPictureExist = true;

    
    if (imagesQuantity >= 5 || imagesQuantity  + req.files.length >5) {
      return res.status(400).json({
        success: false,
        message: "You cannot upload more than 5 images",
      });
    }

    const images = await Promise.all(
      req.files.map(async (image, i) => {
      const isMain = mainPictureExist ? false : i === 0;
      return await saveImage(product_id, image.buffer, isMain);
      })
    );
    return res
      .status(200)
      .json({ message: "Image uploaded and saved", imageId: images });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error saving images");
  }
};
