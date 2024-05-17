import * as Yup from "yup";
const supportedFileTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif',
    'image/webp',
    'application/pdf',
    'video/mpeg',
    'video/mp4',
];

const extractFileFormats = (types) => {
    const fileFormats = types.map((type) => {
        const parts = type.split('/');
        return parts[1];
    });

    return fileFormats.filter((format) => format !== undefined);
};

const productValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    orignalPrice: Yup.number()
        .required("Product orignalPrice is required")
        .positive("Product Price must be a positive number"),
    discountPercentage: Yup.number()
        .required("Product discountPercentage is required")
        .positive("Product discountPercentage must be a positive number"),
    priceAfterDiscount: Yup.number()
        .required("Product discountPercentage is required")
        .positive("Product discountPercentage must be a positive number"),
    brand: Yup.string().required("Product Brand is required"),
    category: Yup.string().required("Product Category is required"),
    stock: Yup.number()
        .required("Product Quantity is required")
        .positive("Product Quantity must be a positive number"),
    color: Yup.string().required("Product Color  is required"),
    thumbnail: Yup.mixed()
        .required('Thumbnail image is required')
        .test('fileSize', 'Thumbnail image must be less than 10MB', (value) => {
            return value && value.size <= 10485760; // 10MB in bytes
        })
        .test(
            'fileType',
            `Unsupported file type for thumbnail,  => supported file type (${extractFileFormats(supportedFileTypes)})`,
            (value) => value && supportedFileTypes.includes(value.type)
        ),
    images: Yup.array()
        .of(
            Yup.mixed()
                .test('fileSize', 'Image must be less than 10MB', (value) => {
                    return value && value.size <= 10485760; // 10MB in bytes
                })
                .test(
                    'fileType',
                    `Unsupported file type for Images,  => supported file type (${extractFileFormats(supportedFileTypes)})`,
                    (value) => value && supportedFileTypes.includes(value.type)
                )
        )
        .min(1, 'At least one images are required')
        .max(10, 'maximum file 10 '),
});


// Define the Yup validation schema for the Product model
const productCategoryValidationSchema = Yup.object().shape({
    title: Yup.string().trim().required('Title is required').trim(),
    description: Yup.string().trim().trim(),
    parentCatId: Yup.string().trim().nullable(),
    thumbnail: Yup.mixed().test('fileSize', 'Thumbnail image must be less than 10MB', (value) => {
        return !value || value && value.size <= 10485760; // 10MB in bytes
    })
        .test(
            'fileType',
            `Unsupported file type for thumbnail,  => supported file type (${extractFileFormats(supportedFileTypes)})`,
            (value) => !value || value && supportedFileTypes.includes(value.type)
        ).nullable(),
});

export {
    productValidationSchema,
    productCategoryValidationSchema
}