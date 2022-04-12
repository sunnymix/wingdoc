import axios from "axios";
import Constant from "../common/Constant";

const API_DOC_LIST = Constant.API_HOST + '/doc/list';

const getDocList = (query: any, cb: Function) => {
  axios.get(`${API_DOC_LIST}`)
    .then(res => {
      const data = res.data?.data || [];
      cb(data);
    });
};

const DocApi = {
  getDocList,
}

export default DocApi;
