import {
  TextFieldWithActions,
  TextFieldWithActionsProps,
} from "@/src/shared/ui/TextFieldWithActions";
import React from "react";

export const MessageField: React.FC<TextFieldWithActionsProps> = (props) => (
  <TextFieldWithActions label="Введите сообщение" {...props} />
);
