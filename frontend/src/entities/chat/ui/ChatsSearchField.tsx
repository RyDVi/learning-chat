import {
  TextFieldWithActions,
  TextFieldWithActionsProps,
} from "@/src/shared/ui/TextFieldWithActions";
import React from "react";

export const ChatsSearchField: React.FC<TextFieldWithActionsProps> = (
  props
) => <TextFieldWithActions label="Введите название чата" {...props} />;
