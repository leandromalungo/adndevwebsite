import { SlideData, LeadershipCardData, SheBuildsCardData } from "@/data/types";

export const NAV_ITEMS = [
  "She Builds AI",
  "Leadership Development",
  "On Demand",
];

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Women Techmakers Academy",
    description:
      "The WTM Academy is your all-in-one platform for learning and career growth in tech. Gain technical skills, leadership training, and community support, with a special focus on excelling in the world of AI. Join us and unlock your full potential!",
    boldKeywords: ["technical skills,", "leadership", "community"],
    buttonText: "Assinar agora",
    imageSrc:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Woman looking up into the sky",
  },
  {
    id: 2,
    title: "Empowering AI Leaders",
    description:
      "Our mission is to build a world where all women can thrive in tech. Through our intensive mentorship programs and hands-on workshops, we prepare you for the next generation of AI innovation.",
    boldKeywords: ["thrive in tech.", "mentorship", "innovation."],
    buttonText: "Saber mais",
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Digital collaboration",
  },
  {
    id: 3,
    title: "Building Global Community",
    description:
      "Connect with over 200,000 women in technology worldwide. Share knowledge, find mentors, and grow your network within the Google Developer Ecosystem.",
    boldKeywords: ["200,000 women", "mentors,", "network"],
    buttonText: "Ver mais",
    imageSrc:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Networking event",
  },
];

export const SHE_BUILDS_CARDS: SheBuildsCardData[] = [
  {
    id: "sb-intro",
    type: "intro",
    subtitle: "EMPOWER. INNOVATE. BUILD.",
    title: "She Builds AI",
    description:
      "Gain AI skills, connect with a community, and grow as a leader in tech. Through training on cutting-edge Google AI tools and access to trailblazing women and inspiring stories, we're building a future where women thrive in AI.",
  },
  {
    id: "sb-hackathon",
    type: "hackathon",
    label: "GLOBAL HACKATHON",
    title:
      "Build groundbreaking AI solutions for women worldwide - join the hackathon today!",
    image:
      "https://img.freepik.com/premium-vector/mountain-climbing-concept-illustration_114360-10141.jpg",
  },
  {
    id: "sb-workshop-1",
    type: "workshop",
    title: "She Builds AI Kickoff Event",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400",
    timeAgo: "HÁ 1 ANO",
    status: "On demand",
  },
  {
    id: "sb-workshop-2",
    type: "workshop",
    title: "She Builds AI: Google AI Studio workshop",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
    timeAgo: "HÁ 1 ANO",
    status: "On demand",
  },
  {
    id: "sb-workshop-3",
    type: "workshop",
    title: "She Builds AI: Google Gemini workshop",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=400",
    timeAgo: "HÁ 1 ANO",
    status: "On demand",
  },
  {
    id: "sb-workshop-4",
    type: "workshop",
    title: "She Builds AI: Google AI Edge workshop",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400",
    timeAgo: "HÁ 1 ANO",
    status: "On demand",
  },
  {
    id: "sb-workshop-5",
    type: "workshop",
    title: "She Builds AI: Gemma, Google's family of open models",
    image:
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=400",
    timeAgo: "HÁ 1 ANO",
    status: "On demand",
  },
];

export const LEADERSHIP_CARDS: LeadershipCardData[] = [
  {
    id: "intro-1",
    type: "intro",
    subtitle: "Programas",
    title: "Iniciativas para participação das mulheres na T.I.",
    description:
      "Elevate your leadership with our immersive series designed to empower you with essential skills, from mastering communication and networking to building confidence, while gaining wisdom from accomplished women leaders in tech.",
  },
  {
    id: "person-1",
    type: "person",
    name: "WOMAN IN TECH",
    role: "Technical Account Manager at Google Cloud",
    image: "/images/1765478356516.jpg",
    timeAgo: "HÁ 1 ANO",
    sessionTitle:
      "Content Creation & Personal Branding: How to be Authentic and Standout",
    status: "On demand",
  },
  {
    id: "person-2",
    type: "person",
    name: "GOOGLE TAKE MAKERS",
    role: "Software Engineer at Google",
    image: "/images/1722976279688.jpg",
    timeAgo: "HÁ 1 ANO",
    sessionTitle: "The Recipe to Confidence",
    status: "On demand",
  },
  {
    id: "person-3",
    type: "person",
    name: "WOMAN IN TECH",
    role: "Software Engineer at Google",
    image: "/images/1756913513983.jpg",
    timeAgo: "HÁ 1 ANO",
    sessionTitle:
      "Level Up Your Tech Journey: The Power of Mentorship for Women in Tech",
    status: "On demand",
  },
];

export const WTMLogoColored = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-[#1a73e8]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
  </svg>
);
