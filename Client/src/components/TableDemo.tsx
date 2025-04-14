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
import img from "../VolutionWear.png";

const products = [
  {
    id: "P001",
    name: "Wireless Headphones",
    unitPrice: 99.99,
    quantity: 2,
    image: img,
  },
  {
    id: "P002",
    name: "Smart Watch",
    unitPrice: 199.99,
    quantity: 1,
    image: img,
  },
  {
    id: "P003",
    name: "Bluetooth Speaker",
    unitPrice: 59.99,
    quantity: 3,
    image: img,
  },
  {
    id: "P004",
    name: "Gaming Mouse",
    unitPrice: 49.99,
    quantity: 2,
    image: img,
  },
  {
    id: "P005",
    name: "Mechanical Keyboard",
    unitPrice: 129.99,
    quantity: 1,
    image: img,
  },
];

export function TableDemo() {
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
                src={product.image}
                alt={product.name}
              />
              {product.name}
            </TableCell>
            <TableCell className="truncate">
              €{product.unitPrice.toFixed(2)}
            </TableCell>
            <TableCell className="text-center">
              {product.quantity}
            </TableCell>
            <TableCell className="text-right truncate">
              €{(product.unitPrice * product.quantity).toFixed(2)}
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
              .reduce((acc, p) => acc + p.unitPrice * p.quantity, 0)
              .toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
