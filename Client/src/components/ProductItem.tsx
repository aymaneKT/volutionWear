import { useEffect, useState } from "react";
import img from "../VID-IMG/No_picture_available.png";
import Checkbox from "./CheckBox";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
<<<<<<< HEAD
import { imageType, ProductItemType } from "./Products";
import DeleteProductModal from "./DeleteProductModal";
=======
import { ProductItemType } from "./Products";
import DeleteConfirmationProduct from "./DeleteConfirmationProduct";
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
type ProductItemTypeProps = {
  isOpenProductInfo: boolean;
  setIsOpenMenuInfo: (value: boolean) => void;
  getProducts: (userId: number) => void;
  userId: number;
  productItem: ProductItemType;
};

export type ProductType = {
  name: string;
  description: string;
  price: string;
  stock: string;
  category_id: string;
  isActive: boolean;
<<<<<<< HEAD
  imgs: imageType[];
=======
  images: any[];
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
};

export default function ProductItem(props: ProductItemTypeProps) {
  const { isOpenProductInfo, setIsOpenMenuInfo } = props;
<<<<<<< HEAD
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] =
    useState<boolean>(false);
=======
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
  useEffect(() => {
    document.body.style.overflow = isOpenProductInfo ? "hidden" : "visible";
    if (props.productItem.productId != null) {
      setProduct({
        name: props.productItem.name,
        description: props.productItem.description,
        price: props.productItem.price.toString(),
        stock: props.productItem.stock.toString(),
        category_id: props.productItem.category,
        isActive: props.productItem.isActive,
<<<<<<< HEAD
        imgs: props.productItem.imgs,
=======
        images: props.productItem.imgs,
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
      });
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        isActive: false,
<<<<<<< HEAD
        imgs: [],
=======
        images: [],
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
      });
    }
  }, [isOpenProductInfo, props.productItem]);
  type imageType = {
    imagePreview: string;
    image: File;
  };
  const [product, setProduct] = useState<ProductType>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    isActive: false,
<<<<<<< HEAD
    imgs: [],
