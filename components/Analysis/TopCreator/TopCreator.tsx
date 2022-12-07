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

const TopCreator = () => {
  const { topCreators } = useDataContext();

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col justify-center items-center pb-12 lg:pb-8 pt-2"
        )}
      >
        <div className="w-10/12 lg:w-8/12 max-w-[1000px] flex flex-col text-left items-start lg:text-center lg:items-center">
          <PageTransition delay={1.5}>
            <h2>
              Your most watched creator was{" "}
              <span className="text-primary mr-6">{topCreators[0]?.name}</span>
            </h2>
          </PageTransition>
          <PageTransition delay={3} className="w-full">
            <p className="mt-6">
              You watched their videos{" "}
              <span className="font-semibold text-primary">
                {`${topCreators[0]?.videosWatched} times`}
              </span>{" "}
              this year.{" "}
            </p>
          </PageTransition>
          <PageTransition
            delay={1}
            className="w-full max-w-[150px] h-[150px] lg:max-w-[250px] relative lg:h-[250px] rounded-full overflow-hidden justify-center mt-8 lg:mt-16"
          >
            <Image
              src={topCreators[0]?.imageUrl.url}
              alt={topCreators[0]?.name}
              layout="fill"
            />
          </PageTransition>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden opacity-80 hidden lg:block">
        <PageTransition
          delay={0.1}
          className="bottom-[-5%] left-[10%] absolute w-[20vh] h-[20vh]"
        >
          <Image
            src={SHAPES.HalfShape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="bottom-[-5%] right-[5%] absolute w-[60vh] h-[60vh]"
        >
          <Image
            src={SHAPES.Forward}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.3}
          className="top-[5%] left-[-5%] absolute w-[54vh] h-[54vh]"
        >
          <Image
            src={SHAPES.Cone2}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
      </div>
    </>
  );
};

export default TopCreator;
