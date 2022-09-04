import axios from "axios";
import { API_HOST } from "@/components/common/Constant";

const API_BLOCK_IMG = API_HOST + "/block/{blockId}/img";

const makeBlockImgApiUrl = (blockId: string) => {
  return API_BLOCK_IMG.replaceAll('{blockId}', blockId);
};

export default {
  API_BLOCK_IMG,
  makeBlockImgApiUrl,
}
