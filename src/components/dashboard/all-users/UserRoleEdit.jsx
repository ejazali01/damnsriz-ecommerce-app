import React, { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useMutation, useQueryClient } from "react-query";
import { updateUserRole } from "../../../api/auth/adminUser";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const UserRoleEdit = ({ userId, initialRole }) => {
  // check user is admin or not 
  const currentUser = useSelector((state) => state?.users);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState(initialRole);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const queryClient = useQueryClient();

  const userRoleMutation = useMutation({
    mutationKey: ["role"],
    mutationFn: updateUserRole,
    onSuccess: (data) => {
      toast.success(`role updated successfully ${data?.data?.data?.role}`);
      setSelectedRole(data?.data?.data?.role);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      setIsEditMode(false); // Turn off edit mode after successful update
    },

    onError: () => {
      toast.error(`Failed to update role: ${error.message}`);
    },
  });

  if (userRoleMutation.isPending) {
    toast.loading("changing...");
  }

  const handleRoleUpdate = async (e) => {
    e.preventDefault();
    const formData = { userId, role: selectedRole };
    if (currentUser.isAdmin) {
      await userRoleMutation.mutateAsync(formData);
    } else {
      return toast.error("unAuthorized");
    }
  };

  return (
    <form
      onSubmit={handleRoleUpdate}
      className="flex gap-2 justify-center items-center"
    >
      {isEditMode ? (
        <select
          className="appearance-auto row-start-1 inline-flex items-center text-gray-700 bg-white border border-gray-300 hover:border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option
            className="appearance-none row-start-1  inline-flex items-center text-gray-700 bg-white border border-gray-300 hover:border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
            value="admin"
          >
            Admin
          </option>
          <option
            className="appearance-auto row-start-1 inline-flex items-center text-gray-700 bg-white border border-gray-300 hover:border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
            value="user"
          >
            User
          </option>
        </select>
      ) : (
        <HtmlTooltip
          placement="right"
          arrow
          title={
            <React.Fragment>
              <Typography color="inherit">Click To Edit Role</Typography>
              <em>{"And here's"}</em> <b>{"to"}</b> <u>{"change role"}</u>
            </React.Fragment>
          }
        >
          <button
            className={`${
              initialRole === "admin" ? "text-sky-500" : "text-gray-500"
            } inline-flex items-center  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5`}
            onClick={handleToggleEditMode}
          >
            {initialRole}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </HtmlTooltip>
      )}


      {isEditMode && (
        <button
          disabled={userRoleMutation.isPending}
          className={`inline-flex items-center text-purple-500 hover:text-purple-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5`}
          type="submit"
        >
          {userRoleMutation.isPending && (
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
          change
        </button>
      )}
    </form>
  );
};

export default UserRoleEdit;
