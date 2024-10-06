import { useState } from "react";
import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

// eslint-disable-next-line react/prop-types
export default function ProductCard({ image, productName, price, stock }) {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <div className="aspect-square  w-full overflow-hidden ">
        <img src={image} alt={productName} className="w-full" />
      </div>
      <div>
        <h2 className="text-md">{productName}</h2>
        <p className="font-semibold text-xl">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <p className="text-muted-foreground text-sm">In stock: {stock}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center ">
          <Button
            disabled={quantity <= 0}
            size="icon"
            variant="ghost"
            onClick={decrementQuantity}
          >
            <IoIosRemove className="h-6 w-6" />
          </Button>
          <p className="text-lg font-bold">{quantity}</p>
          <Button
            disabled={quantity >= stock}
            size="icon"
            variant="ghost"
            onClick={incrementQuantity}
          >
            <IoIosAdd className="h-6 w-6" />
          </Button>
        </div>
        <Button className="w-full" disabled={!stock}>
          {stock > 0 ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  );
}
