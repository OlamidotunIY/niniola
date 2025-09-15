"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DomeGallery from "@/components/DomeGallery";

const IMAGES = [
  "/-22169957.jpg",
  "/-523937489.jpg",
  "/-607645841.jpg",
  "/-707310253.jpg",
  "/-952369650.jpg",
  "/-1072792537.jpg",
  "/-1204803283.jpg",
  "/-1237113290.jpg",
  "/-1387728735.jpg",
  "/-2054125556.jpg",
  "/-2080489042.jpg",
  "/83331604.jpg",
  "/140479127.jpg",
  "/202549167.jpg",
  "/307608503.jpg",
  "/682747302.jpg",
  "/939388702.jpg",
  "/1042474403.jpg",
  "/1243952191.jpg",
  "/1826708170.jpg",
  "/1962617314.jpg",
  "/2039510503.jpg",
  "/2103765599.jpg",
];

// 🎉 Confetti
function randomColor(i: number) {
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#B28DFF"];
  return colors[i % colors.length];
}
function Confetti() {
  const pieces = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: Math.random() * 120 - 60, opacity: 0 }}
          animate={{
            y: 900 + Math.random() * 200,
            rotate: Math.random() * 360,
            opacity: 1,
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 1.5,
          }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{ left: `${Math.random() * 100}%` }}
        >
          <div
            className="w-3 h-5 md:w-4 md:h-6 rounded-sm"
            style={{ background: randomColor(i) }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// 🎞 Memories Carousel with Ken Burns
function StackCarousel() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DomeGallery overlayBlurColor="#fce7f3" />
    </div>
  );
}

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [giftClaimed, setGiftClaimed] = useState(false);
  const [claimCode, setClaimCode] = useState("");
  const [puzzleInput, setPuzzleInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Gift unlock date = 25 days from today
  const unlockDate = new Date(Date.now() + 25 * 24 * 60 * 60 * 1000);

  // Derived state for whether gift is still locked
  const giftLocked = Date.now() < unlockDate.getTime();

  useEffect(() => {
    const claimed = localStorage.getItem("birthday_gift_claimed") === "true";
    const code = localStorage.getItem("birthday_gift_code") || "";
    setGiftClaimed(claimed);
    setClaimCode(code);
  }, []);

  function tryClaim() {
    if (puzzleInput.trim().toLowerCase() === "friend") {
      const code = `GIFT-${Math.random()
        .toString(36)
        .slice(2, 10)
        .toUpperCase()}`;
      localStorage.setItem("birthday_gift_claimed", "true");
      localStorage.setItem("birthday_gift_code", code);
      setClaimCode(code);
      setGiftClaimed(true);
      setShowModal(false);
    } else {
      alert(
        "Hmm — that doesn't look right. Hint: 'the word that describes us' 😄"
      );
    }
  }

  function revealGift() {
    setShowModal(true);
  }

  function GiftCountdown({ unlockDate }: { unlockDate: Date }) {
    const [timeLeft, setTimeLeft] = useState<number>(
      unlockDate.getTime() - Date.now()
    );

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(unlockDate.getTime() - Date.now());
      }, 1000);
      return () => clearInterval(timer);
    }, [unlockDate]);

    if (timeLeft <= 0) {
      return (
        <p className="text-center text-green-600 font-semibold">
          🎉 Your gift is now unlocked!
        </p>
      );
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((timeLeft / (1000 * 60)) % 60);
    const secs = Math.floor((timeLeft / 1000) % 60);

    return (
      <p className="text-center text-gray-700">
        ⏳ Your gift will be ready in{" "}
        <span className="font-bold">
          {days}d {hours}h {mins}m {secs}s
        </span>
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-yellow-50 text-gray-900 font-sans">
      {showConfetti && <Confetti />}
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-pink-100 to-purple-100 shadow-lg overflow-hidden w-full">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="p-6"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
                Niniola — Today's Your Day ✨
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-4">
                We made this little corner of the web just for you — full of
                memories, music, and a surprise gift waiting at the end.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                You’re more than a friend to me — you’re family, joy, laughter,
                and the brightest light in every room. This page is just a small
                way of showing how much you mean to me today and always. 💖
              </p>
              <div className="flex gap-3">
                <a
                  href="#gallery"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white border shadow hover:scale-105 transition"
                >
                  Memories
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <video
                className="w-full max-h-[650px] object-cover object-top"
                src="/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
          </div>
        </section>

        {/* Memories Carousel */}
        <StackCarousel />

        {/* Personal Wish */}
        <section className="mt-16 relative">
          {/* Decorative floating stars */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-pink-300 rounded-full absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-extrabold mb-6 text-center text-pink-600">
              My Birthday Wish for You 🎂✨
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-pink-100 via-white to-yellow-100
                 p-8 rounded-2xl shadow-xl max-w-3xl mx-auto"
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                Dear{" "}
                <span className="font-semibold text-pink-600">Niniola</span>,{" "}
                <br />
                <br />
                On this special day, I celebrate the wonderful person you are.
                You bring <span className="font-semibold">light</span> into
                every room,
                <span className="font-semibold">laughter</span> into every
                moment, and <span className="font-semibold">warmth</span> into
                every heart you touch. 💖
                <br />
                <br />
                I wish you a year filled with magical memories, endless
                opportunities, and love that never fades. May today be the start
                of your best chapter yet. 🌟
                <br />
                <br />
                <span className="italic text-pink-700">
                  Happy Birthday, my dearest friend! 🥂
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gift Claim */}
        <section
          id="gift"
          className="mt-16 rounded-2xl p-8 bg-gradient-to-r from-yellow-100 to-green-100 shadow-lg container mx-auto"
        >
          <h3 className="text-3xl font-extrabold mb-4 text-center">
            Your Gift 🎁
          </h3>

          {/* Countdown */}
          <GiftCountdown
            unlockDate={new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)}
          />

          {!giftClaimed ? (
            <div className="flex flex-col items-center gap-4 mt-6">
              <button
                onClick={revealGift}
                disabled={giftLocked} // disable until countdown finishes
                className={`px-6 py-3 rounded-xl shadow-md font-semibold transition ${
                  giftLocked
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-pink-500 text-white hover:brightness-110"
                }`}
              >
                {giftLocked ? "Gift Locked 🔒" : "Claim Your Gift"}
              </button>
              {!giftLocked && (
                <button
                  onClick={() =>
                    alert("Hint: what word describes a close companion?")
                  }
                  className="px-4 py-2 rounded border text-sm"
                >
                  Need a hint?
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md inline-block mt-6">
              <div className="font-semibold mb-1">Gift already claimed ✅</div>
              <div className="text-sm text-gray-700 mb-2">
                Code: <span className="font-mono">{claimCode}</span>
              </div>
              <div className="text-xs text-gray-600">
                Show this code to the gift organizer to redeem.
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 pb-6">
          <p>Made with ❤️ just for you.</p>
        </footer>
      </main>

      {/* Gift Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
          >
            <h4 className="text-xl font-bold mb-2">
              Solve the riddle to reveal your gift
            </h4>
            <p className="mb-4 text-gray-700">
              "I stick by you through thick and thin — who am I?"
            </p>
            <input
              value={puzzleInput}
              onChange={(e) => setPuzzleInput(e.target.value)}
              placeholder="Your answer"
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={tryClaim}
                className="px-3 py-1 rounded bg-pink-500 text-white"
              >
                Reveal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
