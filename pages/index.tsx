import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Landing from "../components/Landing/Landing";
import { SHAPES } from "../components/common/Shapes/Shapes";
import { PageTransition } from "../components/common/PageTransition/PageTransition";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-full overflow-visible">
      <Head>
        <title>Year In Review</title>
        <meta
          name="description"
          content="View YouTube Year In Review by visualizing your GDPR data. Created by the Odyssey Initiative. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <PageTransition className="-z-50 absolute w-full top-0 h-full overflow-hidden">
        <PageTransition
          delay={0.1}
          className="top-[15%] right-[8%] absolute w-[20vh] h-[20vh]"
        >
          <Image src={SHAPES.HalfShape} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.2}
          className="bottom-[15%] left-[-5%] absolute w-[50vh] h-[50vh]"
        >
          <Image src={SHAPES.Cube1Shape} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.3}
          className="top-[-10%] left-[10%] absolute w-[30vh] h-[30vh]"
        >
          <Image src={SHAPES.Cube4Shape} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.4}
          className="bottom-[5%] left-[10%] absolute  w-[35vh] h-[35vh]"
        >
          <Image src={SHAPES.PlayShape} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.5}
          className="bottom-[-15%] right-[10%] absolute w-[60vh] h-[60vh]"
        >
          <Image src={SHAPES.PauseShape} alt="" layout="fill" />
        </PageTransition>
      </PageTransition>
    </div>
  );
};

export default Home;
