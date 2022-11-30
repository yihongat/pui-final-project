import { NextPage } from "next";
import Head from "next/head";
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

const Analysis: NextPage = () => {
  const [currentView, setCurrentView] = useState(0);
  const router = useRouter();
  const { watchHistory } = useDataContext();

  useEffect(() => {
    if (watchHistory.length === 0) {
      router.push("/upload");
    }
  }, [router, watchHistory]);

  return (
    <div
      className={classNames(
        "h-screen w-full overflow-y-auto overflow-x-hidden py-8 "
      )}
    >
      <Head>
        <title>Year In Review - Analysis</title>
      </Head>
      <AnimatePresence mode="wait">
        {watchHistory && (
          <div className="h-full" key={currentView}>
            {VIEWS_TO_COMPONENT[VIEWS[currentView]]}
          </div>
        )}
      </AnimatePresence>
      <div className="flex items-center w-full justify-center gap-4 absolute bottom-8">
        <div
          className="cursor-pointer flex items-center rounded-lg p-2 hover:bg-secondary"
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
        <div className="w-8 font-semibold">{`${currentView + 1} / ${
          VIEWS.length
        }`}</div>
        <div
          className="cursor-pointer flex items-center rounded-lg p-2 hover:bg-secondary"
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
