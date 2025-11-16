import { useLocation, useNavigate } from 'react-router-dom';

import exhibitionIcon from '../../icons/exhibition_icon.svg';

import { useExhibitionForm } from './useExhibitionForm';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { ImageUploadSection } from './sections/ImageUploadSection';
import { ScheduleSection } from './sections/ScheduleSection';
import { LocationSection } from './sections/LocationSection';
import { CharacteristicsSection } from './sections/CharacteristicsSection';
import { FacilitiesSection } from './sections/FacilitiesSection';
import { EntranceSection } from './sections/EntranceSection';
import { SubmitModal } from './sections/SubmitModal';

export default function ExhibitionListCreate() {
    const navigate = useNavigate();
    const location = useLocation();
    const prevData = location.state;

    const form = useExhibitionForm({ prevData });

    const {
        // 상태
        title,
        description,
        imageFiles,
        startDate,
        endDate,
        address,
        detailAddress,
        selectedValues,
        isSubmitting,
        step,

        // 옵션
        timeOptions,
        dayOffOptions,
        facilityOptions,

        // 핸들러들
        setTitle,
        setDescription,
        setImageFiles,
        setStartDate,
        setEndDate,
        setSelectedValues,

        handleSubmitExhibition,
        handleToggleDropdown,
        handleStartTimeChange,
        handleEndTimeChange,
        handleDayOffChange,
        handleHolidayClosedChange,
        handleFacilityChange,
        handleCompleteAddress,
        handlePriceOptionChange,
        handlePriceChange,
        handleLinkChange,
        togglePostcode,
        resetStep,
        openId,
        isPostcodeOpen,
        setDetailAddress,
        getSelectedFacilitiesLabel,
    } = form;

    // 미리보기 이동
    const handlePreview = () => {
        navigate('/exhibitions/preview', {
            state: {
                title,
                description,
                imageFiles,
                startDate,
                endDate,
                address,
                detailAddress,
                selectedValues: {
                    ...selectedValues,
                    facilities: getSelectedFacilitiesLabel(),
                },
            },
        });
    };

    return (
        <div className="flex flex-col items-center w-[70%] p-10 gap-10 mx-auto">
            {/* 상단 타이틀 */}
            <div className="flex items-center gap-3 w-full max-w-[1040px]">
                <img src={exhibitionIcon} alt="exhibition" className="w-[30px] h-[30px]" />
                <span className="text-3xl font-bold">전시 등록하기</span>
            </div>

            {/* 1. 전시 기본 정보 */}
            <BasicInfoSection title={title} description={description} onChangeTitle={setTitle} onChangeDescription={setDescription} />

            {/* 2. 전시 이미지 업로드 */}
            <ImageUploadSection imageFiles={imageFiles} onChangeImageFiles={setImageFiles} />

            {/* 3. 일정 및 운영 정보 */}
            <ScheduleSection
                startDate={startDate}
                endDate={endDate}
                onChangeStartDate={setStartDate}
                onChangeEndDate={setEndDate}
                timeOptions={timeOptions}
                openId={openId}
                onToggleDropdown={handleToggleDropdown}
                startTime={selectedValues.startTime}
                endTime={selectedValues.endTime}
                onChangeStartTime={handleStartTimeChange}
                onChangeEndTime={handleEndTimeChange}
                dayOffOptions={dayOffOptions}
                onChangeDayOff={handleDayOffChange}
                holidayClosed={selectedValues.holidayClosed}
                onChangeHolidayClosed={handleHolidayClosedChange}
            />

            {/* 4. 장소 정보 */}
            <LocationSection
                address={address}
                detailAddress={detailAddress}
                onChangeDetailAddress={setDetailAddress}
                isPostcodeOpen={isPostcodeOpen}
                onTogglePostcode={togglePostcode}
                onCompleteAddress={handleCompleteAddress}
            />

            {/* 5. 전시 성격 */}
            <CharacteristicsSection
                openId={openId}
                onToggleDropdown={handleToggleDropdown}
                selectedType={selectedValues.type}
                selectedForm={selectedValues.form}
                selectedMood={selectedValues.mood}
                onChangeSelectedValues={setSelectedValues}
            />

            {/* 6. 시설 옵션 */}
            <FacilitiesSection facilityOptions={facilityOptions} onChangeFacility={handleFacilityChange} />

            {/* 7. 입장 및 외부 링크 */}
            <EntranceSection
                openId={openId}
                onToggleDropdown={handleToggleDropdown}
                priceOption={selectedValues.priceOption}
                price={selectedValues.price}
                link={selectedValues.link}
                onChangePriceOption={handlePriceOptionChange}
                onChangePrice={handlePriceChange}
                onChangeLink={handleLinkChange}
            />

            {/* 버튼 영역 */}
            <div className="flex gap-6 mt-12 justify-center">
                <button className="w-[170px] h-[60px] rounded-[50px] bg-white text-lg text-primary-300 border border-primary-300" onClick={handlePreview}>
                    미리보기
                </button>

                <button
                    className="w-[170px] h-[60px] rounded-[50px] text-white text-lg"
                    style={{
                        backgroundColor: 'var(--color-primary-300)',
                        border: `1px solid var(--color-primary-300)`,
                        opacity: isSubmitting ? 0.7 : 1,
                    }}
                    onClick={handleSubmitExhibition}
                    disabled={isSubmitting}
                >
                    등록하기
                </button>
            </div>

            {/* 모달 */}
            <SubmitModal step={step} onClose={resetStep} onConfirmFirst={() => form.setStep(1)} onConfirmSecond={() => navigate('/')} />
        </div>
    );
}
