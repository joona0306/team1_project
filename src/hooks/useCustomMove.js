import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getNum, getSearch } from "../util/utils";
import useCustomLoginTS from "../components/meat/hooks/useCustomLoginTS";

const useCustomMove = () => {
  // 로그인 훅
  const { isLogin, moveToLogin, isSupervisorLogin, isAdminLogin } =
    useCustomLoginTS();
  // path hook
  const navigate = useNavigate();
  // query 알아내기, 읽기
  const [urlSearchParams, setUrlSearchPrams] = useSearchParams();
  // 현재 page 번호
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;
  // 현재 search
  const search = urlSearchParams.get("search") || "";
  // querystring 만들기
  const queryStrDefault = createSearchParams({ page, search }).toString();
  // to list
  const moveToList = pageParam => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const searchStr = getSearch(pageParam.search, search);
      // 쿼리 만들기
      queryStr = createSearchParams({
        page: pageNum,
        search: searchStr,
      }).toString();
    } else {
      queryStr = queryStrDefault;
    }
    navigate({ pathname: "../list", search: queryStr });
  };
  // to modify
  const moveToModify = num => {
    navigate({ pathname: `../modify/${num}`, search: queryStrDefault });
  };
  // to read
  const moveToRead = num => {
    navigate({ pathname: `../read/${num}`, search: queryStrDefault });
  };
  // to add
  const moveToAdd = () => {
    if (isLogin || isSupervisorLogin || isAdminLogin) {
      navigate("/community/add");
    } else {
      moveToLogin();
    }
  };

  // to search
  const moveToSearch = pageParam => {
    let queryStr = "";
    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const searchStr = getSearch(pageParam.search, search);
      // 쿼리 만들기
      queryStr = createSearchParams({
        page: pageNum,
        search: searchStr,
      }).toString();
    } else {
      queryStr = queryStrDefault;
    }
    navigate({ pathname: "../list", search: queryStr });
  };

  return {
    moveToList,
    moveToModify,
    moveToRead,
    moveToAdd,
    moveToSearch,
    page,
    search,
  };
};

export default useCustomMove;
