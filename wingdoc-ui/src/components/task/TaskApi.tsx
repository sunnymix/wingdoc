import axios from "axios";
import Constant from "../common/Constant";

const API_TASK_LIST = Constant.API_HOST + "/task/list";
const API_TASK_STATS = Constant.API_HOST + "/task/stats";

const fetchTaskList = (query: any, cb: Function) => {
  axios.post(API_TASK_LIST, query)
    .then(res => {
      const data = res.data?.data;
      cb(data);
    });
};

const fetchTaskStats = (query: any, cb: Function) => {
  axios.post(API_TASK_STATS, query)
    .then(res => {
      const data = res.data?.data;
      cb(data);
    });
};

const wrapTaskTitle = (task: string) => {
  let result = '';
  if (task && task.length > 0) {
    result = task;
    const returnIndex = task.indexOf('\n');
    if (returnIndex >= 0) {
      result = task.substring(0, returnIndex);
    }
  }
  return result;
};

const TaskApi = {
  fetchTaskList,
  fetchTaskStats,
  wrapTaskTitle
};

export default TaskApi;
