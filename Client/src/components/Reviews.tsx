import ReviewCard from "./ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="my-20 w-[90%] m-auto ">
      <h1
        style={{
          fontSize: "clamp(2rem, 2.3vw, 3.2rem)",
        }}
        className="font-bold font-['Josefin_Sans'] text-center mb-20"
      >
        Loved by Our Community
      </h1>
      <Slider {...settings}>
        {reviews.map((e, i) => (
          <ReviewCard key={i} image={e.image} name={e.name} text={e.text} />
        ))}
      </Slider>
    </div>
  );
}

const reviews = [
  {
    name: "Maria Rossi",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    text: "I love this platform! I've found so many unique and well-crafted items. It's easy to use and secure for shopping.",
  },
  {
    name: "Luca Bianchi",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    text: "I love how I can quickly sell my used clothes. The community is very active and friendly.",
  },
  {
    name: "Giulia Ferri",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
    text: "It's the perfect platform for vintage lovers. I sold everything I no longer use without any stress.",
  },
  {
    name: "Marco Vitali",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Selling on this platform is super easy! Great visibility for my products and there's always someone interested.",
  },
  {
    name: "Sara Mancini",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "I bought some clothing items here and was extremely satisfied! The products are high quality.",
  },
  {
    name: "Giovanni Ricci",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    text: "The search functionality is amazing! I can easily find the items I want and even negotiate directly with the seller.",
  },
  {
    name: "Elena Moretti",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    text: "The platform has a simple and well-designed interface. I love how I can filter to find exactly what I'm looking for.",
  },
  {
    name: "Andrea Galli",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "As a buyer, I can say that the quality of items is great, and as a seller, I feel supported by a team that responds quickly.",
  },
  {
    name: "Francesca Di Martino",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    text: "This platform allowed me to find amazing handcrafted items. It's like shopping in an online flea market.",
  },
  {
    name: "Alessandro Russo",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    text: "I bought unique gifts for my family. The payment process is secure and quick. I’ll definitely be back to shop again.",
  },
  {
    name: "Valentina Costa",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    text: "This platform turned my hobby into a small business. I've found so many buyers passionate about my work.",
  }
];
