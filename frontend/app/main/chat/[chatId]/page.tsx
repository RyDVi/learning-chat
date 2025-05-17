import { paths } from "@/src/shared/lib";
import { ChatMessagesWidget } from "@/src/widgets/messages";
import { PropsWithChildren } from "react";

export default async function Page({
  params,
}: PropsWithChildren<{ params: Promise<Parameters<typeof paths.chat>[0]> }>) {
  const { chatId } = await params;
  return (
    <>
      {/* <ChatHeaderWidget chatId={chatId} /> */}
      <ChatMessagesWidget chatId={chatId} />
      {/* <SendMessageInChatWidget chatId={chatId} /> */}
    </>
  );
}
