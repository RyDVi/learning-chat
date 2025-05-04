import * as yup from "yup";

export const registerValidator = yup.object({
  email: yup.string().email('Неверный фрмат почты').required('Необходимо указать почту'),
  password: yup.string().min(6, 'Пароль должен быть длиной не менее 6 символов').required('Необходимо указать пароль'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Пожалуйста, подтвердите ввод пароля"),
});
