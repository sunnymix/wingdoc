import axios from "axios";
import { API_HOST } from "@/components/common/Constant";
import moment from "moment";

const getDocList = (query: any, cb: Function) => {
  axios.get(`${API_HOST}/doc/list`)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    });
};

const addDoc = (form: any, cb: Function) => {
  axios.post(`${API_HOST}/doc/list`, form)
    .then(res => {
      const data = res.data?.data;
      cb(data);
    });
};

const getDoc = (id: string, cb: Function) => {
  axios.get(`${API_HOST}/doc/${id}`)
    .then(res => {
      const data = res.data?.data || null;
      cb(data);
    });
};

const getDocByTitle = (title: string, cb: Function) => {
  axios.get(`${API_HOST}/doc/list?title=${title}`)
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
  axios.post(`${API_HOST}/doc/${id}`, form)
    .then(res => {
      const data = res.data?.data || false;
      cb(data);
    });
};

const fetchTodayDoc = (cb: Function) => {
  const todayTitle = moment().format("yyyyMMDD");
  getDocByTitle(todayTitle, (doc: any) => {
    if (doc) {
      cb(doc);
    } else {
      addDoc({title: todayTitle, author: ""}, (newDoc: any) => {
        cb(newDoc);
      });
    }
  });
};

export default {
  getDocList,
  addDoc,
  getDoc,
  getDocByTitle,
  updateDoc,
  fetchTodayDoc,
}
