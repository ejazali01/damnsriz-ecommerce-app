import React, { useState } from "react";
import { productCategoryValidationSchema } from "../../../utils/validationSchema";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddCategoriesButton from "./AddCategoriesButton";
import {
  getSingleCategory,
  updateCategory,
} from "../../../api/product/category";
import { findId } from "../../../helper/id";
import {
  clearSingleCategoryState,
  setSingleCategory,
} from "../../../redux/reducers/admin/allCategoriesSlice";
import Loading from "../../../Loading";

const UpdateCategoryForm = () => {
  const params = useParams();
  const id = findId(params?.id);
  const currentUser = useSelector((state) => state?.users);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector(
    (state) => state?.categories?.singleCategory?.data
  );

  const [thumbnailPreview, setThumbnailPreview] = useState();

  // fetch category data
  const { data, isError, isSuccess, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => await getSingleCategory(id),
  });

  if (isSuccess) {
    console.log(data);
    dispatch(setSingleCategory(data));
  }

  const initialValues = {
    parentCatId: category ? category?.parentCatId : "",
    title: category ? category?.title : "",
    description: category ? category?.description : "",
    thumbnail: null,
  };

  // update category
  const updateMutation = useMutation({
    mutationKey: ["updateCategory", id],
    mutationFn: async (formData) => {
      return updateCategory(formData, id);
    },
    onSuccess: async () => {
      toast.success("Category updated");
      dispatch(clearSingleCategoryState());
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      navigate("/admin-dashboard/all-categories");
    },
    onError: async () => {
      toast.error(error?.message || "Error while updating category");
    },
  });

  // handle image and setting to image inside state variable
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setThumbnailPreview(URL.createObjectURL(file));
    formik.setFieldValue("thumbnail", file);
  };

  // form submission
  const handleSubmit = async (values, { setValues }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("parentCatId", values.parentCatId);

    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail);
    }

    if (currentUser?.isAdmin) {
      await updateMutation.mutateAsync(formData);
    }

    setValues(initialValues);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productCategoryValidationSchema,
    onSubmit: handleSubmit,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error.message || "category not found");
  }

  return (
    <>
      <div className="w-full  min-h-screen bg-gray-100  overflow-x-auto textarea">
        <div className="w-full  min-h-screen bg-white">
          <div className="flex justify-end p-4  lg:pt-10 lg:px-10">
            <AddCategoriesButton />
          </div>

          {/* <!-- Main modal --> */}

          <div className={` w-full  flex justify-center items-center  `}>
            <div className=" p-4 w-full lg:max-w-xl max-w-md  max-h-full">
              {/* <!-- Modal content --> */}
              {category && category?.aparentCatId ? (
                <div className="border-2  shadow-sm bg-white rounded-lg ">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 className="text-lg font-semibold text-gray-900 ">
                      Update SubCategory
                    </h3>
                    <Link
                      // onClick={() => dispatch(clearSingleCategoryState())}
                      to="/admin-dashboard/all-categories"
                    >
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        data-modal-toggle="crud-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </Link>
                  </div>

                  {/* <!-- Modal body --> */}
                  <form onSubmit={formik.handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-3 mb-4 grid-cols-2">
                      <div className="col-span-2 flex  items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  w-full">
                        <label
                          htmlFor="name"
                          className="bg-gray-300 border-r border-gray-300 text-gray-900 text-sm font-medium text-center  block w-[20%] p-1 "
                        >
                          ParentId
                        </label>
                        <input
                          type="text"
                          id="parentCatId"
                          name="parentCatId"
                          disabled
                          className={` bg-gray-200 p-1 w-full font-normal `}
                          placeholder="parentCatId"
                          required={true}
                          onChange={formik.handleChange}
                          value={formik.values.parentCatId}
                        />
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Category Name
                          <span className="text-xl text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-1 "
                          placeholder="Type Category name"
                          required={true}
                          onChange={formik.handleChange}
                          value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title && (
                          <p className="text-xs text-red-600 mt-1">
                            {formik.touched.title && formik.errors.title}
                          </p>
                        )}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows="4"
                          name="description"
                          className="block p-1 w-full max-h-28 min-h-16 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto textarea"
                          placeholder="Write product description here"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.description}
                        ></textarea>

                        {formik.touched.description &&
                          formik.errors.description && (
                            <p className="text-xs text-red-600 mt-1">
                              {formik.touched.description &&
                                formik.errors.description}
                            </p>
                          )}
                      </div>

                      <div className=" col-span-1 overflow-hidden">
                        <label
                          htmlFor="category"
                          className=" mb-2 text-sm font-medium text-gray-900 "
                        >
                          Category Image
                        </label>
                        <input
                          type="file"
                          name="thumbnail"
                          id="thumbnail"
                          onBlur={formik.handleBlur}
                          onChange={handleImageChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500  w-full  p-1"
                        />

                        {formik.touched.thumbnail &&
                          formik.errors.thumbnail && (
                            <p className="text-xs text-red-600 mt-1">
                              {formik.touched.thumbnail &&
                                formik.errors.thumbnail}
                            </p>
                          )}
                      </div>

                      <div className="col-span-1 w-1/2 sm:w-3/4 lg:w-2/6  xl:w-2/5 ml-6  flex items-center justify-end  ">
                        {thumbnailPreview && (
                          <>
                            <div className="relative w-3/4 sm:w-2/5 md:w-1/2  lg:w-[70%] xl:w-[65%] lg:pt-0 ">
                              <img
                                onClick={() => handleImagePreview("thumbnail")}
                                className="w-full sm:w-full lg:w-full object-fill cursor-zoom-in  rounded-lg "
                                src={thumbnailPreview || ""}
                                alt={"thumbnailPreview " || thumbnailPreview}
                              />
                              <IoIosClose
                                onClick={() => handleDeleteImage("thumbnail")}
                                className="absolute -top-2 overflow-visible hover:text-red-500  -right-2 text-xl text-gray-600 bg-gray-200 rounded-full hover:bg-gray-100"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={updateMutation?.isLoading}
                      className={`${
                        updateMutation?.isLoading
                          ? "bg-gray-200 hover:bg-gray-100 text-gray-700"
                          : "bg-purple-500  hover:bg-purple-700"
                      } text-white inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center`}
                    >
                      {updateMutation?.isLoading && (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-purple-700"
                          fill="none"
                          viewBox="0 0 24 24"
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8 12a8 8 0 018-8V0C5.373"
                          ></path>
                        </svg>
                      )}
                      Update
                    </button>
                  </form>
                </div>
              ) : (
                <div className="border-2  shadow-sm bg-white rounded-lg z-50 ">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 className="text-lg font-semibold text-gray-900 ">
                      Update Category
                    </h3>
                    <Link
                      // onClick={() => dispatch(clearSingleCategoryState())}
                      to="/admin-dashboard/all-categories"
                    >
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        data-modal-toggle="crud-modal"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </Link>
                  </div>

                  {/* <!-- Modal body --> */}
                  <form onSubmit={formik.handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-3 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Category Name
                          <span className="text-xl text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  block w-full p-1 "
                          placeholder="Type Category name"
                          required={true}
                          onChange={formik.handleChange}
                          value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title && (
                          <p className="text-xs text-red-600 mt-1">
                            {formik.touched.title && formik.errors.title}
                          </p>
                        )}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          rows="4"
                          name="description"
                          className="block p-1 w-full max-h-28 min-h-16 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto textarea"
                          placeholder="Write product description here"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.description}
                        ></textarea>

                        {formik.touched.description &&
                          formik.errors.description && (
                            <p className="text-xs text-red-600 mt-1">
                              {formik.touched.description &&
                                formik.errors.description}
                            </p>
                          )}
                      </div>

                      <div className=" col-span-1 overflow-hidden">
                        <label
                          htmlFor="category"
                          className=" mb-2 text-sm font-medium text-gray-900 "
                        >
                          Category Image
                        </label>
                        <input
                          type="file"
                          name="thumbnail"
                          id="thumbnail"
                          onBlur={formik.handleBlur}
                          onChange={handleImageChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500  w-full  p-1"
                        />

                        {formik.touched.thumbnail &&
                          formik.errors.thumbnail && (
                            <p className="text-xs text-red-600 mt-1">
                              {formik.touched.thumbnail &&
                                formik.errors.thumbnail}
                            </p>
                          )}
                      </div>

                      <div className="col-span-1 w-1/2 sm:w-3/4 lg:w-2/6  xl:w-2/5 ml-6  flex items-center justify-end  ">
                        {thumbnailPreview && (
                          <>
                            <div className="relative w-3/4 sm:w-2/5 md:w-1/2  lg:w-[70%] xl:w-[65%] lg:pt-0 ">
                              <img
                                onClick={() => handleImagePreview("thumbnail")}
                                className="w-full sm:w-full lg:w-full object-fill cursor-zoom-in  rounded-lg "
                                src={thumbnailPreview || ""}
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
                    </div>
                    <button
                      type="submit"
                      disabled={updateMutation?.isLoading}
                      className="text-white inline-flex items-center bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                    >
                      {updateMutation.isLoading && (
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-purple-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8 12a8 8 0 018-8V0C5.373"
                            stroke="currentColor"
                            stroke-width="4"
                          ></path>
                        </svg>
                      )}
                      Update
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategoryForm;
