import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getNum } from "../../../util/utils";
import useModal from "./useModal";
const useCustomHook = () => {
  const navigate = useNavigate();
  const [urlSearchParams, setUrlSearchPrams] = useSearchParams();
  const { isModal, openModal, closeModal } = useModal();
  const page = urlSearchParams.get("page")
    ? parseInt(urlSearchParams.get("page"))
    : 1;
  const search = urlSearchParams.get("search")
    ? parseInt(urlSearchParams.get("search"))
    : "";
  const category = urlSearchParams.get("category")
    ? parseInt(urlSearchParams.get("category"))
    : 0;
  const defaultQueryString = createSearchParams({
    page,
    search,
    category,
  }).toString();

  const MoveToList = CategoryParam => {
    let queryStr = "";
    if (CategoryParam) {
      const categoryNum = getNum(CategoryParam.category, category);
      queryStr = createSearchParams({
        category: categoryNum,
      }).toString();
    } else {
      queryStr = defaultQueryString;
    }
    // ! category
    navigate({ pathname: "../list", search: queryStr });
  };
  // ! Read Page hook
  const moveToRead = ishop => {
    navigate({ pathname: `../detail/${ishop}`, search: defaultQueryString });
  };

  const moveToSearch = SearchParam => {
    let queryStr = "";
    if (SearchParam) {
      const SearchStr = getNum(SearchParam.search, search);
      queryStr = createSearchParams({
        search: SearchStr,
      }).toString();
    } else {
      queryStr = defaultQueryString;
    }
    navigate({ pathname: "../list", search: queryStr });
  };

  return {
    page,
    search,
    category,
    MoveToList,
    moveToRead,
    moveToSearch,
    isModal,
    openModal,
    closeModal,
  };
};
export default useCustomHook;
