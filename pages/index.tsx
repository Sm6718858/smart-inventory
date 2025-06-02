import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductTable } from "../components/ProductTable";
import { fetchProducts, deleteProduct } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  quantity: number;
  expDate: string;
  imgUrl?: string;
};

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-8 lg:p-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10 gap-4 sm:gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600
                         text-center md:text-left leading-tight">
            Inventory Dashboard
          </h1>
          <Link
            href="/add"
            className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-teal-500 
                       hover:from-blue-600 hover:to-teal-600 text-white font-semibold 
                       px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl 
                       shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                       text-sm sm:text-base text-center flex items-center justify-center
                       active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Product
          </Link>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <svg
              className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading spinner"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-inner border border-gray-100">
            <ProductTable products={products} onDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;