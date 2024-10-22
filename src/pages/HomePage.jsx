import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [productsIsLoading, setProductsIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const selector = useSelector((state) => state.user);

  const productsList = products.map((product) => (
    <ProductCard
      key={product.productName}
      image={product.image}
      productName={product.productName}
      price={product.price}
      stock={product.stock}
      id={product.id}
    />
  ));

  const fetchProducts = async () => {
    setProductsIsLoading(true);
    try {
      const res = await axiosInstance.get("/products");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setProductsIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        {productsIsLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{selector.email}</h2>
            <div className="grid grid-cols-2 gap-4">{productsList}</div>
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
