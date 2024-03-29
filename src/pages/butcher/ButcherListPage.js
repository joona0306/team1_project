import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBList } from "../../api/butcherApi";
import ResultModal from "../../components/common/ResultModal";
import Loading from "../../components/loading/Loading";
import BCardComponent from "../../components/butcher/BCardComponent";
import useCustomHook from "../../components/meat/hooks/useCustomHook";
import {
  ListMoreViewBtn,
  ListMoreViewBtnWrap,
  ListWrap,
  SearchBar,
  SearchIconWrap,
  SearchInput,
  SearchWrap,
} from "./styles/ButcherListStyle";
import Fetching from "../../components/common/Fetching";

// 고깃집 목록보기 페이지입니다.
const MeatListPage = () => {
  const {
    page,
    search,
    category,
    MoveToList,
    MoveToPage,
    refresh,
    isModal,
    openModal,
    closeModal,
    moveToSearch,
  } = useCustomHook();
  const [BlistData, setBlistData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { ishop } = useParams();
  // const [selectFilter, setSelectFilter] = useState("lastest");
  const [cateSearch, setCateSearch] = useState("");
  const host = `http://192.168.0.144:5221/pic/shop/${ishop}/shop_pic/`;

  console.log("ref :", refresh);

  useEffect(() => {
    const param = { page, search };
    getBList({ param, successFn, failFn, errorFn });
  }, [page, search, refresh]);

  const successFn = result => {
    setFetching(false);
    setBlistData([...BlistData, ...result]);
    console.log(result);
  };
  const failFn = result => {
    setFetching(false);
    console.log(result);
  };
  const errorFn = result => {
    setFetching(false);
    console.log(result);
  };
  const handleFilterClick = category => {
    if (category == 6) {
      openModal("해산물", "해산물 메뉴는 준비중입니다.", closeModal);
    }
    setBlistData([]);
    MoveToList({ page: 1, search: "", category });
  };
  const handleSearchChange = e => {
    setCateSearch(e.target.value);
  };
  const handleSearchSubmit = e => {
    setBlistData([]);
    moveToSearch({ page: 1, search: cateSearch });
    e.preventDefault();
  };
  const handleMoreView = () => {
    MoveToPage({ page: page + 1 });
  };
  return (
    <ListWrap>
      {fetching ? <Fetching /> : null}
      {isModal.isOpen && (
        <ResultModal
          title={isModal.title}
          content={isModal.content}
          callFn={isModal.callFn}
        />
      )}
      {/* 
      // ! 고기 종류별 필터링
      */}

      <form onSubmit={handleSearchSubmit}>
        <SearchWrap>
          <SearchBar>
            <SearchInput
              placeholder="정육점을 검색해보세요"
              onChange={handleSearchChange}
            />
          </SearchBar>
          <SearchIconWrap onClick={handleSearchSubmit}>
            <img
              src={process.env.PUBLIC_URL + `/assets/images/search.svg`}
              alt=""
            />
          </SearchIconWrap>
        </SearchWrap>
      </form>

      <BCardComponent data={BlistData} ishop={ishop} />

      <ListMoreViewBtnWrap>
        <ListMoreViewBtn onClick={handleMoreView}>
          <span>더보기</span>
        </ListMoreViewBtn>
      </ListMoreViewBtnWrap>
    </ListWrap>
  );
};

export default MeatListPage;
