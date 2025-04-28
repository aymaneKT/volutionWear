import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Faq() {
  return (
    <div className="my-10 flex justify-around p-2 flex-wrap">
      <h1
        style={{
          fontSize: "clamp(2rem, 2.3vw, 3.2rem)",
        }}
        className="font-bold font-['Josefin_Sans']  mb-20"
      >
        Frequently asked questions
      </h1>
      <div>
        {faqs.map((faq, index) => (
          <Accordion key={index} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "600" }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
const faqs = [
  {
    question: "What is VolutionWear?",
    answer:
      "VolutionWear is a platform where you can buy and sell second-hand, vintage, handmade, and eco-friendly items easily and safely.",
  },
  {
    question: "How do I start selling on VolutionWear?",
    answer:
      "Create an account, upload clear photos of your item, write a description, set a price, and publish your listing — it's that simple!",
  },
  {
    question: "How do I buy an item?",
    answer:
      "Browse or search for what you love, click on 'Buy Now,' and complete your purchase through our secure payment system.",
  },
  {
    question: "Is it safe to buy and sell on VolutionWear?",
    answer:
      "Yes! All transactions are protected with secure payment methods and buyer/seller protection policies.",
  },
  {
    question: "What can I sell on VolutionWear?",
    answer:
      "You can sell clothes, accessories, vintage goods, handmade creations, and eco-friendly products. Check our guidelines for more details.",
  },
  {
    question: "How does shipping work?",
    answer:
      "After a sale, you'll receive instructions for shipping. You can use a prepaid label provided by VolutionWear or arrange shipping yourself, depending on your settings.",
  },
  {
    question: "What if I have a problem with my order?",
    answer:
      "If you encounter any issue, our support team is ready to help! Just contact us through the Help Center within a few days of receiving your item.",
  },
];
