import express from 'express';
import University from '../models/University.js';

const router = express.Router();

// @desc    Process chatbot message and return AI academic recommendations
// @route   POST /api/ai/chat
// @access  Public
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ message: 'Message cannot be empty.' });
  }

  const query = message.toLowerCase().trim();

  try {
    // Fetch all university details to cross-reference real-time database records
    const universities = await University.find({});
    let responseText = '';

    // 1. Check for specific university mentions
    let matchedUni = null;
    for (const uni of universities) {
      if (query.includes(uni.name.toLowerCase()) || query.includes(uni.location.toLowerCase())) {
        matchedUni = uni;
        break;
      }
    }

    if (query.includes('krishna')) matchedUni = universities.find(u => u.name.toLowerCase().includes('krishna'));
    if (query.includes('sandip')) matchedUni = universities.find(u => u.name.toLowerCase().includes('sandip'));
    if (query.includes('marwadi')) matchedUni = universities.find(u => u.name.toLowerCase().includes('marwadi'));
    if (query.includes('weltec')) matchedUni = universities.find(u => u.name.toLowerCase().includes('weltec'));

    if (matchedUni) {
      const coursesList = matchedUni.courses.map(c => `- ${c.name} (Fees: ₹${c.fee?.toLocaleString()}/yr, Duration: ${c.duration})`).join('\n');
      responseText = `🏫 **${matchedUni.name}** (${matchedUni.location}) is a premium partner institution!
      
🏆 **Ranking:** ${matchedUni.rankings}
💼 **Placements:** ${matchedUni.placements}

📚 **Popular Courses Offered:**
${coursesList}

💡 *Would you like me to help you apply to ${matchedUni.name}? Just go to our **Apply Now** tab, fill out the forms, and upload your high school transcripts!*`;
    } 
    // 2. Check for Course/Discipline searches
    else if (query.includes('computer') || query.includes('cs') || query.includes('it') || query.includes('software') || query.includes('mca') || query.includes('bca')) {
      const options = [];
      universities.forEach(u => {
        const matchingCourses = u.courses.filter(c => 
          c.name.toLowerCase().includes('computer') || 
          c.name.toLowerCase().includes('software') || 
          c.name.toLowerCase().includes('it') ||
          c.name.toLowerCase().includes('mca') ||
          c.name.toLowerCase().includes('bca')
        );
        if (matchingCourses.length > 0) {
          options.push({ uniName: u.name, courses: matchingCourses });
        }
      });

      const optionsStr = options.map(o => 
        `🔸 **${o.uniName}**:\n` + o.courses.map(c => `   - ${c.name} (₹${c.fee?.toLocaleString()}/yr)`).join('\n')
      ).join('\n\n');

      responseText = `💻 **Computer Science & IT Course Options:**
We partner with several institutions offering state-of-the-art Computer Science & IT programs:

${optionsStr || 'No matching course list in database.'}

🚀 **BrightBot Career Tip:** CS is highly sought after! Marwadi University and Weltec have amazing placement rates exceeding 90% for software developers.`;
    }
    else if (query.includes('engineer') || query.includes('tech') || query.includes('b.tech') || query.includes('btech') || query.includes('mechanical') || query.includes('civil')) {
      const options = [];
      universities.forEach(u => {
        const matchingCourses = u.courses.filter(c => 
          c.name.toLowerCase().includes('engineering') || 
          c.name.toLowerCase().includes('tech') ||
          c.name.toLowerCase().includes('mechanical') ||
          c.name.toLowerCase().includes('civil')
        );
        if (matchingCourses.length > 0) {
          options.push({ uniName: u.name, courses: matchingCourses });
        }
      });

      const optionsStr = options.map(o => 
        `🛠️ **${o.uniName}**:\n` + o.courses.map(c => `   - ${c.name} (₹${c.fee?.toLocaleString()}/yr)`).join('\n')
      ).join('\n\n');

      responseText = `⚙️ **Engineering Programs (B.Tech / M.Tech):**
Here are the premier engineering universities ready for your registration:

${optionsStr || 'No matching engineering options.'}

🎯 *Interested? I recommend **Sandip University** for its modern labs and **Weltec** for its focused hands-on training.*`;
    }
    else if (query.includes('management') || query.includes('business') || query.includes('mba') || query.includes('bba') || query.includes('commerce')) {
      const options = [];
      universities.forEach(u => {
        const matchingCourses = u.courses.filter(c => 
          c.name.toLowerCase().includes('management') || 
          c.name.toLowerCase().includes('mba') ||
          c.name.toLowerCase().includes('bba') ||
          c.name.toLowerCase().includes('business')
        );
        if (matchingCourses.length > 0) {
          options.push({ uniName: u.name, courses: matchingCourses });
        }
      });

      const optionsStr = options.map(o => 
        `💼 **${o.uniName}**:\n` + o.courses.map(c => `   - ${c.name} (₹${c.fee?.toLocaleString()}/yr)`).join('\n')
      ).join('\n\n');

      responseText = `📊 **Business & Management Programs:**
Expand your corporate skills at our elite management colleges:

${optionsStr}

📈 **BrightBot Tip:** MBA programs at **Marwadi University** offer outstanding marketing and finance tracks with guest lectures from industry leaders.`;
    }
    // 3. Fee limits & Affordability
    else if (query.includes('fee') || query.includes('cheap') || query.includes('cost') || query.includes('affordable') || query.includes('price')) {
      const list = [];
      universities.forEach(u => {
        u.courses.forEach(c => {
          list.push({ uniName: u.name, courseName: c.name, fee: c.fee });
        });
      });
      // Sort by fee ascending
      list.sort((a, b) => a.fee - b.fee);
      const topCheap = list.slice(0, 5);

      const listStr = topCheap.map(item => `- **${item.courseName}** at *${item.uniName}* (₹${item.fee?.toLocaleString()}/yr)`).join('\n');

      responseText = `💰 **Affordable Course Options (Lowest Fees First):**
If you are budget-conscious, here are our most competitive fees:

${listStr}

🌟 **Consultant Note:** Bright Spot helps you secure **Merit Scholarships** which can slash these tuition fees by up to **50%** based on your GPA/board exam marks!`;
    }
    // 4. Scholarships
    else if (query.includes('scholarship') || query.includes('grant') || query.includes('discount') || query.includes('financial')) {
      responseText = `🎓 **Scholarships & Financial Aid at Bright Spot:**
We specialize in helping students lock in amazing scholarship packages! 

✨ **Available Categories:**
1. **Merit-Based Scholarships:** Up to 100% tuition waivers for top students scoring 90%+ in board exams.
2. **State-Level Sponsorships:** Government scholarships mapped dynamically by our support desk.
3. **Institutional Grants:** Partner universities like **Sandip University** and **Marwadi University** offer direct registration fee discounts for candidates applying through Bright Spot!

📝 **How to apply:** Check the "Apply Now" page, submit your transcripts, and our counselors will automatically cross-reference your marks to unlock the highest scholarship rate!`;
    }
    // 5. Admissions guidelines
    else if (query.includes('apply') || query.includes('admission') || query.includes('process') || query.includes('step') || query.includes('requirement')) {
      responseText = `📋 **Admission Process Made Easy:**
Applying through Bright Spot Educational Solutions is smooth and fast:

1️⃣ **Explore & Choose:** Navigate to our "Universities" tab, compare rankings, fees, and placement percentages.
2️⃣ **Create Profile:** Register a student account on our portal.
3️⃣ **Submit Application:** Fill out the online **Admission Form**, select your course, and upload documents (10th/12th grade sheets, ID proof).
4️⃣ **Consultant Review:** Our team will review your files, confirm details, and lodge your file directly into the university registrar.
5️⃣ **Status Tracking:** Track updates dynamically from your **Student Dashboard** and download your official Admission Letter!

💬 *Ready? Let me know which course you'd like to pursue!*`;
    }
    // 6. Generic welcome
    else {
      responseText = `✨ **Hello! I am BrightBot, your Bright Spot AI counselor.** ✨

I can help you map out your future career. Try asking me:
- 🎓 *Which scholarships are available?*
- 💻 *What Computer Science options do you have?*
- 🏫 *Tell me about Sandip University.*
- 💰 *Show me the most affordable courses.*
- 📋 *How do I apply for admissions?*

What subject or dream job are you exploring today?`;
    }

    res.json({ reply: responseText });
  } catch (error) {
    console.error('Chatbot processing error:', error.message);
    res.status(500).json({ message: 'Failed to process AI query.' });
  }
});

export default router;
