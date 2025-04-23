import video from "../HomePageVideo.mp4";
export default function HeroSection() {
  return (
    <div className="h-screen">
      <video
        autoPlay
        muted
        loop
        className="w-[100%] h-[100%] overflow-hidden object-cover object-center"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
