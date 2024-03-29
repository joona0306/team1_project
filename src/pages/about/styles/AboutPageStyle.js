import styled from "@emotion/styled";

export const AboutPageWrap = styled.div`
  font-family: "DAEAM_LEE_TAE_JOON";
  position: relative;
  display: block;
`;

// 맨 위 사진
export const AboutPageTop = styled.div`
  position: relative;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: flex-start; */
  width: 100%;
  height: 800px;
  margin-top: 114px;
  margin-bottom: 100px;

  .TopImage {
    position: absolute;
    /* align-items: center; */
    /* justify-content: center; */
    width: 1920px;
    height: 800px;
  }
  .TopText {
    position: absolute;
    padding-left: 142px;
    margin-top: 111px;
    width: auto;
    height: 265px;
    /* align-items: center; */
    /* justify-content: center; */
  }
`;

// 메인
export const AboutPageMain = styled.div`
  position: relative;
  display: block;
`;

export const GogishopCard = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
`;

export const MainGogiShop = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .GogiShopTitle {
    position: relative;
    padding-top: 177px;
    font-size: 33px;
  }
`;

// 고깃집 이미지, 네임, 가격, 버튼
export const AboutCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .AboutCardImg {
    position: relative;
    padding-top: 14px;
    width: 583px;
    height: 360px;
  }
  .AboutCardTitle {
    position: relative;
    font-size: 33px;
    padding-top: 20px;
  }
  .AboutCardPrice {
    font-family: "Pretendard";
    padding-top: 10px;
    display: inline-flex;
    font-size: 19px;
    flex-direction: column;
    align-items: center;
  }
`;
export const AboutCardButton = styled.div`
  display: flex;
  padding-top: 20px;
  padding-bottom: 100px;
  .InfoButton {
    font-size: 19px;
    color: #d60117;
    margin-right: 38px;
  }
  .BookButton {
    font-size: 19px;
    color: #d60117;
  }
`;

// 고깃집 두번째 줄
export const ButcherCards = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  padding-bottom: 100px;
`;

export const MainButcher = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .ButcherTitle {
    position: relative;
    padding-top: 177px;
    font-size: 33px;
  }
`;

// 고기-로
export const MainBand = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 270px;
  padding-top: 300px;
  margin-bottom: 134px;
  top: -35px;
  /* z-index: 3; */

  img {
    position: relative;

    align-items: center;
    justify-content: center;
    width: 1920px;
    height: 354px;

    /* z-index: 1; */
  }
  .MainBandText {
    position: absolute;
    font-size: 44px;
    color: #ffffff;
  }
`;
// 쎈밤
export const AboutPageShops = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 805px;
  justify-content: center;
  padding-top: 63px;
  flex-shrink: 0;
  background-color: #f5f5f5;

  .ShopTexts {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 134px;
    padding-right: 60px;

    .ShopTexts-one {
      font-size: 33px;
      margin-bottom: 9px;
    }
    .ShopTexts-two {
      margin-bottom: 9px;
      font-size: 44px;
    }
    .ShopTexts-three {
      font-family: "Pretendard";
      padding-top: 15px;
      font-size: 19px;
    }
    .ShopTexts-four {
      padding-top: 9px;
      font-size: 33px;
    }
  }
  img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 875px;
    height: 678px;
  }
`;

// 오늘의 행사
export const AboutPageEvent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 160px;
  .EventTitle {
    position: relative;
    font-size: 33px;
  }
`;
export const AboutEventCards = styled.div`
  position: relative;
  display: flex;

  .EventCards {
    position: relative;
    display: flex;
  }
  .EventImage {
    position: relative;
    width: 583px;
    height: 583px;
    padding-top: 14px;
  }
  .EventButton-wrap {
    padding-top: 21px;
  }
  .EventButton {
    color: #d60117;
    font-size: 19px;
  }
`;

export const AboutPageCommunity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 312px;
  padding-bottom: 135px;

  .CommunityTitle {
    font-size: 33px;
  }
`;
export const CommunityImages = styled.div`
  position: relative;
  display: grid;
  padding-top: 22px;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .BigImage {
    position: relative;
    grid-area: 1 / 1 / 5 / 5;
    img {
      width: 600px;
      height: 600px;
      cursor: pointer;
    }
  }
  .smallone {
    position: relative;
    grid-area: 1 / 5 / 3 / 7;
    img {
      width: 290px;
      height: 290px;
      cursor: pointer;
    }
  }
  .smalltwo {
    position: relative;
    grid-area: 1 / 7 / 3 / 9;
    img {
      width: 290px;
      height: 290px;
      cursor: pointer;
    }
  }
  .smallthree {
    position: relative;
    grid-area: 3 / 5 / 5 / 7;
    img {
      width: 290px;
      height: 290px;
      cursor: pointer;
    }
  }
  .smallfour {
    position: relative;
    grid-area: 3 / 7 / 5 / 9;
    img {
      width: 290px;
      height: 290px;
      cursor: pointer;
    }
  }
`;
