import axios from "axios";
import Constant from "../common/Constant";

const API_TASK_LIST = Constant.API_HOST + "/task/list";

const queryTaskList = (query: any, cb: Function) => {
  axios.post(API_TASK_LIST, query)
    .then(res => {
      const data = res.data?.data;
      cb(data);
    });
};

const TaskApi = {
  queryTaskList,
};

export default TaskApi;
