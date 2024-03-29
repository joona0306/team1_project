import axios from "axios";
import authAxios from "../util/tokenUtil";

const API_SERVER_HOST = "";
const host = `${API_SERVER_HOST}/api`;

export const getBList = async ({ param, successFn, failFn, errorFn }) => {
  console.log("파라미터", param);
  try {
    const res = await axios.get(`${host}/butcher-shop`, { params: param });
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      console.log("목록 호출 성공");
      successFn(res.data);
    } else {
      failFn("목록 호출 오류");
    }
  } catch (error) {
    errorFn(error);
  }
};

export const getBInfo = async ({
  isLogin,
  ibutcher,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const header = { headers: { "Content-Type": "application/json" } };
    const axiosInstance = isLogin ? authAxios : axios;
    const res = await axiosInstance.get(
      `${host}/butcher-shop/${ibutcher}`,
      header,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      console.log("목록 호출 성공");
      successFn(res.data);
    } else {
      failFn("목록 호출 오류");
    }
  } catch (error) {
    errorFn(error);
  }
};

// ! GaraLogin
export const changeBookmark = async storeNum => {
  try {
    //
    const data = {
      ibutcher: storeNum,
    };
    const header = { headers: { "Content-Type": "application/json" } };
    const res = await authAxios.post(
      `${host}/butcher-shop/bookmark`,
      data,
      header,
    );
    console.log("check", res.data);
  } catch (error) {
    console.log(error);
    //
  }
};

export const postPickup = async ({
  pickupData,
  successPickupFn,
  failPickupFn,
  errorPickupFn,
}) => {
  console.log("레저데이따", pickupData);
  try {
    //
    const header = { headers: { "Content-Type": "application/json" } };
    const res = await authAxios.post(`${host}/pickup`, pickupData, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successPickupFn(res.data);
    } else {
      failPickupFn("");
    }
  } catch (error) {
    errorPickupFn(error);
    //
  }
};
