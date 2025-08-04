import { useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface Caption {
  src: string;
  srclang: string;
  label?: string;
  default?: boolean;
}

interface ScrollVideoProps {
  src: string;
  poster?: string;
  captions?: Caption[];
}

export function ScrollVideo({ src, poster, captions }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t: _t } = useLanguage();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      const rect = video.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
        1
      );
      if (!isNaN(video.duration)) {
        video.currentTime = progress * video.duration;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    video.addEventListener("loadedmetadata", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadedmetadata", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen">
      <div className="sticky top-0 h-screen">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={_t("scrollVideo.alt")}
          className="w-full h-full object-cover"
          muted
          playsInline
        >
          {captions?.map((track) => (
            <track key={track.srclang} {...track} />
          ))}
        </video>
      </div>
    </section>
  );
}
