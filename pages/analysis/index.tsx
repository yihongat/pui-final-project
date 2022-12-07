import { GetServerSideProps, NextPage, NextPageContext } from "next";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames";
import GeneralStats from "../../components/Analysis/GeneralStats/GeneralStats";
import ArrowLeft from "../../public/images/arrow-left.svg";
import ArrowRight from "../../public/images/arrow-right.svg";
import TopCreator from "../../components/Analysis/TopCreator/TopCreator";
import TopCreators from "../../components/Analysis/TopCreators/TopCreators";
import YearInVideos from "../../components/Analysis/YearInVideos/YearInVideos";
import DailyStats from "../../components/Analysis/DailyStats/DailyStats";
import MonthlyStats from "../../components/Analysis/MonthlyStats/MonthlyStats";
import { useRouter } from "next/router";
import { useDataContext } from "../../components/common/DataContext/DataContext";
import { AnimatePresence } from "framer-motion";
import ShareView from "../../components/Analysis/ShareView/ShareView";
import TitleHead from "../../components/common/TitleHead/TitleHead";
import { DOMAIN } from "../../components/utils/globals";
import sampleWatchHistory from "../../public/files/watch-history.json";
import {
  getDetailedCreatorData,
  getVideosForTimeFrame,
  getVideosWatchedByCreator,
  preprocessWatchHistoryData,
} from "../../components/utils/utils";

const VIEWS_TO_COMPONENT: { [k: string]: JSX.Element } = {
  general: <GeneralStats />,
  top: <TopCreator />,
  topCreators: <TopCreators />,
  yearInVideos: <YearInVideos />,
  dailyStats: <DailyStats />,
  monthlyStats: <MonthlyStats />,
  share: <ShareView />,
};
const VIEWS = [
  "general",
  "top",
  "topCreators",
  "dailyStats",
  "monthlyStats",
  "yearInVideos",
  "share",
];

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { query },
  };
};

const Analysis: NextPage = ({ query }: any) => {
  const [currentView, setCurrentView] = useState(Number(query.page ?? 0));
  const router = useRouter();
  const { watchHistory, setWatchHistory, setTopCreators } = useDataContext();

  useEffect(() => {
    const loadSampleData = async () => {
      const parsedData = getVideosForTimeFrame(
        preprocessWatchHistoryData(sampleWatchHistory as any),
        new Date(2022, 0, 1),
        new Date(2022, 11, 31)
      );
      setWatchHistory(parsedData);

      const creators = getVideosWatchedByCreator(parsedData);
      const topCreatorEntries = Object.entries(creators)
        .sort((a, b) => b[1].videosWatched - a[1].videosWatched)
        .slice(0, 10);
      const topCreatorDetails = topCreatorEntries.map((creator) => creator[1]);
      const creatorData = await getDetailedCreatorData(topCreatorDetails);
      setTopCreators(creatorData);
    };

    if (query.useSampleData) {
      loadSampleData();
    }
  }, [query, setTopCreators, setWatchHistory]);

  useEffect(() => {
    if (!query.useSampleData && watchHistory.length === 0) {
      router.push("/upload");
    }
  }, [query, router, watchHistory]);

  return (
    <div
      className={classNames(
        "h-screen w-full overflow-y-auto overflow-x-hidden py-8 "
      )}
    >
      <TitleHead title="Year In Review">
        <meta
          name="description"
          content="View YouTube Year In Review by visualizing your data."
        />
        <meta property="og:url" content={DOMAIN} />
        <meta
          name="og:description"
          content="View YouTube Year In Review by visualizing your data."
        />
        <meta property="og:image" content={`${DOMAIN}/landing.png`} />
      </TitleHead>
      <AnimatePresence mode="wait">
        {watchHistory && (
          <div className="h-full hidden lg:block" key={currentView}>
            {VIEWS_TO_COMPONENT[VIEWS[currentView]]}
          </div>
        )}
        <div className="block lg:hidden">
          {VIEWS.map((v) => (
            <div key={v} className="min-h-[70vh]">
              {VIEWS_TO_COMPONENT[v]}
            </div>
          ))}
        </div>
      </AnimatePresence>
      <div className="flex items-center w-full justify-center gap-2 absolute bottom-8">
        <div
          className="cursor-pointer flex items-center rounded-lg p-1 w-12"
          onClick={() => {
            if (currentView === 0) {
              router.push("/upload");
            } else {
              setCurrentView((prevView) => Math.max(0, prevView - 1));
            }
          }}
        >
          <Image src={ArrowLeft} alt="Back" />
        </div>
        <div className="w-8 font-medium">{`${currentView + 1} / ${
          VIEWS.length
        }`}</div>
        <div
          className="cursor-pointer flex items-center rounded-lg p-1 w-12"
          onClick={() => {
            setCurrentView((prevView) =>
              Math.min(VIEWS.length - 1, prevView + 1)
            );
          }}
        >
          <Image src={ArrowRight} alt="Next" />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
