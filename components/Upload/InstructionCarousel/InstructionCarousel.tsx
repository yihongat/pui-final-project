import Image, { StaticImageData } from "next/image";
import InstructionCard, {
  InstructionInfo,
} from "../InstructionCard/InstructionCard";

import Instruction1 from "../../../public/images/instructions/1.png";
import Instruction2 from "../../../public/images/instructions/2.png";
import Instruction3 from "../../../public/images/instructions/3.png";
import Instruction4 from "../../../public/images/instructions/4.png";
import Instruction5 from "../../../public/images/instructions/5.png";
import ArrowLeft from "../../../public/images/arrow-left.svg";
import ArrowRight from "../../../public/images/arrow-right.svg";
import { useState } from "react";

interface InstructionInfoProps extends InstructionInfo {
  index: number;
}

const INSTRUCTIONS: InstructionInfo[] = [
  { image: Instruction1, text: "Visit Google Takeout for YouTube." },
  {
    image: Instruction2,
    text: "Under 'Multiple formats,' select JSON for Watch History.",
  },
  {
    image: Instruction3,
    text: "Under 'All Youtube data included,' select 'history'",
  },

  {
    image: Instruction4,
    text: "Create report with the default settings. ",
  },
  {
    image: Instruction5,
    text: "After a few minutes, check your email and download the data report. ",
  },
];
const InstructionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col w-full max-w-[600px] mb-6">
      <div></div>
      <div className="flex gap-1">
        {currentIndex > 0 ? (
          <div
            className="basis-10 cursor-pointer flex items-center rounded-lg p-2 hover:bg-secondary"
            onClick={() => setCurrentIndex((ind) => ind - 1)}
          >
            <Image src={ArrowLeft} alt="" />
          </div>
        ) : (
          <div className="basis-10 pt-[20%]"></div>
        )}
        <InstructionCard {...INSTRUCTIONS[currentIndex]} />
        {currentIndex < INSTRUCTIONS.length - 1 ? (
          <div
            className="basis-10 cursor-pointer flex items-center rounded-lg p-2 hover:bg-secondary"
            onClick={() => setCurrentIndex((ind) => ind + 1)}
          >
            <Image src={ArrowRight} alt="" />
          </div>
        ) : (
          <div className="basis-10 pt-[20%]"></div>
        )}
      </div>
      <div className="text-xl font-semibold my-4 text-center h-16">
        {INSTRUCTIONS[currentIndex].text}
      </div>
    </div>
  );
};

export default InstructionCarousel;
