import React from "react";
import { useNavigate, useParams } from "react-router";
import ResultModal from "../common/ResultModal";
import {
  CardWrapper,
  InfoTagWrap,
  ButcherSotreCardImg,
  ButcherStoreBox,
  ButcherStoreCard,
  ButcherStoreInfo,
  ButcherStoreTitle,
  ReserveBtn,
} from "./styles/BCardStyle";
import useCustomHook from "../meat/hooks/useCustomHook";
import useCustomLogin from "../meat/hooks/useCustomLogin";

const GCardComponent = ({ data }) => {
  const host = `http://192.168.0.144:5221/pic/butcher/`;
  console.log(data);
  const navigate = useNavigate();
  const { ibutcher } = useParams();
  const { moveToRead, moveToReser, isModal, openModal, moveToLogin } =
    useCustomHook();
  const { isLogin } = useCustomLogin();
  const handleReserClick = (e, ibutcher, name) => {
    e.stopPropagation();
    if (isLogin) {
      navigate(`/butcher/pickup/${ibutcher}`, {
        state: {
          storeName: name,
        },
      });
    } else {
      openModal("로그인 필요", "로그인이 필요한 서비스입니다.", moveToLogin);
    }
  };
  return (
    <CardWrapper>
      {isModal.isOpen && (
        <ResultModal
          title={isModal.title}
          content={isModal.content}
          callFn={isModal.callFn}
        />
      )}
      {data &&
        data.map(item => (
          <ButcherStoreCard
            key={item.ibutcher}
            onClick={() => moveToRead(item.ibutcher)}
          >
            <ButcherStoreInfo>
              <ButcherStoreBox>
                <ButcherStoreTitle>{item.name}</ButcherStoreTitle>
                <InfoTagWrap></InfoTagWrap>
                {/* 예약하기 */}
                <ReserveBtn
                  onClick={e => handleReserClick(e, item.ibutcher, item.name)}
                >
                  <span>픽업하기</span>
                </ReserveBtn>
              </ButcherStoreBox>
            </ButcherStoreInfo>
            <ButcherSotreCardImg>
              <img
                src={`${host}${item.ibutcher}/butchershop_pic/${item.pics[0]}`}
                alt="고기 더미 이미지"
              />
            </ButcherSotreCardImg>
          </ButcherStoreCard>
        ))}
    </CardWrapper>
  );
};
export default GCardComponent;
