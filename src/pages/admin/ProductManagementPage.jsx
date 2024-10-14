import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";

const ProductManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [maxPage, setMaxPage] = useState(1);
  const [productName, setProductName] = useState("");

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);

    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);

    setSearchParams(searchParams);
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 3,
          _page: searchParams.get("page"),
          productName: searchParams.get("search"),
        },
      });
      setMaxPage(response?.data?.pages);
      setHasNextPage(Boolean(response?.data?.next));
      setProducts(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = async () => {
    if (productName) {
      searchParams.set("search", productName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;

    if (!searchParams.get("page")) {
      searchParams.set("page", Number(searchParams.get("page")) + 1);

      setSearchParams(searchParams);
    }
    if (Number(searchParams.get("page")) < 1) {
      searchParams.set("page", Number(searchParams.get("page")) + 1);
      setSearchParams(searchParams);
    }

    if (currentPage > maxPage) {
      searchParams.set("page", maxPage);
      setSearchParams(searchParams);
    }
  }, [maxPage, searchParams, setSearchParams]);

  return (
    <div>
      <AdminLayout
        title="Product Management"
        description="Managing our products"
        rightSection={
          <Link to="/admin/products/create">
            <Button>
              <IoMdAdd className="h-6 w-6 mr-2" />
              Add Product
            </Button>
          </Link>
        }
      >
        <div className="mb-8">
          <Label>Search Product Name</Label>
          <div className="flex gap-4">
            <Input
              value={productName}
              placeholder="search product name"
              onChange={(e) => setProductName(e.target.value)}
              className="max-w-[400px]"
            />
            <Button onClick={searchProduct}>Search</Button>
          </div>
        </div>
        <Table className="p-4 border rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Ellipsis className="h-6 w-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Pagination className={"mt-8"}>
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={searchParams.get("page") === "1"}
                variant="ghost"
                onClick={handlePreviousPage}
              >
                <ChevronLeft className="h-6 w-6 mr-2" /> Previous
              </Button>
            </PaginationItem>

            <PaginationItem className="mx-8 font-semibold">
              Page {searchParams.get("page")}
            </PaginationItem>

            <PaginationItem>
              <Button
                disabled={!hasNextPage}
                onClick={handleNextPage}
                variant="ghost"
              >
                Next <ChevronRight className="h-6 w-6 ml-2" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>
    </div>
  );
};

export default ProductManagementPage;
