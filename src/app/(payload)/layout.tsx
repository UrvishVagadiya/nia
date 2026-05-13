import config from "@/payload.config";
import "@payloadcms/next/css";
import "./custom.css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";
import { importMap } from "./admin/importMap";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  try {
    return await handleServerFunctions({
      ...args,
      config,
      importMap,
    });
  } catch (error) {
    console.error("Payload Server Function Error:", error);
    throw error;
  }
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
