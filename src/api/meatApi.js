import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "";
const host = `${API_SERVER_HOST}/api`;

//! GET Meat List Page
export const getGList = async ({ param, successFn, failFn, errorFn }) => {
  try {
    const res = await axios.get(`${host}/shop`, { params: param });
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

export const getGInfo = async ({ ishop, successFn, failFn, errorFn }) => {
  try {
    const res = await axios.get(`${host}/shop/${ishop}`);
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

// ! POST Detail BookMark
export const postBookmarkStatus = async ({
  bookmark,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await axios.post(`${host}`, bookmark);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("");
    }
  } catch (error) {
    errorFn(error);
  }
};

// ! Post Reservation (/gogi/reservation)
export const postReser = async ({ loginParam, successFn, failFn, errorFn }) => {
  try {
    //
    const header = { headers: { "Content-Type": "multipart/formdata" } };
    const res = await jwtAxios.post(`${host}/`, loginParam, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("");
    }
  } catch (error) {
    errorFn("");
    //
  }
};

// ! GaraLogin
export const postUser = async ({ loginParam, successFn, failFn, errorFn }) => {
  try {
    const res = await axios.post(`${host}/user/signin`, loginParam);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("");
    }
  } catch (error) {
    errorFn("");
    //
  }
};
