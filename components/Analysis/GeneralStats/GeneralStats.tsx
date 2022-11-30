import Image from "next/image";
import YearInReviewLogo from "../../public/images/year_in_review_wordmark.svg";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Perspective } from "../../common/Perspective";
import { useDataContext } from "../../common/DataContext/DataContext";
import {
  getVideosWatchedByCreator,
  getVideosWatchedByDay,
} from "../../utils/utils";
import { useRouter } from "next/router";
import { SHAPES } from "../../common/Shapes/Shapes";
import { PageTransition } from "../../common/PageTransition/PageTransition";

const GeneralStats = () => {
  const { watchHistory } = useDataContext();

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col h-full justify-center items-center pb-36 pt-2"
        )}
      >
        <Perspective className="flex-col w-full h-full">
          <div className="w-8/12 max-w-[1000px] flex flex-col">
            <PageTransition delay={1}>
              <h2>This year, you have watched</h2>
            </PageTransition>
            <PageTransition delay={2}>
              <h2>
                <span className="text-[200px] tracking-[-.05em] leading-tight text-primary mr-6">
                  {watchHistory.length}
                </span>{" "}
                videos
              </h2>
            </PageTransition>
            <PageTransition delay={3}>
              <h2>
                from{" "}
                <span className="text-primaryGrey">
                  {Object.keys(getVideosWatchedByCreator(watchHistory)).length}
                </span>{" "}
                different creators
              </h2>
            </PageTransition>
          </div>
        </Perspective>
      </main>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden">
        <PageTransition
          delay={0.1}
          className="bottom-[15%] left-[2%] absolute w-[30vh] h-[30vh]"
        >
          <Image src={SHAPES.HalfShape} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="bottom-[-15%] right-[10%] absolute w-[54vh] h-[54vh]"
        >
          <Image src={SHAPES.Pie} alt="" layout="fill" />
        </PageTransition>
      </div>
    </>
  );
};

export default GeneralStats;
