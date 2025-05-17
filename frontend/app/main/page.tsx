import { paths } from "@/src/shared/lib";
import { redirect } from "next/navigation";

export default function MainPage() {
  return redirect(paths.chats({}));
}
