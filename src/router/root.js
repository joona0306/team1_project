import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/loading/Loading";
import adminRouter from "./adminRouter";
import butcherRouter from "./butcherRouter";
import communityRouter from "./communityRouter";
import meatRouter from "./meatRouter";
import myRouter from "./myRouter";
import paymentRouter from "./paymentRouter";
import saleRouter from "./saleRouter";
import supervisorRouter from "./supervisorRouter";

// 어바웃 페이지
const LazyAboutPage = lazy(() => import("../pages/about/AboutPage"));

// 회원가입, 로그인 페이지
const LazyLoginPage = lazy(() => import("../pages/sign/in/TSAdminSigninPage"));
const LazyJoinPage = lazy(() => import("../pages/sign/up/UserSignUpPage"));
const LazySupuervisorSigninPage = lazy(() =>
  import("../pages/sign/in/TSSupervisorSigninPage"),
);

// 고깃집 페이지
const LazyGogiPage = lazy(() => import("../pages/meat/GogiPage"));

// 정육점 페이지
const LazyMartPage = lazy(() => import("../pages/butcher/MartPage"));

// 세일 페이지
const LazySalePage = lazy(() => import("../pages/sale/SalePage"));

// 커뮤니티 페이지
const LazyCommunityPage = lazy(() =>
  import("../pages/community/CommunityPage"),
);
const LazyPaymentPage = lazy(() => import("../pages/payment/PaymentPage"));

// 마이페이지
const LazyMyPage = lazy(() => import("../pages/my/MyPage"));

// 오류 페이지
const LazyNotFoundPage = lazy(() => import("../pages/notfound/NotFound"));

// 가게 관리자 페이지
const LazyAdminPage = lazy(() => import("../pages/admin/AdminPage"));

// 총 관리자 페이지
const LazySupervisorPage = lazy(() =>
  import("../pages/supervisor/SupervisorPage"),
);
const LazyAdSignupPage = lazy(() =>
  import("../pages/sign/up/TSAdminSignUpPage"),
);

// 테스트용 페이지
const LazyGaraPage = lazy(() => import("../redux/GaraLogin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyAboutPage />
      </Suspense>
    ),
  },
  {
    path: "/main",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyAboutPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyLoginPage />
      </Suspense>
    ),
  },
  {
    path: "/user/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyJoinPage />
      </Suspense>
    ),
    // children: joinRouter(),
  },
  {
    path: "/meat/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGogiPage />
      </Suspense>
    ),
    children: meatRouter(),
  },
  {
    path: "/butcher/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyMartPage />
      </Suspense>
    ),
    children: butcherRouter(),
  },
  {
    path: "/sale/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazySalePage />
      </Suspense>
    ),
    children: saleRouter(),
  },
  {
    path: "/community/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCommunityPage />
      </Suspense>
    ),
    children: communityRouter(),
  },
  {
    path: "/my/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyMyPage />
      </Suspense>
    ),
    children: myRouter(),
  },
  {
    path: "/admin/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyAdminPage />
      </Suspense>
    ),
    children: adminRouter(),
  },
  {
    path: "/svisor/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazySupervisorPage />
      </Suspense>
    ),
    children: supervisorRouter(),
  },

  {
    path: "/payment/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyPaymentPage />
      </Suspense>
    ),
    children: paymentRouter(),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyNotFoundPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyAdSignupPage />
      </Suspense>
    ),
  },
  {
    path: "/test",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGaraPage />
      </Suspense>
    ),
  },

  {
    path: "/svisor/signin",
    element: (
      <Suspense fallback={<Loading />}>
        <LazySupuervisorSigninPage />
      </Suspense>
    ),
  },
]);

export default router;
