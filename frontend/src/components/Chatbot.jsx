import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Award, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '✨ **Welcome to Bright Spot Solutions!** I am **BrightBot**, your personal academic counselor. \n\nI can recommend courses, evaluate scholarships, check rankings for *Krishna, Sandip, Marwadi, and Weltec*, or guide you through admissions. \n\nWhat degree or career path are you planning to pursue?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const apiHost = 'http://localhost:5000';

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${apiHost}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      
      const botMsg = {
        sender: 'bot',
        text: data.reply || "I encountered an error parsing that. Could you rephrase your question?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Smart offline fallback if server is offline
      setTimeout(() => {
        let fallbackReply = "I am currently running in offline consultation mode. ";
        const query = text.toLowerCase();

        if (query.includes('scholarship')) {
          fallbackReply += "Yes! Bright Spot offers direct **Merit Scholarships** covering up to **50% of tuition fees** for board marks over 85%. You can upload your marksheet under **Apply Now** for spot evaluation!";
        } else if (query.includes('computer') || query.includes('cs') || query.includes('it') || query.includes('software')) {
          fallbackReply += "We offer premium B.Tech CS & MCA tracks at **Sandip University (AI/ML)**, **Marwadi University (DevOps)**, and **Weltec IT Systems**. All feature outstanding placement rates over 90%!";
        } else if (query.includes('fee') || query.includes('cheap') || query.includes('cost')) {
          fallbackReply += "Our most cost-effective curriculum is at **Krishna University** (starting at ₹45,000/yr) and **Weltec Diploma** options (₹40,000/yr).";
        } else {
          fallbackReply += "I would love to analyze your transcripts. Please register an account, upload your documents in the student dashboard, or click the WhatsApp button to chat directly with our senior counseling board!";
        }

        setMessages(prev => [...prev, {
          sender: 'bot',
          text: fallbackReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const quickChips = [
    { label: '🎓 Scholarship Guide', query: 'Which scholarships are available?' },
    { label: '💻 Computer Science Options', query: 'Show B.Tech Computer Science courses' },
    { label: '💰 Most Affordable Courses', query: 'Which courses are cheap and affordable?' },
    { label: '📋 How to Apply', query: 'Show the admission steps' }
  ];

  // Helper to format chatbot responses (bold markdown and bullet items)
  const formatMarkdown = (text) => {
    return text.split('\n').map((line, index) => {
      // Bold rendering **text**
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic rendering *text*
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      if (line.trim().startsWith('-') || line.trim().startsWith('🔸') || line.trim().startsWith('🔹')) {
        return (
          <li key={index} className="ml-4 list-disc pl-1 text-sm leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-🔸🔹]\s*/, '') }} />
        );
      }
      if (line.trim().match(/^\d+\ufe0f?\?\s*[\).]/)) {
        return (
          <li key={index} className="ml-5 list-decimal pl-1 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatted.replace(/^\d+[\).]\s*/, '') }} />
        );
      }
      
      return (
        <p key={index} className="text-sm leading-relaxed min-h-[1rem]" 
           dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    });
  };

  return (
    <>
      {/* Floating Sparkle Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg bg-gradient-to-r from-brand-blue to-brand-navy hover:scale-110 active:scale-95 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        aria-label="Open AI Counseling Chat"
      >
        <Sparkles className="w-6 h-6 animate-pulse text-brand-gold" />
      </button>

      {/* Slide-out Counseling Panel */}
      <div
        className={`fixed bottom-6 right-6 w-[360px] md:w-[400px] h-[550px] max-h-[85vh] rounded-2xl z-50 glass-panel flex flex-col overflow-hidden shadow-2xl transition-all duration-500 transform border border-brand-gold/30 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-90 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header Block */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-dark to-brand-navy text-white">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-brand-dark" />
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30">
                <Sparkles className="w-5 h-5 text-brand-gold" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">BrightBot Academic AI</h3>
              <p className="text-[10px] text-brand-goldLight font-medium">Online Consultant Board</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Feeds Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-sm space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/50 rounded-tl-none'
                }`}
              >
                {msg.sender === 'bot' ? (
                  <div className="space-y-1">{formatMarkdown(msg.text)}</div>
                ) : (
                  <p className="leading-relaxed">{msg.text}</p>
                )}
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200/60 dark:border-slate-700/50 flex space-x-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length === 1 && !isLoading && (
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {quickChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip.query)}
                className="text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-navy dark:text-brand-goldLight hover:border-brand-gold dark:hover:border-brand-gold/60 px-2.5 py-1 rounded-full transition-all flex items-center gap-1 shrink-0"
              >
                {chip.label}
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        )}

        {/* Input Footer Area */}
        <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-850 flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about courses, fees, scholarships..."
            className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border-none focus:ring-1 focus:ring-brand-gold dark:text-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldHover text-brand-dark hover:shadow-md disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
