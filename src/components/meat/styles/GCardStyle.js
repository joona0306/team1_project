import styled from "@emotion/styled";
import { ColorStyle, FontSize } from "../../../styles/common/CommonStyle";

// 고깃집 가게 카드 컴포넌트
export const CardWrapper = styled.div`
  width: 100%;
  /* margin-top: 30px; */
  padding: 30px 0px;
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 50px;
  flex-wrap: wrap;
`;
export const MeatStoreCard = styled.div`
  font-family: "DAEAM_LEE_TAE_JOON";
  width: 550px;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  padding: 30px 0px;
  /* align-items: flex-start; */
  /* shadow */
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1),
    0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  /* margin-right: 50px; */
  /* background: red; */
`;
export const MeatStoreCardName = styled.div`
  margin-left: 10px;
  position: relative;
  font-size: ${FontSize.title};
  font-weight: 400;

  /* margin-bottom: 20px; */
`;
export const MeatStoreInfo = styled.div`
  display: flex;
  width: 30%;
  height: 230px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: flex-start; */
  /* justify-content: center; */
  /* align-content: flex-start; */
  /* gap: 5px; */
  /* flex-wrap: wrap; */
`;
export const MeatStoreBox = styled.div`
  display: flex;
  width: 100%;
  height: 240px;
  /* align-items: flex-start; */
  /* align-content: flex-start; */
  flex-shrink: 0;
  flex-wrap: wrap;
`;

export const MeatSotreCardImg = styled.div`
  width: 70%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: blue; */
  img {
    width: 380px;
    height: 240px;
  }
`;

export const MeatstoreTag = styled.div``;

export const MeatStoreTitle = styled.div`
  cursor: pointer;
  width: 100%;
  color: #111;
  height: 80px;
  /* font-family: DAEAM_LEE_TAE_JOON; */
  font-size: ${FontSize.sub_title};
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 41.25px */
`;
export const SubTitle = styled.span`
  font-size: ${FontSize.sub_title};
  font-weight: 400;
  color: ${ColorStyle.g500};
`;

export const ReserBtnWrap = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 73px;
  height: 80px;
  /* align-items: center; */
  align-items: flex-end;
`;

export const ReserveBtn = styled.button`
  cursor: pointer;
  height: 30px;
  border: none;
  background-color: transparent;
  /* width: 100%; */
  /* padding-top: 30px; */
  span {
    color: #111;
    font-family: DAEAM_LEE_TAE_JOON;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 23.75px */
    text-decoration-line: underline;
  }
`;
export const InfoTagWrap = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-content: space-between;
  justify-content: space-between;
  /* align-items: flex-start; */
  /* align-content: flex-start; */
  gap: 10px;
  flex-wrap: wrap;
  button {
    display: flex;
    width: 45%;
    height: 30px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 2px solid var(--sub, #066e52);
    background: #fff;

    span {
      width: 70px;
      flex-shrink: 0;
      color: var(--primary, #d60117);
      text-align: center;
      font-family: DAEAM_LEE_TAE_JOON;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: 125%; /* 17.5px */
    }
  }
  button {
    border-radius: 20px;
    border: 2px solid var(--sub, #066e52);
    background: var(--gray-scale-0, #fff);
  }
`;
