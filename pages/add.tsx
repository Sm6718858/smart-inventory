import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ProductForm } from "../components/ProductForm";
import { addProduct } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";

const Add: NextPage = () => {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        quantity: Number(data.quantity),
        expDate: data.expDate,
        imgUrl: data.imgUrl || "",
      };

      await addProduct(payload);
      toast.success("Product added successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center drop-shadow-sm">
          Add New Product
        </h1>

        <ProductForm submitLabel="Add Product" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Add;