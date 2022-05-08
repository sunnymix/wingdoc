import axios from "axios";
import Constant from "../common/Constant";
import moment from "moment";

const API_DOC_LIST = Constant.API_HOST + '/doc/list';
const API_DOC_ONE = Constant.API_HOST + '/doc/'

const getDocList = (query: any, cb: Function) => {
  axios.get(`${API_DOC_LIST}`)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    });
};

const addDoc = (form: any, cb: Function) => {
  axios.post(`${API_DOC_LIST}`, form)
    .then(res => {
      const data = res.data?.data;
      cb(data);
    });
};

const getDoc = (id: string, cb: Function) => {
  axios.get(`${API_DOC_ONE}${id}`)
    .then(res => {
      const data = res.data?.data || null;
      cb(data);
    });
};

const getDocByTitle = (title: string, cb: Function) => {
  axios.get(`${API_DOC_LIST}?title=${title}`)
    .then(res => {
      const data = res.data?.data || [];
      var doc = null;
      if (data.length > 0) {
        doc = data[0];
      }
      cb(doc);
    });
};

const updateDoc = (id: string, form: any, cb: Function) => {
  axios.post(`${API_DOC_ONE}${id}`, form)
    .then(res => {
      const data = res.data?.data || false;
      cb(data);
    });
};

const fetchTodayDoc = (cb: Function) => {
  const todayTitle = moment().format("yyyyMMDD");
  DocApi.getDocByTitle(todayTitle, (doc: any) => {
    if (doc) {
      cb(doc);
    } else {
      addDoc({title: todayTitle, author: ""}, (newDoc: any) => {
        cb(newDoc);
      });
    }
  });
};

const DocApi = {
  getDocList,
  addDoc,
  getDoc,
  getDocByTitle,
  updateDoc,
  fetchTodayDoc,
}

export default DocApi;
