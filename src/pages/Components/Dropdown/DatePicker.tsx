import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerInputProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
}

export default function DatePickerInput({ value, onChange, placeholder }: DatePickerInputProps) {
    return (
        <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="yyyy-MM-dd"
            placeholderText={placeholder}
            className="w-full border border-primary-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
    );
}
