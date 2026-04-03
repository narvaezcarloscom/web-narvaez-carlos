import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F9F5] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#323232]/50 mb-4">
            404
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#212121] mb-6"
            style={{ fontFamily: "serif", letterSpacing: "-0.04em", lineHeight: 0.9 }}
          >
            Page not found.
          </h1>
          <p className="text-[#323232] mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#F43B3E] text-[#F8F9F5] px-7 py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-[#D93134] transition-colors duration-300"
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
