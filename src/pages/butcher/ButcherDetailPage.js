import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate, useParams } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { changeBookmark, getBInfo } from "../../api/butcherApi";
import CountingStar from "../../components/common/CountingStar";
import ResultModal from "../../components/common/ResultModal";
import useCustomHook from "../../components/meat/hooks/useCustomHook";
import useCustomLogin from "../../components/meat/hooks/useCustomLogin";
import {
  InfoContent,
  InfoContentWrap,
  InfoDesc,
  InfoDescContent,
  InfoDescItem,
  InfoDescWrap,
  InfoImageWrap,
  InfoName,
  InfoWrap,
  MapApiWrapper,
  MenuCardContent,
  MenuCardContentItem,
  MenuCardContentPrice,
  MenuCardContentWrap,
  MenuCardImageWrap,
  MenuCardWrap,
  MenuContentWrap,
  MenuTitle,
  MenuWrap,
  OverlayContent,
  OverlayItem,
  OverlayWrap,
  ReadWrap,
  ReivewImageWrap,
  ReserBtn,
  ReviewContent,
  ReviewContentWrap,
  ReviewContentmWrap,
  ReviewItemWrap,
  ReviewMainImage,
  ReviewProfileImage,
  ReviewProfileWrap,
  ReviewSubImage,
  ReviewTitle,
  ReviewUserProfile,
  ReviewWrap,
} from "./styles/ButcherDetailStyle";
import { API_SERVER_HOST } from "../../api/config";
import {
  ImgStyle,
  LargeImgStyle,
  MoreBtnWrap,
  ThumbnailStyle,
} from "../meat/styles/MeatDetailStyle";
import Button from "../../components/button/Button";
import Fetching from "../../components/common/Fetching";

