import Image from "next/image";
import { Button } from "../../common/Button";
import { Perspective } from "../../common/Perspective";
import classNames from "classnames";
import { PageTransition } from "../../common/PageTransition/PageTransition";
import { SHAPES } from "../../common/Shapes/Shapes";
import { useEffect, useRef, useState } from "react";
import { getVideosWatchedByCreator } from "../../utils/utils";
import { useDataContext } from "../../common/DataContext/DataContext";
import * as htmlToImage from "html-to-image";
import YearInReviewLogo from "../../../public/images/year_in_review_wordmark.svg";

const ShareView = () => {
  const toDownloadImage = useRef<HTMLDivElement>(null);
  const { topCreators, watchHistory } = useDataContext();
  const [fontDisplayRatio, setFontDisplayRatio] = useState(0.5);
  const [shareImageSrc, setShareImageSrc] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const boundingBox = toDownloadImage?.current?.getBoundingClientRect();
      if (boundingBox) {
        const ratio = boundingBox.height / window.innerHeight;
        setFontDisplayRatio(ratio);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const downloadImage = async () => {
    if (toDownloadImage.current) {
      await htmlToImage.toPng(toDownloadImage.current, {
        canvasWidth: 800,
        canvasHeight: 1600,
        cacheBust: true,
        includeQueryParams: true,
      });
      const dataUrl = await htmlToImage.toPng(toDownloadImage.current, {
        canvasWidth: 800,
        canvasHeight: 1600,
        cacheBust: true,
        includeQueryParams: true,
      });
      const link = document.createElement("a");
      link.download = "recap.png";
      link.href = dataUrl;
      link.click();
    }
  };

  const openImage = async () => {
    if (toDownloadImage.current) {
      await htmlToImage.toPng(toDownloadImage.current, {
        canvasWidth: 800,
        canvasHeight: 1600,
        cacheBust: true,
        includeQueryParams: true,
      });
      const dataUrl = await htmlToImage.toPng(toDownloadImage.current, {
        canvasWidth: 800,
        canvasHeight: 1600,
        cacheBust: true,
        includeQueryParams: true,
      });
      const link = document.createElement("a");
      setShareImageSrc(dataUrl);
      link.download = "recap.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col justify-center items-center py-12 pb-24"
        )}
      >
        <div className="w-10/12 lg:w-8/12 max-w-[1000px] flex flex-col lg:flex-row">
          <div className="flex flex-col text-center items-center w-full lg:basis-5/12">
            <Perspective
              className="flex-col w-full h-full mb-4"
              reduceEffect={20}
            >
              <PageTransition
                delay={1.5}
                className="h-[56vh] w-[28vh] mx-auto relative my-4 mb-8 drop-shadow-[0px_0px_30px_rgba(0,0,0,0.25)]"
                mobileOnly
              >
                {shareImageSrc && (
                  <Image
                    src={shareImageSrc}
                    alt="Your yearly review"
                    layout="fill"
                    objectFit={"contain"}
                    className="rounded-lg !min-w-fit !w-auto z-10 absolute lg:hidden"
                  />
                )}
                <div className="overflow-hidden aspect-[1/2] h-full w-auto rounded-lg mx-auto pointer-events-none">
                  <div
                    ref={toDownloadImage}
                    className="relative aspect-[1/2] rounded-lg h-full w-auto mx-auto bg-white"
                    style={{
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <h1
                      className="absolute flex"
                      style={{
                        top: `calc(${fontDisplayRatio} * 5vh)`,
                        left: `calc(${fontDisplayRatio} * 4vh)`,
                        fontSize: `calc(${fontDisplayRatio} * 4vh)`,
                      }}
                    >
                      <span
                        style={{
                          margin: `0 calc(${fontDisplayRatio} * 1vh) 0 0`,
                          display: "inline",
                        }}
                        className="text-primary"
                      >
                        {watchHistory.length}
                      </span>{" "}
                      videos.
                    </h1>
                    <h1
                      className="absolute flex"
                      style={{
                        top: `calc(${fontDisplayRatio} * 10vh)`,
                        left: `calc(${fontDisplayRatio} * 4vh)`,
                        fontSize: `calc(${fontDisplayRatio} * 4vh)`,
                      }}
                    >
                      <span
                        style={{
                          margin: `0 calc(${fontDisplayRatio} * 1vh) 0 0`,
                          display: "inline",
                        }}
                        className="text-primaryGrey"
                      >
                        {
                          Object.keys(getVideosWatchedByCreator(watchHistory))
                            .length
                        }
                      </span>{" "}
                      creators.
                    </h1>
                    <div
                      style={{
                        top: `calc(${fontDisplayRatio} * 18vh)`,
                        left: `0`,
                      }}
                      className="relative w-full flex flex-col items-center"
                      id="urlContainer"
                    >
                      <div
                        style={{
                          width: `calc(${fontDisplayRatio} * 24vh)`,
                          height: `calc(${fontDisplayRatio} * 24vh)`,
                        }}
                        className="mx-auto aspect-square rounded-full overflow-hidden border-tertiary z-5"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={topCreators[0]?.imageUrl.url}
                            alt={topCreators[0]?.name}
                            layout="fill"
                            className="rounded-full overflow-hidden"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between w-10/12">
                        <div
                          style={{
                            width: `calc(${fontDisplayRatio} * 16vh)`,
                            height: `calc(${fontDisplayRatio} * 16vh)`,
                          }}
                          className=" aspect-square rounded-full overflow-hidden border-tertiary z-5"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={topCreators[1]?.imageUrl.url}
                              alt={topCreators[1]?.name}
                              layout="fill"
                              className="rounded-full overflow-hidden"
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            width: `calc(${fontDisplayRatio} * 14vh)`,
                            height: `calc(${fontDisplayRatio} * 14vh)`,
                          }}
                          className=" aspect-square rounded-full overflow-hidden border-tertiary z-5"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={topCreators[2]?.imageUrl.url}
                              alt={topCreators[2]?.name}
                              layout="fill"
                              className="rounded-full overflow-hidden"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1
                      className="absolute flex"
                      style={{
                        top: `calc(${fontDisplayRatio} * 60vh)`,
                        left: `calc(${fontDisplayRatio} * 4vh)`,
                        fontSize: `calc(${fontDisplayRatio} * 5vh)`,
                      }}
                    >
                      Top Creators
                    </h1>
                    <div
                      className="absolute flex font-semibold text-left w-full gap-2"
                      style={{
                        top: `calc(${fontDisplayRatio} * 68vh)`,
                        padding: `0 calc(${fontDisplayRatio} * 4vh)`,
                        fontSize: `calc(${fontDisplayRatio} * 3vh)`,
                      }}
                    >
                      <div className="basis-6/12 relative overflow-hidden">
                        {topCreators.slice(0, 5).map((c, i) => (
                          <p
                            className="whitespace-nowrap text-ellipsis overflow-hidden"
                            style={{
                              top: `calc(${fontDisplayRatio} * ${i * 2.6}vh)`,
                              fontSize: `calc(${fontDisplayRatio} * 2.6vh)`,
                              letterSpacing: "-0.02em",
                            }}
                            key={i}
                          >
                            {c.name}
                          </p>
                        ))}
                      </div>
                      <div className="basis-6/12 relative overflow-hidden">
                        {topCreators.slice(5, 10).map((c, i) => (
                          <p
                            className="whitespace-nowrap text-ellipsis overflow-hidden"
                            style={{
                              top: `calc(${fontDisplayRatio} * ${i * 2.6}vh)`,
                              fontSize: `calc(${fontDisplayRatio} * 2.6vh)`,
                              letterSpacing: "-0.02em",
                            }}
                            key={i}
                          >
                            {c.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div
                      className="absolute flex flex-col text-left w-full"
                      style={{
                        bottom: `calc(${fontDisplayRatio} * 3vh)`,
                        padding: `0 calc(${fontDisplayRatio} * 4vh)`,
                        gap: `calc(${fontDisplayRatio} * 0.5vh)`,
                      }}
                    >
                      <div
                        className="relative"
                        style={{
                          width: `calc(${fontDisplayRatio} * 20vh)`,
                          height: `calc(${fontDisplayRatio} * 3vh)`,
                        }}
                      >
                        <Image
                          src={YearInReviewLogo}
                          alt="Logo"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <p
                        className=""
                        style={{
                          fontSize: `calc(${fontDisplayRatio} * 1.5vh)`,
                          letterSpacing: "-0.02em",
                          fontWeight: 500,
                        }}
                      >
                        {"youtuberecap.viewodyssey.com".toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </PageTransition>
            </Perspective>
            <PageTransition delay={2} className="flex gap-4">
              <Button
                className="hidden lg:block"
                buttonType="primary"
                onClick={() => downloadImage()}
              >
                Share Image
              </Button>
              <Button
                className=" lg:hidden"
                buttonType="primary"
                onClick={() => openImage()}
              >
                Share Image
              </Button>
            </PageTransition>
          </div>
          <PageTransition className="w-full lg:basis-7/12 mt-16 lg:m-0">
            <div className="flex flex-col gap-4 lg:pr-8 ">
              <h2>Share</h2>
              <p>
                {`Congratulations on finishing your video recap for this year!
                It has been an amazing year for content creation, and we're glad
                you've been able to enjoy so many great videos and creators.
                Don't forget to share your favorites this year with friends
                and family!`}
              </p>
              <p>
                Enjoyed this project? Consider supporting me by buying a coffee
                or following me on Twitter!
              </p>
              <div className="flex gap-2 mt-4 md:gap-4 flex-col md:flex-row">
                <Button buttonType="primary" overrideBg="orange">
                  Buy Me a Coffee
                </Button>
                <Button buttonType="primary" overrideBg="twitter">
                  Follow on Twitter
                </Button>
              </div>
            </div>
          </PageTransition>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden opacity-80 hidden lg:block">
        <PageTransition
          delay={0.2}
          className="bottom-[25%] left-[5%] absolute w-[40vh] h-[40vh]"
        >
          <Image
            src={SHAPES.Rock3}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.4}
          className="top-[-35%] right-[2%] absolute w-[60vh] h-[60vh]"
        >
          <Image
            src={SHAPES.ChatShape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.6}
          className="bottom-[15%] right-[30%] absolute w-[20vh] h-[20vh]"
        >
          <Image
            src={SHAPES.Rock2}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
      </div>
    </>
  );
};

export default ShareView;
