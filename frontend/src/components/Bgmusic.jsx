import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { SpeakerLoudIcon, SpeakerOffIcon } from 'sebikostudio-icons';
// Import the audio file using the correct path
import harryPotterMusic from '../assets/music/harrypotter.mp3';
import { IconButton } from 'blocksin-system';

const Bgmusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

    // Initialize the Howl instance
    useEffect(() => {
        const audio = new Howl({
            src: [harryPotterMusic],
            loop: true,  // Loop the audio
            autoplay: false,  // Autoplay is false to allow user interaction
        });
        setSound(audio);

        return () => {
            // Stop the audio when the component is unmounted
            if (audio) {
                audio.stop();
            }
        };
    }, []);

    const handlePlayPause = () => {
        if (sound) {
            if (isPlaying) {
                sound.pause();  // Pause the audio
            } else {
                sound.play();  // Play the audio
            }
            setIsPlaying(!isPlaying);  // Toggle the playing state
        }
    };

    return (
        <div>
            <div className="bg-black fixed top-4 right-4 p-3 text-lg border ">
                <button onClick={handlePlayPause}>
                    {isPlaying ? (
                        <IconButton >
                            <SpeakerLoudIcon className="text-black"/>
                        </IconButton>
                    ) : (
                        <IconButton >
                            <SpeakerOffIcon className="text-black" />
                        </IconButton>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Bgmusic;
