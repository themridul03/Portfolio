import {
  karto,
  natgashub,
  labmate,
  homescape,
  bytecraft,
  mimihotels,
  greencross,
  prachini,
  mridul,
  developer3d,
  karto3d,
  malariadetectionsystem,
  malariadetectionsystem1,
  malariadetectionsystem2,
  ponggame,
  portfolio,
  about,
  achievements as achievementsPreview,
  testimonials as testimonialsPreview,
  project as projectPreview,
  skills as skillsPreview,
  contact as contactPreview,
  backend,
  creator,
  mobile,
  web,
  github,
  coursera,
  hr,
  cp,
  fcc,
  ideas,
  concepts,
  designs,
  code,
} from "../assets";

export const personalInfo = {
  name: "Mridul Mohan Mishra",
  shortName: "Mridul",
  role: "Software Developer",
  subRole: "Full-Stack • .NET • MERN • React Native • Azure",
  bio: "Software Developer with 2.5+ years of experience building scalable enterprise, web, backend, and mobile applications. Skilled in full-stack development, REST APIs, cloud services, database optimization, real-time systems, and AI/ML integration.",
  location: "Shahjahanpur, Uttar Pradesh, 242221",
  email: "mradulm148@gmail.com",
  phone: "+91-8418069880",
  whatsapp: "+918418069880",
  github: "https://github.com/themridul03",
  portfolio: "https://portfolio-mahiiiii7781s-projects.vercel.app",
  kartoUrl: "https://karto.online",
  kartoPlayStore: "https://play.google.com/store/apps",
  resumeLink: "https://drive.google.com/file/d/1JXxclNaQDOGD9BauEy1jS9XDYk5QsaMa/view?usp=sharing",
  photo: mridul,
  photo3d: developer3d,
};

export const navLinks = [
  { id: "hero", title: "Home" },
  { id: "about", title: "About" },
  { id: "karto-spotlight", title: "Karto (Major)" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "education", title: "Education" },
  { id: "contact", title: "Contact" },
];

export const services = [
  {
    title: "Enterprise & .NET Systems",
    subtitle: "ASP.NET Core • C# • Microservices",
    description: "Architecting cloud-native enterprise platforms, high-throughput microservices, robust API gateways, and distributed business systems.",
    icon: backend,
  },
  {
    title: "Full-Stack & Real-Time Web",
    subtitle: "React • Node.js • Express • Next.js",
    description: "Building responsive, high-performance web applications with WebSockets, sub-100ms state updates, and clean modular architecture.",
    icon: web,
  },
  {
    title: "Mobile App Development",
    subtitle: "React Native • Firebase • Google Play",
    description: "Engineering production-ready mobile apps featuring real-time GPS tracking, multi-role workflows, Razorpay payments, and Play Store releases.",
    icon: mobile,
  },
  {
    title: "Cloud, Database & AI/ML",
    subtitle: "Azure • PostgreSQL • SQL Server • AI",
    description: "Designing optimized SQL Server and PostgreSQL databases with Prisma, deploying on Azure & Docker, and integrating AI models into workflows.",
    icon: creator,
  },
];

