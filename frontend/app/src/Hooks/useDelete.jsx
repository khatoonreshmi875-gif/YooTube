import React from "react";
import { toast } from "react-toastify";
import { useAxiosErrorHandler } from "../component/utils/erroeHandler";

const useDelete = ({
  v,
  setItems,

  setDisabledUI,
  deleteFn,
  open = false,
  setIsOpen,
}) => {
  const handleAxiosError = useAxiosErrorHandler();

  const handleDelete = async () => {
    setDisabledUI(true);
    // Optimistic UI update
    setItems((prev) => prev?.filter((p) => p._id !== v._id));

    // Show loading toast
    const toastId = toast.loading("Deleting ...");

    try {
      const result = await deleteFn(v._id);

      // Success toast
      toast.update(toastId, {
        render: "Deleted successfully✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        onClose: () => setDisabledUI(false),
      });
      if (open === true && setIsOpen) {
        setIsOpen(null);
      }

      console.log(result.data); // Now this will log correctly
    } catch (err) {
      handleAxiosError(err);

      // Rollback UI

      // Error toast
      toast.update(toastId, {
        render: "Failed to delete ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        onClose: () => setDisabledUI(false),
      });
    }
  };
  return { handleDelete };
};

export default useDelete;
