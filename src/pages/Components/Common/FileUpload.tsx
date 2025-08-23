interface FileUploadProps {
    label: string;
    files: File[];
    onChange: (files: File[]) => void;
    maxFiles?: number;
    accept?: string;
    multiple?: boolean;
    emptyStateIcon?: string;
    emptyStateIconAlt?: string;
    emptyStateText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    label,
    files,
    onChange,
    maxFiles = 5,
    accept = 'image/*',
    multiple = true,
    emptyStateIcon,
    emptyStateIconAlt,
    emptyStateText,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        const newFiles = [...files, ...filesArray].slice(0, maxFiles);
        onChange(newFiles);
    };

    const inputId = `fileInput-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg text-primary-300 ml-1">{label}</span>
            <div
                className="rounded-lg p-3 w-full min-h-[200px] border border-primary-300 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => document.getElementById(inputId)?.click()}
            >
                {files.length === 0 ? (
                    <div className="flex flex-col items-center text-center">
                        {emptyStateIcon && <img src={emptyStateIcon} alt={emptyStateIconAlt} className="w-9 h-9 mb-2" />}
                        <span className="text-default-gray-600">{emptyStateText}</span>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-2">
                        {files.map((file, index) => (
                            <div key={index}>{file.name}</div>
                        ))}
                    </div>
                )}
                <input type="file" accept={accept} multiple={multiple} onChange={handleFileChange} className="hidden" id={inputId} />
            </div>
            <span className="text-default-gray-500 text-sm text-right block mr-1">
                {files.length} /{maxFiles}
            </span>
        </div>
    );
};
