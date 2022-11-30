import Image from "next/image";
import { Button } from "../../common/Button";
import { Perspective } from "../../common/Perspective";
import classNames from "classnames";
import ShareImage from "../../../public/images/share.png";
import { PageTransition } from "../../common/PageTransition/PageTransition";
import { SHAPES } from "../../common/Shapes/Shapes";
import { useEffect, useRef } from "react";

const ShareView = () => {
  const shareImage = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateImage();
  }, [shareImage]);

  const generateImage = () => {
    if (!shareImage.current) {
      return;
    }
    let imageData;
    const ctx = shareImage.current.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, shareImage.current.width, shareImage.current.height);
      const downloadedImg = new (Image as any)();
      downloadedImg.crossOrigin = "";
      downloadedImg.onload = () => {
        ctx.drawImage(downloadedImg, 0, 0, 800, 800);
        // wait for loading graph element
        const svg = this.radarDraw.nativeElement.querySelector(
          "#custom-image-chart svg"
        );
        //console.log(svg);
        const d3img = new Image();
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        d3img.onload = () => {
          // draws graph to canvas on load
          ctx.globalAlpha = 0.5;
          ctx.drawImage(d3img, -650, -100, 1500, 1500);
          ctx.globalAlpha = 1;
          // makes grayscale
          imageData = ctx.getImageData(0, 0, 800, 800);
          const pixels = imageData.data;
          for (let i = 0; i < pixels.length; i += 4) {
            const red = pixels[i];
            const green = pixels[i + 1];
            const blue = pixels[i + 2];
            // using relative luminance to convert to grayscale
            const avg = Math.round(
              (0.299 * red + 0.587 * green + 0.114 * blue) * 1
            );
            pixels[i] = avg;
            pixels[i + 1] = avg;
            pixels[i + 2] = avg;
          }
          // puts the duotone image into canvas with multiply and lighten
          ctx.putImageData(imageData, 0, 0);
          ctx.globalCompositeOperation = "multiply";
          ctx.fillStyle = this.primaryTones[this.chosenTone];
          ctx.fillRect(0, 0, 800, 800);
          ctx.globalCompositeOperation = "lighten";
          ctx.fillStyle = this.secondaryTones[this.chosenTone];
          ctx.fillRect(0, 0, 800, 800);
          // draws text
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "96px Circular";
          ctx.textBaseline = "bottom";
          wrapText(
            ctx,
            this.genres[0][0] == "pop"
              ? this.capitalize(this.genres[1][0])
              : this.capitalize(this.genres[0][0]),
            60,
            440,
            600,
            112
          );
          ctx.fillRect(0, 460, 450, 12);
          ctx.textBaseline = "top";
          // draws top tracks
          ctx.font = "20px Open Sans";
          let ycoord = 530;
          ctx.fillText("TOP TRACKS", 200, ycoord);
          ctx.font = "24px Circular";
          for (let i = 0; i < 5; i++) {
            ycoord += 36;
            ctx.fillText(
              this.ellipsisName(this.tracks[i].name, 20),
              200,
              ycoord
            );
          }
          // draws top artists
          ctx.font = "20px Open Sans";
          ycoord = 530;
          ctx.fillText("TOP ARTISTS", 500, ycoord);
          ctx.font = "24px Circular";
          for (let i = 0; i < 5; i++) {
            ycoord += 36;
            ctx.fillText(
              this.ellipsisName(this.artists[i].name, 20),
              500,
              ycoord
            );
          }
          // draws logo
          ctx.font = "20px Circular";
          ctx.fillText("Whisperify", 650, 39);
          const logo = new Image();
          logo.onload = () => {
            ctx.drawImage(logo, 600, 36, 36, 25);
            this.canvasImg.nativeElement.src =
              shareImage.current.toDataURL("image/png");
          };
          logo.src = "assets/whisperwave.svg";
        };
        d3img.src = "data:image/svg+xml;base64," + window.btoa(svgStr);
      };
      downloadedImg.src = this.artists[0].images[1].url;
    }
  };
  return (
    <>
      <main
        className={classNames(
          "w-full flex flex-col h-full justify-center items-center pb-24"
        )}
      >
        <div className="w-8/12 max-w-[1000px] flex flex-col text-center items-center">
          <PageTransition delay={1}>
            <h2>Share</h2>
          </PageTransition>
          <Perspective className="flex-col w-full h-full">
            <PageTransition
              delay={1.5}
              className="h-[60vh] w-full relative my-4 mb-8 drop-shadow-[0px_0px_30px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={ShareImage}
                alt="Your yearly review"
                layout="fill"
                objectFit={"contain"}
                className="rounded-lg !min-w-fit !w-auto"
              />
              <canvas ref={shareImage}></canvas>
            </PageTransition>
          </Perspective>
          <PageTransition delay={2.5}>
            <Button buttonType="primary" href="/upload">
              Share
            </Button>
          </PageTransition>
        </div>
      </main>
      <div className="-z-50 absolute w-full top-0 h-full overflow-hidden">
        <PageTransition
          delay={0.2}
          className="bottom-[25%] left-[5%] absolute w-[40vh] h-[40vh]"
        >
          <Image src={SHAPES.Rock3} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.4}
          className="top-[-25%] right-[10%] absolute w-[70vh] h-[70vh]"
        >
          <Image src={SHAPES.ChatShape} alt="" layout="fill" />
        </PageTransition>
        <PageTransition
          delay={0.6}
          className="bottom-[15%] right-[30%] absolute w-[20vh] h-[20vh]"
        >
          <Image src={SHAPES.Rock2} alt="" layout="fill" />
        </PageTransition>
      </div>
    </>
  );
};

export default ShareView;
