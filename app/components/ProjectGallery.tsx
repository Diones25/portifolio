"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "../i18n/context";

type ProjectGalleryProps = {
  images: string[];
  projectTitle: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectGallery({ images, projectTitle, isOpen, onClose }: ProjectGalleryProps) {
  const { t } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setImgError({});
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImgError({});
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImgError({});
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, goNext, goPrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (images.length === 0) return null;

  const currentSrc = images[currentIndex];
  const bg = "#13131A";
  const border = "#1E1E2E";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: "16px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                borderBottom: `1px solid ${border}`,
              }}
            >
              <p className="mono" style={{ fontSize: "0.85rem", color: "#F0F0F5", fontWeight: 600 }}>
                {projectTitle}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span className="mono" style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                  {currentIndex + 1} {t("projects.gallery_of")} {images.length}
                </span>
                <button
                  onClick={onClose}
                  style={{
                    background: "transparent",
                    border: `1px solid ${border}`,
                    color: "#9CA3AF",
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "#3B82F6"; (e.currentTarget).style.color = "#F0F0F5"; }}
                  onMouseLeave={(e) => { (e.currentTarget).style.borderColor = border; (e.currentTarget).style.color = "#9CA3AF"; }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Image area */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                minHeight: "300px",
                position: "relative",
                background: "#0A0A0F",
              }}
            >
              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                      background: "rgba(10,10,15,0.8)",
                      border: `1px solid ${border}`,
                      color: "#9CA3AF",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "#3B82F6"; (e.currentTarget).style.color = "#F0F0F5"; }}
                    onMouseLeave={(e) => { (e.currentTarget).style.borderColor = border; (e.currentTarget).style.color = "#9CA3AF"; }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={goNext}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                      background: "rgba(10,10,15,0.8)",
                      border: `1px solid ${border}`,
                      color: "#9CA3AF",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "#3B82F6"; (e.currentTarget).style.color = "#F0F0F5"; }}
                    onMouseLeave={(e) => { (e.currentTarget).style.borderColor = border; (e.currentTarget).style.color = "#9CA3AF"; }}
                  >
                    ›
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSrc}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "100%",
                    maxHeight: "60vh",
                  }}
                >
                  {imgError[currentIndex] ? (
                    <div
                      style={{
                        color: "#6B7280",
                        fontSize: "0.85rem",
                        textAlign: "center",
                        padding: "3rem",
                      }}
                    >
                      <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🖼️</p>
                      <p className="mono">{projectTitle}</p>
                      <p style={{ marginTop: "0.5rem", color: "#4B5563" }}>Screenshot {currentIndex + 1}</p>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentSrc}
                      alt={`${projectTitle} - Screenshot ${currentIndex + 1}`}
                      onError={() => setImgError((prev) => ({ ...prev, [currentIndex]: true }))}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            {images.length > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem 1.5rem",
                  borderTop: `1px solid ${border}`,
                }}
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      background: i === currentIndex ? "#3B82F6" : "#1E1E2E",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { if (i !== currentIndex) (e.currentTarget).style.background = "#6B7280"; }}
                    onMouseLeave={(e) => { if (i !== currentIndex) (e.currentTarget).style.background = "#1E1E2E"; }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
