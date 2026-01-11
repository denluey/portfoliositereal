import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface SectionInfo {
  text: string;
  image?: string;
  images?: string[];
  video?: string;
  link?: { url: string; label: string };
}

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: SectionInfo | null;
}

const SlidingPanel = ({ isOpen, onClose, title, content }: SlidingPanelProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!content) return null;

  const images = content.images || (content.image ? [content.image] : []);
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-lg h-[calc(100vh-3rem)] bg-panel retro-border panel-slide overflow-y-auto z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ transition: "transform 0.4s ease" }}
    >
      {/* Title Bar */}
      <div className="bg-primary retro-border flex items-center justify-between px-4 py-2 sticky top-0">
        <h2 className="font-display text-2xl text-highlight">&gt; {title}</h2>
        <button
          onClick={onClose}
          className="retro-button p-1 hover:bg-destructive"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Video */}
        {content.video && (
          <div className="mb-6">
            <div className="retro-border-inset bg-background p-2">
              <video
                src={content.video}
                controls
                autoPlay
                loop
                muted
                className="w-full h-auto max-h-80"
              />
            </div>
          </div>
        )}

        {/* Image Gallery */}
        {!content.video && images.length > 0 && (
          <div className="mb-6">
            <div className="retro-border-inset bg-background p-2">
              <img
                src={images[currentImageIndex]}
                alt={title}
                className="w-full h-auto object-contain max-h-80"
              />
            </div>
            {hasMultipleImages && (
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={prevImage} className="retro-button flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <span className="text-muted-foreground self-center">
                  {currentImageIndex + 1} / {images.length}
                </span>
                <button onClick={nextImage} className="retro-button flex items-center gap-1">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Text Content */}
        <div
          className="text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.text }}
        />

        {/* Link */}
        {content.link && (
          <a
            href={content.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-highlight hover:underline"
          >
            &gt; {content.link.label}
          </a>
        )}
      </div>
    </div>
  );
};

export default SlidingPanel;
