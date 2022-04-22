import axios from "axios";
import Constant from "../common/Constant";

const API_TASK_LIST = Constant.API_HOST + "/task/list";

const getTaskList = (query: any, cb: Function) => {
  axios.get(API_TASK_LIST)
    .then(res => {
      const data = res.data?.data;
      cb(data);
    });
};

const TaskApi = {
  getTaskList,
};

export default TaskApi;
