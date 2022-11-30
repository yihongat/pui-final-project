import React, { PropsWithChildren, useState } from "react";

function createContext<A extends {} | null>(displayName: string) {
  const ctx = React.createContext<A | undefined>(undefined);
  ctx.displayName = displayName;
  function useContext() {
    const c = React.useContext(ctx);
    if (c === undefined)
      throw new Error("useContext must be inside a Provider with a value");
    return c;
  }
  return [useContext, ctx.Provider] as const;
}

export interface VideoUploader {
  name: string;
  url: string;
}

export interface VideoMetadata {
  activityControls: string[];
  details?: {
    name: string;
  };
  subtitles?: VideoUploader[];
  time: Date;
  title: string;
  titleUrl: string;
}

export interface CreatorBase {
  name: string;
  url: string;
  videosWatched: number;
}

export interface DetailedCreator extends CreatorBase {
  description: string;
  imageUrl: {
    url: string;
    width: number;
    height: number;
  };
}

interface DataContext {
  fileName: string;
  setFileName: (value: string) => void;
  watchHistory: VideoMetadata[];
  setWatchHistory: (value: VideoMetadata[]) => void;
  topCreators: DetailedCreator[];
  setTopCreators: (value: DetailedCreator[]) => void;
}

export const [useDataContext, DataContextProvider] =
  createContext<DataContext>("Themes");

export const DataWrapper = ({ children }: PropsWithChildren) => {
  const [fileName, setFileName] = useState("");
  const [watchHistory, setWatchHistory] = useState<VideoMetadata[]>([]);
  const [topCreators, setTopCreators] = useState<DetailedCreator[]>([]);

  return (
    <DataContextProvider
      value={{
        fileName,
        setFileName,
        watchHistory,
        setWatchHistory,
        topCreators,
        setTopCreators,
      }}
    >
      {children}
    </DataContextProvider>
  );
};
