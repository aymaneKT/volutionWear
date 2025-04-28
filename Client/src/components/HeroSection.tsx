import video from "../VID-IMG/3888267-uhd_4096_2160_25fps.mp4";

export default function HeroSection() {
  return (
    <div className="h-screen relative">
      <video
        preload="none"
        playsInline
        autoPlay
        muted
        loop
        className="w-[100%] h-[100%] overflow-hidden object-cover object-top"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag...
      </video>
      <h1
        style={{
          fontSize: "clamp(1.2rem, 2vw, 3rem)",
        }}
        className="absolute bottom-[10%] left-3 select-none text-[#fff] font-['Josefin_Sans']"
      >
        "Buy, Sell, and Discover - All in One Place"
      </h1>
      <p
        style={{
          fontSize: "clamp(1rem, 1.5vw, 2rem)",
        }}
        className="absolute w-[45%]  select-none max-[480px]:w-[50%] top-[20%] right-2 text-[#fff] font-[Satisfy]"
      >
        Looking for something different? Our marketplace is full of handmade,
        vintage, and one-of-a-kind finds from creative sellers around the world.
        Find what speaks to you — and shop with heart.
      </p>
    </div>
  );
}
