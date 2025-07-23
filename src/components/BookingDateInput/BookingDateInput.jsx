import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingDateInput.module.css";

const BookingDateInput = ({ name, value, onChange }) => {
  return (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      placeholderText="Booking date"
      className={css.bookingInput}
      calendarClassName={css.calendar}
      name={name}
    />
  );
};

export default BookingDateInput;
