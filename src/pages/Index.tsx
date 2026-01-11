import { useState } from "react";
import { Gamepad2, Palette, Box, User } from "lucide-react";
import Taskbar from "@/components/Taskbar";
import SlidingPanel from "@/components/SlidingPanel";

// Image imports
import faceImg from "@/assets/face.jpg";
import guitaristImg from "@/assets/guitarist.png";
import roboheadImg from "@/assets/robohead.png";
import sideprofileImg from "@/assets/sideprofile.png";
import threeDModeImg from "@/assets/3dmode.jpg";
import bluegirlImg from "@/assets/bluegirl.png";
import skiermodelImg from "@/assets/skiermodel.jpg";
import skiermodeiposeImg from "@/assets/skiermodelpose.jpg";
import jetpackImg from "@/assets/jetpack.gif";
import skijor1Img from "@/assets/skijor1.png";
import skijor2Img from "@/assets/skijor2.jpg";
import snowmmodelImg from "@/assets/snowmmodel.jpg";
import snowmomodelposeImg from "@/assets/snowmomodelpose.jpg";
import talkImg from "@/assets/talk.gif";
import yellowmanImg from "@/assets/yellowman.png";
import logoMotionVid from "@/assets/logo_motion.mp4";
import kinetictextVid from "@/assets/kinetictext.mp4";
import collageoneVid from "@/assets/collageone.mp4";

interface SectionInfo {
  text: string;
  image?: string;
  images?: string[];
  video?: string;
  videos?: string[];
  link?: { url: string; label: string };
}

const sectionInfo: Record<string, SectionInfo> = {
  About: {
    text: "Luke Cravey is a game designer, illustrator, 3D modeler, and animator. Given a Wii at a young impressionable age, Luke had no choice but to become obsessed with games, art, and game design for the rest of his life.<br><br>Luke studies integrated design and media at NYU Tandon where he has honed his abilities to code, design, and model. He has worked on multiple smaller games and is currently working on publishing a game as part of an indie game studio.",
    image: faceImg,
  },
  "2D Design": {
    text: "A collection of 2D illustrations and character designs. From concept art to finished pieces, these works showcase a range of styles and techniques.",
    images: [guitaristImg, roboheadImg, sideprofileImg, yellowmanImg, bluegirlImg],
  },
  "3D Modeling": {
    text: "3D character models and environments created for games and animations. Featuring both stylized and realistic approaches.",
    images: [threeDModeImg, skiermodelImg, skiermodeiposeImg, snowmmodelImg],
  },
  "Motion Graphics": {
    text: "Animated logos, motion design, and visual effects. Bringing static designs to life with movement and energy.",
    videos: [logoMotionVid, kinetictextVid, collageoneVid],
  },
  "Robo Cave Adventure": {
    text: 'Simple platforming game about a broken robot escaping a cave.<br><br><a href="https://denluey.itch.io/roboalone" target="_blank" class="text-highlight hover:underline">&gt; Play Robo Alone on itch.io</a>',
    image: jetpackImg,
  },
  "Talking is Hard": {
    text: 'A game about the difficulty of conversing with other people.<br><br><a href="https://denluey.itch.io/talking-is-hard" target="_blank" class="text-highlight hover:underline">&gt; Play Talking Is Hard on itch.io</a>',
    image: talkImg,
  },
  Skijoring: {
    text: 'In progress game about a skier being pulled down a mountain by a friend on a snowmobile.<br><br><a href="https://store.steampowered.com/app/4023240/Skijoring/" target="_blank" class="text-highlight hover:underline">&gt; View Skijoring on Steam</a>',
    images: [skijor1Img, skijor2Img],
  },
};

const Index = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleOpenPanel = (section: string) => {
    if (section === "Gaming Projects") {
      // Open first game project
      setActivePanel("Robo Cave Adventure");
    } else {
      setActivePanel(section);
    }
  };

  const handleClosePanel = () => {
    setActivePanel(null);
  };

  return (
    <div className="min-h-screen bg-background pb-12 relative overflow-hidden flex flex-col">
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--foreground)) 2px,
            hsl(var(--foreground)) 4px
          )`
        }} />
      </div>

      {/* Header */}
      <header className="retro-border bg-primary m-4 p-4">
        <h1 className="font-display text-4xl md:text-6xl text-highlight">
          &gt; Craven Things_<span className="animate-blink">|</span>
        </h1>
        <p className="text-muted-foreground mt-2 font-body text-sm">
          Game Design • Illustration • 3D Modeling • Animation
        </p>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 relative z-10 flex items-center justify-center">
        <div className="retro-border bg-card p-6 max-w-xl text-center">
          <h2 className="font-display text-2xl text-highlight mb-4">&gt; Welcome</h2>
          <p className="text-foreground leading-relaxed">
            Use the taskbar below to explore my portfolio.
          </p>
        </div>
      </main>

      {/* Sliding Panel */}
      <SlidingPanel
        isOpen={activePanel !== null}
        onClose={handleClosePanel}
        title={activePanel || ""}
        content={activePanel ? sectionInfo[activePanel] : null}
      />

      {/* Taskbar */}
      <Taskbar onOpenPanel={handleOpenPanel} activePanel={activePanel} />
    </div>
  );
};

export default Index;
