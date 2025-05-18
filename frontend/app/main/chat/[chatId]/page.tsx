import { paths } from "@/src/shared/lib";
import { ChatMessagesWidget } from "@/src/widgets/messages";
import { SendMessageWidget } from "@/src/widgets/sendMessageWidget";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export default async function Page({
  params,
}: PropsWithChildren<{ params: Promise<Parameters<typeof paths.chat>[0]> }>) {
  const { chatId } = await params;
  return (
    <>
      {/* <ChatHeaderWidget chatId={chatId} /> */}
      <ChatMessagesWidget chatId={chatId} />
      <Box sx={{ marginTop: "auto" }}>
        <SendMessageWidget chatId={chatId} />
      </Box>
    </>
  );
}
