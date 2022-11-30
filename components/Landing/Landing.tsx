import Image from "next/image";
import { Button } from "../common/Button";
import { Perspective } from "../common/Perspective";
import YearInReviewLogo from "../../public/images/year_in_review_wordmark.svg";
import classNames from "classnames";
import { useState } from "react";
import { PageTransition } from "../common/PageTransition/PageTransition";

const Landing = () => {
  return (
    <main
      className={classNames(
        "w-full flex flex-col h-full justify-center items-center pb-36 fadein"
      )}
    >
      <Perspective className="flex-col w-full h-full">
        <PageTransition
          className="relative w-8/12 h-48 mb-10 max-w-[1000px]"
          delay={1.5}
        >
          <Image src={YearInReviewLogo} alt="" layout="fill" />
        </PageTransition>

        <PageTransition delay={1.8}>
          <Button buttonType="primary" href="/upload">
            Start Recap
          </Button>
        </PageTransition>
      </Perspective>
    </main>
  );
};

export default Landing;
