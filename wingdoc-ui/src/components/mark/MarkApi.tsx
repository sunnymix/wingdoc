import axios from "axios";
import { API_HOST } from "../common/Constant";

export interface MarkQuery {};

const queryMarks = (query: MarkQuery, cb: Function) => {
  axios.post(`${API_HOST}/mark/query`, query)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    })
};

const addMark = (docId: string, cb?: Function) => {
  axios.post(`${API_HOST}/mark/${docId}/add`, {})
    .then(res => {
      const data = res.data?.data || false;
      cb?.call(null, data);
    });
};

const pinMark = (docId: string, cb?: Function) => {
  axios.post(`${API_HOST}/mark/${docId}/pin`, {})
    .then(res => {
      const data = res.data?.data || false;
      cb?.call(null, data);
    });
};

const deleteMark = (docId: string, cb?: Function) => {
  axios.post(`${API_HOST}/mark/${docId}/delete`, {})
    .then(res => {
      const data = res.data?.data || false;
      cb?.call(null, data);
    });
};

export default {
  queryMarks,
  addMark,
  pinMark,
  deleteMark,
};
