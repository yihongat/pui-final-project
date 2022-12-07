import { NextPage } from "next";
import Image from "next/image";
import YearInReviewLogo from "../../public/images/year_in_review_wordmark.svg";
import { Button } from "../../components/common/Button";
import InstructionCarousel from "../../components/Upload/InstructionCarousel/InstructionCarousel";
import { ChangeEvent } from "react";
import classNames from "classnames";
import FileInput from "../../components/common/FileInput/FileInput";
import { useDataContext } from "../../components/common/DataContext/DataContext";
import { useRouter } from "next/router";
import {
  getDetailedCreatorData,
  getVideosForTimeFrame,
  getVideosWatchedByCreator,
  preprocessWatchHistoryData,
} from "../../components/utils/utils";
import { SHAPES } from "../../components/common/Shapes/Shapes";
import { PageTransition } from "../../components/common/PageTransition/PageTransition";
import TitleHead from "../../components/common/TitleHead/TitleHead";
import { DOMAIN } from "../../components/utils/globals";
import sampleWatchHistory from "../../public/files/watch-history.json";

const Upload: NextPage = () => {
  const router = useRouter();
  const { setWatchHistory, setFileName, setTopCreators } = useDataContext();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFileName = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(uploadedFileName, "UTF-8");
      reader.onload = async function (evt) {
        if (typeof evt?.target?.result === "string") {
          const data = JSON.parse(evt?.target?.result);
          const parsedData = getVideosForTimeFrame(
            preprocessWatchHistoryData(data),
            new Date(2022, 0, 1),
            new Date(2022, 11, 31)
          );
          setWatchHistory(parsedData);

          const creators = getVideosWatchedByCreator(parsedData);
          const topCreatorEntries = Object.entries(creators)
            .sort((a, b) => b[1].videosWatched - a[1].videosWatched)
            .slice(0, 10);
          const topCreatorDetails = topCreatorEntries.map(
            (creator) => creator[1]
          );
          const creatorData = await getDetailedCreatorData(topCreatorDetails);
          console.log(creatorData);
          setTopCreators(creatorData);
          setFileName(uploadedFileName.name);
          router.push("/analysis");
        }
      };
    }
  };

  const loadSampleData = async () => {
    const parsedData = getVideosForTimeFrame(
      preprocessWatchHistoryData(sampleWatchHistory as any),
      new Date(2022, 0, 1),
      new Date(2022, 11, 31)
    );
    setWatchHistory(parsedData);

    const creators = getVideosWatchedByCreator(parsedData);
    const topCreatorEntries = Object.entries(creators)
      .sort((a, b) => b[1].videosWatched - a[1].videosWatched)
      .slice(0, 10);
    const topCreatorDetails = topCreatorEntries.map((creator) => creator[1]);
    const creatorData = await getDetailedCreatorData(topCreatorDetails);
    setTopCreators(creatorData);
    router.push("/analysis");
  };

  return (
    <div
      className={classNames(
        "h-screen w-full overflow-y-auto overflow-x-hidden pt-8 pb-24 lg:pb-8"
      )}
    >
      <TitleHead title="Year In Review">
        <meta
          name="description"
          content="View YouTube Year In Review by visualizing your data."
        />
        <meta property="og:url" content={DOMAIN} />
        <meta
          name="og:description"
          content="View YouTube Year In Review by visualizing your data."
        />
        <meta property="og:image" content={`${DOMAIN}/landing.png`} />
      </TitleHead>
      <PageTransition mobileOnly>
        <div className="flex flex-col w-full h-full items-center">
          <div className="w-10/12 max-w-[720px] relative pb-4">
            <Button buttonType="secondary" href="/" className="relative">
              Back
            </Button>
          </div>
          <div className="relative w-10/12 lg:w-8/12 h-8 mb-6 mt-1 max-w-[300px]">
            <Image
              src={YearInReviewLogo}
              alt="Year In Review Logo"
              layout="fill"
            />
          </div>
          <div className="text-base md:text-lg w-10/12 mb-6 max-w-[720px] text-center">
            To view your 2022 recap, we{"'"}ll need a copy of your YouTube GDPR
            report. Don{"'"}t worry, those files don{"'"}t contain sensitive
            information, and all data is processed on your device. You can
            retrieve the data from{" "}
            <a
              href={
                "https://takeout.google.com/settings/takeout/custom/youtube"
              }
            >
              <span className="text-primary font-semibold cursor-pointer hover:underline">
                Google Takeout
              </span>
            </a>{" "}
            by following the instructions below.
          </div>
          <InstructionCarousel />
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <FileInput onChange={handleFileUpload} />
            </div>
            <Button buttonType="secondary" onClick={loadSampleData}>
              Load Sample Data
            </Button>
          </div>
        </div>
      </PageTransition>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden opacity-80 hidden lg:block">
        <PageTransition
          delay={0.1}
          className="top-[15%] right-[8%] absolute w-[20vh] h-[20vh]"
        >
          <Image
            src={SHAPES.HalfShape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="bottom-[15%] left-[-5%] absolute w-[50vh] h-[50vh]"
        >
          <Image
            src={SHAPES.Cube1Shape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.3}
          className="top-[-10%] left-[10%] absolute w-[30vh] h-[30vh]"
        >
          <Image
            src={SHAPES.Cube4Shape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.4}
          className="bottom-[5%] left-[10%] absolute  w-[35vh] h-[35vh]"
        >
          <Image
            src={SHAPES.PlayShape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.5}
          className="bottom-[-15%] right-[10%] absolute w-[60vh] h-[60vh]"
        >
          <Image
            src={SHAPES.PauseShape}
            alt="Red tinted clay shapes on background as decoration"
            layout="fill"
          />
        </PageTransition>
      </div>
    </div>
  );
};

export default Upload;
