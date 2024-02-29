import authAxios from "../util/tokenUtil";

export const API_SERVER_HOST = "";
const host = `${API_SERVER_HOST}/api`;

// 총 관리자 매장 관리 페이지 : 신규 입점 매장 목록 가져오기 (GET)
export const getSvisorNewShop = async ({
  param,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const header = { headers: { "Content-Type": "application/json" } };
    const res = await authAxios.get(`${API_SERVER_HOST}/api/admin/shop`, {
      params: param,
      headers: header,
    });
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      console.log("신규 매장 목록 호출 성공");
      successFn(res.data);
    } else {
      failFn("신규 매장 목록 호출 오류");
    }
    console.log(res.data);
  } catch (error) {
    errorFn(error);
    console.log("서버 오류");
  }
};

// 총 관리자 매장 관리 페이지 : 기존 입점 매장 목록 가져오기 (GET)