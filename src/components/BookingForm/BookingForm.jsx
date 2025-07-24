import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import css from "./BookingForm.module.css";
import BookingDateInput from "../BookingDateInput/BookingDateInput.jsx";
import { bookingValidationSchema } from "../../helpers/bookingValidationSchema.js";

const BookingForm = () => {
  const initialValues = {
    name: "",
    email: "",
    comment: "",
    bookingDate: null,
  };

  const handleSubmit = (values, { resetForm }) => {
    toast.success("Booking successful!");
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={bookingValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={css.form}>
            <h2 className={css.titleForm}>Book your car now</h2>
            <p className={css.textForm}>
              Stay connected! We are always ready to help you.
            </p>

            <div className={css.formOrder}>
              <div>
                <Field
                  className={css.nameForm}
                  type="text"
                  name="name"
                  placeholder="Name*"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>
              <div>
                <Field
                  className={css.emailForm}
                  type="email"
                  name="email"
                  placeholder="Email*"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
              <BookingDateInput
                name="bookingDate"
                value={values.bookingDate}
                onChange={(date) => setFieldValue("bookingDate", date)}
              />
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={css.error}
              />
              <div>
                <Field
                  as="textarea"
                  className={css.textareaForm}
                  name="comment"
                  placeholder="Comment"
                  rows="3"
                />
              </div>
            </div>

            <button className={css.buttonForm} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default BookingForm;
