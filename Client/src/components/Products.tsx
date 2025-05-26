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
export type ProductItemType = {
  productId: number | null;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  stock: number;
  isActive: boolean;
  imgs: imageType[];
};
export type imageType = {
  imageId: number;
  image_url: string;
  product_id: number;
  is_main: boolean | string;
};
export default function Products() {
  const [isOpenProductInfo, setIsOpenMenuInfo] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [productItem, setProductItem] = useState<ProductItemType>({
    productId: null,
    name: "",
    description: "",
    price: 0,
    category: "",
    createdAt: "",
    isActive: false,
    stock: 0,
    imgs: [],
  });

  const token = localStorage.getItem("token");
  function getProducts(userId: number) {
    axios
      .get(`http://localhost:3000/api/products/${userId}`)
      .then((res) => {
        const data = res.data.products.map((item: ProductItemType) => ({
          productId: item.productId,
          name: item.name,
          description: item.description,
          price: parseFloat(Number(item.price).toFixed(2)),
          category: item.category,
          createdAt: item.createdAt,
          stock: item.stock,
          isActive: item.isActive,
          imgs: item.imgs.map((img: imageType) => ({
            imageId: img.imageId,
            image_url: img.image_url,
            product_id: img.product_id,
            is_main: img.is_main,
          })),
        }));
        setProducts(data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const { id } = decoded;
      if (id) {
        setUserId(id);
        getProducts(id);
      }
    }
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} />
      <ProductItem
        isOpenProductInfo={isOpenProductInfo}
        setIsOpenMenuInfo={setIsOpenMenuInfo}
        getProducts={getProducts}
        userId={userId}
        productItem={productItem}
      />
      <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
        <button
          onClick={() => {
            setIsOpenMenuInfo(true);
            setProductItem({
              productId: null,
              name: "",
              description: "",
              price: 0,
              category: "",
              createdAt: "",
              isActive: false,
              stock: 0,
              imgs: [],
            });
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
                <td className="py-2 font-semibold truncate px-3 text-left">
                  Product Name
                </td>
                <td className="py-2 font-semibold px-3">Category</td>
                <td className="py-2 font-semibold px-3">Stock</td>
                <td className="py-2 font-semibold px-3">Sold</td>
                <td className="py-2 font-semibold px-3">Price</td>
                <td className="py-2 font-semibold px-3 rounded-tr-[10px] rounded-br-[10px]">
                  Status
                </td>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                return (
                  <tr
                    onClick={() => {
                      setProductItem(product);
                      setIsOpenMenuInfo(true);
                    }}
                    className="border-[10px]  cursor-pointer hover:text-white hover:bg-[#cbc0e0] rounded-tl-[10px] rounded-bl-[10px] border-[#f3f0f0] mt-4"
                  >
                    <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
                      {product.productId}
                    </td>
                    <td className="py-2 flex truncate justify-start items-center gap-1 text-center border-[#f3f0f0] border-t-3 border-b-3 px-3">
                      <img
                        src={
                          product.imgs && product.imgs.length > 0
<<<<<<< HEAD
                            ? `http://localhost:3000/uploads/${
                                product.imgs.find(
                                  (img) =>
                                    img.is_main === true || img.is_main == "1"
                                )?.image_url 
                              }`
=======
                            ? `http://localhost:3000/uploads/${product.imgs.find((i) => i.is_main == "1")?.image_url || product.imgs[0].image_url}`
>>>>>>> 01f23aa1194eb73f8177b3f46e0f3955083dcb5b
                            : img
                        }
                        alt="Product Img"
                        className="w-[60px] border-1 object-cover h-[60px] mix-blend-multiply rounded-full"
                      />

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
                    <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 border-r-3 px-3 rounded-tr-[10px] rounded-br-[10px]">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
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
