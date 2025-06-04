import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  quantity: number;
  expDate: string;
  imgUrl?: string;
};

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
};

export const ProductTable: React.FC<Props> = ({ products, onDelete }) => {
  const router = useRouter();
  const [sortAsc, setSortAsc] = useState(true);
  const [filterExpiring, setFilterExpiring] = useState(false);

  const filterDays = 7;

  const sortedProducts = useMemo(() => {
    const today = new Date(); // move inside to avoid stale capture

    let filtered = products;
    if (filterExpiring) {
      filtered = filtered.filter((p) => {
        const exp = new Date(p.expDate);
        const diffDays = (exp.getTime() - today.getTime()) / (1000 * 3600 * 24);
        return diffDays >= 0 && diffDays <= filterDays;
      });
    }
    return filtered.sort((a, b) => {
      const aDate = new Date(a.expDate).getTime();
      const bDate = new Date(b.expDate).getTime();
      return sortAsc ? aDate - bDate : bDate - aDate;
    });
  }, [products, sortAsc, filterExpiring]);

  const confirmAndDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      onDelete(id);
    }
  };

  const isExpiringSoon = (dateStr: string) => {
    const today = new Date();
    const exp = new Date(dateStr);
    const diffDays = (exp.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= filterDays;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onClick={() => setSortAsc(!sortAsc)}
          aria-label="Toggle sort order"
        >
          Sort Expiry: {sortAsc ? "Asc" : "Desc"}
        </button>
        <label className="flex items-center gap-2 select-none">
          <input
            type="checkbox"
            checked={filterExpiring}
            onChange={() => setFilterExpiring(!filterExpiring)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Show Expiring Within 7 Days
        </label>
      </div>

      <table className="w-full border-collapse table-auto text-left">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="p-3 border border-gray-300 rounded-tl-md">Image</th>
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Quantity</th>
            <th className="p-3 border border-gray-300">Expiry Date</th>
            <th className="p-3 border border-gray-300 rounded-tr-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-6 text-gray-500 italic">
                No products found.
              </td>
            </tr>
          ) : (
            sortedProducts.map(({ id, name, quantity, expDate, imgUrl }, idx) => {
              const isNearExpiry = isExpiringSoon(expDate);
              return (
                <tr
                  key={id}
                  className={`border border-gray-300 ${
                    isNearExpiry ? "bg-yellow-100" : idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="border border-gray-300 p-2">
                    <div className="relative w-16 h-16">
                      <Image
                        src={imgUrl || "/placeholder.png"}
                        alt={name}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2 font-medium text-gray-900">
                    {name}
                  </td>
                  <td className="border border-gray-300 p-2">{quantity}</td>
                  <td className="border border-gray-300 p-2">{expDate}</td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      onClick={() => router.push(`/edit/${id}`)}
                      aria-label={`Edit ${name}`}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      onClick={() => confirmAndDelete(id)}
                      aria-label={`Delete ${name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
