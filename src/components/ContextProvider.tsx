"use client";
import { MantineProvider } from "@mantine/core";
import React from "react";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      {children}
    </MantineProvider>
  );
}
