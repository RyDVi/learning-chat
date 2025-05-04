"use client";
// Здесь всегд неизвестные типы возврата / ошибок
/* eslint-disable @typescript-eslint/no-explicit-any */
import { enqueueSnackbar } from "notistack";

export function catchError<Props, R>(
  action: (...props: Props[]) => Promise<R>
) {
  return async (...props: Props[]) => {
    try {
      return await action(...props);
    } catch (error: any) {
      enqueueSnackbar({
        variant: "error",
        message: String(error),
      });
      throw error;
    }
  };
}
