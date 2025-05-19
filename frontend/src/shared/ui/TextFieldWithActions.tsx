import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import React, { useId } from "react";

export interface TextFieldWithActionsProps extends OutlinedInputProps {
  rightActions: React.ReactNode;
}

export const TextFieldWithActions: React.FC<TextFieldWithActionsProps> = ({
  rightActions,
  ...props
}) => {
  const inputId = useId();
  return (
    <FormControl variant="outlined" sx={{ width: 1 }}>
      <InputLabel htmlFor={inputId}>{props.label}</InputLabel>
      <OutlinedInput
        id={inputId}
        type="text"
        name="text"
        {...props}
        endAdornment={
          <InputAdornment position="end">{rightActions}</InputAdornment>
        }
      />
    </FormControl>
  );
};
