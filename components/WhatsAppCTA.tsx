function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.03h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.14.82.84-3.06-.19-.31a8.06 8.06 0 0 1-1.24-4.26c0-4.46 3.63-8.08 8.09-8.08 2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.64 8.11-8.01 8.11Zm4.44-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export default function WhatsAppCTA() {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 p-4 flex items-center gap-4" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
      {/* WhatsApp Icon */}
      <div className="text-green-400 shrink-0">
        <WhatsAppIcon />
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-cream truncate">Join our nostalgia community</p>
        <p className="text-xs text-cream/60 truncate">Get daily throwback songs & stories</p>
      </div>

      {/* Join Button */}
      <a
        href="https://wa.me/917000000000"
        target="_blank"
        rel="noreferrer noopener"
        className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-5 py-2 rounded-full shrink-0 transition-colors"
      >
        Join Free
      </a>
    </div>
  );
}
