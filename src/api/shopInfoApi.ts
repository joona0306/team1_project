import axios from "axios";
import { API_SERVER_HOST } from "./config";

const host = `${API_SERVER_HOST}/api/owner`;

interface ShopInfo {
  pics: string[];
  dto: {
    imeat: number;
    name: string;
    location: string;
    ishopPics: string[];
    open: string;
    tel: string;
    x: string;
    y: string;
    deposit: number;
    facility: string[];
  };
}

interface MenuInfo {
  checkShop: number;
  imenu: number;
  ishop: number;
  price: number;
  menu: string;
  pic: string;
}

interface MenuModify {
  checkShop: number;
  imenu: number;
  ishop: number;
  pic: string;
}

// 매장정보 수정하기
export const putShopInfo = async (
  shopInfo: ShopInfo,
): Promise<ShopInfo | undefined> => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.put(`${host}/modify`, shopInfo, header);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// 메뉴 리스트
export const getMenus = async (
  param: MenuInfo[],
): Promise<MenuInfo[] | undefined> => {
  try {
    // params와 headers를 같은 객체 내에 정의합니다.
    const config = {
      headers: { "Content-Type": "application/json" },
      params: param, // 쿼리 파라미터로 전달할 객체
    };

    const response = await axios.get(`${host}/menu`, config);
    return response.data;
  } catch (error) {
    console.log("메뉴정보 호출 오류");
    throw error;
  }
};

// 메뉴 등록
export const postMenu = async ({ menuInfo }: { menuInfo: FormData }) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post(`${host}/menu`, menuInfo, header);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};