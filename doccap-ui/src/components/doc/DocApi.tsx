import axios from "axios";
import Constant from "../common/Constant";

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

const DocApi = {
  getDocList,
  addDoc,
  getDoc,
}

export default DocApi;
