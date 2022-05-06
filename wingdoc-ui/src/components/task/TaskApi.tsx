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

const TaskApi = {
  fetchTaskList,
  fetchTaskStats,
};

export default TaskApi;