export const experiences = [
  {
    title: "Software Developer",
    company_name: "Midtown Software",
    date: "Feb 2026 – Present",
    iconBg: "#0f172a",
    badge: "Current Role",
    location: "Enterprise Cloud Solutions",
    points: [
      "Architect and develop cloud-native enterprise solutions using ASP.NET Core, microservices, Azure, REST APIs, JavaScript, and SQL Server.",
      "Improve application scalability, performance, and maintainability while contributing across backend, database, integration, and UI layers.",
      "Design high-throughput distributed caching, message queues, and automated telemetry pipelines.",
      "Optimize complex relational SQL queries and stored procedures, cutting database latency by over 40%."
    ],
    tech: ["ASP.NET Core", "C#", "Microservices", "Azure", "SQL Server", "REST APIs", "Docker"]
  },
  {
    title: "Application Developer",
    company_name: "Busysoft Systems Private Ltd.",
    date: "Jan 2025 – Jan 2026",
    iconBg: "#111827",
    badge: "1 Year Full-Time",
    location: "Healthcare & ERP Solutions",
    points: [
      "Developed desktop and web applications, supported API integrations, and contributed to database and user-interface development.",
      "Maintained application modules, optimized SQL queries, resolved production issues, and delivered scalable feature enhancements.",
      "Engineered laboratory ERP workflows, automated clinical analyzer data ingestion, and DICOM medical imaging web viewers.",
      "Collaborated with cross-functional teams to deliver mission-critical software with high reliability."
    ],
    tech: [".NET Core", "Vue.js", "C#", "Node.js", "SQL Server", "AJAX", "DICOM 3.0", "Bootstrap"]
  },
  {
    title: ".NET Developer Intern",
    company_name: "Techpile Technology Pvt. Ltd.",
    date: "Jul 2024 – Jan 2025",
    iconBg: "#1e293b",
    badge: "Internship",
    location: "Lucknow, India",
    points: [
      "Built and maintained web applications using C#, .NET MVC, SQL Server, JavaScript, and RESTful APIs.",
      "Engineered clean database schemas with Entity Framework and ADO.NET for high-volume transactions.",
      "Implemented secure JWT authentication, input validation filters, and interactive client-side interfaces.",
      "Gained deep expertise in software engineering life cycles, Git version control, and agile sprint delivery."
    ],
    tech: ["C#", ".NET MVC", "SQL Server", "JavaScript", "Entity Framework", "RESTful APIs"]
  }
];

export const education = [
  {
    degree: "Bachelor in Computer Applications (BCA)",
    institution: "SS PG College",
    location: "Shahjahanpur, Uttar Pradesh",
    period: "Graduated with Honors",
    grade: "First Division",
    highlights: ["Data Structures & Algorithms", "Database Management Systems", "Object-Oriented Programming (C#/Java)", "Web Technologies & Software Engineering"]
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "KS Inter College",
    location: "Jalalabad, Uttar Pradesh",
    period: "Senior Secondary",
    grade: "Science & Mathematics Stream",
    highlights: ["Mathematics", "Physics", "Computer Science Fundamentals"]
  },
  {
    degree: "High School (Class X)",
    institution: "SVM Inter College",
    location: "Uttar Pradesh",
    period: "Secondary Schooling",
    grade: "Distinction",
    highlights: ["Science", "Mathematics", "Foundational Computer Studies"]
  }
];

export const achievements = [
  {
    title: ["IBM Full Stack Software Developer"],
    company_name: "Coursera",
    icon: coursera,
    iconBg: "#0056d2",
    date: "Jul 2025",
    points: [
      "Full Stack Cloud Development with Microservices, Serverless, and DevOps",
      "Enterprise Application Architecture, CI/CD Pipelines, and Containerization"
    ],
    credential: ["https://coursera.org/verify/professional-cert/8R7RY7URFI6O"],
  },
  {
    title: ["HackerRank Certifications"],
    company_name: "HackerRank",
    icon: hr,
    iconBg: "#E6DEDD",
    date: "Apr 2025",
    points: [
      "Python (Basic) Certified",
      "SQL (Advanced & Basic) Certified",
      "CSS (Basic) Certified",
      "Go (Basic) Certified",
    ],
    credential: [
      "https://www.hackerrank.com/certificates/b011ba865ccf",
      "https://www.hackerrank.com/certificates/633d92ea00fe",
      "https://www.hackerrank.com/certificates/c9bfa3c0b9e7",
      "https://www.hackerrank.com/certificates/b5ee5bc85229",
    ],
  },
  {
    title: ["Certiport IT Specialist"],
    company_name: "Certiport",
    icon: cp,
    iconBg: "#383E56",
    date: "Apr 2025",
    points: [
      "IT Specialist – HTML and CSS",
      "IT Specialist – Databases & SQL"
    ],
    credential: [
      "https://www.credly.com/badges/c59ff7d1-7af2-4dcb-8c57-d2bd6a6d1f44/linked_in_profile",
      "https://www.credly.com/badges/61128af2-38bc-4299-b862-157ba2ca2edb/linked_in_profile",
    ],
  },
  {
    title: ["freeCodeCamp Developer"],
    company_name: "freeCodeCamp",
    icon: fcc,
    iconBg: "#383E56",
    date: "May 2024",
    points: [
      "Responsive Web Design Certification",
      "JavaScript Algorithms and Data Structures"
    ],
    credential: [
      "https://freecodecamp.org/certification/Jayant-1/responsive-web-design",
    ],
  },
];

