import { useEditTask, useDeleteTask } from "./reactQueryCustomHooks";
const SingleItem = ({ item }) => {
  const { editTask } = useEditTask();
  const { deletTask, isLoading } = useDeleteTask();
  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deletTask(item.id)}
        disabled={isLoading}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
