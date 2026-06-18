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
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const setMusicState = (value: boolean) => {
    playingRef.current = value;
    setPlaying(value);
  };

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 0.22;
      audio.muted = false;
      await audio.play();
      setMusicState(true);
      setBlocked(false);
      return true;
    } catch {
      setMusicState(false);
      setBlocked(true);
      return false;
    }
  };

  useEffect(() => {
    const audio = new Audio('/theme.mp3');
    audio.loop = true;
    audio.volume = 0.22;
    audio.preload = 'auto';
    audioRef.current = audio;

    const unlockMusic = async () => {
      if (playingRef.current) return;

      const started = await playAudio();

      if (started) {
        window.removeEventListener('click', unlockMusic, true);
        window.removeEventListener('pointerdown', unlockMusic, true);
        window.removeEventListener('touchstart', unlockMusic, true);
        window.removeEventListener('keydown', unlockMusic, true);
      }
    };

    playAudio();

    window.addEventListener('click', unlockMusic, true);
    window.addEventListener('pointerdown', unlockMusic, true);
    window.addEventListener('touchstart', unlockMusic, true);
    window.addEventListener('keydown', unlockMusic, true);

    return () => {
      window.removeEventListener('click', unlockMusic, true);
      window.removeEventListener('pointerdown', unlockMusic, true);
      window.removeEventListener('touchstart', unlockMusic, true);
      window.removeEventListener('keydown', unlockMusic, true);

      audio.pause();
      audioRef.current = null;
      playingRef.current = false;
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingRef.current) {
      audio.pause();
      setMusicState(false);
      return;
    }

    await playAudio();
  };

  return (
    <button
      className={`musicControl ${blocked ? 'needsClick' : ''}`}
      onClick={toggleMusic}
      type="button"
      aria-label={playing ? labels.pause : labels.play}
    >
      {playing ? <Pause size={16} /> : <Volume2 size={16} />}
      <span>{playing ? labels.pause : blocked ? labels.blocked : labels.play}</span>
    </button>
  );
}