"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VideoBackground
 *
 * Renders the neon-purple animated MP4 ("codemachan-background.mp4")
 * as a fixed full-screen background across all pages.
 */
export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (videoRef.current) {
        e.matches ? videoRef.current.pause() : videoRef.current.play().catch(() => {});
      }
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const playVideo = () => {
      video.play().catch((err) => {
        console.warn("Autoplay blocked or waiting for user interaction:", err);
      });
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none bg-[#08090e]"
        style={{ zIndex: -2 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {/* Layer 1: Fullscreen Video */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -2 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#08090e]" />
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/codemachan-background.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      {/* Layer 2: Semi-transparent dark overlay for legibility */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: "rgba(0, 0, 0, 0.48)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
