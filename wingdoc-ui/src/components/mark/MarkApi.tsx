import axios from "axios";
import Constant from "../common/Constant";

const API_MARKS = Constant.API_HOST + '/marks';
const API_MARKS_ADD = Constant.API_HOST + '/marks/add';

export interface MarkQuery {};

export interface MarkAddForm {
  docId: string,
};

const fetchMarks = (query: MarkQuery, cb: Function) => {
  axios.post(API_MARKS, query)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    })
};

const addMark = (docId: string, cb?: Function) => {
  axios.post(API_MARKS_ADD, { docId })
    .then(res => {
      const data = res.data?.data || false;
      cb?.call(null, data);
    });
};

export default {
  fetchMarks,
  addMark,
};