=======
    images: [],
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
  });
  const [imagePreview, setImagePreview] = useState<imageType[]>([]);

  const addProduct = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category_id", product.category_id);
    // formData.append("isActive", product.isActive ? "1" : "0");
    imagePreview.forEach((img) => {
      formData.append(`images`, img.image);
    });

    const request =
      props.productItem.productId != null
        ? axios.put(
            `http://localhost:3000/api/product`,
            {
              id: props.productItem.productId,
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              category_id: product.category_id,
            },
            headers
          )
        : axios.post(`http://localhost:3000/api/product`, formData, headers);

    request
      .then((res) => {
        toast.success(
          props.productItem.productId
            ? "Product updated successfully"
            : "Product added successfully",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setIsOpenMenuInfo(false);
        setProduct({
          name: "",
          description: "",
          price: "",
          stock: "",
          category_id: "",
          isActive: false,
<<<<<<< HEAD
          imgs: [],
=======
          images: [],
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
        });
        props.getProducts(props.userId);
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setImagePreview([]);
      });
  };

  return (
    <>
      <DeleteProductModal
        isOpen={isOpenDeleteProduct}
        setIsOpen={setIsOpenDeleteProduct}
        productId={props.productItem.productId}
        getProducts={props.getProducts}
        userId={props.userId}
      />
      <ToastContainer />
      <DeleteConfirmationProduct
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        productId={props.productItem.productId}
        getProducts={props.getProducts}
        userId={props.userId}
      />
      <div
        style={{
          opacity: isOpenProductInfo ? 1 : 0,
          pointerEvents: isOpenProductInfo ? "auto" : "none",
        }}
        onClick={() => {
          setIsOpenMenuInfo(false);
<<<<<<< HEAD
          setImagePreview([]);
=======
          if (props.productItem.productId == null) {
            setImages([]);
          }
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
        }}
        className="fixed items-center z-10 transition max-h-screen overflow-y-auto duration-200 max-[850px]:items-start  top-0 bottom-0 right-0 left-0 font-[Poppins] max-[992px]:bottom-auto bg-[#ffffffdc] flex justify-center "
      >
        <div
          style={{
            transform: isOpenProductInfo
              ? "translateX(0)"
              : "translateX(-20px)",
            opacity: isOpenProductInfo ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
          className="flex  justify-between transition h-auto duration-200 items-start  border-2 rounded-[8px] bg-white p-9 w-[90%] max-[992px]:w-screen m-5  flex-wrap gap-5"
        >
          {/* left part */}
          <div className=" flex flex-col  gap-2.5 grow  ">
            <div className="flex flex-col gap-2.5">
              <span className="text-[#7F8292] font-medium ">Main Image</span>
              <img
<<<<<<< HEAD
                src={
                  props.productItem.productId != null && product.imgs.length > 0
                    ? `http://localhost:3000/uploads/${
                        product.imgs.find((img) => img.is_main === "1")
                          ?.image_url || product.imgs[0].image_url
                      }`
                    : imagePreview.length > 0
                    ? imagePreview[0].imagePreview
                    : img
                }
                className="w-[100%] h-[200px] object-cover  object-center rounded-[10px] shadow-[0px_48px_35px_-48px_#e8e8e8]"
=======
                src={images.length > 0 ? URL.createObjectURL(images[0]) : img}
                className="w-[100%] h-[400px] object-center  aspect-16/9 rounded-[8px] "
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
                alt="Main Image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = img;
                }}
              />
            </div>
            <div>
              <div className="flex flex-col gap-2.5">
                <span className="text-[#7F8292] font-medium">Other Images</span>
<<<<<<< HEAD
                <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,auto))] gap-1.5 ">
                  {props.productItem.productId != null &&
                  product.imgs.length > 0
                    ? product.imgs
                        .filter(
                          (img) =>
                            img.is_main !== "1" &&
                            img.image_url !==
                              product.imgs.find((img) => img.is_main === "1")
                                ?.image_url
                        )
                        .map((img, index) => (
                          <img
                            key={index}
                            src={`http://localhost:3000/uploads/${img.image_url}`}
                            alt="Other Image"
                            className="cursor-pointer w-[300px] object-cover object-center rounded-[10px] aspect-16/9 shadow-[0px_48px_35px_-48px_#e8e8e8]"
                          />
                        ))
                    : imagePreview.map((img, index) =>
                        index === 0 ? null : (
                          <img
                            key={index}
                            src={img.imagePreview}
                            alt="Other Image"
                            className="cursor-pointer w-[300px] object-cover object-center rounded-[10px] aspect-16/9 shadow-[0px_48px_35px_-48px_#e8e8e8]"
                            onClick={() => {
                              const newImages = [...imagePreview];
                              const [selected] = newImages.splice(index, 1);
                              newImages.unshift(selected);
                              setImagePreview(newImages);
                            }}
                          />
                        )
                      )}
                </div>
                <div className="h-[100px] w-[200px] flex flex-col justify-center items-center border-2 border-dashed border-gray-300 bg-black p-6 rounded-[10px] shadow-[0px_48px_35px_-48px_#e8e8e8] cursor-pointer">
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center  cursor-pointer"
                  >
                    <div className="flex justify-center items-center">
                      <svg
                        className="h-[70px] fill-gray-300"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