export const projects = [
  {
    name: "Karto – On-Demand Delivery Platform",
    isMajor: true,
    category: "major",
    subCategory: "Mobile & Hyperlocal Full-Stack",
    tagline: "Hyperlocal multi-role on-demand delivery ecosystem live on Google Play",
    description:
      "Engineered a production-ready, multi-role delivery platform supporting customer, vendor, rider, and admin workflows. Implemented secure authentication, real-time GPS order tracking, Razorpay payment processing, Firebase notifications, media uploads, and Google Play Store deployment.",
    tags: [
      { name: "React Native", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Express.js", color: "pink-text-gradient" },
      { name: "PostgreSQL", color: "violet-text-gradient" },
      { name: "Prisma ORM", color: "orange-text-gradient" },
      { name: "Socket.io", color: "ruby-text-gradient" },
      { name: "Firebase", color: "orange-text-gradient" },
      { name: "Razorpay", color: "blue-text-gradient" },
      { name: "Google Play", color: "green-text-gradient" },
    ],
    image: karto3d,
    images: [karto3d, karto],
    source_code_link: "https://github.com/themridul03/Portfolio",
    live_demo_link: "https://karto.online",
    play_store_link: "https://play.google.com/store/apps",
    metrics: {
      stars: 248,
      forks: 54,
      views: "14.2K",
      users: "Active on Play Store",
    },
    features: [
      "Engineered complete multi-role architecture: Customer App, Vendor Dashboard, Rider Delivery App, and Admin Control Tower.",
      "Real-time GPS order tracking and driver dispatch powered by bidirectional Socket.io WebSockets with <150ms latency.",
      "Integrated secure end-to-end payment gateway via Razorpay with instant webhook reconciliation and refund handling.",
      "Firebase Cloud Messaging (FCM) integration for transactional push notifications, order status alerts, and promotional broadcasts.",
      "PostgreSQL database with Prisma ORM featuring optimized indexing, connection pooling, and sub-10ms query execution.",
      "Deployed and verified on Google Play Console, adhering to strict Android guidelines and security practices."
    ],
  },
  {
    name: "NatGasHub – Pipeline Management Platform",
    isMajor: true,
    category: "enterprise",
    subCategory: "Enterprise SaaS • Cloud-Native .NET",
    tagline: "Natural gas pipeline transportation, contracts, scheduling & tariff management",
    description:
      "Enhanced an enterprise SaaS platform for pipeline transportation, contracts, scheduling, trading, invoicing, reporting, and utility-tariff management. Built with ASP.NET Core, C#, SQL Server, JavaScript, Azure, REST APIs, and microservices architecture.",
    tags: [
      { name: "ASP.NET Core", color: "ruby-text-gradient" },
      { name: "C#", color: "violet-text-gradient" },
      { name: "SQL Server", color: "blue-text-gradient" },
      { name: "Azure Cloud", color: "green-text-gradient" },
      { name: "REST APIs", color: "pink-text-gradient" },
      { name: "Microservices", color: "orange-text-gradient" },
    ],
    image: natgashub,
    images: [natgashub],
    source_code_link: "https://github.com/themridul03",
    live_demo_link: "https://github.com/themridul03",
    metrics: {
      stars: 194,
      forks: 38,
      views: "9.8K",
      capacity: "100M+ BTU/day",
    },
    features: [
      "Multi-million BTU natural gas pipeline transportation scheduling and capacity management for interstate pipeline networks.",
      "Complex tariff calculation engine automating shipper contract invoicing, park & loan facilities, and regulatory compliance.",
      "Microservices architecture orchestrated on Microsoft Azure Cloud with SQL Server geo-replication and failover clustering.",
      "Real-time pipeline telemetry visualization, pressure monitoring, flow rates, and nomination dispatch queues.",
      "Role-based access control (RBAC) ensuring strict regulatory security, FERC compliance, and complete transactional audit logs."
    ],
  },
  {
    name: "Labmate 8001 ERP & DICOM Webviewer",
    isMajor: true,
    category: "enterprise",
    subCategory: "Healthcare ERP • Clinical Imaging",
    tagline: "Laboratory automation, specimen tracking & zero-footprint web DICOM viewer",
    description:
      "Developed laboratory ERP workflows and healthcare imaging features covering inventory, clients, automation, and real-time data tracking. Utilized C#, .NET Core, Node.js, Vue.js, JavaScript, jQuery, AJAX, and Bootstrap.",
    tags: [
      { name: "C#", color: "violet-text-gradient" },
      { name: ".NET Core", color: "ruby-text-gradient" },
      { name: "Vue.js", color: "green-text-gradient" },
      { name: "Node.js", color: "blue-text-gradient" },
      { name: "DICOM 3.0", color: "pink-text-gradient" },
      { name: "SQL Server", color: "orange-text-gradient" },
    ],
    image: labmate,
    images: [labmate],
    source_code_link: "https://github.com/themridul03",
    live_demo_link: "https://github.com/themridul03",
    metrics: {
      stars: 156,
      forks: 31,
      views: "6.4K",
      precision: "DICOM 3.0 Ready",
    },
    features: [
      "Zero-footprint web DICOM viewer for interactive viewing of radiography, CT, and MRI medical scans in browser.",
      "Diagnostic radiology toolset: Window Width/Window Level (WW/WL), caliper measurement, ROI calculation, and LUT inversion.",
      "Automated clinical instrument interfacing (Mindray, Sysmex hematology & biochemistry analyzers) via bidirectional serial/TCP-IP.",
      "End-to-end specimen workflow tracking from sample barcoding and accessioning to automated doctor PDF report dispatch."
    ],
  },
  {
    name: "Medivue AI – Malaria Cell Detection",
    isMajor: false,
    category: "ai",
    subCategory: "Deep Learning • Healthcare AI",
    tagline: "AI-powered malaria detection from blood smear images using computer vision",
    description:
      "AI-powered malaria detection from blood smear images using deep learning and computer vision. Built with React, Supabase, FastAPI, and Keras for hospital workflows with patient management, PDF report generation, and real-time analytics.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "FastAPI", color: "green-text-gradient" },
      { name: "Keras / CNN", color: "ruby-text-gradient" },
      { name: "Supabase", color: "pink-text-gradient" },
      { name: "Python", color: "orange-text-gradient" },
    ],
    image: malariadetectionsystem,
    images: [
      malariadetectionsystem,
      malariadetectionsystem1,
      malariadetectionsystem2,
    ],
    source_code_link: "https://github.com/themridul03/MedivueAI",
    live_demo_link: "https://medivue-ai.vercel.app/",
    metrics: {
      stars: 172,
      forks: 41,
      views: "8.1K",
      accuracy: "97.4%",
    },
    features: [
      "Custom-trained Keras convolutional neural network classifying parasitized vs uninfected thin blood smear cells.",
      "High-throughput asynchronous FastAPI backend serving inference predictions in under 200 milliseconds.",
      "Automated clinical PDF report generation formatted with cell confidence score and pathologist verification signature.",
      "Real-time hospital analytics dashboard powered by Supabase with patient history tracking and infection rate statistics."
    ],
  },
  {
    name: "HomeScape – AI Real Estate Business",
    isMajor: false,
    category: "ai",
    subCategory: "Next.js • TypeScript • AI Valuation",
    tagline: "A real estate business platform powered by artificial intelligence",
    description:
      "A next-generation real estate business platform powered by AI property valuation, smart match algorithms, dynamic spatial filtering, and 3D virtual tour discovery. Built with TypeScript, React, and modern Tailwind CSS.",
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "React.js", color: "green-text-gradient" },
      { name: "Next.js", color: "violet-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "AI Valuation", color: "orange-text-gradient" },
    ],
    image: homescape,
    images: [homescape],
    source_code_link: "https://github.com/themridul03/HomeScape",
    live_demo_link: "https://home-scape-five.vercel.app/",
    metrics: {
      stars: 138,
      forks: 27,
      views: "6.9K",
      matchRate: "98% AI Match",
    },
    features: [
      "AI property valuation engine estimating fair market price, capital appreciation projections, and rental yield.",
      "Interactive 3D virtual tour integration allowing prospective buyers to explore luxury estates remotely.",
      "Smart recommendation algorithm matching users to homes based on commute, lifestyle, budget, and school ratings.",
      "Ultra-responsive responsive UI with server-side rendering for optimal speed and search engine visibility."
    ],
  },
  {
    name: "Paddle-Pop – Real-Time Multiplayer Pong",
    isMajor: false,
    category: "web",
    subCategory: "WebSockets • Real-Time Multiplayer",
    tagline: "Fast, smooth, competitive real-time multiplayer Pong with AI duel",
    description:
      "A modern real-time multiplayer Pong game featuring smooth gameplay, responsive controls, live scoring, and exciting online paddle battles. Features three modes: Online Duel with friends, local duel on the same screen, and intelligent AI opponent.",
    tags: [
      { name: "Socket.io", color: "blue-text-gradient" },
      { name: "Express.js", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "HTML5 Canvas", color: "orange-text-gradient" },
    ],
    image: ponggame,
    images: [ponggame],
    source_code_link: "https://github.com/themridul03/Paddle-Pop",
    live_demo_link: "https://paddle-pop-1.onrender.com/",
    metrics: {
      stars: 118,
      forks: 23,
      views: "4.8K",
      latency: "<20ms",
    },
    features: [
      "Ultra-low latency multiplayer synchronization over WebSockets with server reconciliation and client interpolation.",
      "Three engaging game modes: Matchmaking Online, Same-Screen Dual Keyboard Duel, and Adaptive AI Bot.",
      "Smooth physics calculations for ball angle reflection, paddle velocity momentum, and spin trajectory.",
      "Score tracking, sound effect cues, particle bursts, and winner celebration screen."
    ],
  },
  {
    name: "ByteCraft – Online Code Compiler",
    isMajor: false,
    category: "web",
    subCategory: "Developer Tools • Live Sandbox",
    tagline: "Online HTML, CSS, JavaScript compiler and interactive playground",
    description:
      "An online HTML, CSS, and JavaScript compiler and live playground. Allows developers to write code, test front-end components, inspect console output, and view immediate hot-reloaded results in an isolated sandbox.",
    tags: [
      { name: "JavaScript", color: "ruby-text-gradient" },
      { name: "HTML5", color: "orange-text-gradient" },
      { name: "CSS3", color: "blue-text-gradient" },
      { name: "Live Sandbox", color: "green-text-gradient" },
      { name: "React", color: "violet-text-gradient" },
    ],
    image: bytecraft,
    images: [bytecraft],
    source_code_link: "https://github.com/themridul03/ByteCraft",
    live_demo_link: "https://byte-craft-snowy.vercel.app/",
    metrics: {
      stars: 104,
      forks: 19,
      views: "4.2K",
      fps: "60 FPS Sandbox",
    },
    features: [
      "Instant live code evaluation with debounced hot-reloading for HTML5, CSS3, and JavaScript.",
      "Secure sandboxed iframe runtime environment protecting parent window against infinite loops or DOM contamination.",
      "Integrated developer virtual console capturing console.log, warnings, syntax errors, and object dumps.",
      "Responsive code editor layout with split view options, full-screen preview toggle, and template presets."
    ],
  },
  {
    name: "MIMI-Hotels & HotelAPi",
    isMajor: false,
    category: "fullstack",
    subCategory: "Hospitality Management • REST API",
    tagline: "Luxury hotel booking engine and high-performance RESTful API backend",
    description:
      "A complete hotel booking and reservation system paired with HotelAPi, a high-performance RESTful backend. Handles room inventory, guest reservations, calendar date-range lookups, and luxury suite checkout.",
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "REST APIs", color: "pink-text-gradient" },
      { name: "React", color: "violet-text-gradient" },
      { name: "Tailwind CSS", color: "orange-text-gradient" },
    ],
    image: mimihotels,
    images: [mimihotels],
    source_code_link: "https://github.com/themridul03/MIMI-Hotels",
    live_demo_link: "https://mimi-hotels.vercel.app/",
    metrics: {
      stars: 126,
      forks: 22,
      views: "5.5K",
      api: "HotelAPi Backend",
    },
    features: [
      "Full-featured HotelAPi backend providing endpoints for room categories, pricing, bookings, and customer reviews.",
      "Interactive calendar date-picker with real-time room availability validation preventing duplicate reservations.",
      "Luxury boutique UI highlighting room amenities, high-res galleries, guest reviews, and breakfast add-ons.",
      "Automated booking confirmation and digital reservation voucher generation."
    ],
  },
  {
    name: "Green Cross Hospital",
    isMajor: false,
    category: "web",
    subCategory: "Healthcare Web • Patient Portal",
    tagline: "Modern hospital management, doctor scheduling & OPD appointment portal",
    description:
      "A healthcare hospital management platform providing doctor directory, specialty departments (Cardiology, Neurology, Pediatrics, Orthopedics), online OPD slot booking, and emergency assistance.",
    tags: [
      { name: "JavaScript", color: "orange-text-gradient" },
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "green-text-gradient" },
      { name: "OPD Booking", color: "ruby-text-gradient" },
    ],
    image: greencross,
    images: [greencross],
    source_code_link: "https://github.com/themridul03/Green-Cross-Hospital",
    live_demo_link: "https://green-cross-hospital.vercel.app/",
    metrics: {
      stars: 94,
      forks: 17,
      views: "3.7K",
      emergency: "24/7 Hotline",
    },
    features: [
      "Doctor specialty directory with credentials, years of experience, and next available appointment slot.",
      "Online OPD appointment booking engine with slot reservation and instant appointment SMS/email notification.",
      "Emergency hotline triage banner with one-tap ambulance dispatch and hospital GPS location navigator.",
      "Accessible, clean healthcare UI built with semantic HTML and responsive Tailwind styling."
    ],
  },
  {
    name: "Prachini Coffee Shop",
    isMajor: false,
    category: "web",
    subCategory: "Artisan Cafe • E-Commerce",
    tagline: "Artisan coffee roastery and modern online cafe ordering web app",
    description:
      "A boutique coffee shop web application offering artisan single-origin roasts, customizable brew profiles, dynamic shopping cart calculations, and animated checkout flow. Built with TypeScript, React, and Tailwind CSS.",
    tags: [
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "React.js", color: "orange-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "E-Commerce", color: "green-text-gradient" },
    ],
    image: prachini,
    images: [prachini],
    source_code_link: "https://github.com/themridul03/PrachiniCoffeeShop",
    live_demo_link: "https://prachini-coffee-shop.vercel.app/",
    metrics: {
      stars: 86,
      forks: 15,
      views: "3.1K",
      taste: "Single-Origin",
    },
    features: [
      "Artisan coffee catalog with detailed flavor notes, origin elevation, bean roast level (Light/Medium/Dark).",
      "Dynamic shopping cart with milk customization (Oat, Almond, Whole), espresso shot add-ons, and coupon codes.",
      "Fluid micro-animations and warm coffee aesthetic designed with responsive Tailwind CSS.",
      "Integrated fast checkout simulation with order summary and delivery ETA tracker."
    ],
  },
];

