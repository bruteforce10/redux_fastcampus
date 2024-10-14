import { ProductForm } from "@/components/forms/ProductForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const [product, setProduct] = useState({
    image: "",
    productName: "",
    price: "",
    stock: 0,
    id: 0,
  });

  const params = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${params.productId}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleEditProduct = async (values) => {
    try {
      await axiosInstance.patch("/products/" + params.productId, values);
      alert("Product edited successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title={"Edit Product"} description="Editing Products">
      {product.id ? (
        <ProductForm
          onSubmit={handleEditProduct}
          cardTitle={"Editing" + " " + product.productName}
          defaultName={product.productName}
          defaultPrice={product.price}
          defaultStock={product.stock}
          defaultImage={product.image}
        />
      ) : null}
    </AdminLayout>
  );
};

export default EditProductPage;
