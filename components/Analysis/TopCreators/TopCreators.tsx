import Image from "next/image";
import classNames from "classnames";
import { useDataContext } from "../../common/DataContext/DataContext";
import { SHAPES } from "../../common/Shapes/Shapes";
import { PageTransition } from "../../common/PageTransition/PageTransition";

const TopCreators = () => {
  const { topCreators } = useDataContext();

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col justify-center items-center pb-12 lg:pb-8 pt-2"
        )}
      >
        <div className="w-10/12 lg:w-8/12 max-w-[1000px] flex flex-col text-center items-center">
          <PageTransition delay={1}>
            <h2>Top Creators</h2>
          </PageTransition>
          <PageTransition delay={1.5}>
            <p className="text mt-6">These creators made your year.</p>
          </PageTransition>
          <div className="flex flex-col lg:hidden">
            {topCreators.map((creator, i) => (
              <PageTransition className="flex flex-col mt-2" key={i}>
                <h4>{creator.name}</h4>
              </PageTransition>
            ))}
          </div>
          <div className="w-full mt-10 hidden lg:flex">
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
                <div className="h-[50%] w-[50%] aspect-square left-[20%] top-0 rounded-full overflow-hidden border-[12px] border-tertiary relative">
                  <Image
                    src={topCreators[0]?.imageUrl.url}
                    alt={topCreators[0]?.name || "Your top creator"}
                    layout="fill"
                  />
                </div>
                <div className="flex justify-between h-[50%]">
                  <div className="h-[80%] w-[40%]  aspect-square rounded-full overflow-hidden border-[12px] border-tertiary relative">
                    <Image
                      src={topCreators[1]?.imageUrl.url}
                      alt={topCreators[1]?.name || "Your 2nd top creator"}
                      layout="fill"
                    />
                  </div>
                  <div className="h-[60%] w-[30%] aspect-square rounded-full overflow-hidden border-[12px] border-tertiary relative">
                    <Image
                      src={topCreators[2]?.imageUrl.url}
                      alt={topCreators[2]?.name || "Your 3rd top creator"}
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </PageTransition>
          </div>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-screen overflow-hidden opacity-80 hidden lg:block">
        <PageTransition
          delay={0.1}
          className="bottom-[20%] left-[2%] absolute w-[25vh] h-[25vh]"
        >
          <Image
            src={SHAPES.HalfShape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="top-[15%] right-[10%] absolute w-[15vh] h-[15vh]"
        >
          <Image
            src={SHAPES.Rock1}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
      </div>
    </>
  );
};

export default TopCreators;
