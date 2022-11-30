import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDataContext } from "../../common/DataContext/DataContext";
import { getHighestKey, getVideosWatchedByMonth } from "../../utils/utils";
import { BarChart } from "../../utils/BarChart";
import Image from "next/image";
import { SHAPES } from "../../common/Shapes/Shapes";
import { PageTransition } from "../../common/PageTransition/PageTransition";

const MonthlyStats = () => {
  const { watchHistory } = useDataContext();
  const monthBarChart = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = BarChart(getVideosWatchedByMonth(watchHistory), {
      x: (d) => d.month,
      y: (d) => d.videoCount,
      color: "#D74040",
      height: 360,
    });
    monthBarChart.current?.replaceChildren(c);
  }, [watchHistory]);

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col justify-center items-center pb-8 pt-8"
        )}
      >
        <div className="w-full max-w-[1000px] flex flex-col items-center">
          <PageTransition delay={2}>
            <h1 className="text-primaryGrey">
              You watched the most videos in{" "}
              <span className="inline text-black mr-6">{`${getHighestKey(
                getVideosWatchedByMonth(watchHistory),
                "month",
                "videoCount"
              )}.`}</span>
            </h1>
          </PageTransition>
          <PageTransition delay={1}>
            <div className="mt-4 tracking-normal" ref={monthBarChart}></div>
          </PageTransition>
          <PageTransition delay={3.5}>
            <p className="text mt-6 w-full">Better content in the spring?</p>
          </PageTransition>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden">
        <PageTransition
          delay={0.4}
          className="bottom-[-20%] right-[2%] absolute w-[55vh] h-[55vh]"
        >
          <Image src={SHAPES.PlayShape} alt="" layout="fill" />
        </PageTransition>
      </div>
    </>
  );
};

export default MonthlyStats;
