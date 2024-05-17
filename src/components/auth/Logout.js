// import { useMutation } from "react-query";
// import { logoutUser } from "../../api/auth/user";
// import toast from "react-hot-toast";

// const useLogoutMutation = async () => {
//     const mutation = useMutation({
//         mutationKey: ["logout"],
//         mutationFn: logoutUser,

//         onSuccess: (data) => {
//             toast.success(data.message);
//         },
//         onError: (error) => {
//             toast.error(error.response.statusText);
//         },
//     });

//     return mutation;
// };

// export default useLogoutMutation