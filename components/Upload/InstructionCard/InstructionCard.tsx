import Image, { StaticImageData } from "next/image";

export interface InstructionInfo {
  image: StaticImageData;
  text: string;
}

const InstructionCard = ({ image, text }: InstructionInfo) => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full h-[250px] relative border-secondaryGrey rounded-lg overflow-hidden border-[1px] border-solid">
        <Image src={image} alt={text} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default InstructionCard;
