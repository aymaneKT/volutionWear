import {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  editProduct,
  addProductForUser,
  productsForUser,
  deleteProductForUser,
} from "../models/products.js";
import { deleteReview, getReviewForProduct } from "../models/reviews.js";
import { getUser } from "../models/user.js";
import { newAction } from "../models/actions.js";
export const addSingleProduct = async (req, res) => {
  try {
    const product = req.body;

    const { name, description, price, stock, category_id, image_url } = product;


    if (
      !name ||
      !description ||
      price == null ||
      stock == null ||
      !category_id ||
      !image_url
    ) {
      return res
        .status(400)
        .json({ error: "Not all required fields are filled in" });
    }
    const idOfAddedProduct = await addProduct(
      name,
      description,
      price,
      stock,
      category_id,
      image_url
    );

    const ProductAdded = await getProductById(idOfAddedProduct);
    const userOwnerOfProduct = await getUser(req.user.id);
    if (!userOwnerOfProduct) {
      return res.status(404).json({
        error: "user not found",
      });
    }
    await newAction(
      req.user.id,
      "Product added",
      `Product ${ProductAdded.name} added`
    );
    await addProductForUser(req.user.id, ProductAdded.id);
    return res.status(200).json({
      result: true,
      product: ProductAdded,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();

    const productWithReviews = await Promise.all(
      products.map(async (product) => {
        const review = await getReviewForProduct(product.id);
        return { ...product, review };
      })
    );

    return res.status(200).json({
      succes: true,
      data: productWithReviews,
    });
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    const reviews = await getReviewForProduct(product.id);

    return res.status(200).json({ succes: true, data: { product, reviews } });
  } catch (error) {
    throw error;
  }
};

export const deleteSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productToDelete = await getProductById(id);
    if (!productToDelete) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    const userProducts = await productsForUser(req.user.id);

    const isUserProduct = userProducts.some((product) => product.id == id);
    if (!isUserProduct) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to delete this product",
      });
    }
    await deleteProductForUser(id);
    await deleteReview(id, null);
    await deleteProduct(id);
    await newAction(
      req.user.id,
      "Product deleted",
      `Product ${productToDelete.name} deleted`
    );
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (req, res) => {
  try {
    const userParams = req.user;
    const product = req.body;
    const productForUser = await productsForUser(userParams.id);
    const isUserProduct = productForUser.some(
      (product) => product.id == req.body.id
    );
    if (!isUserProduct) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to delete this product",
      });
    }

    await editProduct(product);
    const productUpdated = await getProductById(product.id);
    await newAction(
      userParams.id,
      "Product updated",
      `Product ${productUpdated.name} updated`
    );
    return res.status(200).json({
      success: true,
      product: productUpdated,
    });
  } catch (error) {
    throw error;
  }
};

export const productsForSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const posts = await productsForUser(userId);
    return res.status(200).json({ succes: true, data: posts });
  } catch (error) {
    throw error;
  }
};
