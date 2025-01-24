import { useState, useRef, useMemo, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { File, VideoQuality } from '@/models/files'
import { Play, Pause, VolumeDown, Cog, Fullscreen, Duplicate } from '@blueprintjs/icons'
import { Menu, MenuItem, Popover, Position } from '@blueprintjs/core'

const CONTROL_COLOR = '#eeeeee'
// const CONTROL_ICON_SIZE = 48
const CONTROL_ICON_SIZE = 24

export interface VideoPlayerProps {
    file: File
}

export const DEFAULT_VIDEO_QUALITY = VideoQuality.HIGH

export const VideoPlayer = (props: VideoPlayerProps) => {
    const { file } = props
    const [playing, setPlaying] = useState(false)
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    const qualities = useMemo(() => file.getAvailableQualities(true), [file])
    const [selectedQuality, setSelectedQuality] = useState(() => {
        let quality = qualities.find(quality => quality.slug === DEFAULT_VIDEO_QUALITY)
        // If default quality is not available, select the first one
        if (!quality) {
            quality = qualities[0]
        }
        return quality
    })

    const handlePlayPause = () => {
        setPlaying(!playing)
    }

    const handleQualityChange = (quality) => {
        setSelectedQuality(quality)
        // Update the video URL or player settings based on the selected quality
    };

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            playerContainerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handlePiPToggle = () => {
        if (playerRef.current) {
            if (!isPiP) {
                playerRef.current.requestPictureInPicture().catch(err => {
                    console.error(`Error attempting to enable PiP mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitPictureInPicture().catch(err => {
                    console.error(`Error attempting to exit PiP mode: ${err.message} (${err.name})`);
                });
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const handlePiPChange = () => {
            setIsPiP(!!document.pictureInPictureElement);
        };

        document.addEventListener('enterpictureinpicture', handlePiPChange);
        document.addEventListener('leavepictureinpicture', handlePiPChange);
        return () => {
            document.removeEventListener('enterpictureinpicture', handlePiPChange);
            document.removeEventListener('leavepictureinpicture', handlePiPChange);
        };
    }, []);

    return (
        <div ref={playerContainerRef} className='w-full relative'>
            <ReactPlayer className='w-full' ref={playerRef} controls={false}
                width={'100%'} height={'100%'}
                url={selectedQuality?.link}
                playing={playing}
            />
            <div className="absolute bottom-0 w-full flex items-center
                bg-gray-500 bg-opacity-50 pl-[12px] pr-[12px]"
            >
                {/* progress bar */}
                { playing
                    ? <Pause className="p-4 cursor-pointer" size={CONTROL_ICON_SIZE} color={CONTROL_COLOR} onClick={handlePlayPause}/>
                    : <Play  className="p-4 cursor-pointer" size={CONTROL_ICON_SIZE} color={CONTROL_COLOR} onClick={handlePlayPause}/>
                }
                <VolumeDown className="p-4 cursor-pointer" size={CONTROL_ICON_SIZE} color={CONTROL_COLOR} />
                <input type="range" className="w-36" />
                <span> {/* time */}</span>
                <div className="flex-auto"></div>
                <Popover content={
                    <Menu>
                        {qualities.map((quality) => (
                            <MenuItem
                                key={quality.slug}
                                text={quality.slug}
                                onClick={() => handleQualityChange(quality)}
                                active={quality.slug === selectedQuality?.slug}
                            />
                        ))}
                    </Menu>
                } position={Position.TOP}>
                    <Cog className="p-4 cursor-pointer" size={CONTROL_ICON_SIZE} color={CONTROL_COLOR} />
                </Popover>
                <Duplicate  className="p-4 cursor-pointer" size={CONTROL_ICON_SIZE} color={CONTROL_COLOR} onClick={handlePiPToggle} />
                <Fullscreen className="p-4 cursor-pointer" size={CONTROL_ICON_SIZE} color={CONTROL_COLOR} onClick={handleFullscreenToggle} />
            </div>
        </div>
    )
}

export default VideoPlayer
