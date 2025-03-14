import {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  editProduct,
} from "../models/products.js";

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
    return res.status(200).json(products);
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
    return res.status(200).json(product);
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
    await deleteProduct(id);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    await editProduct(product);
    const productUpdated = await getProductById(product.id);

    return res.status(200).json({
      success: true,
      product: productUpdated,
    });
  } catch (error) {
    throw error;
  }
};
