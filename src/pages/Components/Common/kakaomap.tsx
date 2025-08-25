/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

interface MapProps {
    latitude?: number;
    longitude?: number;
    placeName?: string; // optional
}

export default function KakaoMap({ latitude, longitude, placeName }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    // Kakao Map 렌더링
    useEffect(() => {
        const lat = latitude ?? 37.5665;
        const lng = longitude ?? 126.978;

        if (!mapRef.current || !(window as any).kakao) return;
        const { kakao } = window as any;

        kakao.maps.load(() => {
            const container = mapRef.current!;
            const options = { center: new kakao.maps.LatLng(lat, lng), level: 3 };
            const map = new kakao.maps.Map(container, options);

            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(lat, lng),
            });
            marker.setMap(map);
        });
    }, [latitude, longitude]);

    // 클릭 시 카카오맵 이동
    const handleClick = () => {
        if (!latitude || !longitude) return;
        const name = placeName ? encodeURIComponent(placeName) : '';
        const url = `https://map.kakao.com/link/map/${name},${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return <div ref={mapRef} className="w-full h-[300px] rounded-2xl cursor-pointer" onClick={handleClick} />;
}
