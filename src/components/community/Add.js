import React, { useEffect, useRef, useState } from "react";
import { getUserInfo } from "../../api/MyApi";
import { postAdd } from "../../api/communityApi";
import useCustomMove from "../../hooks/useCustomMove";
import Button from "../button/Button";
import Fetching from "../common/Fetching";
import ResultModal from "../common/ResultModal";
import SelectedModal from "../common/SelectedModal";
import {
  AddBoxStyle,
  ContentBoxStyle,
  FootStyle,
  ImageBoxStyle,
  UserBoxStyle,
} from "./styles/AddStyle";
import { WrapStyle } from "./styles/ListStyle";

// 글 쓰기 초기값
const initState = {
  pics: [],
  title: "",
  contents: "",
};

// 유저 정보 초기값
const initProfile = {
  nickname: "",
};

const Add = () => {
  // 유저 정보 가져오기
  const [profileData, setProfileData] = useState(initProfile);
  useEffect(() => {
    const param = {};
    getUserInfo({
      param,
      successFn: successFnProfile,
      failFn: failFnProfile,
      errorFn: errorFnProfile,
    });
  }, []);

  const successFnProfile = result => {
    setProfileData(result);
    console.log(result);
  };
  const failFnProfile = result => {
    console.log(result);
  };
  const errorFnProfile = result => {
    console.log(result);
  };

  // 로딩창 연결
  const [fetching, setFetching] = useState(false);

  // 글 작성 초기값 설정 및 상태 업데이트
  const [product, setProduct] = useState(initState);

  // 글 작성 시 내용 업데이트, 텍스트 필드의 변경사항 처리
  const handleChange = e => {
    // ...product 기존 product 상태의 모든 속성을 복사(불변성 유지)
    // e.target.name은 변경된 텍스트 필드의 이름
    // e.target.value는 입력된 새로운 값을 나타냄
    // setProduct() 동적 속성 이름을 사용하여 해당 텍스트 필드의 값을 업데이트
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // useRef(DOM 요소를 참조한다.)
  // useRef를 만든 후 반드 시 태그랑 연결
  const uploadRef = useRef(null);

  // 업로드 할 이미지 미리보기 상태 업데이트
  const [images, setImages] = useState([]);

  // 업로드 할 이미지 5장 초과 시 모달 띄우기 상태 업데이트
  const [imagesLength, setImagesLength] = useState(false);

  // 사진추가 버튼 클릭시 이미지 파일 선택
  const handleClickImg = () => {
    uploadRef.current.click();
  };

  // 업로드 할 이미지 미리보기
  const handleFileChange = e => {
    // 파일 입력 필드에서 선택된 파일들에 대한 참조
    // e.target.files는 사용자가 선택한 파일들의 목록을 포함
    const files = e.target.files;
    if (files) {
      // 사진 최대 5장까지 업로드
      const totalImages = images.length + files.length;
      if (totalImages > 5) {
        setImagesLength(true);
        // alert("최대 5장까지만 업로드 가능합니다.");
        return;
      }
      // 사용자가 선택한 파일로부터 URL을 생성
      const newImages = Array.from(files).map(file =>
        // 각 파일에 대해 임시 URL을 생성
        // 이 URL은 브라우저 내에서 파일을 참조할 수 있는 경로를 제공
        URL.createObjectURL(file),
      );
      // 기존 이미지 목록에 새로운 이미지 URL들을 추가
      // ...prevImages는 기존의 이미지 목록
      // ...newImages는 새로운 이미지 URL목록을 펼쳐서 하나의 배열로 합치는 작업
      // 최종적으로 기존 이미지 목록에 새로운 이미지들이 추가
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  // 이미지 미리보기에서 삭제 함수
  const deleteImage = indexToDelete => {
    // 이미지 상태 업데이트 setImages()
    setImages(prevImages =>
      // filter 함수를 사용해,
      // 제거할 이미지의 인덱스가 아닌 이미지만을 새배열에 포함
      prevImages.filter((_, index) => index !== indexToDelete),
    );
  };

  // 파일 업로드 실행
  const handleClick = async product => {
    const formData = new FormData();

    // 글 정보를 담은 dto Blob객체 생성
    const dto = new Blob(
      [
        JSON.stringify({
          title: product.title,
          contents: product.contents,
        }),
      ],
      // JSON 형식으로 설정
      { type: "application/json" },
    );

    // dto 객체를 FormData에 추가
    formData.append("dto", dto);

    // 이미지를 formData에 추가하기 위해 image 배열을 순회하는 Promise 배열 생성
    const imagePromises = images.map(async (image, index) => {
      // 이미지 URL로 부터 응답을 가져옴
      const response = await fetch(image);
      // 응답으로부터 Blob 객체를 생성
      const blob = await response.blob();
      // Blob 객체로부터 File 객체를 생성
      const file = new File([blob], `image${index}.jpg`, {
        type: "image/jpeg",
      });
      // 생성된 File 객체를 fromData에 추가
      formData.append("pics", file);
    });

    // 모든 이미지가 FormData에 추가된 후 서버에 전송
    // 모든 이미지 처리가 완료될 때까지 대기
    await Promise.all(imagePromises);

    // 데이터 전송 중임을 나타내는 상태 true
    setFetching(true);

    // formData를 서버에 전송
    postAdd({ product: formData, successFn, failFn, errorFn });
  };

  // 모달창 관련
  // 글 작성 시 예외처리 결과 상태 업데이트
  const [result, setResult] = useState(false);
  // 글 등록 시 모달창 관련
  const [addResult, setAddResult] = useState(false);
  // resultModal 관련
  const [popTitle, setPopTitle] = useState("");
  const [popContent, setPopContent] = useState(false);
  // 페이지 이동 관련
  const [popRedirect, setPopRedirect] = useState(false);
  // selectedModal 띄우기 상태 업데이트
  const [showModal, setShowModal] = useState(false);

  // slectedModal 확인 버튼 클릭 시
  const handleConfirm = product => {
    // 글 등록 로직 실행
    if (
      product.title.length !== 0 &&
      product.contents.length > 0 &&
      product.contents.length <= 300
    ) {
      handleClick(product);
    }
    if (
      product.title.length === 0 ||
      product.contents.length === 0 ||
      product.contents.length > 300
    ) {
      setResult(true);
    }
    // 모달 닫기
    setShowModal(false);
  };

  const { moveToList } = useCustomMove();

  // 글 등록 시 resultModal 닫기 callFn
  const closeModal = () => {
    // 모달창 닫기
    setAddResult(false);
    if (popRedirect === true) {
      // 목록으로 가기
      moveToList({ page: 1 });
    }
  };

  // 글 등록 시 예외처리용 resultModal 닫기 callFn
  const closeException = () => {
    setResult(false);
  };

  // 사진 업로드 5장 초과 resultModal 닫기 callFn
  const closeImagesLength = () => {
    setImagesLength(false);
  };

  // selectedModal 취소 버튼 클릭 시
  const handleCancel = () => {
    // 모달 닫기
    setShowModal(false);
  };

  // 글 등록 버튼 클릭 핸들러
  const handleAddClick = () => {
    // selectedModal 띄우기
    setShowModal(true);
  };

  const successFn = addResult => {
    console.log("글 등록 성공", addResult);
    setFetching(false);
    setAddResult(true);
    setPopTitle("글 등록 성공");
    setPopContent("글 등록에 성공하였습니다.");
    setPopRedirect(true);
  };
  const failFn = addResult => {
    console.log("글 등록 실패", addResult);
    setFetching(false);
    setAddResult(false);
    setPopTitle("글 등록 실패");
    setPopContent("오류가 발생하였습니다. 잠시 후 다시 시도해주세요");
    setPopRedirect(false);
  };
  const errorFn = addResult => {
    console.log("글 등록 실패", addResult);
    setFetching(false);
    setAddResult(true);
    setPopTitle("서버 오류");
    setPopContent("서버가 불안정합니다. 관리자에게 문의해주세요.");
    setPopRedirect(false);
  };

  return (
    <WrapStyle>
      {fetching ? <Fetching /> : null}
      <AddBoxStyle>
        <div className="titleBox">제목</div>
        <div className="inputBox">
          <input
            type="text"
            name="title"
            placeholder="글의 제목을 입력해주세요"
            onChange={e => handleChange(e)}
            value={product.title}
          />
        </div>
      </AddBoxStyle>
      <UserBoxStyle>
        <div className="titleBox">작성자</div>
        <div className="writerBox">{profileData.nickname}</div>
      </UserBoxStyle>
      <ContentBoxStyle>
        <div className="titleBox">내용</div>
        <div className="inputBox">
          <textarea
            type="text"
            name="contents"
            placeholder="글의 내용을 입력해주세요(300자 이내)"
            onChange={e => handleChange(e)}
            value={product.contents}
          />
        </div>
      </ContentBoxStyle>
      <ImageBoxStyle>
        <div className="titleBox">사진</div>

        <div onClick={handleClickImg}>
          <Button bttext="사진추가" />
        </div>
        <div className="inputBox">
          <input
            type="file"
            ref={uploadRef}
            multiple={true}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="previewBox">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`미리보기${index}`}
                style={{
                  maxWidth: "60px",
                  margin: "5px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => deleteImage(index)}
              />
            ))}
          </div>
        </div>
      </ImageBoxStyle>
      <FootStyle>
        <div className="btnBox">
          <div onClick={handleAddClick}>
            <Button bttext="확인" />
          </div>
          <div onClick={moveToList}>
            <Button bttext="취소" />
          </div>
        </div>
      </FootStyle>
      {showModal ? (
        <SelectedModal
          title="글 등록 확인"
          content="글을 등록하시겠습니까?"
          confirmFn={() => handleConfirm(product)}
          cancelFn={handleCancel}
        />
      ) : null}

      {addResult ? (
        <ResultModal
          title={popTitle}
          content={popContent}
          callFn={closeModal}
        />
      ) : null}

      {result ? (
        <ResultModal
          title="제목 필수 입력"
          content="내용은 300자 이내로 작성해주세요"
          callFn={closeException}
        />
      ) : null}

      {imagesLength ? (
        <ResultModal
          title="사진 등록"
          content="최대 5장까지만 업로드 가능합니다"
          callFn={closeImagesLength}
        />
      ) : null}
    </WrapStyle>
  );
};

export default Add;