const MeatDetailPage = () => {
  const navigate = useNavigate();
  const { ibutcher } = useParams();
  const { isModal, openModal, closeModal, moveToLogin } = useCustomHook();
  const [storeInfo, setStoreInfo] = useState({});
  const [fetching, setFetching] = useState(false);
  const { isLogin } = useCustomLogin();
  const isBookInfo = storeInfo.isBook;

  const baseApi = API_SERVER_HOST;
  const host = `${baseApi}/pic/butcher/`;
  const [visualReview, setVisualReview] = useState(3);
  const handleMoreReview = e => {
    console.log("더보기임");
    setVisualReview(prevCount => prevCount + 3);
  };

  useEffect(() => {
    setFetching(true);
    getBInfo({ isLogin, ibutcher, successFn, failFn, errorFn });
    setBookmark(isBookInfo);
  }, [isLogin, ibutcher, isBookInfo]);

  const successFn = result => {
    console.log(result);
    setStoreInfo(result);
    setFetching(false);
    // console.log("DPage res : ", storeInfo);
  };
  const failFn = result => {
    console.log(result);
    setFetching(true);
  };
  const errorFn = result => {
    console.log(result);
    setFetching(true);
  };
  // ! BookMark, Go Reservation Btn Logic
  const [bookmark, setBookmark] = useState(isBookInfo || 0);
  console.log("호출 ", host);

  // console.log(ishop);
  const storeNum = ibutcher;

  // ! BookMark 선택
  const handleBookmarkClick = e => {
    e.stopPropagation();
    if (isLogin) {
      if (bookmark == 0) {
        openModal("북마크 등록완료", "북마크에 등록되었습니다.", closeModal);
        setBookmark(1);
        changeBookmark(storeNum);

        // console.log("북마크상태", bookmark);
      } else if (bookmark == 1) {
        openModal("북마크 해제", "북마크가 해제되었습니다.", closeModal);
        setBookmark(0);
        changeBookmark(storeNum);
        // console.log("북마크상태", bookmark);
      }
    } else {
      openModal("로그인 필요", "로그인이 필요한 서비스입니다.", moveToLogin);
    }
  };
  const handleReserClick = e => {
    e.stopPropagation();
    if (isLogin) {
      // PATH랑 같이 보내야함 stireInfo.name
      navigate(`/butcher/pickup/${ibutcher}`, {
        state: {
          storeName: storeInfo.name,
        },
      });
    } else {
      openModal("로그인 필요", "로그인이 필요한 서비스입니다.", moveToLogin);
    }
  };

  // ! KAKAOMAP API X,Y value
  const [draggable, setDraggable] = useState(false);
  const [zoomable, setZoomable] = useState(false);
  console.log(storeInfo.pics);
  return (
    <div>
      {fetching ? <Fetching /> : null}
      {isModal.isOpen && (
        <ResultModal
          title={isModal.title}
          content={isModal.content}
          callFn={isModal.callFn}
        />
      )}
      <ReadWrap>
        {/* {loading ? <Loading /> : <div></div>} */}
        <InfoWrap>
          {/* 이미지 */}
          <InfoImageWrap>
            <Swiper
              preventClicks={false}
              preventClicksPropagation={false}
              slidesPerView={1}
              spaceBetween={0}
              pagination={true}
            >
              {storeInfo.pics &&
                storeInfo.pics.map((pic, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${host}${storeInfo.ibutcher}/butchershop_pic/${storeInfo.pics}`}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* 비상용 이미지 */}
            {/* <img src="https://picsum.photos/1180/800/?category=meat" alt="" /> */}
          </InfoImageWrap>
          {/* 컨텐츠 */}
          <InfoContentWrap>
            <InfoContent>
              <InfoName>
                <div>
                  <span> {storeInfo.name}</span>
                </div>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      (bookmark === 0
                        ? "/assets/images/bk_no_check.png"
                        : "/assets/images/bk_check.png")
                    }
                    onClick={handleBookmarkClick}
                  />
                </div>
              </InfoName>
              <InfoDescWrap>
                <InfoDesc>
                  <InfoDescItem>주소</InfoDescItem>
                  <InfoDescContent>{storeInfo.location}</InfoDescContent>
                </InfoDesc>
                <InfoDesc>
                  <InfoDescItem>전화번호</InfoDescItem>
                  <InfoDescContent>{storeInfo.tel}</InfoDescContent>
                </InfoDesc>
                <InfoDesc>
                  <InfoDescItem>영업시간</InfoDescItem>
                  <InfoDescContent>{storeInfo.open}</InfoDescContent>
                </InfoDesc>
                <InfoDesc>
                  <InfoDescItem>서비스</InfoDescItem>
                  <InfoDescContent>{storeInfo.facilities}</InfoDescContent>
                </InfoDesc>
              </InfoDescWrap>
            </InfoContent>
            <ReserBtn onClick={handleReserClick}>
              <span>예약하기</span>
            </ReserBtn>
          </InfoContentWrap>
        </InfoWrap>

        {/* 
    // ! 가게 메뉴
  */}
        <MenuWrap>
          {storeInfo?.menus?.length === 0 ? (
            <div></div>
          ) : (
            <MenuTitle>
              <span>메 뉴</span>
            </MenuTitle>
          )}

          <MenuContentWrap>
            {storeInfo.menus &&
              storeInfo.menus.slice(0, 6).map((item, index) => (
                <MenuCardWrap key={index}>
                  {/* 그림 */}
                  <MenuCardImageWrap>
                    <img
                      src="https://picsum.photos/370/350/?category=meat"
                      alt=""
                    />
                  </MenuCardImageWrap>
                  {/* 
// ! 가게 정보
*/}
                  <MenuCardContentWrap>
                    <MenuCardContent>
                      <MenuCardContentItem>
                        <span>{item.menu}</span>
                      </MenuCardContentItem>
                      <MenuCardContentPrice>
                        <span>{item.price}</span>
                      </MenuCardContentPrice>
                    </MenuCardContent>
                  </MenuCardContentWrap>
                </MenuCardWrap>
              ))}
          </MenuContentWrap>
        </MenuWrap>

        {/* 
// ! KAKAO MAP API
*/}
        {/*
//  ! 가게 
*/}
        {storeInfo.x && storeInfo.y && (
          <MapApiWrapper>
            <Map
              center={{ lat: storeInfo.y, lng: storeInfo.x }}
              style={{ width: "100%", height: "500px" }}
              draggable={draggable}
              zoomable={zoomable}
            >
              <MapMarker
                position={{ lat: storeInfo.y, lng: storeInfo.x }}
                image={{
                  src:
                    process.env.PUBLIC_URL +
                    `/assets/images/kakaomap_marker.png`,
                  size: { width: 52, height: 69 },
                  options: { offset: { x: 27, y: 69 } },
                }}
              />
            </Map>
            <OverlayWrap>
              <InfoContent>
                <InfoName color="${ColorStyle.g1000}">
                  <div>
                    <span>{storeInfo.name}</span>
                  </div>
                </InfoName>
                <InfoDescWrap>
                  <InfoDesc>
                    <OverlayItem>주소</OverlayItem>
                    <OverlayContent> {storeInfo.location} </OverlayContent>
                  </InfoDesc>
                  <InfoDesc>
                    <OverlayItem>전화번호</OverlayItem>
                    <OverlayContent>{storeInfo.tel}</OverlayContent>
                  </InfoDesc>
                  <InfoDesc>
                    <OverlayItem>영업시간</OverlayItem>
                    <OverlayContent>{storeInfo.open}</OverlayContent>
                  </InfoDesc>
                  <InfoDesc>
                    <OverlayItem>서비스</OverlayItem>
                    <OverlayContent>{storeInfo.facilities}</OverlayContent>
                  </InfoDesc>
                </InfoDescWrap>
              </InfoContent>
            </OverlayWrap>
          </MapApiWrapper>
        )}

        <ReviewWrap>
          {storeInfo?.reviews?.length === 0 ? (
            <div></div>
          ) : (
            <ReviewTitle>
              <span>리 뷰</span>
            </ReviewTitle>
          )}

          <ReviewContentWrap>
            {storeInfo?.reviews &&
              storeInfo?.reviews.slice(0, visualReview).map((review, index) => (
                <ReviewItemWrap key={index}>
                  {/* Image */}
                  <ImgStyle>
                    <LargeImgStyle>
                      {review.pics && review.pics.length == 0 ? (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/favicon.png`
                          }
                          alt=""
                        />
                      ) : (
                        <img
                          src={`${baseApi}/pic/butcher/${storeInfo.ibutcher}/review/${review.ireview}/${review.pics[0]}`}
                          alt="Large image"
                        />
                      )}
                    </LargeImgStyle>
                    <ThumbnailStyle>
                      {review.pics.slice(1, 5).map(
                        (pic, index) =>
                          pic && (
                            <div className="thumbnail" key={index}>
                              <img
                                src={`${baseApi}/pic/butcher/${
                                  storeInfo.ibutcher
                                }/review/${review.ireview}/${
                                  review.pics[`${index}`]
                                }`}
                                alt={`img_${index + 1}`}
                              />
                            </div>
                          ),
                      )}
                    </ThumbnailStyle>
                  </ImgStyle>
                  <ReviewContentmWrap>
                    <ReviewProfileWrap>
                      <ReviewProfileImage>
                        <img
                          src="https://picsum.photos/370/350/?category=meat"
                          alt=""
                        />
                      </ReviewProfileImage>
                      <ReviewUserProfile>
                        <div>
                          <span>{review.nickname}</span>
                        </div>
                        <CountingStar star={review.star} />
                      </ReviewUserProfile>
                    </ReviewProfileWrap>
                    <ReviewContent>
                      <p>{review.review}</p>
                    </ReviewContent>
                  </ReviewContentmWrap>
                </ReviewItemWrap>
              ))}
          </ReviewContentWrap>
          {storeInfo?.reviews?.length === 0 ? (
            <div></div>
          ) : (
            <div onClick={handleMoreReview}>
              <Button bttext={"더보기"} />
            </div>
          )}
          <MoreBtnWrap></MoreBtnWrap>
        </ReviewWrap>
      </ReadWrap>
    </div>
  );
};

export default MeatDetailPage;
