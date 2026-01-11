import { useState, useEffect } from "react";
import { Gamepad2, Palette, Box, User, FolderOpen } from "lucide-react";

interface TaskbarProps {
  onOpenPanel: (section: string) => void;
  activePanel: string | null;
}

const Taskbar = ({ onOpenPanel, activePanel }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const menuItems = [
    { name: "About", icon: User },
    { name: "Gaming Projects", icon: Gamepad2, submenu: ["Robo Cave Adventure", "Talking is Hard", "Skijoring"] },
    { name: "Design", icon: Palette, submenu: ["2D Design", "3D Modeling"] },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-taskbar retro-border flex items-center justify-between px-2 z-50">
      {/* Start Button */}
      <div className="relative">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`taskbar-item font-display text-lg ${startMenuOpen ? "active" : ""}`}
        >
          <FolderOpen className="w-4 h-4" />
          <span>Start</span>
        </button>

        {/* Start Menu */}
        {startMenuOpen && (
          <div className="absolute bottom-full left-0 mb-1 w-64 dropdown-menu">
            <div className="bg-primary p-2 border-b-2 border-border">
              <span className="font-display text-xl text-highlight">&gt; Craven Things</span>
            </div>
            {menuItems.map((item) => (
              <div key={item.name} className="group relative">
                <button
                  onClick={() => {
                    if (!item.submenu) {
                      onOpenPanel(item.name);
                      setStartMenuOpen(false);
                    }
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground flex items-center gap-3 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>&gt; {item.name}</span>
                  {item.submenu && <span className="ml-auto">▶</span>}
                </button>
                {item.submenu && (
                  <div className="absolute left-full top-0 w-56 dropdown-menu hidden group-hover:block">
                    {item.submenu.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          onOpenPanel(sub);
                          setStartMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        &gt; {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* System Tray */}
      <div className="retro-border-inset bg-muted px-4 py-1 text-sm font-mono">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Taskbar;
