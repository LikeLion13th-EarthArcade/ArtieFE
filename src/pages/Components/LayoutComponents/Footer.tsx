export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-[rgba(254,247,247,0.5)] px-4 lg:px-8 py-8 text-sm text-gray-700">
            <div className="max-w-7xl mx-auto space-y-4">
                <div className="space-y-1 font-body1">
                    <img src="/ArtieLogo.svg" alt="" className="h-5" />
                    <address className="not-italic space-y-1 text-gray-700">
                        <p>
                            규모와 상관없이, 당신의 전시가 더 멀리 퍼질 수 있도록 <span className="text-[#E45F5F]">Artie</span>가 함께합니다.
                        </p>
                        <p>문의: contact@artie.co.kr</p>
                        <p>운영 시간: 월–금 10:00 ~ 18:00 </p>
                    </address>

                    <p className="text-gray-500 text-xs mt-2">
                        COPYRIGHT &copy; Artie. ALL RIGHTS RESERVED. <br />본 서비스는 포트폴리오/기획 목적으로 제작되었습니다.
                    </p>
                </div>
            </div>
        </footer>
    );
}