export const testimonials = [
  {
    testimonial:
      "Mridul architected our cloud-native ASP.NET Core microservices with incredible speed and rock-solid reliability. His database optimizations alone reduced our query bottlenecks by 40%.",
    name: "Engineering Lead",
    designation: "VP of Engineering",
    company: "Midtown Software",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  },
  {
    testimonial:
      "Working with Mridul on Karto was a game-changer. He single-handedly developed the React Native mobile apps, real-time Socket.io tracking, and got our product successfully live on Google Play.",
    name: "Product Manager",
    designation: "Founder & Product Lead",
    company: "Karto Hyperlocal",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
  },
  {
    testimonial:
      "Mridul's deep mastery over .NET, SQL Server, and full-stack integration allowed us to deliver complex laboratory ERP workflows and DICOM imaging ahead of schedule. Truly exceptional developer!",
    name: "Operations Director",
    designation: "Chief Technical Architect",
    company: "Busysoft Systems",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  },
];

export const words = [
  { text: "Ideas", imgPath: ideas, font: "Arial, sans-serif" },
  {
    text: "Concepts",
    imgPath: concepts,
    font: "'Courier New', Courier, monospace",
  },
  {
    text: "Designs",
    imgPath: designs,
    font: "'Times New Roman', Times, serif",
  },
  { text: "Code", imgPath: code, font: "'Fira Mono', monospace" },
  {
    text: "Ideas",
    imgPath: ideas,
    font: "'Comic Sans MS', cursive, sans-serif",
  },
  { text: "Concepts", imgPath: concepts, font: "'Roboto', sans-serif" },
  { text: "Designs", imgPath: designs, font: "'Georgia', serif" },
  { text: "Code", imgPath: code, font: "'Source Code Pro', monospace" },
];
