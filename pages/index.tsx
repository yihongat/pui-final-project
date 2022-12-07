import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Landing from "../components/Landing/Landing";
import { SHAPES } from "../components/common/Shapes/Shapes";
import { PageTransition } from "../components/common/PageTransition/PageTransition";
import TitleHead from "../components/common/TitleHead/TitleHead";
import { DOMAIN } from "../components/utils/globals";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-full overflow-visible">
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
      <Landing />
      <footer className="w-full flex justify-center absolute bottom-12">
        <span className={classNames("flex w-32 h-8 relative")}>
          {/* <Image
            src="/images/odyssey_logo.svg"
            alt="Odyssey Logo"
            layout="fill"
          /> */}
        </span>
      </footer>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden opacity-80">
        <PageTransition
          delay={0.1}
          className="top-[15%] right-[8%] absolute w-[20vh] h-[20vh]"
        >
          <Image
            src={SHAPES.HalfShape}
            alt="Semicircle shape on the background"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="bottom-[15%] left-[-5%] absolute w-[50vh] h-[50vh] hidden md:block"
        >
          <Image
            src={SHAPES.Cube1Shape}
            alt="Cube shape in the background"
            layout="fill"
          />
        </PageTransition>
        <PageTransition
          delay={0.3}
          className="top-[-10%] left-[10%] absolute w-[30vh] h-[30vh]"
        >
          <Image
            src={SHAPES.Cube4Shape}
            alt="Cube shape in the background"
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
          className="bottom-[-15%] right-[10%] absolute w-[60vh] h-[60vh] hidden md:block"
        >
          <Image
            src={SHAPES.PauseShape}
            alt="Play button 3D shape in the background"
            layout="fill"
          />
        </PageTransition>
      </div>
    </div>
  );
};

export default Home;
