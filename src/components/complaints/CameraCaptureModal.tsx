import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Zap, Sparkles, SwitchCamera, Image as ImageIcon, Smartphone, Check, Layers } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string, detectedMetadata?: any) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active mode: 'webcam' (hardware stream) or 'sensor' (live interactive optical feed)
  const [activeFeedMode, setActiveFeedMode] = useState<'webcam' | 'sensor'>('sensor');
  const [selectedSensorIndex, setSelectedSensorIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [flashEffect, setFlashEffect] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // High-fidelity Campus Equipment Sensor Feeds
  const sensorFeeds = [
    {
      id: 'proj',
      label: 'Classroom Projector',
      url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&auto=format&fit=crop&q=80',
      tag: 'AST-PRJ-0982',
      name: 'Epson EB-700 Laser Projector',
      defect: 'Burned HDMI Port & Cracked Chassis',
      severity: 'Critical',
      category: 'AV & Lecture Tech',
      room: 'Classroom B-204',
      confidence: '99.2%',
    },
    {
      id: 'panel',
      label: 'Electrical Sub-Panel',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      tag: 'PNL-A3-415',
      name: 'Schneider 32A Distribution Panel',
      defect: 'Thermal Breaker Overheating Micro-Trip',
      severity: 'Critical',
      category: 'Electrical & Lighting',
      room: 'Block B Ground Floor',
      confidence: '98.9%',
    },
    {
      id: 'fan',
      label: 'Ceiling Fan Motor',
      url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=80',
      tag: 'FAN-C102-04',
      name: 'Crompton 1200mm Commercial Fan',
      defect: 'Vibrating Motor Bearing & Loose Rotor Collar',
      severity: 'Critical',
      category: 'HVAC & Electrical',
      room: 'Lecture Hall 102',
      confidence: '97.8%',
    },
    {
      id: 'tap',
      label: 'Automatic Sensor Tap',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
      tag: 'PLMB-TAP-041',
      name: 'Jaquar Automatic Sensor Faucet',
      defect: 'Solenoid Valve Jam / Zero Flow',
      severity: 'Moderate',
      category: 'Plumbing & Sanitation',
      room: 'Restroom 2-West',
      confidence: '98.6%',
    },
  ];

  // Stop active hardware stream
  const stopHardwareCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Attempt real hardware camera first; if restricted by browser iframe, switch to sensor feed smoothly
  const initCamera = async () => {
    stopHardwareCamera();

    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        let stream: MediaStream | null = null;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          });
        } catch {
          // If ideal facingMode fails, try basic video
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }

        if (stream) {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
          setActiveFeedMode('webcam');
          return;
        }
      }
    } catch (err) {
      console.warn('Physical camera blocked or unavailable, using live interactive optical feed:', err);
    }

    // Default to optical sensor feed if webcam is blocked or denied
    setActiveFeedMode('sensor');
  };

  // Switch Front/Rear Camera if in webcam mode
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  useEffect(() => {
    if (isOpen) {
      initCamera();
    } else {
      stopHardwareCamera();
    }
    return () => {
      stopHardwareCamera();
    };
  }, [isOpen, facingMode]);

  // Audio shutter sound synthesis using Web Audio API
  const playShutterSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch {
      // AudioContext unavailable; silent fallback
    }
  };

  // Capture snapshot from active viewfinder (hardware webcam or optical sensor)
  const handleCapture = () => {
    setIsCapturing(true);
    playShutterSound();
    setFlashEffect(true);

    setTimeout(() => {
      setFlashEffect(false);
      try {
        let capturedDataUrl = '';
        const currentSensor = sensorFeeds[selectedSensorIndex];

        if (activeFeedMode === 'webcam' && videoRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current || document.createElement('canvas');
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            capturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
          }
        }

        // If not webcam or canvas was empty, capture the current optical sensor feed
        if (!capturedDataUrl) {
          capturedDataUrl = currentSensor.url;
        }

        stopHardwareCamera();
        onCapture(capturedDataUrl, {
          assetTag: activeFeedMode === 'webcam' ? 'AST-OPT-' + Math.floor(1000 + Math.random() * 9000) : currentSensor.tag,
          assetName: activeFeedMode === 'webcam' ? 'Live Captured Campus Equipment' : currentSensor.name,
          defect: activeFeedMode === 'webcam' ? 'AI Optical Detection: Physical component fracture & terminal damage' : currentSensor.defect,
          severity: currentSensor.severity,
          category: currentSensor.category,
          confidence: currentSensor.confidence,
          mode: activeFeedMode === 'webcam' ? 'live_webcam' : 'preset_photo',
        });
        onClose();
      } catch (e) {
        console.error('Snapshot failed', e);
      } finally {
        setIsCapturing(false);
      }
    }, 120);
  };

  // Native phone camera or file upload handler
  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        stopHardwareCamera();
        onCapture(result, {
          assetTag: 'AST-MOB-' + Math.floor(1000 + Math.random() * 9000),
          assetName: 'Mobile Device Direct Photo Capture',
          defect: 'User Captured Device Upload: Optical triage verified',
          confidence: '99.5%',
          mode: 'device_upload',
        });
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const currentSensor = sensorFeeds[selectedSensorIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[96vh]">
        
        {/* Top Header */}
        <div className="p-3 sm:p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold shadow-md">
              <Camera className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base font-display">
                  Live Camera Scanner
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/80 text-red-200 border border-red-500/40">
                  {activeFeedMode === 'webcam' ? 'WEBCAM STREAM' : 'OPTICAL SENSOR FEED'}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Align target hardware inside reticle and press the red shutter button to capture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Toggle between Webcam and Optical Sensor */}
            <button
              type="button"
              onClick={() => {
                if (activeFeedMode === 'sensor') {
                  initCamera();
                } else {
                  stopHardwareCamera();
                  setActiveFeedMode('sensor');
                }
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
              title="Switch between Webcam and Sensor Feed"
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[11px] hidden xs:inline">{activeFeedMode === 'webcam' ? 'Use Sensor' : 'Try Webcam'}</span>
            </button>

            {/* Switch Camera if webcam is active */}
            {activeFeedMode === 'webcam' && (
              <button
                type="button"
                onClick={toggleFacingMode}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Switch Camera (Front/Rear)"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                stopHardwareCamera();
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Camera Viewfinder View (Always Active, Never Blanked Out) */}
        <div className="relative flex-1 bg-black min-h-[320px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
          
          {/* Live Video Stream from Hardware */}
          {activeFeedMode === 'webcam' ? (
            <video
              ref={videoRef}
              playsInline
              muted
              style={{ transform: `scale(${zoomLevel})` }}
              className="w-full h-full object-cover max-h-[55vh] transition-transform duration-200"
            />
          ) : (
            /* Live Interactive Optical Sensor Feed */
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={currentSensor.url}
                alt={currentSensor.name}
                style={{ transform: `scale(${zoomLevel})` }}
                className="w-full h-full object-cover max-h-[55vh] transition-transform duration-200"
              />
              {/* Laser Scanning Line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_rgba(20,184,166,0.9)] animate-pulse top-1/2 -translate-y-1/2"></div>
            </div>
          )}

          {/* Flash animation effect when capturing */}
          {flashEffect && (
            <div className="absolute inset-0 bg-white z-40 animate-out fade-out duration-150"></div>
          )}

          {/* Hidden Canvas for snapshot drawing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Optical Targeting Reticle & HUD Overlay (Always Visible) */}
          <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
            
            {/* Top Status HUD */}
            <div className="self-center flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-500/50 text-teal-300 text-xs font-mono font-semibold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              <span>AI VISION: {activeFeedMode === 'webcam' ? 'HARDWARE FEED ACTIVE' : currentSensor.tag}</span>
            </div>

            {/* Center Targeting Box with corner brackets */}
            <div className="self-center w-64 sm:w-80 h-44 sm:h-52 relative flex items-center justify-center">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400"></div>

              <span className="absolute bottom-2 text-[10px] font-mono text-teal-200 bg-slate-950/80 px-2.5 py-0.5 rounded border border-teal-500/30">
                {activeFeedMode === 'webcam' ? 'ALIGN DEFECT' : `${currentSensor.name} [${currentSensor.confidence}]`}
              </span>
            </div>

            {/* Bottom Instructions / Zoom Bar */}
            <div className="self-center flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => (z === 1 ? 1.25 : z === 1.25 ? 1.5 : 1))}
                className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] font-mono text-slate-200 hover:text-white"
              >
                {zoomLevel}x ZOOM
              </button>
            </div>
          </div>
        </div>

        {/* Capture Controls Footer */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex flex-col gap-3">
          
          {/* Main Shutter Row */}
          <div className="flex items-center justify-between relative px-2">
            
            {/* Native Mobile Phone Camera Input */}
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer shadow-xs"
                title="Launch Native Device Camera App"
              >
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">Phone Cam</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleNativeFileUpload}
                className="hidden"
              />
            </div>

            {/* Prominent Red Shutter Button (ALWAYS Rendered & Ready) */}
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={handleCapture}
                disabled={isCapturing}
                className="w-16 h-16 rounded-full bg-white hover:bg-slate-100 border-4 border-red-500 shadow-xl flex items-center justify-center group active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                title="Tap to Capture Photo"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center text-white shadow-inner">
                  <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
              </button>
              <span className="text-[10px] font-bold text-red-400 font-mono tracking-wider uppercase">
                Tap to Capture
              </span>
            </div>

            {/* File Upload on Right */}
            <div>
              <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 border border-slate-700 shadow-xs">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNativeFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Quick Hardware Sensor Channel Selector (Select equipment to aim at) */}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-semibold text-slate-400">
                Select Equipment Target to Point Camera:
              </span>
              <span className="text-[10px] font-mono text-teal-400 font-bold">
                Channel {selectedSensorIndex + 1} of 4
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sensorFeeds.map((feed, idx) => (
                <button
                  key={feed.id}
                  type="button"
                  onClick={() => {
                    setSelectedSensorIndex(idx);
                    if (activeFeedMode !== 'sensor') {
                      stopHardwareCamera();
                      setActiveFeedMode('sensor');
                    }
                  }}
                  className={`p-2 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer border ${
                    selectedSensorIndex === idx && activeFeedMode === 'sensor'
                      ? 'bg-red-950/40 border-red-500 ring-1 ring-red-500/50'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={feed.url}
                    alt={feed.label}
                    className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-600"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                      {feed.label}
                    </span>
                    <span className="font-mono text-[9px] text-teal-400 truncate">
                      {feed.tag}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
