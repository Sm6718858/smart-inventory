import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  quantity: number;
  expDate: string;
  imgUrl?: string;
  imgFile?: FileList;
};

type Props = {
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
  submitLabel: string;
};

export const ProductForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  submitLabel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues,
  });

  const [imagePreview, setImagePreview] = useState<string>(
    defaultValues?.imgUrl || ""
  );

  // Watch file input for preview
  const imgFile = watch("imgFile");

  useEffect(() => {
    if (imgFile && imgFile.length > 0) {
      const file = imgFile[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue("imgUrl", url);
    }
  }, [imgFile, setValue]);

  return (
    <form
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Product Name"
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } transition`}
          {...register("name", { required: "Product name is required" })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="quantity"
        >
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={0}
          placeholder="Quantity"
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.quantity
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } transition`}
          {...register("quantity", {
            required: "Quantity is required",
            min: { value: 0, message: "Quantity cannot be negative" },
          })}
        />
        {errors.quantity && (
          <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="expDate"
        >
          Expiry Date
        </label>
        <input
          id="expDate"
          type="date"
          className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.expDate
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } transition`}
          {...register("expDate", { required: "Expiry date is required" })}
        />
        {errors.expDate && (
          <p className="text-red-600 text-sm mt-1">{errors.expDate.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="imgFile"
        >
          Product Image (Upload)
        </label>
        <input
          id="imgFile"
          type="file"
          accept="image/*"
          {...register("imgFile")}
          className="w-full cursor-pointer text-gray-600"
        />
      </div>

      {imagePreview && (
        <div className="mb-6 text-center">
          <p className="font-semibold text-gray-700 mb-2">Image Preview:</p>
          <img
            src={imagePreview}
            alt="Preview"
            className="mx-auto w-36 h-36 object-contain rounded-md border"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
};
