import {
  saveImage,
  HowManyImages,
  getImages,
  getImage,
  deleteimage,
  setMainImage,
  isOwnerImage,
} from "../models/images.js";
import { getproduct } from "../models/products.js";

export const setImage = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await getproduct(product_id);
    if (!product)
      return res
        .status(400)
        .json({ succes: false, message: "Product not found" });
    if (!req.files || req.files.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });

    const userIsOwner = await isOwnerImage(req.user.id, product_id);

    if (!userIsOwner) {
      return res
        .status(403)
        .json({ error: "You are not authorized to modify this product." });
    }

    const invalidFile = req.files.find(
      (file) => !file.mimetype.startsWith("image/")
    );
    if (invalidFile) {
      return res.status(403).json({
        success: false,
        message: "One or more files are not valid images",
      });
    }

    const imagesQuantity = await HowManyImages(product_id);
    let mainPictureExist = false;
    if (imagesQuantity >= 1) mainPictureExist = true;

    if (imagesQuantity + req.files.length > 5)
      return res.status(400).json({
        success: false,
        message: "You cannot upload more than 5 images",
      });

    await Promise.all(
      req.files.map(async (image, i) => {
        const isMain = mainPictureExist ? false : i === 0;
        return await saveImage(product_id, image.filename, isMain);
      })
    );

    return res.status(200).json({
      message: "Image uploaded and saved",
      images: await getImages(product_id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error saving images");
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { image_id, product_id } = req.body;
    const img = await getImage(image_id);
    const userIsOwner = await isOwnerImage(req.user.id, product_id);
    if (!userIsOwner) {
      return res.status(403).json({
        error: "You are not authorized to Delete images in this product.",
      });
    }
    if (!img)
      return res.status(404).json({
        success: false,
        message: "img not found",
      });
    const isDeletedImage = await deleteimage(image_id, product_id);
    if (!isDeletedImage) {
      return res.status(403).json({
        success: false,
        message: "image not deleted",
      });
    }
    return res.status(403).json({
      success: true,
      message: "Image deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
export const updateMainImage = async (req, res) => {
  try {
    const { image_id, product_id } = req.body;
    const img = await getImage(image_id);
    const userIsOwner = await isOwnerImage(req.user.id, product_id);
    if (!userIsOwner) {
      return res
        .status(403)
        .json({ error: "You are not authorized to modify this product." });
    }
    if (!img)
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });

    if (img.is_main == 1) {
      return res.status(200).json({
        message: "The image is already set as the main image",
      });
    }
    await setMainImage(img.product_id, image_id);

    return res.status(200).json({
      success: true,
      message: "Main image updated",
      images: await getImages(img.product_id),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
