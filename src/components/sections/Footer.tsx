export default function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#0B0F17] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
            HB
          </div>
          <span className="text-gray-400 text-sm">Built with precision by Hariom Bhati</span>
        </div>
        
        <div className="text-gray-500 text-sm">
          © 2024 Hariom Bhati. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
