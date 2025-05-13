import HeadDashbord from "./Dashboard/HeadDashbord";

import { FaPlus } from "react-icons/fa";
import img from "../VID-IMG/No_picture_available.png";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import Loader from "./Loader";
interface JwtPayload extends BaseJwtPayload {
  id?: number;
  is_seller?: boolean | string;
}
type ProductItemType = {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  stock: number;
  imgs: imageType[];
};
type imageType = {
  imageId: number;
  image_url: string;
  product_id: number;
  is_main: boolean;
};
export default function Products() {
  const [isOpenProductInfo, setIsOpenMenuInfo] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductItemType[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    function getProducts(userId: number) {
      axios
        .get(`http://localhost:3000/api/products/${userId}`)
        .then((res) => {
          const data = res.data.products.map((item: ProductItemType) => ({
            ProductId: item.productId,
            name: item.name,
            description: item.description,
            price: parseFloat(Number(item.price).toFixed(2)),
            category: item.category,
            createdAt: item.createdAt,
            stock: item.stock,
            images: item.imgs.map((img: any) => ({
              imageId: img.imageId,
              image_url: img.image_url,
              product_id: img.product_id,
              is_main: img.is_main,
            })),
          }));
          setProducts(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const { id } = decoded;
      if (id) getProducts(id);
    }
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} />
      <ProductItem
        isOpenProductInfo={isOpenProductInfo}
        setIsOpenMenuInfo={setIsOpenMenuInfo}
      />
      <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
        <button
          onClick={() => {
            setIsOpenMenuInfo(true);
          }}
          className="flex items-center gap-1 mt-3 border-1 px-4 py-2 cursor-pointer text-[#7C7C7C] border-[#7C7C7C] left-[100%] -translate-x-[100%] rounded-[8px] relative right-0"
        >
          <FaPlus />
          Add Product
        </button>
        <div className="overflow-x-auto font-[Poppins]">
          <table
            style={{ fontSize: "clamp(0.4rem, 3vw, 0.8rem)" }}
            className="w-full table-auto border-separate my-4 border-spacing-y-2"
          >
            <thead className="bg-[#f3f0f0] p-4">
              <tr>
                <td className="py-2 font-semibold px-3 rounded-tl-[10px] rounded-bl-[10px]">
                  ID
                </td>
                <td className="py-2 font-semibold truncate px-3 text-center">
                  Product Name
                </td>
                <td className="py-2 font-semibold px-3">Category</td>
                <td className="py-2 font-semibold px-3">Stock</td>
                <td className="py-2 font-semibold px-3">Sold</td>
                <td className="py-2 font-semibold px-3">Price</td>
                <td className="py-2 font-semibold px-3">Status</td>
                <td className="py-2 font-semibold px-3 text-ce rounded-tr-[10px] rounded-br-[10px]">
                  Action
                </td>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                return (
                  <tr className="border-[10px]  cursor-pointer hover:text-white hover:bg-[#cbc0e0] rounded-tl-[10px] rounded-bl-[10px] border-[#f3f0f0] mt-4">
                    <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
                      {product.productId}
                    </td>
                    <td className="py-2 flex truncate justify-center items-center gap-1 text-center border-[#f3f0f0] border-t-3 border-b-3 px-3">
                      <img
                        src={img}
                        alt="Product Img"
                        className="w-[60px] border-1 object-cover  h-[60px] mix-blend-multiply rounded-full"
                      />{" "}
                      {product.name}
                    </td>
                    <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 px-3">
                      {product.category}
                    </td>
                    <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 px-3">
                      {product.stock}
                    </td>
                    <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 px-3">
                      {product.stock - product.stock}
                    </td>
                    <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 px-3">
                      {product.price} €
                    </td>
                    <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 px-3">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </td>
                    <td className="py-2 truncate border-[#f3f0f0] border-3 border-l-0 px-3 rounded-tr-[10px] rounded-br-[10px]">
                      action
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
