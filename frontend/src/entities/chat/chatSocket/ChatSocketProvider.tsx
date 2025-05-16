"use client";
import { PropsWithChildren, useMemo, useRef, useEffect } from "react";
import { ChatSocketContext, ChatSocketContextProps } from "./socketContext";
import { io } from "socket.io-client";
import { getAccessToken } from "@/src/shared/api/authManagerClient";

export const ChatSocketProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const clientSocket = useRef(
    io(process.env.NEXT_PUBLIC_BACKEND_WS_URL, {
      autoConnect: false,
      path: "/chat",
      transports: ["websocket"],
      auth: {
        token: getAccessToken(),
      },
    })
  );

  useEffect(() => {
    const socket = clientSocket.current;

    const accessToken = getAccessToken();
    if (!accessToken) return;

    socket.connect();

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      socket.off("connect_error");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const contextValue: ChatSocketContextProps = useMemo(
    () => ({
      socket: clientSocket.current,
    }),
    []
  );

  return (
    <ChatSocketContext.Provider value={contextValue}>
      {children}
    </ChatSocketContext.Provider>
  );
};
