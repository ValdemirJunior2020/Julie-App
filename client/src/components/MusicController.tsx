import { Pause, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type MusicControllerProps = {
  labels: {
    play: string;
    pause: string;
    blocked: string;
  };
};

export function MusicController({ labels }: MusicControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio('/theme.mp3');
    audio.loop = true;
    audio.volume = 0.22;
    audio.preload = 'auto';
    audioRef.current = audio;

    const attemptPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
      } catch {
        setBlocked(true);
      }
    };

    attemptPlay();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setBlocked(false);
    } catch {
      setBlocked(true);
    }
  };

  return (
    <button className={`musicControl ${blocked ? 'needsClick' : ''}`} onClick={toggleMusic} type="button">
      {playing ? <Pause size={16} /> : <Volume2 size={16} />}
      <span>{playing ? labels.pause : blocked ? labels.blocked : labels.play}</span>
    </button>
  );
}
