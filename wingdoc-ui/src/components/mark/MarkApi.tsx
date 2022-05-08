import axios from "axios";
import Constant from "../common/Constant";

const API_MARKS = Constant.API_HOST + '/marks';

export interface MarkQuery {};

const fetchMarks = (query: MarkQuery, cb: Function) => {
  axios.post(API_MARKS, query)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    })
};

export default {
  fetchMarks,
};
