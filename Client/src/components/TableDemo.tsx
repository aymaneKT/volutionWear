import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISellerOrderItem } from "./SellerDashbord";

interface IProductProps {
  products: ISellerOrderItem[];
}

export function TableDemo({ products }: IProductProps) {
  return (
    <Table className="my-5">
      <TableCaption>A list of Products in this order.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>UNIT PRICE</TableHead>
          <TableHead className="text-right">QUANTITY</TableHead>
          <TableHead className="text-right">TOTAL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="truncate font-medium">{product.id}</TableCell>
            <TableCell className="truncate flex items-center gap-2">
              <img
                className="h-[50px] w-[50px] rounded-full object-cover"
                src={`http://localhost:3000/uploads/${product.image_url}`}
                alt={product.product_name}
              />
              {product.product_name}
            </TableCell>
            <TableCell className="truncate">
              €{Number(product.price).toFixed(2)}
            </TableCell>
            <TableCell className="text-center">{product.quantity}</TableCell>
            <TableCell className="text-right truncate">
              €{(Number(product.price) * product.quantity).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            €
            {products
              .reduce((acc, p) => acc + Number(p.price) * p.quantity, 0)
              .toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
