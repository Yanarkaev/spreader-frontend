import { useSelector } from "react-redux";

const F = () => {
  const departments = useSelector((state) => state.branches.branches);
  const tasks = useSelector((state) => state.tasks.tasks);
  const res = departments.map((item) => {
    return item.name;
  });
  console.log(tasks);
};

export default F;
