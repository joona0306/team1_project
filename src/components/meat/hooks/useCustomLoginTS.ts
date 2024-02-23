import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { loginPostTS } from "../../../api/SignApi";
import { loginAdminPost } from "../../../api/loginApi";
import { atomSignState } from "../../../atom/atomSignState";
import { SigninForm } from "../../../pages/join/TSJoin";
import { removeCookie, setCookie } from "../../../util/CookiesUtil";

const useCustomLoginTS = () => {
  const [loginState, setLoginState] = useRecoilState(atomSignState);
  const resetSignState = useResetRecoilState(atomSignState);

  const navigate = useNavigate();
  const API_SERVER_HOST = "";
  const host = `${API_SERVER_HOST}/api/user`;

  const isLogin = loginState.result == 1 ? true : false;

  const doLoginTS = async ({ authParam }: { authParam: SigninForm }) => {
    const result = await loginPostTS({ authParam });
    saveAsCookie(result);
    return result;
  };

  const doAdminLogin = async ({ authParam }: { authParam: SigninForm }) => {
    const result = await loginAdminPost({ authParam });
    saveAsCookie(result);
    return result;
  };

  const saveAsCookie = (result: any) => {
    setLoginState(result);
    setCookie("member", JSON.stringify(result), 1);
  };

  const doLogout = async () => {
    resetSignState();
    removeCookie("member");
    try {
      const header = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(`${host}/signout`, header);
      if (res.status === 200) {
        console.log("rt cookie 삭제");
        console.log(res.data);
      } else {
        // Handle failure case
      }
    } catch (error) {
      // Handle error case
    }
  };

  const moveToPath = (path: string) => {
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    navigate("/login");
  };

  const loginComplete = () => {
    navigate("/");
  };

  return {
    loginState,
    isLogin,
    doLoginTS,
    doAdminLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    loginComplete,
  };
};

export default useCustomLoginTS;
