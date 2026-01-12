// app/page.tsx
import SlideDeck from "@/components/SlideDeck";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* Intro Section with Video Background */}
      <section className="h-screen flex flex-col items-center justify-center relative z-10 overflow-hidden">

        {/* Video Container */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            {/* Expects a file named intro.mp4 in public/video/ */}
            <source src="/video/intro.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-6 mix-blend-overlay">
            THE VISION
          </h1>
          <p className="text-neutral-300 uppercase text-xs tracking-[0.3em] animate-pulse">
            Scroll to Explore
          </p>
        </div>
      </section>

      {/* The Slide Deck Component */}
      <SlideDeck />

      {/* Outro Section */}
      <section className="h-[50vh] flex items-center justify-center bg-black">
        <h2 className="text-2xl font-light text-neutral-600">End of Deck</h2>
      </section>
    </main>
  );
}