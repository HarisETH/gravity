// React Imports

import Head from "next/head";
import Image from "next/image";

// Component Imports

import Editor from "@/components/Editor";
import Header from "@/components/Header";
//API Imports
import { Button, Spacer } from "@nextui-org/react";
//CodeMirror
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import CodeMirror from "@uiw/react-codemirror";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gravity - LightWeight Code Screenshot Exporter</title>
        <meta
          name="description"
          content="Code Screenshot exporter light as a feather fast as light"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className="flex bg-gray-100 flex-col items-center justify-start gradient-background font-lexend pt-16 min-h-screen w-full  ">
        {/* <Header /> */}

        <Editor  />


        <div className="absolute bottom-6 right-6 p-12 px-0 py-0">
        <a href="https://github.com/hariseth/gravity"  type="button" class="font-lexend text-white border-none bg-gradient-to-r from-green-400 via-green-500 to-green-600 cursor-pointer hover:bg-gradient-to-br font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2 flex items-center justify-between gap-1.5 leading-none"> <GitHubLogoIcon/> Star on Github</a>
        </div>

      </main>
    </>
  );
}

// installed codemirror base, themes, languages
