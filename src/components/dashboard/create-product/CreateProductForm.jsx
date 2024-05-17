import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { createProduct } from "../../../api/product/products";
import { IoIosClose } from "react-icons/io";
import ImagePreview from "./ImagePreview";
import { useFormik } from "formik";
import { productValidationSchema } from "../../../utils/validationSchema";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  description: "",
  orignalPrice: 0,
  discountPercentage: 0,
  priceAfterDiscount: 0,
  brand: "",
  category: "",
  stock: 0,
  color: "",
  thumbnail: null,
  images: [],
};

const CreateProductForm = () => {
  // check user is admin or not
  const currentUser = useSelector((state) => state?.users);
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // create api usinf react  query
  const mutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
    onSuccess: async () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate('/admin-dashboard/all-products')
      // setProductData(initialValues);
    },
    onError: async () => {
      toast.error(error?.message || "Error creating product");
    },
  });

  const handleImageChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setImages(filesArray.map((file) => URL.createObjectURL(file)));
    formik.setFieldValue("images", filesArray);
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(URL.createObjectURL(file));
    formik.setFieldValue("thumbnail", file);
  };

  // hangle delete preview  images
  const handleDeleteImage = (index) => {
    if (index === "thumbnail") {
      setThumbnail(null);
    } else {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages((prev) => [...newImages]);
    }
  };

  // previwer
  const handleImagePreview = (prev) => {
    prev ? setIsPreview([prev, true]) : setIsPreview(false);
  };

  const calculatePriceAfterDiscount = (orignalPrice, discountPercentage) => {
    const discountDecimal = discountPercentage / 100;
    const priceAfterDiscount = orignalPrice - orignalPrice * discountDecimal;
    return Math.floor(priceAfterDiscount);
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Append all form fields to FormData
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("orignalPrice", values.orignalPrice);
      formData.append("discountPercentage", values.discountPercentage);
      formData.append("priceAfterDiscount", values.priceAfterDiscount);
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      formData.append("stock", values.stock);
      formData.append("color", values.color);
      formData.append("thumbnail", values.thumbnail);

      values?.images?.forEach((image) => {
        formData.append(`images`, image);
      });

      if (currentUser.isAdmin) {
        await mutation.mutateAsync(formData);
      }
    } catch (error) {
      toast.error(error || "Error while creating product");
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productValidationSchema,
    onSubmit: handleFormSubmit,
  });
  // Update priceAfterDiscount in Formik when orignalPrice or discountPercentage changes
  React.useEffect(() => {
    const priceAfterDiscount = calculatePriceAfterDiscount(
      formik.values.orignalPrice,
      formik.values.discountPercentage
    );
    formik.setFieldValue("priceAfterDiscount", priceAfterDiscount);
  }, [formik.values.orignalPrice, formik.values.discountPercentage]);

  const productCategories = [
    "Kurtas & Suits",
    "Kurtis, Tunics & Tops",
    "Sarees",
  ];
  const productBrands = ["ASPORA", "Sangria", "Indo Era"];

  return (
    <>
      <div className=" w-full flex justify-center items-center overflow-y-auto textarea  ">
        {isPreview[1] && (
          <ImagePreview
            setIsPreview={setIsPreview}
            images={images}
            thumbnail={thumbnail}
            isPreview={isPreview}
          />
        )}
        <div className="relative w-full lg:w-3/5 md:m-6 m-1 lg:m-6 bg-white  rounded-lg">
          {mutation.isLoading && (
            <div className="absolute z-10 flex justify-center items-center bg-gray-200 opacity-85 w-full h-full">
              <div className="">
                <div className="loader m-auto"></div>
                <p className="text-white bg-indigo-600 px-2">
                  product creating please wait...
                </p>
              </div>
            </div>
          )}

          <div className=" text-black w-full  p-2  md:p-4 sm:py-4    ">
            <div className="">
              <h2 className="text-2xl  font-bold text-center">
                Add New Product
              </h2>
            </div>
            <div className="sm:p-4 lg:p-6   ">
              {/* form start */}
              <form onSubmit={formik.handleSubmit} className="">
                <div className=" flex justify-between items-center flex-wrap ">
                  {/* Product Name */}
                  <div className="py-2 w-full lg:w-1/2">
                    <label
                      htmlFor="title"
                      className={` block text-xs font-semibold  text-gray-900`}
                    >
                      Product Name
                      <span className="text-xl text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Enter Product Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      className={` ${
                        formik.errors?.title && formik.touched.title
                          ? "border border-red-600"
                          : ""
                      } block p-1 ps-3 text-sm rounded-lg w-full  border  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                          `}
                    />

                    {formik.touched.title && formik.errors?.title && (
                      <p className="text-red-600 text-xs mt-1">
                        {formik.errors?.title && formik.touched.title}
                      </p>
                    )}
                  </div>

                  {/* Brand */}
                  <div className="relative w-full lg:w-2/6">
                    <label
                      htmlFor="brand"
                      className={` block text-xs font-semibold text-gray-900`}
                    >
                      Product Brand
                      <span className="text-xl text-red-600">*</span>
                    </label>
                    <select
                      as="select"
                      id="brand"
                      name="brand"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.brand}
                      className={`${
                        formik.errors?.brand && formik.touched.brand
                          ? "border border-red-600"
                          : ""
                      } w-full appearance-auto row-start-1 inline-flex items-center text-gray-700 bg-white border border-gray-300 hover:border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5`}
                    >
                      <option className="" value="" disabled>
                        Choose Product Brand
                      </option>
                      {productBrands?.map((brand) => (
                        <option className="bg-white " key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {formik.touched.brand && formik.errors?.brand && (
                      <p className="text-red-600 text-xs mt-1">
                        {formik.errors?.brand}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div className="mb-1">
                  <label
                    htmlFor="description"
                    className={` block text-xs font-semibold text-gray-900`}
                  >
                    Product Description
                    <span className="text-xl text-red-600">*</span>
                  </label>
                  <textarea
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder="Product Description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className={`${
                      formik.errors?.description && formik.touched.description
                        ? "border border-red-600"
                        : ""
                    } textarea appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm min-h-10 max-h-40 overflow-y-scroll`} // Adjusted class for textarea
                  />
                  {formik.touched.description && formik.errors?.description && (
                    <p className="text-red-600 text-xs mt-1">
                      {formik.errors?.description}
                    </p>
                  )}
                </div>

                <div className="w-full flex justify-between flex-wrap">
                  {/* price */}
                  <div className=" mb-1">
                    <label
                      htmlFor="orignalPrice"
                      className=" block text-xs font-semibold text-gray-900"
                    >
                      Orignal Price
                      <span className="text-xl text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="orignalPrice"
                      name="orignalPrice"
                      placeholder="Product Price"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.orignalPrice}
                      className={` ${
                        formik.errors?.orignalPrice &&
                        formik.touched.orignalPrice
                          ? "border border-red-600"
                          : ""
                      } block p-1 ps-3 text-sm appearance-none rounded relative  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  `}
                    />
                    {formik.touched.orignalPrice &&
                      formik.errors?.orignalPrice && (
                        <p className="text-red-600 text-xs mt-1 w-10/12 xl:w-full">
                          {formik.touched.orignalPrice &&
                            formik.errors?.orignalPrice}
                        </p>
                      )}
                  </div>

                  {/*discount price */}
                  <div className=" mb-1">
                    <label
                      htmlFor="discountPrice"
                      className=" block text-xs font-semibold text-gray-900"
                    >
                      % Discount Percentage
                      <span className="text-xl text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="discountPercentage"
                      name="discountPercentage"
                      placeholder="Discount Percentage %"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.discountPercentage}
                      className={`${
                        formik.errors?.discountPercentage &&
                        formik.touched.discountPercentage
                          ? "border border-red-600"
                          : ""
                      } appearance-none rounded relative block p-1 ps-3 text-sm  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 `}
                    />
                    {formik.touched.discountPercentage &&
                      formik.errors?.discountPercentage && (
                        <p className="text-red-600 text-xs mt-1 w-10/12 xl:w-full">
                          {formik.errors?.discountPercentage}
                        </p>
                      )}
                  </div>

                  {/* price after discount */}
                  <div className="mb-1 ">
                    <label
                      htmlFor="stock"
                      className=" block text-xs font-semibold text-gray-900"
                    >
                      Price After Discount
                      <span className="text-xl text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="priceAfterDiscount"
                      name="priceAfterDiscount"
                      placeholder="Price After Discount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.priceAfterDiscount}
                      disabled
                      className=" appearance-none rounded relative w-full font-semibold block p-1 ps-3 text-sm bg-gray-300  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  "
                    />
                  </div>
                </div>

                <div className="flex justify-between flex-wrap-reverse">
                  {/* Product category */}
                  <div className="relative w-full lg:w-1/2  mb-1">
                    <label
                      htmlFor="category"
                      className=" block text-xs font-semibold text-gray-900"
                    >
                      Product Category
                      <span className="text-xl text-red-600">*</span>
                    </label>

                    <select
                      as="select"
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                      className={`${
                        formik.errors?.category && formik.touched.category
                          ? "border border-red-600"
                          : ""
                      } w-full appearance-auto row-start-1 inline-flex items-center text-gray-700 bg-white border border-gray-300 hover:border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 `}
                    >
                      <option className="p-2" value="" disabled>
                        Choose Product Category
                      </option>
                      {productCategories?.map((category) => (
                        <option
                          className="p-2 text-gray-900 hover:bg-purple-400"
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>

                    {formik.touched.category && formik.errors?.category && (
                      <p className="text-red-600 text-xs mt-1">
                        {formik.errors?.category}
                      </p>
                    )}
                  </div>

                  {/* Stocks */}
                  <div className="mb-1 ">
                    <label
                      htmlFor="stock"
                      className=" block text-xs font-semibold text-gray-900"
                    >
                      Stock <span className="text-xl text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      placeholder="Stock"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.stock}
                      className={`${
                        formik.errors?.stock && formik.touched.stock
                          ? "border border-red-600"
                          : ""
                      } appearance-none rounded relative block p-1 ps-3 text-sm  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  `}
                    />
                    {formik.touched.stock && formik.errors?.stock && (
                      <p className="text-red-600 text-xs mt-1">
                        {formik.errors?.stock}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex gap-2 lg:gap-0 flex-wrap items-center md:py-1 lg:py-6">
                  {/* Product Color */}
                  <div className="w-full lg:w-1/2 mb-1 pt-1 md:pt-0 lg:pt-4">
                    <label
                      htmlFor="quantity"
                      className=" block text-xs font-semibold text-gray-900"
                    >
                      Product Color
                      <span className="text-xl text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.color}
                      placeholder="Product Color"
                      className={`${
                        formik.errors?.color && formik.touched.color
                          ? "border border-red-600"
                          : ""
                      } appearance-none rounded relative w-full block p-1 ps-3 text-sm  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  `}
                    />
                    {formik.touched.color && formik.errors?.color && (
                      <p className="text-red-600 text-xs mt-1">
                        {formik.errors?.color}
                      </p>
                    )}
                  </div>

                  {/* product Thumbnail */}
                  <div className="w-full lg:w-1/2 flex flex-wrap gap-3 sm:gap-1 sm:justify-between lg:justify-around items-center lg:flex-wrap  xl:pl-8 mb-1">
                    <div className="flex items-center  ">
                      <label
                        htmlFor="dropzone-thumbnail"
                        className={`${
                          formik.errors?.thumbnail && formik.touched.thumbnail
                            ? "border-2 border-red-600 border-dashed"
                            : "border-2 border-purple-400 border-dashed"
                        } flex flex-col  items-center justify-center p-4  rounded-3xl cursor-pointer bg-gray-50  hover:bg-gray-100  `}
                      >
                        <div className="flex flex-col items-center justify-center ">
                          <svg
                            className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>

                          <div className="flex gap-1">
                            <span className="hidden xl:block font-semibold text-xs text-gray-500 hover:text-gray-900">
                              Product
                            </span>
                            <span className="font-semibold text-xs text-gray-500 hover:text-gray-900">
                              Thumbnail
                            </span>
                          </div>
                        </div>
                        <input
                          type="file"
                          id="dropzone-thumbnail"
                          name="thumbnail"
                          placeholder="Product thumbnail"
                          className="hidden"
                          onBlur={formik.handleBlur}
                          onChange={handleThumbnailChange}
                        />
                      </label>
                    </div>

                    {/* preview thumbnail image */}

                    <div className=" w-[59%] sm:w-3/4 lg:w-2/6  xl:w-2/5 ml-6  flex flex-row items-center lg:justify-end xl:justify-center ">
                      {thumbnail && (
                        <>
                          <div className="relative w-[31%]  sm:w-[15%] lg:w-[70%] xl:w-[65%] lg:pt-0 ">
                            <img
                              onClick={() => handleImagePreview("thumbnail")}
                              className="w-full sm:w-full lg:w-full object-fill cursor-zoom-in  rounded-lg "
                              src={thumbnail}
                              alt="laughter women "
                            />
                            <IoIosClose
                              onClick={() => handleDeleteImage("thumbnail")}
                              className="absolute -top-2 overflow-visible hover:text-red-500  -right-2 text-xl text-gray-600 bg-gray-200 rounded-full hover:bg-gray-100"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {formik.touched.thumbnail && formik.errors?.thumbnail ? (
                      <p className="text-red-600 text-xs mt-1 w-full  xl:pl-4 ">
                        {formik.errors?.thumbnail}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Product Images */}
                <div className="w-full flex flex-wrap md:flex-nowrap gap-8   lg:mt-0 lg:gap-6 items-center mb-1">
                  <div className="min-w-20 lg:w-3/12  flex items-center ">
                    <label
                      htmlFor="dropzone-images"
                      className={`${
                        formik.errors?.images && formik.touched.images
                          ? "border-2 border-red-600 border-dashed"
                          : "border-2 border-purple-400 border-dashed"
                      } flex flex-col  items-center justify-center p-4 border-2 border-purple-400 border-dashed rounded-3xl cursor-pointer bg-gray-50  hover:bg-gray-100 `}
                    >
                      <div className="flex flex-col items-center justify-center ">
                        <svg
                          className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>

                        <div className="flex gap-1">
                          <span className="hidden xl:block font-semibold text-xs text-gray-500 hover:text-gray-900">
                            Product
                          </span>
                          <span className="font-semibold text-xs p-1 xl:p-0 text-gray-500 hover:text-gray-900">
                            Images...
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        multiple
                        id="dropzone-images"
                        name="images"
                        placeholder="Product images"
                        className="hidden"
                        onBlur={formik.handleBlur}
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {/* preview product images */}

                  {images && (
                    <div
                      className={`w-[59%] sm:w-3/4 lg:w-full  flex flex-row items-center gap-2 md:gap-4 py-4 textarea overflow-x-auto`}
                    >
                      {images &&
                        images?.map((image, index) => (
                          <div
                            key={index}
                            className="relative min-w-[31%] max-w-[31%] sm:min-w-[15%] sm:max-w-[15%] lg:w-[20%]  "
                          >
                            <img
                              onClick={() => handleImagePreview(index + 1)}
                              className="w-full h-full sm:w-full lg:w-full 2xl:w-full  object-fill cursor-zoom-in  rounded-lg "
                              src={image}
                              alt={`Product Image ${index + 1}`}
                            />
                            <IoIosClose
                              key={index}
                              onClick={() => handleDeleteImage(index)}
                              className="absolute -top-2 overflow-visible  -right-2 text-xl text-gray-600 bg-gray-200 hover:text-red-500 rounded-full hover:bg-gray-100"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {formik.touched.images && formik.errors?.images ? (
                  <p className="text-red-600 text-xs mt-1 ">
                    {formik.errors?.images}
                  </p>
                ) : null}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={` ${
                    mutation.isLoading
                      ? "bg-gray-300 hover:bg-gray-300 text-gray-500 flex justify-center items-center gap-1  "
                      : " text-white bg-purple-500   hover:bg-purple-700"
                  }
                  block p-2 mb-8 mt-8 text-sm font-medium w-full transition-colors duration-300 rounded-lg`}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Creating..." : "Create Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductForm;
