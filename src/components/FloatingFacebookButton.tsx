export const FloatingFacebookButton = () => {
  return (
    <a
      href="https://www.facebook.com/Sakib0Mahmud"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Facebook profile"
      title="Facebook"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1877F2] shadow-[0_10px_30px_rgba(24,119,242,0.45)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1877F2] animate-pulse"
    >
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <path
          d="M14.5 8H16V5.5c-0.8-0.1-1.6-0.1-2.4-0.1c-2.4 0-4.1 1.5-4.1 4.2V12H7v2.9h2.5V22h3.1v-7.1h2.5L15.5 12h-2.9V10c0-0.9 0.2-2 1.9-2Z"
          fill="#FFFFFF"
        />
      </svg>
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white/95 animate-ping" />
    </a>
  );
};
