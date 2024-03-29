import { Suspense, lazy } from "react";
import { Navigate } from "react-router";
import Loading from "../components/loading/Loading";

// 고깃집 페이지
const LazyGbookPage = lazy(() => import("../pages/meat/TSMeatReviewPage"));
const LazyGlistPage = lazy(() => import("../pages/meat/TSMeatListPage"));
const LazyGreadPage = lazy(() => import("../pages/meat/TSMeatDeatilPage"));
const LazyGaddPage = lazy(() => import("../pages/meat/TSMeatReservationPage"));
const LazyGmodifyPage = lazy(() => import("../pages/meat/JS/MeatDetailPage"));

const meatRouter = () => {
  return [
    { path: "", element: <Navigate to="list" /> },
    {
      path: "review/:ireser",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyGbookPage />
        </Suspense>
      ),
    },
    {
      path: "list",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyGlistPage />
        </Suspense>
      ),
    },
    {
      path: "detail/:ishop",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyGreadPage />
        </Suspense>
      ),
    },
    {
      path: "reservation/:ishop",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyGaddPage />
        </Suspense>
      ),
    },
    {
      path: "modify/:ireser",
      element: (
        <Suspense fallback={<Loading />}>
          <LazyGmodifyPage />
        </Suspense>
      ),
    },
  ];
};

export default meatRouter;
