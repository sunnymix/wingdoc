import axios from "axios";
import Constant from "../common/Constant";

const API_MARKS = Constant.API_HOST + '/marks';
const API_MARKS_ADD = Constant.API_HOST + '/marks/add';
const API_MARKS_DELETE = Constant.API_HOST + '/marks/';

export interface MarkQuery {};

const queryMarks = (query: MarkQuery, cb: Function) => {
  axios.post(`${Constant.API_HOST}/mark/query`, query)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    })
};

const addMark = (docId: string, cb?: Function) => {
  axios.post(`${Constant.API_HOST}/mark/${docId}/add`, {})
    .then(res => {
      const data = res.data?.data || false;
      cb?.call(null, data);
    });
};

const deleteMark = (docId: string, cb?: Function) => {
  axios.post(`${Constant.API_HOST}/mark/${docId}/delete`, {})
    .then(res => {
      const data = res.data?.data || false;
      cb?.call(null, data);
    });
};

export default {
  queryMarks,
  addMark,
  deleteMark,
};
