import { createBrowserRouter } from 'react-router-dom';
import { PublicRoute } from './publicRoute';
import { ProtectedRoute } from './protectedRoute';

import Login from '../Auth/Login';
import HomePage from '../HomePage';

// 전시 관련
import ExhibitionList from '../Exhibitions/ExhibitionList';
import ExhibitionDetail from '../Exhibitions/ExhibitionDetail';
import ExhibitionListCreate from '../Exhibitions/ExhibitionListCreate';
import ExhibitionReview from '../Exhibitions/ExhibitionReview';
import ExhibitionSearch from '../Exhibitions/ExhibitionSearch';
import ExhibitionPreview from '../Exhibitions/ExhibitionPreview';

// 공간 관련
import SpaceList from '../Spaces/SpaceList';
import SpaceRequest from '../Spaces/SpaceRequest';
import SpaceDetail from '../Spaces/SpaceDetail';
import SpaceReview from '../Spaces/SpaceReview';
import SpaceManage from '../Spaces/SpaceManage';
import SpaceListCreate from '../Spaces/SpaceListCreate';
import SpaceManageDetail from '../Spaces/SpaceManageDetail';
import SpaceEdit from '../Spaces/SpaceEdit';
import Reserve from '../common/Reserve';
import MyActivity from '../Mypage/MyActivity';
import MySpaces from '../Mypage/MySpaces';
import ExhibitionEdit from '../Exhibitions/ExhibitionEdit';
import ReserveComplete from '../common/ReserveComplete';

// 마이페이지 관련
import MyPage from '../Mypage/MyPage';
import MyExhibitions from '../Mypage/MyExhibitions';
import MyRents from '../Mypage/MyRents';
import ProfileEdit from '../Mypage/ProfileEdit';
import Layout from '../Components/Layout /Layout';
import AuthLayout from '../Components/Layout /AuthLayout';
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        children: [{ index: true, element: <Login /> }],
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            { path: 'home', element: <HomePage /> },
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
            // 전시 관련
            { path: 'exhibitions/search', element: <ExhibitionSearch /> },
            { path: 'exhibitions', element: <ExhibitionList /> },
            { path: 'exhibitions/new', element: <ExhibitionListCreate /> },
            { path: 'exhibitions/:id', element: <ExhibitionDetail /> },
            { path: 'exhibitions/:id/review', element: <ExhibitionReview /> },
            { path: 'exhibitions/:id/preview', element: <ExhibitionPreview /> },

            // 공간 관련
            { path: 'spaces', element: <SpaceList /> },
            { path: 'spaces/new', element: <SpaceListCreate /> },
            { path: 'spaces/:id', element: <SpaceDetail /> },
            { path: 'spaces/:id/request', element: <SpaceRequest /> },
            { path: 'spaces/:id/review', element: <SpaceReview /> },
            { path: 'spaces/:id/reserveComplete', element: <ReserveComplete /> },
            { path: 'spaces/management', element: <SpaceManage /> },
            { path: 'spaces/management/:id', element: <SpaceManageDetail /> },
            { path: 'spaces/edit/:id', element: <SpaceEdit /> },
            { path: 'spaces/reserve', element: <Reserve /> },
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
            // 마이페이지
            { path: 'mypage', element: <MyPage /> },
            { path: 'mypage/exhibitions', element: <MyExhibitions /> },
            { path: 'mypage/rents', element: <MyRents /> },
            { path: 'mypage/profile', element: <ProfileEdit /> },
        ],
    },
]);

export default router;
