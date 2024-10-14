import { ProductForm } from "@/components/forms/ProductForm";
import { AdminLayout } from "@/components/layout/AdminLayout";

const EditProductPage = () => {
  const handleEditProduct = (values) => {
    console.log(values);
  };

  return (
    <AdminLayout title="Edit Products" description="Editing Products">
      <ProductForm onSubmit={handleEditProduct} cardTitle="Edit Product" />
    </AdminLayout>
  );
};

export default EditProductPage;
