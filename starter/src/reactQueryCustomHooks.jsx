import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => customFetch.get("/"),
  });
  return { isLoading, data, error, isError };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createTask,
    isError,
    isLoading,
  } = useMutation({
    mutationFn: (taskTiTle) => customFetch.post("/", { title: taskTiTle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task added");
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
      // console.log(err);
    },
  });
  return { createTask, isError, isLoading };
};
export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) =>
      customFetch.patch(`/${taskId}`, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // toast.success("edit successful");
    },
  });
  return { editTask };
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deletTask, isLoading } = useMutation({
    mutationFn: (taskId) => customFetch.delete(`${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // toast.success("remove successful");
    },
  });
  return { deletTask, isLoading };
};
