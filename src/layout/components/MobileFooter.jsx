export default function MobileFooter() {
  return (
    <footer className="mobile-footer px-20 py-20 border-top-light js-mobile-footer mt-4">
      {/* Copyright Text */}
      <div className="text-center text-dark-1 mt-4">
        © {new Date().getFullYear()} PWNEU. All Rights Reserved.
      </div>
      <div className="text-center text-dark-1 ">
        New Era University
      </div>
      <div className="mt-4"></div>
    </footer>
  );
}
