import { AuthLayout } from "@/src/widgets/auth";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
