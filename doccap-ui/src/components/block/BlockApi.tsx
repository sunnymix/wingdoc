import axios from "axios";
import Constant from "../common/Constant";

const API_BLOCK_LIST = Constant.API_HOST + '/block/list/';

const getBlockListOfDoc = (docId: string, cb: Function) => {
  axios.get(`${API_BLOCK_LIST}${docId}`)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    });
};

const BlockApi = {
  getBlockListOfDoc,
};

export default BlockApi;
