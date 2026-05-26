import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import University from './models/University.js';
import Event from './models/Event.js';
import Testimonial from './models/Testimonial.js';
import Blog from './models/Blog.js';

const seedDatabase = async () => {
  console.log('🌱  Starting database seeding process...');
  
  // Establish connection
  await connectDB();

  try {
    // Clear all existing documents
    await User.deleteMany({});
    await University.deleteMany({});
    await Event.deleteMany({});
    await Testimonial.deleteMany({});
    await Blog.deleteMany({});
    
    console.log('🧹  Existing collections cleared.');

    // 1. Seed Users (Admin & Student)
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const studentPassword = await bcrypt.hash('student123', salt);

    await User.create({
      name: 'Administrator',
      email: 'admin@brightspot.com',
      password: adminPassword,
      role: 'admin',
      documents: [],
      notifications: [{
        title: 'System Launched',
        message: 'Admin console initialized successfully.',
        isRead: false
      }]
    });

    await User.create({
      name: 'John Doe',
      email: 'student@brightspot.com',
      password: studentPassword,
      role: 'student',
      documents: [
        { name: '10th_Grade_Marksheet.pdf', url: '/uploads/mock-10th.pdf' },
        { name: '12th_Grade_Marksheet.pdf', url: '/uploads/mock-12th.pdf' }
      ],
      notifications: [
        {
          title: 'Welcome to Bright Spot!',
          message: 'Your student portal is live! Explore universities, check fee ranges, and submit your applications directly. Use the WhatsApp button to chat with counselors!',
          isRead: false
        },
        {
          title: 'Upcoming Seminar Invitation',
          message: 'Register for the Global Study Webinar scheduled for next Saturday to explore engineering scholarships.',
          isRead: false
        }
      ]
    });

    console.log('👤  Admin & Student accounts seeded.');

    // 2. Seed Universities
    // Using clean inline SVG icons for instant premium rendering in the frontend
    const uniLogo1 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%230B2545"/><path d="M50 20L20 35L50 50L80 35L50 20Z" fill="%23D4AF37"/><path d="M20 35V65L50 80V50L20 35Z" fill="%23134074"/><path d="M80 35V65L50 80V50L80 35Z" fill="%23C5A059"/></svg>`;
    const uniLogo2 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%23134074"/><circle cx="50" cy="50" r="30" stroke="%23D4AF37" stroke-width="6"/><path d="M35 50H65M50 35V65" stroke="%23EEF4F8" stroke-width="6" stroke-linecap="round"/></svg>`;
    const uniLogo3 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%230B2545"/><polygon points="50,15 80,75 20,75" fill="%23D4AF37"/><circle cx="50" cy="55" r="12" fill="%23FFFFFF"/></svg>`;
    const uniLogo4 = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%23D4AF37"/><path d="M30 30H70V45H30V30ZM30 55H70V70H30V55Z" fill="%230B2545"/></svg>`;

    const mockCampusImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop';
    const mockCampusImage2 = 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1486&auto=format&fit=crop';
    const mockCampusImage3 = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop';
    const mockCampusImage4 = 'https://images.unsplash.com/photo-1607237138185-eedd996ece57?q=80&w=1470&auto=format&fit=crop';

    await University.create({
      name: 'Krishna University',
      logo: uniLogo1,
      location: 'Machilipatnam, Andhra Pradesh',
      rankings: 'State Ranking #12 | NAAC A Grade',
      feesRange: '₹30,000 - ₹1,20,000 / year',
      placements: '88% Placement Success Rate',
      overview: 'Krishna University is a state-funded institution catering to academic excellence. Established in 2008, it boasts exceptional infrastructure, digital laboratories, and dedicated placement teams facilitating stellar industrial pathways.',
      campusImages: [mockCampusImage, mockCampusImage3],
      courses: [
        {
          name: 'B.Tech Computer Science & Engineering',
          duration: '4 Years',
          fee: 80000,
          description: 'Comprehensive study of computing paradigms, algorithms, hardware architectures, and modern software development pipelines.',
          curriculum: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Machine Learning Essentials', 'Web Engineering']
        },
        {
          name: 'B.Sc Digital Electronics & Communication',
          duration: '3 Years',
          fee: 45000,
          description: 'Focuses on modern microprocessors, VLSI design principles, communication physics, and automation hardware systems.',
          curriculum: ['Analog Circuits', 'Digital Communication Protocols', 'Microcontrollers & IoT', 'Signal Processing']
        },
        {
          name: 'Master of Business Administration (MBA)',
          duration: '2 Years',
          fee: 65000,
          description: 'Global business management course targeting operations, digital marketing, corporate finance, and leadership workflows.',
          curriculum: ['Organizational Behavior', 'Financial Analysis', 'Strategic Operations', 'Digital Brand Management']
        },
        {
          name: 'Master of Computer Applications (MCA)',
          duration: '2 Years',
          fee: 70000,
          description: 'Advanced postgraduate software program teaching application architecture, distributed computing, and database scaling.',
          curriculum: ['Advanced Java Programming', 'Cloud Architecture', 'Mobile App Development', 'Cyber Security Protocols']
        }
      ],
      academicStructure: 'Semester-based pattern with continuous internal assessments (CIA), laboratory workshops, and a mandatory final semester capstone project.',
      hostelDetails: 'Excellent separate male/female residence facilities offering high-speed Wi-Fi, hygienic cafeteria dining, indoor gymnasiums, and round-the-clock medical care.',
      facultyHighlights: [
        'Dr. A. K. R. Prasad - PhD in Computer Science (30+ research journals)',
        'Prof. S. Lakshmi - Expert in VLSI Digital Designs & Systems',
        'Dr. Raghav Reddy - MBA Dean, Former Chief Business Strategist'
      ],
      brochureUrl: '/uploads/krishna-university-brochure.pdf'
    });

    await University.create({
      name: 'Sandip University',
      logo: uniLogo2,
      location: 'Nashik, Maharashtra',
      rankings: 'Top Private University in West India | NAAC A+',
      feesRange: '₹95,000 - ₹2,50,000 / year',
      placements: '94% Placements | Highest Package ₹18 LPA',
      overview: 'Sandip University is a world-class educational hub sprawling across 250+ acres. Known for its global curriculum, industry integration, and international exchanges, it nurtures students to become global business leaders.',
      campusImages: [mockCampusImage2, mockCampusImage4],
      courses: [
        {
          name: 'B.Tech Computer Science (AI & Machine Learning)',
          duration: '4 Years',
          fee: 140000,
          description: 'Premium software curriculum designed in partnership with IBM, teaching neural networks, deep learning models, and automation systems.',
          curriculum: ['Python for AI', 'Applied Neural Networks', 'Natural Language Processing', 'Data Warehousing', 'Robotics Systems']
        },
        {
          name: 'MBA International Finance & Consulting',
          duration: '2 Years',
          fee: 170000,
          description: 'Superb financial counseling course. Trains students in international trade, investment modeling, risk auditing, and fintech.',
          curriculum: ['Global Financial Markets', 'Fintech Security', 'Investment Banking', 'Risk Assessment & Auditing']
        },
        {
          name: 'B.Sc Forensic Science & Cyber Investigation',
          duration: '3 Years',
          fee: 95000,
          description: 'Hands-on scientific course focused on crime scene recreation, DNA analysis, cyber forensics, and digital fraud prevention.',
          curriculum: ['Criminal Law & Codes', 'Digital Evidence Forensics', 'Toxicology Systems', 'Ballistic Analysis']
        }
      ],
      academicStructure: 'Choice-Based Credit System (CBCS) allowing students to select dual majors and interdisciplinary minors along with international exchange options.',
      hostelDetails: 'State-of-the-art multi-sharing AC and Non-AC hostel rooms, laundry operations, organic student mess, swimming pool access, and robust multi-tier security.',
      facultyHighlights: [
        'Dr. Mukesh Pathak - Member of International Forensic Guild',
        'Dr. Cheryl Dsouza - Artificial Intelligence Pioneer, Former Senior Tech Consultant',
        'Prof. Anand Joshi - Harvard Alumnus, Business Policy Expert'
      ],
      brochureUrl: '/uploads/sandip-university-brochure.pdf'
    });

    await University.create({
      name: 'Marwadi University',
      logo: uniLogo3,
      location: 'Rajkot, Gujarat',
      rankings: 'NAAC A+ Accredited | Ranked #3 Global Green Campus',
      feesRange: '₹75,000 - ₹1,80,000 / year',
      placements: '92% Placements | 480+ Recruiters Onboard',
      overview: 'Marwadi University provides global learning ecosystems combining value-based academic standards with real-world corporate training. Backed by excellent incubation labs, it is a prime hub for startup founders.',
      campusImages: [mockCampusImage3, mockCampusImage2],
      courses: [
        {
          name: 'B.Tech Software Engineering',
          duration: '4 Years',
          fee: 110000,
          description: 'Software development pipeline program covering Agile, DevOps, cloud virtualization, container scaling, and full-stack software structures.',
          curriculum: ['Agile Project Management', 'Cloud Computing (AWS/GCP)', 'DevOps Pipelines', 'Full Stack Development', 'Software Quality Assurance']
        },
        {
          name: 'MBA Business Analytics & Big Data',
          duration: '2 Years',
          fee: 135000,
          description: 'Equips students with analytical tools to parse business datasets, design predictive models, and steer data-backed organizational decisions.',
          curriculum: ['Predictive Modeling', 'Tableau & PowerBI Systems', 'R & Python Analytics', 'Market Research Analytics']
        },
        {
          name: 'BCA Mobile Application Architecture',
          duration: '3 Years',
          fee: 75000,
          description: 'Focused developer track for crafting high-performance iOS, Android, and cross-platform native applications.',
          curriculum: ['iOS App Development (Swift)', 'Android App Development (Kotlin)', 'React Native Frameworks', 'UI/UX Mobile Design']
        }
      ],
      academicStructure: 'Highly interactive structure. Combines flipped classroom formats, industrial hackathons, and corporate mentorship modules throughout the degree.',
      hostelDetails: 'Ultra-modern residence tower with high-speed Wi-Fi lounges, indoor squash courts, fully-functional medical clinic, international student dining, and library study hubs.',
      facultyHighlights: [
        'Dr. Rajesh Marwadi - PhD in Cloud Infrastructure & Virtualization',
        'Prof. Nikita Dave - Mobile UI UX pioneer (15+ industry awards)',
        'Dr. Samer Al-Safi - Expert in Predictive Big Data Algorithms'
      ],
      brochureUrl: '/uploads/marwadi-university-brochure.pdf'
    });

    await University.create({
      name: 'Weltec College of Engineering',
      logo: uniLogo4,
      location: 'Vadodara, Gujarat',
      rankings: 'Leading Tech Institution | GTU Top Affiliated',
      feesRange: '₹40,000 - ₹90,000 / year',
      placements: '90% Tech Placements | Prime Local Industry Tie-ups',
      overview: 'Weltec College is renowned for delivering practical, career-first vocational and engineering curriculums. With continuous industrial alignments and internship tracks, it accelerates direct employability in tech firms.',
      campusImages: [mockCampusImage4, mockCampusImage],
      courses: [
        {
          name: 'B.Tech Information Technology & Cyber Security',
          duration: '4 Years',
          fee: 90000,
          description: 'Focuses on network administration, security audits, cryptography, secure coding practices, and industrial firewall setup.',
          curriculum: ['Cryptography Algorithms', 'Network Security & Firewalls', 'Ethical Hacking Labs', 'Secure Software Engineering']
        },
        {
          name: 'Diploma in Practical Network Administration',
          duration: '1 Year',
          fee: 40000,
          description: 'Fast-track career booster certificate teaching Cisco routing, server configurations, fiber-optic splicing, and active directory schemes.',
          curriculum: ['CCNA Certification Prep', 'Windows Server Administration', 'Linux Shell Administration', 'Network Troubleshooting']
        },
        {
          name: 'MCA Database Systems & Security',
          duration: '2 Years',
          fee: 85000,
          description: 'Postgraduate course concentrating on SQL/NoSQL structures, database optimization, big data warehousing, and system security policies.',
          curriculum: ['High-Performance SQL', 'NoSQL Architectures (MongoDB/Redis)', 'Data Mining Tools', 'Database Audits & Security']
        }
      ],
      academicStructure: 'Project-first hands-on learning. Every subject is coupled with a mandatory laboratory workbook and an active weekly industry-visit schedule.',
      hostelDetails: 'Affordable, clean off-campus standard accommodations, providing regular transport to campus, healthy vegetarian cuisine, sports areas, and study lounges.',
      facultyHighlights: [
        'Prof. Hitesh Patel - Network Security Consultant (CEH Certified)',
        'Dr. Manisha Shah - Database Specialist, Lead Database Architect for State Projects',
        'Prof. Jayesh Mehta - Cloud Automation Specialist'
      ],
      brochureUrl: '/uploads/weltec-college-brochure.pdf'
    });

    console.log('🏫  Universities seeded successfully.');

    // 3. Seed Events
    await Event.create({
      title: 'Global Admission & Scholarship Drive 2026',
      type: 'Admission Drive',
      date: 'June 15, 2026',
      time: '10:00 AM - 04:00 PM IST',
      location: 'Mumbai Office & Virtual Lobby',
      description: 'Interact with registrar members from Krishna, Sandip, Marwadi, and Weltec directly. Get spot admission letters, immediate document authentication, and merit-based scholarship evaluation!',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop',
      registrations: [
        { name: 'Alice Smith', email: 'alice@gmail.com', phone: '9876543210' },
        { name: 'Bob Johnson', email: 'bob@gmail.com', phone: '9876543211' }
      ]
    });

    await Event.create({
      title: 'AI & Data Science Careers in West India',
      type: 'Webinar',
      date: 'June 22, 2026',
      time: '04:00 PM - 05:30 PM IST',
      location: 'Online via Zoom Workspace',
      description: 'Explore the high-growth trajectory of AI & ML. Featuring keynote presentation from Dr. Cheryl Dsouza (Dean of AI at Sandip University) on predictive modeling and career paths.',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1470&auto=format&fit=crop',
      registrations: []
    });

    await Event.create({
      title: 'Practical Cybersecurity & Ethical Hacking Seminar',
      type: 'Seminar',
      date: 'July 05, 2026',
      time: '11:00 AM - 01:30 PM IST',
      location: 'Bright Spot Vadodara Center',
      description: 'Live physical workshop showing network administration penetration hacking. Guided by Prof. Hitesh Patel of Weltec College. Ideal for IT aspirants seeking high-paying cyber roles.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1470&auto=format&fit=crop',
      registrations: []
    });

    await Event.create({
      title: 'Study Abroad Pathways & Global Credit Transfer',
      type: 'Workshop',
      date: 'July 18, 2026',
      time: '02:00 PM - 04:30 PM IST',
      location: 'Bright Spot Nashik Center',
      description: 'Understanding Credit Transfer Programs. Learn how starting an engineering or management degree in India can lead to direct credit transfers to partner universities in Germany, USA, and UK.',
      image: 'https://images.unsplash.com/photo-1552581234-2612b75d8953?q=80&w=1470&auto=format&fit=crop',
      registrations: []
    });

    console.log('📅  Events seeded successfully.');

    // 4. Seed Testimonials
    await Testimonial.create({
      name: 'Rohan Deshmukh',
      text: 'Bright Spot completely simplified my admission process to Sandip University. They helped me upload my documents, evaluated my board marks, and secured a 40% Merit Scholarship. Their AI chatbot, BrightBot, even helped me choose AI & ML over standard CS!',
      rating: 5,
      course: 'B.Tech AI & ML',
      university: 'Sandip University',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop'
    });

    await Testimonial.create({
      name: 'Anjali Sharma',
      text: 'I was highly confused about pursuing B.Tech vs MCA. The academic advisors at Bright Spot sat down with me for 2 hours, assessed my interests, and recommended Weltec for its direct practical approach. I am currently in my 2nd year and already bagged an internship!',
      rating: 5,
      course: 'B.Tech Cyber Security',
      university: 'Weltec College of Engineering',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop'
    });

    await Testimonial.create({
      name: 'Karthik Raja',
      text: 'Stellar experience! The team is highly professional. The dynamic dashboard in the student portal allowed me to track my application at Krishna University, and my admission letter was dispatched inside 10 days. Exceptional service!',
      rating: 5,
      course: 'MCA Software Architectures',
      university: 'Krishna University',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop'
    });

    await Testimonial.create({
      name: 'Priyanka Patel',
      text: 'Marwadi University has a beautiful green campus. Thanks to Bright Spot, they guided me step-by-step through the documentation process, and I registered without any hassles. Their counselor reviews were highly accurate!',
      rating: 4,
      course: 'MBA Big Data',
      university: 'Marwadi University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1374&auto=format&fit=crop'
    });

    console.log('⭐️  Testimonials seeded successfully.');

    // 5. Seed Blogs
    await Blog.create({
      title: 'Top 5 Scholarships You Can Unlock in 2026',
      summary: 'Explore full and partial tuition fee scholarships, financial grants, state sponsorship schemes, and direct consultant-allocated discounts for your higher studies.',
      content: 'Higher education is a life-changing investment, but the cost can often seem daunting. Fortunately, multiple avenues of financial aid are available to talented students. \n\n1. **Merit-Based Institutional Scholarships**: Universities like Sandip and Marwadi reward top board scorers (85% and above) with direct tuition cuts ranging from 25% to 100%. \n2. **State Government Sponsorships**: State-specific grants help minority and low-income students cover living and books costs.\n3. **Consultancy Strategic Aid**: Applying through authorized consultancies like Bright Spot guarantees direct, corporate-backed scholarship brackets.\n\nTo lock in your scholarship, make sure to submit your transcript files early during the counseling cycle!',
      category: 'Scholarships',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop',
      readTime: '4 min read'
    });

    await Blog.create({
      title: 'Computer Science: Specialization vs General Degree',
      summary: 'Should you select B.Tech in AI & ML, Cyber Security, Software Engineering, or go with a general Computer Science degree? Let us analyze the job market trends.',
      content: 'With the technology sector shifting rapidly, high school graduates face a crucial question: is it better to study general Computer Science or select a specialized track like AI, Cloud Computing, or Cyber Security?\n\n**General B.Tech CS**: Offers broad foundations. You learn networking, databases, algorithms, and software testing. It keeps your options flexible, letting you transition into any tech branch later.\n\n**Specialized B.Tech (AI & ML / Cyber Security)**: Highly focused. For instance, Sandip University offers B.Tech AI & ML in partnership with IBM, putting you straight onto neural networks and machine learning engineering. Weltec provides Cyber Security labs that groom you specifically for security audit and penetration testing roles.\n\nOur recommendation? If you have a clear passion for algorithms or systems security, jump into the specialization. If you are still exploring, go general and pick your niche in post-graduation!',
      category: 'Career Guidance',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
      readTime: '6 min read'
    });

    await Blog.create({
      title: 'Cracking IELTS/TOEFL: Expert Tips for Study Abroad',
      summary: 'Planning to transfer credits abroad or study internationally? Here is a high-impact guide to preparing for your English language exams.',
      content: 'For Indian students looking to transfer academic credits to universities in Europe or North America, proving English proficiency is a critical bottleneck. \n\n1. **Active Listening**: Listen to English podcasts or news broadcasts without subtitles to train your ear for accents (British, American, and Australian).\n2. **Academic Reading**: Practice scanning long paragraphs and summarize key arguments. Time management is crucial; speed-reading saves lives in the IELTS reading block.\n3. **Structured Writing**: Keep essay arguments logical. Do not use over-complicated vocabulary if you do not know the exact contextual syntax.\n\nRegister for our Bright Spot IELTS coaching bootcamp to take regular mock tests!',
      category: 'Study Abroad',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
      readTime: '5 min read'
    });

    await Blog.create({
      title: 'The Ultimate Checklist for Engineering Admissions',
      summary: 'A step-by-step checklist detailing document requirements, registration deadlines, counseling stages, and verification procedures.',
      content: 'The engineering admission timeline is fast-paced. Missing a single deadline can cost you a year. Here is your ultimate checklist to stay on top of the queue:\n\n✔️ **Secure marksheets**: Ensure you have clear, scanned copies of your 10th and 12th board results.\n✔️ **Compile proof files**: Keep your Aadhaar Card, Transfer Certificates, and Migration Certificates ready in a dedicated PDF portfolio.\n✔️ **Define Course List**: Pick your preferred campuses (e.g. Krishna University for low cost, Sandip for premium infrastructure).\n✔️ **Lodge Online Applications**: Submit your profile on the Bright Spot application portal.\n\nHaving files prepared ensures our counselors can lock in your admission seats during first-round selections!',
      category: 'Admissions Tips',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
      readTime: '3 min read'
    });

    console.log('📝  Blogs seeded successfully.');
    console.log('\n===============================================================');
    console.log('🏆  Bright Spot database seeding operation COMPLETED SUCCESSFUL!');
    console.log('===============================================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('💥  Database seeding failed with error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
