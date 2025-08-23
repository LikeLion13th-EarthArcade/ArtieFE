import { useLocation, useNavigate } from 'react-router-dom';
import paperIcon from '../../icons/paper.svg';
import mark_icon from '../../icons/mark_icon.svg';

import Gallery from '../Components/Exhibition/Gallery';

export default function ExhibitionPreview() {
    const navigate = useNavigate();
    const location = useLocation();
    const data =
        (location.state as {
            title: string;
            description: string;
            imageFiles: File[];
            startDate: string;
            endDate: string;
            address: string;
            detailAddress: string;
            selectedValues: {
                time: string;
                priceOption: string;
                price: string;
                link: string;
                facilities?: string[];
                type?: string;
                form?: string;
                mood?: string;
                startTime?: string;
                endTime?: string;
                dayOff?: string[];
                holidayClosed?: boolean;
            };
        }) || null;

    // 해시태그 배열 생성
    const hashtags = [data.selectedValues?.type, data.selectedValues?.form, data.selectedValues?.mood].filter(Boolean);

    // 정기 휴무 표시
    const formatDayOff = (dayOff?: string[]) => {
        if (!dayOff || dayOff.length === 0) {
            return '없음';
        }
        return dayOff.join(', ');
    };

    return (
        <div className="flex flex-col justify-center px-10 py-8 max-w-5xl mx-auto">
            {/* 헤더 */}
            <div>
                <div className="flex justify-between items-center w-full mb-10">
                    <div className="flex items-center gap-2 flex-1">
                        <img src={paperIcon} alt="paper" className="w-[25px] h-[25px]" />
                        <span className="text-2xl font-bold">미리보기</span>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() =>
                                navigate('/exhibitions/new', {
                                    state: data,
                                })
                            }
                            className="flex justify-center items-center border border-primary-300 text-sm text-primary-300 py-2 rounded-full w-[120px]"
                        >
                            미리보기 완료
                        </button>
                    </div>
                </div>

                {/* 제목 + 해시태그 + 주소 */}
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex gap-3">
                        <h1 className="text-3xl font-bold">{data.title || '제목 없음'}</h1>
                        <div className="flex flex-wrap gap-1 mt-2 items-center">
                            {hashtags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="text-gray-400 mt-2">
                    {data.address || ''} {data.detailAddress || ''}
                </p>
            </div>

            {/* 갤러리 */}
            {data.imageFiles && data.imageFiles.length > 0 && <Gallery images={data.imageFiles.map((file) => URL.createObjectURL(file))} />}

            {/* 전시 소개 */}
            <div className="mt-8 gap-2">
                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                    <img src={mark_icon} alt="" className="w-5 h-5" />
                    전시 개요
                </h3>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">기간</h3>
                        <p className="text-gray-600">
                            {data.startDate || '시작일 미입력'} ~ {data.endDate || '종료일 미입력'}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">운영 시간</h3>
                        <p className="text-gray-600">
                            {data.selectedValues?.startTime && data.selectedValues?.endTime
                                ? `${data.selectedValues.startTime} ~ ${data.selectedValues.endTime}`
                                : '미입력'}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">정기 휴무</h3>
                        <p className="text-gray-600">{formatDayOff(data.selectedValues?.dayOff)}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">공휴일 휴관</h3>
                        <p className="text-gray-600">{data.selectedValues?.holidayClosed ? '휴무' : '영업'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">입장료</h3>
                        <p className="text-gray-600">
                            {data.selectedValues?.priceOption || ''} {data.selectedValues?.price || ''}
                        </p>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mt-5 mb-1">전시 소개</h3>
                <p className="text-gray-600">{data.description || '설명이 없습니다.'}</p>

                {data.selectedValues?.link && (
                    <>
                        <h3 className="text-lg font-semibold mt-5 mb-1">예매 링크</h3>
                        <a className="text-gray-600" href={data.selectedValues.link} target="_blank" rel="noreferrer">
                            {data.selectedValues.link}
                        </a>
                    </>
                )}
            </div>

            {/* 시설 / 옵션 */}
            {data.selectedValues?.facilities && data.selectedValues.facilities.length > 0 && (
                <div className="mt-5 gap-4">
                    <h3 className="font-bold text-lg mb-1">시설 옵션</h3>
                    <ul className="flex flex-wrap gap-4 list-none text-gray-600">
                        {data.selectedValues.facilities.map((f: string, idx: number) => (
                            <li key={idx}>{f}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 지도 */}
            {/* 임시 차원에서 냅두고 */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">위치 안내</h2>
                <div className="w-full h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">지도 API 들어갈 자리</div>
            </div>
        </div>
    );
}
