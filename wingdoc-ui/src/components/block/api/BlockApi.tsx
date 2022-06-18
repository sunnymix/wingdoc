import axios from "axios";
import Constant from "../../common/Constant";

const API_BLOCK_LIST = Constant.API_HOST + '/block/list/';

const API_BLOCK = Constant.API_HOST + '/block/';

const getBlockListOfDoc = (docId: string, cb: Function) => {
  axios.get(`${API_BLOCK_LIST}${docId}`)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    });
};

const getBlockListBetweenOfDoc = (docId: string, start: number, end: number, cb: Function) => {
  axios.get(`${API_BLOCK_LIST}${docId}/between/${start}/${end}`)
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

const updateBlock = (id: String, form: any, cb?: Function) => {
  axios.post(`${API_BLOCK}${id}`, form)
    .then(res => {
      const data = res.data?.data || false;
      cb?.call(null, data);
    });
};

const deleteBlock = (id: String, cb: Function) => {
  axios.delete(`${API_BLOCK}${id}`)
    .then(res => {
      const data = res.data?.data || false;
      cb(data);
    });
};

const moveUp = (id: String, cb: Function) => {
  axios.post(`${API_BLOCK}${id}/move-up`)
    .then(res => {
      const data = res.data?.data || false;
      cb(data);
    });
};

const moveDown = (id: String, cb: Function) => {
  axios.post(`${API_BLOCK}${id}/move-down`)
    .then(res => {
      const data = res.data?.data || false;
      cb(data);
    });
};

const BlockApi = {
  getBlockListOfDoc,
  getBlockListBetweenOfDoc,
  addBlockToDoc,
  updateBlock,
  deleteBlock,
  moveUp,
  moveDown,
};

export default BlockApi;
