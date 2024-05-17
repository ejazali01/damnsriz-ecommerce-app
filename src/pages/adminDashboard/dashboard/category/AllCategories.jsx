import React, { useEffect, useRef, useState } from "react";
import { productCategoryValidationSchema } from "../../../../utils/validationSchema";
import {
  createProductCategory,
  deleteCategory,
  getAllProductCategories,
  updateCategory,
} from "../../../../api/product/category";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../../Loading";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import {
  removeCategory,
  setAllCategories,
} from "../../../../redux/reducers/admin/allCategoriesSlice";
import NoCategories from "../../../../components/dashboard/categories/NoCategories";
import AddCategoriesButton from "../../../../components/dashboard/categories/AddCategoriesButton";

const initialValues = {
  parentCatId: "",
  title: "",
  description: "",
  thumbnail: null, // Use null for file type initial value
};

const AllCategories = () => {
  const currentUser = useSelector((state) => state?.users);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(
    (state) => state?.categories?.categories?.data
  );

  const [open, setOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState();
  // for category open
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [openCategories, setOpenCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  const handleCategoryHover = (categoryId) => {
    if (categoryId) {
      setHoveredCategoryId(categoryId);
      const parentCategoryId = getParentCategoryId(categoryId, categories);
      if (parentCategoryId && !openCategories.includes(parentCategoryId)) {
        setOpenCategories([...openCategories, parentCategoryId]);
      }
    }
  };

  const getParentCategoryId = (childId, categories) => {
    let parentId = null;
    categories.forEach((category) => {
      if (
        category.children &&
        category.children.some((c) => c._id === childId)
      ) {
        parentId = category._id;
      } else if (category.children) {
        const foundParentId = getParentCategoryId(childId, category.children);
        if (foundParentId) {
          parentId = foundParentId;
        }
      }
    });
    return parentId;
  };

  // mutating the form data using react query
  const mutation = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: createProductCategory,
    onSuccess: async () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      navigate("/admin-dashboard/all-categories");
      // setProductData(initialValues);
    },
    onError: async () => {
      toast.error(error?.message || "Error creating product");
    },
  });

  // delete category
  const deleteMutation = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: async () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      // navigate("/admin-dashboard/all-categories");
      setCategoryId(null);
    },
    onError: async () => {
      toast.error(error?.message || "Error while deleting category");
    },
  });

  // handle image and setting to image inside state variable
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setThumbnailPreview(URL.createObjectURL(file));
    formik.setFieldValue("thumbnail", file);
  };

  // delete category on the basis of id
  const handleDeleteCategory = async (categoryId) => {
    try {
      setCategoryId(categoryId);
      // dispatch(removeCategory(categoryId));
      await deleteMutation.mutateAsync(categoryId);
    } catch (error) {
      toast.error(error.message);
      setCategoryId(null);
    }
  };

  // toggle category
  const toggleCategories = (id) => {
    formik.setFieldValue("parentCatId", id);
    setOpen({ id: id, ...!open });
    console.log("toggle");
  };

  //close form
  const modalClose = () => {
    setOpen(false);
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
      await mutation.mutateAsync(formData);
    }

    setValues({
      ...values,
      title: "",
      description: "",
      thumbnail: null,
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: productCategoryValidationSchema,
    onSubmit: handleSubmit,
  });

  // mutating the form data using react query
  const { data, isSuccess, isError, isLoading, error } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllProductCategories,
    staleTime: 10 * 60 * 60 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    // console.log(data);
    dispatch(setAllCategories(data));
  }

  if (isError) {
    toast.error(error.message);
  }

  const renderCategories = (categories) => {
    return (
      <ul className="">
        {categories.map((category) => {
          const hasChildren = category.children && category.children.length > 0;
          const isOpen = openCategories.includes(category._id) || false;
          const shouldDisplayChildren =
            (hoveredCategoryId === category._id && hasChildren) || isOpen;

          return (
            <li className="flex" key={category._id}>
              <div className="flex w-60 border border-gray-300 rounded-md">
                {/* create */}
                <button
                  onMouseEnter={() => handleCategoryHover(category._id)}
                  onMouseLeave={() => handleCategoryHover(null)}
                  onClick={() => toggleCategories(category._id)}
                  className="flex justify-between items-center w-full  gap-2 text-gray-500   focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:rounded-md font-medium  text-sm px-3 py-1.5"
                >
                  {category.title}
                  <svg
                    className="font-semibold"
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                {/* delete */}
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="relative flex justify-between items-center w-8 h-8 px-2  text-red-500  border-l border-gray-300  hover:bg-gray-100 focus:ring-4 focus:ring-inset focus:ring-gray-200  focus-within:ring-1 font-medium  text-sm  py-1.5"
                >
                  {deleteMutation.isLoading && categoryId === category._id ? (
                    <svg
                      className="animate-spin h-3 w-3  text-purple-700 absolute "
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
                  ) : (
                    <MdOutlineDeleteSweep />
                  )}
                </button>
                {/* update */}
                <Link to={`${category?.slug}-${category?._id}`}>
                  <button className="relative flex justify-between items-center w-8 h-8 px-2  text-indigo-500   border-l border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium  text-sm  py-1.5">
                    <LiaEditSolid />
                  </button>
                </Link>
              </div>
              {shouldDisplayChildren && (
                <ul className="ml-6 w-60 bg-gray-100  rounded-md  border shadow-md">
                  {renderCategories(category.children)}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="w-full  min-h-screen bg-gray-100  overflow-x-auto textarea">
        <div className="w-full  min-h-screen bg-white">
          <div className="flex justify-end p-4  lg:pt-10 lg:px-10">
            <AddCategoriesButton toggleCategories={toggleCategories} />
          </div>

          {/* <!-- Main modal --> */}

          <div className={` w-full  flex justify-center items-center  `}>
            {open && (
              <div
                className={`fixed z-50 bg-white bg-opacity-60 w-full m-auto  lg:top-16 top-10   flex transition-all ease-in-out transform duration-300 overflow-y-auto overflow-x-hidden justify-center items-center  md:inset-0 h-[calc(100%-1rem)] max-h-full`}
              >
                <div className=" p-4 w-full lg:max-w-xl max-w-md  max-h-full">
                  {/* <!-- Modal content --> */}
                  {open && open?.id !== "" ? (
                    <div className="border-2  shadow-sm bg-white rounded-lg ">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                          Create Subcategory
                        </h3>
                        <button
                          onClick={modalClose}
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
                      </div>

                      {/* <!-- Modal body --> */}
                      <form
                        onSubmit={formik.handleSubmit}
                        className="p-4 md:p-5"
                      >
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
                                    onClick={() =>
                                      handleImagePreview("thumbnail")
                                    }
                                    className="w-full sm:w-full lg:w-full object-fill cursor-zoom-in  rounded-lg "
                                    src={thumbnailPreview || ""}
                                    alt={
                                      "thumbnailPreview " || thumbnailPreview
                                    }
                                  />
                                  <IoIosClose
                                    onClick={() =>
                                      handleDeleteImage("thumbnail")
                                    }
                                    className="absolute -top-2 overflow-visible hover:text-red-500  -right-2 text-xl text-gray-600 bg-gray-200 rounded-full hover:bg-gray-100"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={mutation?.isLoading}
                          className={`${
                            mutation?.isLoading
                              ? "bg-gray-200 hover:bg-gray-100 text-gray-700"
                              : "bg-purple-500  hover:bg-purple-700"
                          } text-white inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center`}
                        >
                          {mutation.isLoading ? (
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
                          ) : (
                            <svg
                              className="me-1 -ms-1 w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          )}
                          Add new Subcategory
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="border-2  shadow-sm bg-white rounded-lg z-50 ">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                          Create New Category
                        </h3>
                        <button
                          onClick={modalClose}
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
                      </div>

                      {/* <!-- Modal body --> */}
                      <form
                        onSubmit={formik.handleSubmit}
                        className="p-4 md:p-5"
                      >
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
                                    onClick={() =>
                                      handleImagePreview("thumbnail")
                                    }
                                    className="w-full sm:w-full lg:w-full object-fill cursor-zoom-in  rounded-lg "
                                    src={thumbnailPreview || ""}
                                    alt="laughter women "
                                  />
                                  <IoIosClose
                                    onClick={() =>
                                      handleDeleteImage("thumbnail")
                                    }
                                    className="absolute -top-2 overflow-visible hover:text-red-500  -right-2 text-xl text-gray-600 bg-gray-200 rounded-full hover:bg-gray-100"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={mutation?.isLoading}
                          className="text-white inline-flex items-center bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
                        >
                          {mutation.isLoading ? (
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
                          ) : (
                            <svg
                              className="me-1 -ms-1 w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          )}
                          Add new Category
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 lg:p-6 ">
            <div className="p-2 lg:m-6">
              <h1 className="font-semibold  text-purple-600 bg-gray-200 inline-block p-4">
                Category List
              </h1>
            </div>

            {categories && categories.length > 0 ? (
              <div className="w-60 ">
                {isSuccess && categories && renderCategories(categories)}
              </div>
            ) : (
              <NoCategories toggleCategories={toggleCategories} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategories;
