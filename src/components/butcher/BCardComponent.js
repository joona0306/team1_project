import React from "react";
import { useNavigate, useParams } from "react-router";
import ResultModal from "../common/ResultModal";
import {
  CardWrapper,
  MeatSotreCardImg,
  MeatStoreBox,
  MeatStoreCard,
  MeatStoreInfo,
  MeatStoreTitle,
  ReserBtnWrap,
  ReserveBtn,
} from "../meat/styles/GCardStyle";
import useCustomHook from "../meat/hooks/useCustomHook";
import useCustomLoginTS from "../meat/hooks/useCustomLoginTS";
import { API_SERVER_HOST } from "../../api/meatApi";
import MeatListPlaceholder from "../image-optimization/OptiPlaceholder";
import MeatlistWireframe from "../image-optimization/OptiWireframe";
import OptiWireframe from "../image-optimization/OptiWireframe";
import OptiPlaceholder from "../image-optimization/OptiPlaceholder";

const GCardComponent = ({ data }) => {
  const baseApi = API_SERVER_HOST;
  const host = `${baseApi}/pic/butcher/`;
  console.log(data);
  const navigate = useNavigate();
  const { ibutcher } = useParams();
  const {
    moveToRead,
    moveToReser,
    isModal,
    openModal,
    moveToLogin,
    moveToBReser,
  } = useCustomHook();
  const { isLogin } = useCustomLoginTS();
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
          <MeatStoreCard
            key={item.ibutcher}
            onClick={() => moveToRead(item.ibutcher)}
          >
            <MeatStoreInfo>
              <MeatStoreBox>
                <MeatStoreTitle>{item.name}</MeatStoreTitle>
                {/* <InfoTagWrap></InfoTagWrap> */}
                {/* 예약하기 */}
                <ReserBtnWrap>
                  <ReserveBtn
                    onClick={e =>
                      moveToBReser(e, item.ibutcher, item.name, item.menuList)
                    }
                  >
                    <span>픽업하기</span>
                  </ReserveBtn>
                </ReserBtnWrap>
              </MeatStoreBox>
            </MeatStoreInfo>
            <MeatSotreCardImg>
              <OptiPlaceholder
                width={350}
                height={210}
                src={`${host}${item.ibutcher}/butchershop_pic/${item.pics[0]}`}
                alt="고기 더미 이미지"
                placeholder={
                  <div>
                    <OptiWireframe width={350} height={210} />
                  </div>
                }
              />
              {/* <img
                src={`${host}${item.ibutcher}/butchershop_pic/${item.pics[0]}`}
                alt="고기 더미 이미지"
              /> */}
            </MeatSotreCardImg>
          </MeatStoreCard>
        ))}
    </CardWrapper>
  );
};
export default GCardComponent;
