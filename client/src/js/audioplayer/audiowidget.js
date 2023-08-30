import {PlayIcon, PauseIcon, More} from  '../icons';
import {Howl} from 'howler';
import { useEffect, useState, useRef } from 'react';

const ProgressBar = ({ progress, setPositionPercentage }) => {
    const elementRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const [overriddenPosition, setOverriddenPosition] = useState(-1);


    const handleMouseDown = () => {
      setDragging(true);
    };

    const getPositionPercentage = (event) => {
        const element = elementRef.current;
        const rect = element.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const elementWidth = rect.right - rect.left;
        return Math.max(0, Math.min((clickX / elementWidth), 1));
    }

    const updatePosition = (event) => {
        setPositionPercentage(getPositionPercentage(event));
    }

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (dragging) {
                setOverriddenPosition(getPositionPercentage(event)*100);
            }
        };
    
        const handleMouseUp = (event) => {
            setDragging(false);
            if (dragging) {
                updatePosition(event);
                setOverriddenPosition(-1);
            }
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
      }, [dragging, setPositionPercentage]);

    return (
        <div className="flex-1 group relative">
            <div 
                className="h-1 relative cursor-pointer"
                ref={elementRef}
                onMouseDown={handleMouseDown}
                onClick={(event) => {
                    updatePosition(event);
                }} 
            >
                <div className="bg-tertiary h-full w-full" />
                <div className={`group-hover:bg-red-700 absolute h-full left-0 top-0 ${dragging ? 'bg-red-700' : 'bg-inverted'}`} style={{
                    width: (overriddenPosition >= 0 ? overriddenPosition : (progress*100))+'%'
                }} />
            </div>
            <div className={`absolute -top-1 h-3 w-3 rounded-full group-hover:bg-red-700 cursor-pointer left-0 ${dragging ? 'bg-red-700' : 'bg-transparent'}`} style={{
                left: `calc(${overriddenPosition >= 0 ? overriddenPosition : (progress*100)}% - 4px)`
            }}/>
        </div>
    );
}



const getDisplayNumber = (givenSeconds) => {
    const hours   = Math.floor(givenSeconds / 3600) || 0;
    const minutes = Math.floor((givenSeconds - (hours * 3600)) / 60) || 0;
    const seconds = Math.floor(givenSeconds - (hours * 3600) - (minutes * 60)) || 0;
    return `${(hours !== 0 ? hours + ':' : '')}${minutes < 10 && hours > 0 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
};

export default function AudioWidget() {
    const [ isPlaying, setPlaying ] = useState(false);
    const [ duration, setDuration ] = useState(0);
    const [ sound, setSound ] = useState();

    useEffect(() => {
        const newSound = new Howl({
            src: ['../drowning.mp3'],
            onend: () => {
                setPlaying(false);
            },
            onload: () => {
                setDuration(newSound.duration());
            },
            preload: true
        });
        setSound(newSound);
    }, []);

    const [position, setPosition] = useState(0);
    useEffect(() => {
        const loopKeyFrame = () => {
            setTimeout(() => {
                if (isPlaying && sound) {
                    setPosition(sound.seek());
                }
                requestAnimationFrame(loopKeyFrame)
            }, 1000)
        }
        loopKeyFrame();
    });

    useEffect(() => {
        if (sound) {
            if (isPlaying) {
                sound.play();
            }
            else {
                sound.pause();
            }
        }
    }, [isPlaying, sound]);
    

    if (!sound) {
        return null;
    }
    return (
        <div className="absolute right-0 top-0 blurThing shadow-main w-80 m-3 p-1 rounded-lg overflow-hidden">
            <div className="absolute left-0 top-0 right-0 bottom-0 bg-primary/60 -z-10">

            </div>
            <div className="px-2 pt-1 flex"> 
                <div className="flex-1">
                    Drowning in a Puddle
                </div>
                <button>
                    <More />
                </button>
            </div>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={() => {
                        setPlaying(!isPlaying);
                    }}
                >
                    { isPlaying ? <PauseIcon /> : <PlayIcon /> }
                </button>
                <ProgressBar 
                    progress={position/duration} 
                    setPositionPercentage={(positionPercentage) => {
                        setPosition(duration*positionPercentage)
                        sound.seek(duration*positionPercentage);
                    }} 
                />
                <div className="pl-1 pr-2">
                    {`${getDisplayNumber(position)}-${getDisplayNumber(duration)}`}
                </div>
            </div>
        </div>
    );
}