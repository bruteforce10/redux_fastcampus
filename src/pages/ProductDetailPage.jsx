import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoIosAdd, IoIosRemove, IoMdHeart } from "react-icons/io";

const product = {
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkiGMULsAHa9dID44BozhTQWOlhmMY7a11nQ&s",
  productName: "Product 1",
  price: 1000,
  stock: 0,
  id: 1,
};

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
      <div className="grid grid-cols-2 gap-8 ">
        <img src={product.image} alt={product.productName} className="w-full" />
        <div className="flex flex-col justify-center">
          <h1 className="text-xl ">{product.productName}</h1>
          <h3 className="text-3xl font-bold">
            Rp {product.price.toLocaleString("id-ID")}
          </h3>
          <p className="text-sm text-muted-foreground mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            ipsam sint modi quia, non eos fuga accusamus voluptatum ad minima
            nisi similique necessitatibus pariatur.
          </p>

          <div className="flex items-center gap-8 mt-6">
            <Button disabled={quantity <= 0} size="icon" variant="ghost">
              <IoIosRemove className="h-6 w-6" />
            </Button>
            <p className="text-lg font-bold">{quantity}</p>
            <Button size="icon" variant="ghost">
              <IoIosAdd className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center mt-8 gap-4">
            <Button className="w-full" size="lg">
              Add to cart
            </Button>
            <Button size="icon" variant="ghost">
              <IoMdHeart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
