import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const productsList = products.map((product) => (
    <ProductCard
      key={product.productName}
      image={product.image}
      productName={product.productName}
      price={product.price}
      stock={product.stock}
    />
  ));

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 gap-4">{productsList}</div>

        <button onClick={fetchProducts}>Fetch Products</button>
      </main>
    </>
  );
};

export default HomePage;
