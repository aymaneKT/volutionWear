import { useEffect, useState } from "react";
import img from "../VID-IMG/VolutionWear.png";
import Checkbox from "./CheckBox";
import InputImage from "./InputImage";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ProductItemType } from "./Products";
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
};

export default function ProductItem(props: ProductItemTypeProps) {
  const { isOpenProductInfo, setIsOpenMenuInfo } = props;

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
      });
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        isActive: false,
      });
    }
  }, [isOpenProductInfo, props.productItem]);

  const [product, setProduct] = useState<ProductType>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    isActive: false,
  });

  const addProduct = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

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
        : axios.post(`http://localhost:3000/api/product`, product, headers);

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
        });
        props.getProducts(props.userId);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          opacity: isOpenProductInfo ? 1 : 0,
          pointerEvents: isOpenProductInfo ? "auto" : "none",
        }}
        onClick={() => {
          setIsOpenMenuInfo(false);
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
                src={img}
                className="w-[100%] h-auto object-center object-cover aspect-16/9 rounded-[8px]"
                alt="Main Image"
              />
            </div>
            <div>
              <div className="flex flex-col gap-2.5">
                <span className="text-[#7F8292] font-medium">Other Images</span>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,auto))] gap-1.5 ">
                  <img src={img} alt="Main Image" />
                  <img src={img} alt="Main Image" />
                  <img src={img} alt="Main Image" />
                  <img src={img} alt="Main Image" />
                  <img src={img} alt="Main Image" />
                  <img src={img} alt="Main Image" />
                </div>
                <InputImage />
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
                <button className="cursor-pointer bg-[#f85959] text-white rounded-[7px] px-4 py-1.5 whitespace-nowrap ">
                Delete Product
                </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsOpenMenuInfo(false);
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
