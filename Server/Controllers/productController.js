import { getImages } from "../models/images.js";
import {
  addproduct,
  getproduct,
  deleteproduct,
  addListingProduct,
  deleteListingProduct,
  productsForUser,
  editproduct,
  getproducts,
  getProductsPaginated,
  getTotalProducts,
} from "../models/products.js";
import {
  getReviewsForProduct,
  averageRatingForProduct,
  deleteAllReviewsForProduct,
} from "../models/Reviews.js";

import { getUser } from "../models/user.js";

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const { name, description, price, stock, category_id } = product;

    if (
      !name ||
      !description ||
      price == null ||
      stock == null ||
      !category_id
    ) {
      return res
        .status(400)
        .json({ error: "Not all required fields are filled in" });
    }
    if (req.user.is_seller == 0) {
      return res.status(400).json({
        success: false,
        message: "Non Authorized , you are register as customer",
      });
    }

    const idOfAddedProduct = await addproduct(
      name,
      description,
      price,
      stock,
      category_id
    );

    const userOwnerOfProduct = await getUser(req.user.id);
    if (!userOwnerOfProduct) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const addedProduct = await getproduct(idOfAddedProduct);
    await addListingProduct(idOfAddedProduct, req.user.id);

    return res.status(200).json({
      result: true,
      product: addedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const isExistingProduct = await getproduct(id);

    if (!isExistingProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    if (req.user.is_seller == 0) {
      return res.status(400).json({
        success: false,
        message: "Non Authorized , you are register as customer",
      });
    }
    await deleteAllReviewsForProduct(id);
    await deleteListingProduct(id, req.user.id);
    await deleteproduct(id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id, name, description, price, stock, category_id } = req.body;
    if (!(await getproduct(id)))
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    const productsOfUser = await productsForUser(req.user.id);
    const userHaveProduct = productsOfUser.some((product) => product.id == id);
    if (!userHaveProduct) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to delete this product",
      });
    }
    if (req.user.is_seller == 0) {
      return res.status(400).json({
        success: false,
        message: "Non Authorized , you are register as customer",
      });
    }
    await editproduct(id, name, description, price, stock, category_id);
    const updatedProduct = await getproduct(id);
    return res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getProductsForAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existUser = await getUser(userId);
    if (!existUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    const productsWimage = await productsForUser(userId);
    const products = await Promise.all(
      productsWimage.map(async (e) => {
        const imgs = await getImages(e.id);
        return { ...e, imgs };
      })
    );

    return res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await getproducts();
    const finalProducts = await Promise.all(
      products.map(async (e) => {
        const Images = await getImages(e.ProductId);
        return { ...e, Images };
      })
    );
    return res.status(201).json({
      success: true,
      finalProducts,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await getproduct(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    const images = await getImages(id);
    const reviews = await getReviewsForProduct(id);
    return res.status(200).json({
      success: true,
      product: { ...product, images, reviews },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const PaginatedListProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const allProductsPaginated = await getProductsPaginated(limit, offset);
    const productsWimages = await Promise.all(
      allProductsPaginated.map(async (e) => {
        const avgReview = await averageRatingForProduct(e.ProductId);
        const Images = await getImages(e.ProductId);
        return { ...e, avgReview, Images };
      })
    );
    const totalProducts = await getTotalProducts();
    const totalPages = Math.ceil(totalProducts / limit);
    res.json({
      currentPage: page,
      totalPages,
      data: productsWimages,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
