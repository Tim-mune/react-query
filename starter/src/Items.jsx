import SingleItem from "./SingleItem";
import { useQuery } from "@tanstack/react-query";
import customFetch from "./utils";
import { useFetchTasks } from "./reactQueryCustomHooks";
const Items = () => {
  const { isLoading, data, error, isError } = useFetchTasks();
  if (isLoading) {
    return <h2 style={{ margin: "1rem" }}>loading</h2>;
  }
  if (isError) {
    return <h2 style={{ margin: "1rem" }}>{error.response.data}</h2>;
  }
  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
