import ProductCard from "@/components/ProductCard";

const productRaw = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkiGMULsAHa9dID44BozhTQWOlhmMY7a11nQ&s",
    productName: "Product 1",
    price: 1000,
    stock: 0,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkiGMULsAHa9dID44BozhTQWOlhmMY7a11nQ&s",
    productName: "Product 2",
    price: 3000,
    stock: 10,
  },
];

const HomePage = () => {
  const products = productRaw.map((product) => (
    <ProductCard
      key={product.productName}
      image={product.image}
      productName={product.productName}
      price={product.price}
      stock={product.stock}
    />
  ));

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 gap-4">{products}</div>
      </main>
    </>
  );
};

export default HomePage;
