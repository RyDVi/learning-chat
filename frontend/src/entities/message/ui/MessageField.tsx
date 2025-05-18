import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import React, { useId } from "react";

interface MessageFieldProps {
  rightActions?: React.ReactNode;
}

export const MessageField: React.FC<MessageFieldProps & OutlinedInputProps> = ({
  rightActions,
  ...props
}) => {
  const inputId = useId();
  return (
    <FormControl variant="outlined" sx={{ width: 1 }}>
      <InputLabel htmlFor={inputId}>Введите сообщение</InputLabel>
      <OutlinedInput
        id={inputId}
        type="text"
        name="text"
        multiline
        label="Введите сообщение"
        {...props}
        endAdornment={
          <InputAdornment position="end">{rightActions}</InputAdornment>
        }
      />
    </FormControl>
  );
};
