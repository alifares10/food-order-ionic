import hero from "../assets/hero.png";
import burgerVideo from "../assets/burger.mp4";

const Hero = () => {
  return (
    <div>
      <img src={hero} className="w-full max-h-[600px] object-cover" />
      {/* <video
        src={burgerVideo}
        autoPlay
        loop
        muted
        className="w-full max-h-[600px] object-cover"
      /> */}
    </div>
  );
};

export default Hero;
