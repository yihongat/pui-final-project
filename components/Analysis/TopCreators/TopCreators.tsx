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
import { Calendar } from "../../utils/Calendar";
import { SHAPES } from "../../common/Shapes/Shapes";
import { PageTransition } from "../../common/PageTransition/PageTransition";

const TopCreators = () => {
  const { topCreators } = useDataContext();

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col justify-center items-center pb-8 pt-8"
        )}
      >
        <div className="w-8/12 max-w-[1000px] flex flex-col text-center items-center">
          <PageTransition delay={1}>
            <h2>Top Creators</h2>
          </PageTransition>
          <PageTransition delay={1.5}>
            <p className="text mt-6">These creators made your year.</p>
          </PageTransition>
          <div className="flex w-full mt-10">
            <PageTransition delay={3} className="basis-7/12 grow-0 shrink-0">
              {topCreators.map((creator, i) => (
                <div className="flex text-left mt-2" key={i}>
                  <h4 className="basis-20 text-primaryGrey grow-0 shrink-0">{`${
                    i + 1
                  }.`}</h4>
                  <h4>{creator.name}</h4>
                </div>
              ))}
            </PageTransition>
            <PageTransition
              delay={4}
              className="relative basis-5/12 grow-0 shrink-0 pt-8"
            >
              <div className="relative w-full h-full">
                <div className="w-[50%] absolute aspect-square left-[20%] top-0 rounded-full overflow-hidden border-[12px] border-tertiary">
                  <Image
                    src={topCreators[0].imageUrl.url}
                    alt={topCreators[0].name}
                    layout="fill"
                  />
                </div>
                <div className="w-[40%] absolute aspect-square left-0 top-[50%] rounded-full overflow-hidden border-[12px] border-tertiary">
                  <Image
                    src={topCreators[1].imageUrl.url}
                    alt={topCreators[1].name}
                    layout="fill"
                  />
                </div>
                <div className="w-[30%] absolute aspect-square left-[60%] top-[50%] rounded-full overflow-hidden border-[12px] border-tertiary">
                  <Image
                    src={topCreators[2].imageUrl.url}
                    alt={topCreators[2].name}
                    layout="fill"
                  />
                </div>
              </div>
            </PageTransition>
          </div>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-screen overflow-hidden">
        <PageTransition
          delay={0.1}
          className="bottom-[20%] left-[2%] absolute w-[25vh] h-[25vh]"
        >
          <Image src={SHAPES.HalfShape} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="top-[15%] right-[10%] absolute w-[15vh] h-[15vh]"
        >
          <Image src={SHAPES.Rock1} alt="" layout="fill" />
        </PageTransition>
      </div>
    </>
  );
};

export default TopCreators;