=======
                <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,auto))] gap-1.5 ">
                  {images.slice(1).map((img, index) => (
                    <div
                      onClick={() => {
                        const newImages = [...images];
                        const [clickedImage] = newImages.splice(index + 1, 1);
                        newImages.unshift(clickedImage);
                        setImages(newImages);
                      }}
                      key={index}
                      className=" h-[100px] rounded-[8px] border-2 border-[#7F8292] flex items-center justify-center"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-[8px] cursor-pointer "
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center self-start">
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-52 h-24 cursor-pointer border-2 border-dashed border-gray-300 bg-black p-6 rounded-lg shadow-md hover:border-gray-400"
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 fill-gray-200"
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        />
                      </svg>
                    </div>
<<<<<<< HEAD
                    <div className="text-gray-300 font-light">
                      <span>upload image</span>
=======
                    <div className="flex items-center justify-center mt-2">
                      <span className="text-sm font-light text-gray-200">
                        Upload image
                      </span>
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
                    </div>
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => {
<<<<<<< HEAD
                        if (e.target.files) {
                          if (e.target.files.length + imagePreview.length > 5) {
                            toast.error("You can only upload up to 5 images", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                            return;
                          }
                          const files = Array.from(e.target.files);
                          const filePreviews = files.map((file) => ({
                            imagePreview: URL.createObjectURL(file),
                            image: file,
                          }));
                          setImagePreview((prev) => [...prev, ...filePreviews]);
=======
                        const files = e.target.files;
                        if (files && files.length + images.length > 5) {
                          toast.error("You can only upload 5 images", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                          return;
                        }
                        if (
                          files &&
                          files.length > 0 &&
                          props.productItem.productId == null
                        ) {
                          setImages(Array.from(files));
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* ==left part== */}
          {/* right part */}
          <div className="grow-5 flex flex-col gap-2 item-s">
            <div>
              <label className="block  text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                className="mt-1 focus:bg-[#b348ff0e]  block w-full border-b-1 border-gray-500 outline-none p-2"
                placeholder="Enter product name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 focus:bg-[#b348ff0e] resize-none block w-full border border-gray-300 rounded-md p-2"
                rows={3}
                placeholder="Enter product description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (€)
              </label>
              <input
                type="number"
                step="0.01"
                className="mt-1 focus:bg-[#b348ff0e]  block w-full border-b-1 border-gray-500 outline-none p-2"
                placeholder="0.00"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block focus:bg-[#b348ff0e]text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                className="mt-1 block focus:bg-[#b348ff0e] w-full border-b-1 border-gray-500 outline-none p-2"
                placeholder="Enter quantity in stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                className="mt-1 focus:bg-[#b348ff0e]  block w-full border-b-1 border-gray-500 outline-none p-2"
                placeholder="Enter product category"
                value={product.category_id}
                onChange={(e) =>
                  setProduct({ ...product, category_id: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Checkbox product={product} setProduct={setProduct} />
              <label
                htmlFor="active"
                className="text-sm text-gray-700"
                onClick={() =>
                  setProduct({ ...product, isActive: !product.isActive })
                }
              >
                Product Active
              </label>
            </div>

            <div className="flex   justify-between my-4  flex-wrap-reverse gap-3">
              <button
<<<<<<< HEAD
                style={{
                  display:
                    props.productItem.productId != null ? "block" : "none",
                }}
                onClick={() => {
                  setIsOpenDeleteProduct(true);
                  setIsOpenMenuInfo(false);
                }}
=======
                onClick={() => {
                  setShowDeleteModal(true);
                  setIsOpenMenuInfo(false);
                }}
                style={{
                  opacity: props.productItem.productId != null ? 1 : 0,
                }}
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
                className="cursor-pointer bg-[#f85959] text-white rounded-[7px] px-4 py-1.5 whitespace-nowrap "
              >
                Delete Product
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsOpenMenuInfo(false);
<<<<<<< HEAD
                    setImagePreview([]);
=======
                    if (props.productItem.productId == null) {
                      setImages([]);
                    }
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
                  }}
                  className="cursor-pointer bg-[#7E7E7E] text-white  rounded-[7px]  px-4  py-1.5"
                >
                  Cancel
                </button>
                <button
                  className="cursor-pointer text-white  rounded-[7px] bg-purple-600 px-4  py-1.5"
                  onClick={addProduct}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
