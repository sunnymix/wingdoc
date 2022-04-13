import axios from "axios";
import Constant from "../common/Constant";

const API_BLOCK_LIST = Constant.API_HOST + '/block/list/';

const API_BLOCK = Constant.API_HOST + '/block/';

const getBlockListOfDoc = (docId: string, cb: Function) => {
  axios.get(`${API_BLOCK_LIST}${docId}`)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    });
};

const addBlockToDoc = (docId: String, form: any, cb: Function) => {
  axios.post(`${API_BLOCK_LIST}${docId}`, form)
    .then(res => {
      const data = res.data?.data;
      cb(data);
    });
};

const updateBlock = (id: String, form: any, cb: Function) => {
  axios.post(`${API_BLOCK}${id}`, form)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    });
};

const BlockApi = {
  getBlockListOfDoc,
  addBlockToDoc,
  updateBlock,
};

export default BlockApi;
