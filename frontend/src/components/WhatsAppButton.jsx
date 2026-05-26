import React from 'react';

export const WhatsAppButton = () => {
  const phoneNumber = '919876543210'; // Professional mockup contact
  const message = 'Hello Bright Spot Educational Solutions, I would like to know more about admissions.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-float pointer-events-auto">
      {/* Pulsing Outer Rings */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-brand-gold/40 opacity-75 animate-ping -z-10" />
      
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-brand-gold to-brand-goldHover text-brand-dark rounded-full shadow-lg shadow-brand-gold/30 hover:scale-110 active:scale-95 transition-transform duration-300 group"
      >
        {/* Pulsating Indicator Badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[8px] font-bold text-white items-center justify-center">1</span>
        </span>

        {/* Custom Premium SVG WhatsApp Logo */}
        <svg 
          className="w-7 h-7 fill-brand-dark group-hover:rotate-12 transition-transform duration-300"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.023 14.067.993 11.458.993c-5.447 0-9.875 4.372-9.88 9.802-.002 1.83.5 3.616 1.455 5.161l-.988 3.606 3.692-.958zm11.391-6.136c-.328-.164-1.936-.955-2.235-1.063-.299-.11-.517-.164-.734.164-.218.327-.844 1.063-1.035 1.281-.19.219-.382.245-.71.082-.328-.164-1.386-.511-2.64-1.631-.975-.87-1.633-1.947-1.824-2.274-.191-.327-.02-.504.143-.667.147-.147.328-.382.492-.573.164-.19.218-.327.328-.545.11-.219.054-.409-.028-.573-.082-.164-.734-1.77-1.006-2.424-.265-.636-.53-.55-.73-.56-.19-.01-.408-.011-.625-.011-.218 0-.573.082-.872.409-.299.327-1.143 1.118-1.143 2.727 0 1.609 1.172 3.163 1.336 3.382.164.218 2.307 3.522 5.59 4.943.78.337 1.39.539 1.861.689.784.249 1.497.214 2.061.13.629-.094 1.936-.791 2.209-1.527.272-.737.272-1.363.19-1.528-.082-.164-.299-.245-.629-.409z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
