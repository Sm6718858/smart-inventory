import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchProductById, updateProduct } from "../../utils/api";
import { ProductForm } from "../../components/ProductForm";
import toast, { Toaster } from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  quantity: number;
  expDate: string;
  imgUrl?: string;
};

interface ProductFormData {
  name: string;
  quantity: number | string;
  expDate: string;
  imgUrl?: string;
}

const EditProduct: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await fetchProductById(id as string);
        setProduct(res.data);
      } catch (_error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const payload = {
        name: data.name,
        quantity: Number(data.quantity),
        expDate: data.expDate,
        imgUrl: data.imgUrl || "",
      };

      await updateProduct(id as string, payload);
      toast.success("Product updated successfully");
      router.push("/");
    } catch (_error) {
      toast.error("Failed to update product");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading product data...</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg font-semibold">Product not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <Toaster />
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Product
        </h1>
        <ProductForm
          defaultValues={product}
          submitLabel="Update Product"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default EditProduct;
