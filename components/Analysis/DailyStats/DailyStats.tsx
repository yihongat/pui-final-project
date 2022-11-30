import * as d3 from "d3";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDataContext } from "../../common/DataContext/DataContext";
import {
  getHighestKey,
  getNameFromTimeOfDay,
  getVideosWatchedByDayOfWeek,
  getVideosWatchedByHour,
} from "../../utils/utils";
import { HorizontalBarChart } from "../../utils/HorizontalBarChart";
import { LineChart } from "../../utils/LineChart";
import Image from "next/image";
import { SHAPES } from "../../common/Shapes/Shapes";
import { PageTransition } from "../../common/PageTransition/PageTransition";

const DailyStats = () => {
  const { watchHistory } = useDataContext();
  const barChart = useRef<HTMLDivElement>(null);
  const lineChart = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = HorizontalBarChart(
      getVideosWatchedByDayOfWeek(
        watchHistory,
        new Date(2022, 0, 1),
        new Date(2022, 11, 31)
      )
    );
    barChart.current?.replaceChildren(c);
    const lc = LineChart(getVideosWatchedByHour(watchHistory), {
      x: (d) => d.hour,
      y: (d) => d.videoCount,
      xType: d3.scaleLinear,
      yLabel: "Videos Watched",
      curve: d3.curveBasis,
      strokeWidth: 3,
      areaColor: "#D74040",
      color: "#D74040",
      showCircle: true,
    });
    lineChart.current?.replaceChildren(lc);
  }, [watchHistory]);

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col justify-center items-center pb-8 pt-8"
        )}
      >
        <div className="w-full max-w-[1000px] flex flex-col items-center">
          <PageTransition delay={2.5}>
            <h1 className="text-primaryGrey">
              You enjoy watching videos on{" "}
              <PageTransition
                delay={3.5}
                className="inline text-black mr-6"
              >{`${getHighestKey(
                getVideosWatchedByDayOfWeek(
                  watchHistory,
                  new Date(2022, 0, 1),
                  new Date(2022, 11, 31)
                ),
                "day",
                "videoCount"
              )} ${getNameFromTimeOfDay(
                Number(
                  getHighestKey(
                    getVideosWatchedByHour(watchHistory),
                    "hour",
                    "videoCount"
                  )
                )
              )}.`}</PageTransition>
            </h1>
          </PageTransition>
          <div className="flex items-center mt-8">
            <PageTransition delay={1}>
              <div className="tracking-normal" ref={barChart}></div>
            </PageTransition>
            <PageTransition delay={1.5}>
              <div className="tracking-normal" ref={lineChart}></div>
            </PageTransition>
          </div>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden">
        <PageTransition
          delay={0.3}
          className="bottom-[20%] left-[-2%] absolute w-[25vh] h-[25vh]"
        >
          <Image src={SHAPES.Rock3} alt="" layout="fill" />
        </PageTransition>
      </div>
    </>
  );
};

export default DailyStats;
