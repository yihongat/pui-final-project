import Image from "next/image";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../../common/DataContext/DataContext";
import { getVideosWatchedByDay } from "../../utils/utils";
import { Calendar } from "../../utils/Calendar";
import { SHAPES } from "../../common/Shapes/Shapes";
import { PageTransition } from "../../common/PageTransition/PageTransition";

const YearInVideos = () => {
  const { watchHistory } = useDataContext();
  const calendar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = Calendar(
      getVideosWatchedByDay(
        watchHistory,
        new Date(2022, 0, 1),
        new Date(2022, 11, 31)
      ),
      {
        x: (d: any) => d.date,
        y: (d: any) => d.videoCount,
      }
    );
    calendar.current?.replaceChildren(c as any);
  }, [watchHistory]);
  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col justify-center items-center pb-12 lg:pb-8 pt-2"
        )}
      >
        <div className="w-12/12 lg:w-8/12 ax-w-[1000px] flex flex-col text-center items-center gap-8 md:gap-16">
          <PageTransition className="w-10/12" delay={1}>
            <h2>
              Your year in <span className="text-primary mr-6">videos</span>
            </h2>
          </PageTransition>
          <PageTransition className="w-11/12" delay={2} mobileOnly>
            <div className="tracking-normal" ref={calendar}></div>
          </PageTransition>
          <PageTransition className="w-10/12" delay={2}>
            <p className="text mt-6">Each pixel represents a day.</p>
          </PageTransition>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-screen overflow-hidden opacity-80 hidden lg:block">
        <PageTransition
          delay={0.2}
          className="bottom-[15%] left-[-2%] absolute w-[40vh] h-[40vh]"
        >
          <Image
            src={SHAPES.Cube3Shape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.4}
          className="top-[15%] right-[2%] absolute w-[20vh] h-[20vh]"
        >
          <Image
            src={SHAPES.Cube2Shape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.6}
          className="bottom-[-15%] right-[10%] absolute w-[54vh] h-[54vh]"
        >
          <Image
            src={SHAPES.Cube1Shape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
      </div>
    </>
  );
};

export default YearInVideos;
