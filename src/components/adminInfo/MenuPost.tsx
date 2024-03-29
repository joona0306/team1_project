import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { postMenu } from "../../api/menuInfoApi";
import { atomMenuInfoState, defaultMenuState } from "../../atom/atomMenuInfo";
import Fetching from "../common/Fetching";
import ResultModal from "../common/ResultModal";
import useModal from "../meat/hooks/useModal";
import { ButtonStyleTS } from "./styles/ButtonStyleTS";
import { TSBackgroundBoxStyle, TSBoxInnerStyle } from "./styles/TSModifyStyle";
import { TSInputStyle, TSTextFieldStyle } from "./styles/TSTextFieldStyle";

// 텍스트필드 스타일 props 타입 정의
type TextFieldStateProps = "default" | "focus" | "error" | "filled";

const MenuPost = () => {
  // 커스텀 훅
  const { isModal, openModal, closeModal } = useModal();
  const [fetching, setFetching] = useState(false);
  // 메뉴정보 상태관리
  const [menuInfo, setMenuInfo] = useRecoilState(atomMenuInfoState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 사진등록 버튼
  const handleClickAdd = () => {
    fileInputRef.current?.click();
  };

  // 이미지 변경 이벤트 핸들러
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // 파일 크기가 5MB 이하인지 확인
      if (file.size > 5 * 1024 * 1024) {
        openModal("사진 등록", "5MB 이하만 가능합니다.", closeModal);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // 미리보기 URL 생성 및 Recoil 상태 업데이트
        const newPic = reader.result as string;
        setMenuInfo(prevState => ({ ...prevState, pic: newPic }));
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // 메뉴명 변경 이벤트 핸들러
  const handleChangeMenu = (e: ChangeEvent<HTMLInputElement>) => {
    const newMenuValue = e.target.value;
    setMenuInfo({ ...menuInfo, menu: newMenuValue && newMenuValue });
  };
  // 메뉴명 텍스트필드 스타일 상태관리
  const [menuState, setMenuState] = useState<TextFieldStateProps>("default");
  const handleMenuFocus = () => setMenuState("focus");
  const handleMenuBlur = () => {
    const menuValue = menuInfo.menu;
    if (menuValue.length === 0 || menuValue.length > 30) {
      setMenuState("error");
    } else {
      setMenuState(menuValue ? "filled" : "default");
    }
  };

  // 가격 변경 이벤트 핸들러
  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const newPriceValue = e.target.value;
    setMenuInfo({
      ...menuInfo,
      price: newPriceValue ? parseInt(newPriceValue, 10) : 0,
    });
  };
  // 가격 텍스트필드 스타일 상태관리
  const [priceState, setPriceState] = useState<TextFieldStateProps>("default");
  const handlePriceFocus = () => setPriceState("focus");
  const handlePriceBlur = () => {
    const priceValue = menuInfo.price;
    if (priceValue <= 0 || priceValue == 0) {
      setPriceState("error");
    } else {
      setPriceState(priceValue ? "filled" : "default");
    }
  };

  // 메뉴등록 실행
  const handleMenuPost = async () => {
    setFetching(true);

    const formData = new FormData();

    if (selectedFile) {
      formData.append("pic", selectedFile);
    }

    const dto = new Blob(
      [
        JSON.stringify({
          menu: menuInfo.menu,
          price: menuInfo.price,
        }),
      ],
      { type: "application/json" },
    );
    formData.append("dto", dto);

    try {
      const result = await postMenu({ menuInfo: formData });
      if (result) {
        console.log("메뉴 정보 수정 성공");
        console.log("메뉴 정보", menuInfo);
        openModal("메뉴 정보", "메뉴가 등록 되었습니다.", closeModal);
        setMenuInfo(defaultMenuState);
        return;
      } else {
        console.log("메뉴정보", menuInfo);
        openModal("메뉴 정보", "등록에 실패하였습니다", closeModal);
        return;
      }
    } catch (error) {
      console.log("메뉴 정보 등록 안됨");
      openModal("서버 오류", "관리자에게 문의하세요", closeModal);
      return;
    } finally {
      setFetching(false);
    }
  };

  return (
    <TSBackgroundBoxStyle>
      {/* 모달창 */}
      {isModal.isOpen && (
        <ResultModal
          title={isModal.title}
          content={isModal.content}
          callFn={isModal.callFn}
        />
      )}
      {fetching ? <Fetching /> : null}
      <TSBoxInnerStyle>
        <div className="big-title">메뉴 등록하기</div>
        <div className="title">
          <div>메뉴사진</div>
          <div className="essential">*</div>
        </div>
        <div className="pics-container">
          <div className="text-guide">5MB 이하 1장만 등록 가능합니다.</div>
          <ButtonStyleTS type="button" onClick={handleClickAdd}>
            사진등록
          </ButtonStyleTS>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChangeImage}
          />
          <div className="pics-thumb">
            {menuInfo.pic && (
              <img
                src={menuInfo.pic}
                alt="미리보기 이미지"
                style={{
                  maxWidth: "92px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              />
            )}
          </div>
          {/* <div className="text-guide">썸네일 클릭 시 삭제</div> */}
        </div>
      </TSBoxInnerStyle>
      <TSBoxInnerStyle>
        <div className="title">
          <div>메뉴명</div>
          <div className="essential">*</div>
        </div>
        <TSTextFieldStyle state={menuState}>
          <TSInputStyle
            type="text"
            placeholder="메뉴명을 입력해주세요"
            value={menuInfo.menu || ""}
            onChange={handleChangeMenu}
            onFocus={handleMenuFocus}
            onBlur={handleMenuBlur}
          />
        </TSTextFieldStyle>
        <div className="name-guide">
          <div className="text-guide">숫자, 한글, 영문, 특수문자 사용가능</div>
          <div className="text-length">{menuInfo.menu?.length}/30</div>
        </div>
        <div className="title">
          <div>메뉴가격</div>
          <div className="essential">*</div>
        </div>
        <TSTextFieldStyle state={priceState}>
          <TSInputStyle
            type="number"
            placeholder="메뉴 가격을 입력해주세요"
            value={menuInfo.price || ""}
            onChange={handleChangePrice}
            onFocus={handlePriceFocus}
            onBlur={handlePriceBlur}
          />
        </TSTextFieldStyle>
        <div className="text-guide">숫자만 사용가능, 단위: 원</div>
      </TSBoxInnerStyle>
      <ButtonStyleTS type="button" onClick={handleMenuPost}>
        메뉴 등록하기
      </ButtonStyleTS>
    </TSBackgroundBoxStyle>
  );
};

export default MenuPost;
