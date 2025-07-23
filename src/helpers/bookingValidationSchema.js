import * as Yup from "yup";

export const bookingValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bookingDate: Yup.date().nullable(),
  comment: Yup.string(),
});
