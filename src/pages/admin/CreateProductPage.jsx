import { ProductForm } from "@/components/forms/ProductForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (values) => {
    try {
      await axiosInstance.post("/products", values);
      alert("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title="Create Product Page" description="Create Product Page">
      <ProductForm onSubmit={handleCreateProduct} cardTitle="Create Product" />
    </AdminLayout>
  );
};

export default CreateProductPage;
