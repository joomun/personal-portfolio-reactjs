// Sound URLs (you can replace these with your own sound files)
export const SOUNDS = {
  flip: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  match: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  wrong: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'
};

class SoundManager {
  static playSound(soundType) {
    const audio = new Audio(SOUNDS[soundType]);
    audio.volume = 0.3; // Adjust volume (0.0 to 1.0)
    audio.play().catch(e => console.log('Audio play failed:', e));
  }
}

export default SoundManager;
