import Image from "next/image";
import classNames from "classnames";
import { Perspective } from "../../common/Perspective";
import { useDataContext } from "../../common/DataContext/DataContext";
import { getVideosWatchedByCreator } from "../../utils/utils";
import { SHAPES } from "../../common/Shapes/Shapes";
import { PageTransition } from "../../common/PageTransition/PageTransition";

// @ts-ignore
import AnimatedNumber from "react-animated-number";

const GeneralStats = () => {
  const { watchHistory } = useDataContext();

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col h-full justify-center items-center pb-24 pt-2"
        )}
      >
        <Perspective className="flex-col w-full h-full">
          <div className="w-10/12 lg:w-8/12 max-w-[1000px] flex flex-col">
            <PageTransition delay={1}>
              <h2>This year, you have watched</h2>
            </PageTransition>
            <PageTransition delay={2}>
              <h2>
                <span className="text-[54px] mr-2 md:text-[100px] md:mr-4 lg:text-[200px] tracking-[-.05em] leading-tight text-primary lg:mr-6 inline">
                  {watchHistory ? watchHistory.length : 0}
                </span>{" "}
                videos
              </h2>
            </PageTransition>
            <PageTransition delay={3}>
              <h2>
                from{" "}
                <span className="text-primaryBlack inline">
                  {watchHistory
                    ? Object.keys(getVideosWatchedByCreator(watchHistory))
                        .length
                    : 0}
                </span>{" "}
                different creators
              </h2>
            </PageTransition>
          </div>
        </Perspective>
      </main>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden opacity-80 hidden lg:block">
        <PageTransition
          delay={0.1}
          className="bottom-[15%] left-[2%] absolute w-[30vh] h-[30vh]"
        >
          <Image
            src={SHAPES.HalfShape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="bottom-[-15%] right-[10%] absolute w-[54vh] h-[54vh]"
        >
          <Image
            src={SHAPES.Pie}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
      </div>
    </>
  );
};

export default GeneralStats;
