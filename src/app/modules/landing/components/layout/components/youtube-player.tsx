"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, X, Maximize, Minimize } from "lucide-react"
import Button from "../../../../shared/components/ui/Button";

// Custom Slider component clearly defined separately
const CustomSlider = ({ 
  value, 
  max, 
  step, 
  onValueChange, 
  className = "" 
}: {
  value: number[];
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
  className?: string;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onValueChange([newValue]);
  };

  return (
    <input
      type="range"
      min={0}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${className}`}
    />
  );
};

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume || 1
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const videoContainer = document.getElementById("video-container")
    if (!videoContainer) return

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="bg-black text-white" id="video-container">
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        <h2 className="font-bold text-lg">{title}</h2>
        <Button className="text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative">
        <video ref={videoRef} src={videoUrl} className="w-full h-auto max-h-[70vh]" onClick={togglePlay} />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <Button
              className="h-16 w-16 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
              onClick={togglePlay}
            >
              <Play className="h-8 w-8 text-white" fill="white" />
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-900">
        <div className="mb-2">
          <CustomSlider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button className="text-white" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button className="text-white" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <div className="w-24">
                <CustomSlider 
                  value={[isMuted ? 0 : volume]} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleVolumeChange} 
                />
              </div>
            </div>

            <span className="text-sm text-gray-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <Button className="text-white" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}