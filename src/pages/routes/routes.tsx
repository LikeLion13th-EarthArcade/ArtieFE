import { createBrowserRouter } from 'react-router-dom';
// import AuthLayout from '../Components/Layout /AuthLayout';

import ExhibitionList from '../Exhibitions/ExhibitionList';
import ExhibitionDetail from '../Exhibitions/ExhibitionDetail';
import SpaceList from '../Spaces/SpaceList';
import SpaceRequest from '../Spaces/SpaceRequest';
import SpaceDetail from '../Spaces/SpaceDetail';
import MyExhibitions from '../Mypage/MyExhibitions';
import MyRents from '../Mypage/MyRents';
import ProfileEdit from '../Mypage/ProfileEdit';
import ExhibitionListCreate from '../Exhibitions/ExhibitionListCreate';
import ExhibitionReview from '../Exhibitions/ExhibitionReview';
import HomePage from '../HomePage';
import MyPage from '../Mypage/MyPage';
import Layout from '../Components/Layout /Layout';
import ExhibitionSearch from '../Exhibitions/ExhibitionSearch';
import AuthLayout from '../Components/Layout /AuthLayout';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import SpaceReview from '../Spaces/SpaceReview';
import ReserveComplete from '../common/ReserveComplete';
import SpaceManage from '../Spaces/SpaceManage';
import SpaceListCreate from '../Spaces/SpaceListCreate';
import SpaceManageDetail from '../Spaces/SpaceManageDetail';
import SpaceEdit from '../Spaces/SpaceEdit';
import Reserve from '../common/Reserve';
import MyActivity from '../Mypage/MyActivity';
import MySpaces from '../Mypage/MySpaces';
import ExhibitionEdit from '../Exhibitions/ExhibitionEdit';

const router = createBrowserRouter([
    //로그인을 하지 않았을 경우 넘어가는 layout 시작 부분
    {
        path: '/',
        element: <AuthLayout />,
        // errorElement: <ErrorPage />, // 추후에 만들고 설정할게요 에러 페이지가 따로 없는 것 같아서
        children: [
            {
                // index: true,
                element: <Login />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
        ],
    },
    //로그인을 했을 경우 넘어가는 layout 시작 부분
    {
        path: '/',
        element: <Layout />,
        // errorElement: <ErrorPage />, 추후에 만들고 설정할게요 에러 페이지가 따로 없는 것 같아서
        children: [
            {
                index: true,
                element: <HomePage />,
            },

            // 전시 관련 페이지 라우팅
            {
                path: 'exhibitions/search',
                element: <ExhibitionSearch />,
            },
            {
                path: 'exhibitions',
                element: <ExhibitionList />,
            },
            {
                path: 'exhibitions/new',
                element: <ExhibitionListCreate />,
            },
            {
                path: 'exhibitions/:id',
                element: <ExhibitionDetail />,
            },
            {
                path: 'exhibitions/:id/review',
                element: <ExhibitionReview />,
            },
            {
                path: 'exhibitions/edit/:id',
                element: <ExhibitionEdit />,
            },

            //공간 대여 관련 페이지 => 추후에 세부하게 설정하는 게 좋을 것 같으면 그렇게 수정할게요
            {
                path: 'spaces',
                element: <SpaceList />,
            },
            {
                path: 'spaces/:id/request',
                element: <SpaceRequest />,
            },
            {
                path: 'spaces/:id',
                element: <SpaceDetail />,
            },
            {
                path: 'spaces/:id/review',
                element: <SpaceReview />,
            },
            {
                path: 'spaces/:id/reserveComplete',
                element: <ReserveComplete />,
            },
            {
                path: 'spaces/management',
                element: <SpaceManage />,
            },
            {
                path: 'spaces/new',
                element: <SpaceListCreate />,
            },
            {
                path: 'spaces/management/:id',
                element: <SpaceManageDetail />,
            },
            {
                path: 'spaces/edit/:id',
                element: <SpaceEdit />,
            },
            {
                path: 'spaces/reserve',
                element: <Reserve />,
            },

            //마이페이지 관련
            {
                path: 'mypage',
                element: <MyPage />,
                children: [
                    {
                        index: true, // 기본 라우트
                        element: <ProfileEdit />, // mypage 들어오면 바로 ProfileEdit
                    },
                    {
                        path: 'profile',
                        element: <ProfileEdit />,
                    },
                    {
                        path: 'activity',
                        element: <MyActivity />,
                    },
                    {
                        path: 'rents',
                        element: <MyRents />,
                    },
                    {
                        path: 'exhibitions',
                        element: <MyExhibitions />,
                    },
                    {
                        path: 'spaces',
                        element: <MySpaces />,
                    },
                ],
            },
        ],
    },
]);

export default router;
