import images from '../../../icons/images.svg';
import { SectionHeader } from '../../Components/Common/SectionHeader';
import { FileUpload } from '../../Components/Common/FileUpload';

interface ImageUploadSectionProps {
    imageFiles: File[];
    onChangeImageFiles: (files: File[]) => void;
}

export function ImageUploadSection({ imageFiles, onChangeImageFiles }: ImageUploadSectionProps) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[1040px]">
            <SectionHeader number={2} title="전시 이미지 업로드" />

            <FileUpload
                label="대표 이미지 등록"
                files={imageFiles}
                onChange={onChangeImageFiles}
                maxFiles={5}
                emptyStateIcon={images}
                emptyStateIconAlt="images icon"
                emptyStateText="전시 분위기를 보여줄 수 있는 이미지를 업로드해주세요. 최대 5장까지 등록할 수 있어요."
            />
        </div>
    );
}
