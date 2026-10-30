import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  X, 
  RotateCcw, 
  SwitchCamera, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  Layers, 
  Building2, 
  DoorOpen, 
  Eye, 
  Wrench,
  Clock,
  Compass,
  FileCheck
} from 'lucide-react';

interface RealDeviceCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplaintCreated?: (complaint: any) => void;
}

export const RealDeviceCameraModal: React.FC<RealDeviceCameraModalProps> = ({
  isOpen,
  onClose,
  onComplaintCreated,
}) => {
  // Step 1: Camera Viewfinder & Capture
  // Step 2: Image Confirmation & Form Details (Building, Floor, Room, GPS)
  // Step 3: AI Gemini Vision Analysis & User Review
  // Step 4: Submission Confirmation & Tracking Status
  const [step, setStep] = useState<'camera' | 'review_form' | 'ai_analysis' | 'submitted'>('camera');

  // Camera stream refs & state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  // Captured snapshot
  const [capturedImageBase64, setCapturedImageBase64] = useState<string | null>(null);

  // Facility Location selection
  const [building, setBuilding] = useState<string>('Block B (Mech & Civil)');
  const [floor, setFloor] = useState<string>('Floor 2');
  const [room, setRoom] = useState<string>('Room 204 (Classroom)');
  const [userNotes, setUserNotes] = useState<string>('');

  // GPS Location state (real browser Geolocation API)
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'>('idle');
  const [gpsCoordinates, setGpsCoordinates] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Gemini Vision AI Analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [aiFindings, setAiFindings] = useState<{
    suggestedTitle: string;
    suggestedCategory: string;
    suggestedSeverity: string;
    suggestedPriority: string;
    suggestedDescription: string;
    visibleAsset: string;
    estimatedConfidence: string;
    safetyWarning?: string;
    keyFindings?: string[];
  } | null>(null);

  // User-confirmed fields (prefilled by AI, editable by user before creating complaint)
  const [confirmedTitle, setConfirmedTitle] = useState('');
  const [confirmedCategory, setConfirmedCategory] = useState('Electrical & Lighting');
  const [confirmedSeverity, setConfirmedSeverity] = useState('High');
  const [confirmedPriority, setConfirmedPriority] = useState('P2 - Urgent (4h)');
  const [confirmedDescription, setConfirmedDescription] = useState('');

  // Submitted complaint tracking
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState<any | null>(null);

  // Stop real camera stream tracks
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
  };

  // Start real physical device camera via MediaDevices API
  const startCamera = async (overrideFacing?: 'environment' | 'user', overrideDeviceId?: string) => {
    stopCameraStream();
    setCameraError(null);
    setHasPermission(null);

    const mode = overrideFacing || facingMode;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser MediaDevices API (getUserMedia) is not supported on this browser or platform.');
      }

      // Query available devices
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        setAvailableCameras(videoInputs);
      } catch {
        // Enumerate fallback
      }

      const constraints: MediaStreamConstraints = {
        video: overrideDeviceId
          ? { deviceId: { exact: overrideDeviceId }, width: { ideal: 1920 }, height: { ideal: 1080 } }
          : { facingMode: { ideal: mode }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      };

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (firstErr) {
        // If ideal constraints fail (e.g. desktop webcam without environment mode), try plain video
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      streamRef.current = stream;
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('Physical camera access error:', err);
      setHasPermission(false);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera access permission was denied by the browser. Please allow camera permissions in your browser URL bar or site settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No physical camera device was detected on your laptop or phone.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCameraError('The camera is already in use by another application or tab.');
      } else if (err.name === 'SecurityError') {
        setCameraError('Camera access is restricted by your browser environment or iframe permission policy.');
      } else {
        setCameraError(err.message || 'Unable to connect to the physical camera device.');
      }
    }
  };

  // Switch camera front/back
  const handleToggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture real camera frame using Canvas API
  const handleCaptureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // Use full video resolution
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mirror image if front-facing camera
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);

    // Get real JPEG data URL
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    // Stop real camera stream to release device hardware
    stopCameraStream();

    setCapturedImageBase64(dataUrl);
    setStep('review_form');
  };

  // Retake photo: discard captured frame and restart camera
  const handleRetake = () => {
    setCapturedImageBase64(null);
    setAiFindings(null);
    setStep('camera');
    startCamera();
  };

  // Request real browser GPS location
  const handleRequestGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus('unsupported');
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setGpsStatus('requesting');
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsStatus('granted');
        setGpsCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
        });
      },
      (err) => {
        setGpsStatus('denied');
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError('Location permission denied in browser.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGpsError('GPS location unavailable from device sensors.');
        } else {
          setGpsError('Location request timed out.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Send real captured photograph to FastAPI/Express backend for Gemini Vision AI analysis
  const handleAnalyzeWithGemini = async () => {
    if (!capturedImageBase64) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/complaints/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: capturedImageBase64,
          mimeType: 'image/jpeg',
          building,
          floor,
          room,
          userNotes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      if (!data.success || !data.analysis) {
        throw new Error('Analysis payload format invalid.');
      }

      const analysis = data.analysis;
      setAiFindings(analysis);

      // Pre-fill editable user fields with AI suggestions for confirmation
      setConfirmedTitle(analysis.suggestedTitle || 'Facility Maintenance Incident');
      setConfirmedCategory(analysis.suggestedCategory || 'Electrical & Lighting');
      setConfirmedSeverity(analysis.suggestedSeverity || 'High');
      setConfirmedPriority(analysis.suggestedPriority || 'P2 - Urgent (4h)');
      setConfirmedDescription(analysis.suggestedDescription || userNotes || 'Inspected campus asset.');

      setStep('ai_analysis');
    } catch (err: any) {
      console.error('Gemini Vision analysis failed:', err);
      setAnalysisError(err.message || 'Failed to analyze photograph with Gemini Vision API.');
      
      // Fallback editable form so user can still submit
      setConfirmedTitle(userNotes ? userNotes.slice(0, 40) : 'Campus Infrastructure Defect');
      setConfirmedCategory('General Maintenance');
      setConfirmedSeverity('High');
      setConfirmedPriority('P2 - Urgent (4h)');
      setConfirmedDescription(userNotes || 'Physical defect observed at campus facility.');
      setStep('ai_analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Submit verified complaint to backend database
  const handleSubmitComplaint = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        imageUrl: capturedImageBase64,
        title: confirmedTitle,
        description: confirmedDescription,
        category: confirmedCategory,
        severity: confirmedSeverity,
        priority: confirmedPriority,
        building,
        floor,
        room,
        locationCoordinates: gpsCoordinates,
        aiAnalysis: aiFindings
          ? {
              identifiedDefect: aiFindings.suggestedTitle,
              confidence: aiFindings.estimatedConfidence,
              visibleAsset: aiFindings.visibleAsset,
              safetyWarning: aiFindings.safetyWarning,
              keyFindings: aiFindings.keyFindings,
            }
          : {
              identifiedDefect: confirmedTitle,
              confidence: 'Manual Verification',
            },
      };

      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to record complaint in database.');
      }

      const data = await response.json();
      setCreatedComplaint(data.complaint);
      setStep('submitted');

      if (onComplaintCreated) {
        onComplaintCreated(data.complaint);
      }
    } catch (err: any) {
      alert(`Submission error: ${err.message || 'Network error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mobile native camera file input fallback when browser restricts WebRTC
  const handleNativeMobileCamera = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      stopCameraStream();
      setCapturedImageBase64(result);
      setStep('review_form');
    };
    reader.readAsDataURL(file);
  };

  // Lifecycle: open/close camera stream
  useEffect(() => {
    if (isOpen && step === 'camera') {
      startCamera();
    } else {
      stopCameraStream();
    }
    return () => {
      stopCameraStream();
    };
  }, [isOpen, step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[95vh]">
        
        {/* Top Header */}
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-bold shadow-md shadow-red-950/50">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base font-display">
                  CampusOps Real Device Camera
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-950 text-teal-300 border border-teal-500/40">
                  Step {step === 'camera' ? '1: Capture' : step === 'review_form' ? '2: Location' : step === 'ai_analysis' ? '3: Gemini AI Review' : '4: Track'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Physical sensor feed • Real-time Gemini Vision maintenance diagnosis
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              stopCameraStream();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: REAL DEVICE CAMERA LIVE PREVIEW & CAPTURE */}
        {step === 'camera' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Viewport container */}
            <div className="relative flex-1 bg-black min-h-[360px] sm:min-h-[420px] flex items-center justify-center overflow-hidden">
              
              {/* Real HTML5 Video Preview from MediaDevices API */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover max-h-[58vh] ${hasPermission ? 'block' : 'hidden'}`}
              />

              {/* Hidden Canvas for extracting the frame */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Live reticle & camera guide overlay */}
              {hasPermission && (
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
                  <div className="self-center flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-500/50 text-teal-300 text-xs font-mono font-semibold shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                    <span>PHYSICAL CAMERA STREAMING ({facingMode.toUpperCase()})</span>
                  </div>

                  {/* Focus reticle */}
                  <div className="self-center w-64 sm:w-80 h-48 sm:h-56 relative flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400"></div>
                    
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_12px_rgba(20,184,166,0.8)] animate-pulse"></div>

                    <span className="absolute bottom-2 text-[10px] font-mono text-teal-300 bg-slate-950/80 px-2 py-0.5 rounded border border-teal-500/30">
                      Center visible defect inside frame
                    </span>
                  </div>

                  <div className="self-center text-center text-xs text-slate-300 bg-slate-950/80 px-3 py-1 rounded-full backdrop-blur-xs">
                    Hold steady and press the red button to capture
                  </div>
                </div>
              )}

              {/* Camera permission denial / error view */}
              {!hasPermission && (
                <div className="p-6 text-center max-w-md flex flex-col items-center gap-3 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base">
                    Camera Access Required
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cameraError || 'Please allow browser camera permissions to stream live video from your laptop or smartphone camera.'}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full">
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="w-full sm:flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Browser Camera</span>
                    </button>

                    <label className="w-full sm:flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700 transition-colors">
                      <Camera className="w-3.5 h-3.5 text-teal-400" />
                      <span>Take Photo (Native App)</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleNativeMobileCamera}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-white shrink-0">
              {/* Switch Front/Rear Camera */}
              <button
                type="button"
                onClick={handleToggleFacingMode}
                disabled={!hasPermission}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
                title="Switch Camera (Front / Rear)"
              >
                <SwitchCamera className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Switch Lens</span>
              </button>

              {/* Capture Trigger Button */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleCaptureFrame}
                  disabled={!hasPermission}
                  className="w-16 h-16 rounded-full bg-white hover:bg-slate-100 border-4 border-red-500 shadow-xl flex items-center justify-center active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Capture Frame"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-inner">
                    <Camera className="w-6 h-6" />
                  </div>
                </button>
                <span className="text-[10px] font-mono font-bold text-red-400 mt-1 uppercase tracking-wider">
                  Capture
                </span>
              </div>

              {/* Native Mobile Camera alternative */}
              <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 border border-slate-700">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Phone Cam</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleNativeMobileCamera}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* STEP 2: DISPLAY CAPTURED IMAGE, CAMPUS LOCATION & GPS PERMISSION */}
        {step === 'review_form' && capturedImageBase64 && (
          <div className="flex flex-col flex-1 p-4 sm:p-6 overflow-y-auto gap-4 text-white">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verify Real Photograph & Campus Location</span>
              </h4>
              <button
                type="button"
                onClick={handleRetake}
                className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Captured Image Preview */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black aspect-video sm:aspect-square shadow-inner">
                  <img
                    src={capturedImageBase64}
                    alt="Captured Campus Defect"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 font-bold border border-emerald-500/30">
                    REAL FRAME CAPTURED
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono text-center">
                  Resolution: Full HD 1080p • Canvas API Extracted
                </span>
              </div>

              {/* Location Selectors & Description */}
              <div className="md:col-span-7 flex flex-col gap-3">
                {/* Building */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Campus Building</span>
                  </label>
                  <select
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Block A (Science & Computing)">Block A (Science & Computing)</option>
                    <option value="Block B (Mech & Civil)">Block B (Mech & Civil)</option>
                    <option value="Block C (Humanities & Admin)">Block C (Humanities & Admin)</option>
                    <option value="Central Library & Research Center">Central Library & Research Center</option>
                    <option value="Tech Innovation Hub">Tech Innovation Hub</option>
                    <option value="Hostel Block 1">Hostel Block 1</option>
                    <option value="Hostel Block 2">Hostel Block 2</option>
                    <option value="Campus Dining Hall & Amenities">Campus Dining Hall & Amenities</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Floor */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                      <Layers className="w-3 h-3 text-slate-400" />
                      <span>Floor</span>
                    </label>
                    <select
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="Floor 1">Floor 1</option>
                      <option value="Floor 2">Floor 2</option>
                      <option value="Floor 3">Floor 3</option>
                      <option value="Floor 4 (HVAC & Solar)">Floor 4 (HVAC & Solar)</option>
                    </select>
                  </div>

                  {/* Room */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                      <DoorOpen className="w-3 h-3 text-slate-400" />
                      <span>Room / Space</span>
                    </label>
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="e.g. Room 204, Lab 3"
                      className="w-full px-2.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Optional GPS Location Request */}
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>GPS Coordinates</span>
                    </span>
                    {gpsStatus === 'granted' && (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                        GPS LOCKED (±{gpsCoordinates?.accuracy}m)
                      </span>
                    )}
                  </div>

                  {gpsStatus === 'granted' && gpsCoordinates ? (
                    <div className="font-mono text-[11px] text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-700/60">
                      Latitude: <strong className="text-white">{gpsCoordinates.latitude.toFixed(6)}</strong> • Longitude: <strong className="text-white">{gpsCoordinates.longitude.toFixed(6)}</strong>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-400">
                        {gpsStatus === 'denied' ? gpsError : gpsStatus === 'requesting' ? 'Requesting device GPS sensor...' : 'Optional: Record exact coordinates of issue.'}
                      </span>
                      <button
                        type="button"
                        onClick={handleRequestGps}
                        disabled={gpsStatus === 'requesting'}
                        className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-semibold transition-colors shrink-0 cursor-pointer"
                      >
                        {gpsStatus === 'requesting' ? 'Acquiring...' : 'Get GPS'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Initial Description */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                    <span>What issue did you observe?</span>
                  </label>
                  <textarea
                    rows={2}
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="e.g. Ceiling projector sparking, loose fan motor vibrating, water leaking under sink..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 resize-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Step Action Button: Send to Gemini Vision Backend */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={handleRetake}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Retake Photo
              </button>

              <button
                type="button"
                onClick={handleAnalyzeWithGemini}
                disabled={isAnalyzing}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 transition-all cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Gemini Vision AI Analyzing Photograph...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>Analyze Photograph with Gemini Vision API</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GEMINI VISION FINDINGS & USER CONFIRMATION */}
        {step === 'ai_analysis' && (
          <div className="flex flex-col flex-1 p-4 sm:p-6 overflow-y-auto gap-4 text-white">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-sm text-slate-200">
                  Gemini Vision Analysis Results (Confirm or Correct)
                </h4>
              </div>
              {aiFindings && (
                <span className="font-mono text-[10px] font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/40">
                  Confidence: {aiFindings.estimatedConfidence}
                </span>
              )}
            </div>

            {analysisError && (
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Notice: {analysisError} You can manually review and submit below.</span>
              </div>
            )}

            {/* AI Diagnosis Pill Banner */}
            {aiFindings && (
              <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col gap-2">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-blue-400" />
                    <span>Identified Asset: <strong className="text-teal-300">{aiFindings.visibleAsset}</strong></span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-200 border border-red-500/30">
                    Severity: {aiFindings.suggestedSeverity}
                  </span>
                </div>

                {aiFindings.keyFindings && aiFindings.keyFindings.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {aiFindings.keyFindings.map((finding, idx) => (
                      <span key={idx} className="font-mono text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        • {finding}
                      </span>
                    ))}
                  </div>
                )}

                {aiFindings.safetyWarning && (
                  <div className="text-[11px] text-amber-300 flex items-start gap-1 bg-amber-950/40 p-2 rounded border border-amber-500/30">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                    <span><strong>Safety Protocol:</strong> {aiFindings.safetyWarning}</span>
                  </div>
                )}
              </div>
            )}

            {/* Editable Confirmation Form */}
            <div className="flex flex-col gap-3">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Complaint Title
                </label>
                <input
                  type="text"
                  value={confirmedTitle}
                  onChange={(e) => setConfirmedTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Category
                  </label>
                  <select
                    value={confirmedCategory}
                    onChange={(e) => setConfirmedCategory(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Electrical & Lighting">Electrical & Lighting</option>
                    <option value="Plumbing & Sanitation">Plumbing & Sanitation</option>
                    <option value="HVAC & Climate">HVAC & Climate</option>
                    <option value="Furniture & Infrastructure">Furniture & Infrastructure</option>
                    <option value="AV & Educational Tech">AV & Educational Tech</option>
                    <option value="Civil & Structural">Civil & Structural</option>
                    <option value="General Maintenance">General Maintenance</option>
                  </select>
                </div>

                {/* Severity */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Severity
                  </label>
                  <select
                    value={confirmedSeverity}
                    onChange={(e) => setConfirmedSeverity(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Priority / SLA
                  </label>
                  <select
                    value={confirmedPriority}
                    onChange={(e) => setConfirmedPriority(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="P1 - Immediate (1h)">P1 - Immediate (1h)</option>
                    <option value="P2 - Urgent (4h)">P2 - Urgent (4h)</option>
                    <option value="P3 - Standard (24h)">P3 - Standard (24h)</option>
                    <option value="P4 - Scheduled">P4 - Scheduled</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Detailed Complaint Description
                </label>
                <textarea
                  rows={3}
                  value={confirmedDescription}
                  onChange={(e) => setConfirmedDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 resize-none font-sans"
                />
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 p-2 bg-slate-850 rounded-lg text-xs text-slate-300 font-mono">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{building} • {floor} • {room}</span>
                {gpsCoordinates && (
                  <span className="text-[10px] text-teal-400 ml-auto">
                    GPS: {gpsCoordinates.latitude.toFixed(4)}, {gpsCoordinates.longitude.toFixed(4)}
                  </span>
                )}
              </div>
            </div>

            {/* Submission Action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setStep('review_form')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to Photo
              </button>

              <button
                type="button"
                onClick={handleSubmitComplaint}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Recording Complaint in Database...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm & Create Campus Complaint</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUBMITTED CONFIRMATION & REAL TRACKING STATUS */}
        {step === 'submitted' && createdComplaint && (
          <div className="flex flex-col flex-1 p-6 text-white items-center text-center gap-4 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-xl shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-bold">
                Ticket Created Successfully
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                Complaint ID: {createdComplaint.id}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Your photograph and Gemini Vision AI analysis have been stored and dispatched to {createdComplaint.assignedTeam}.
              </p>
            </div>

            {/* Tracking Status Card */}
            <div className="w-full bg-slate-850 border border-slate-700 rounded-xl p-4 text-left flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs text-slate-400">Current Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-blue-950 text-blue-300 border border-blue-500/40">
                  {createdComplaint.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Location:</span>
                  <span className="font-semibold text-slate-200">{createdComplaint.building} ({createdComplaint.room})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Category:</span>
                  <span className="font-semibold text-slate-200">{createdComplaint.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Priority:</span>
                  <span className="font-semibold text-amber-300 font-mono">{createdComplaint.priority}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Assigned Unit:</span>
                  <span className="font-semibold text-slate-200">{createdComplaint.assignedTeam}</span>
                </div>
              </div>

              {createdComplaint.locationCoordinates && (
                <div className="font-mono text-[10px] text-teal-400 bg-slate-900 p-2 rounded border border-slate-800">
                  GPS Verified: Lat {createdComplaint.locationCoordinates.latitude.toFixed(5)}, Long {createdComplaint.locationCoordinates.longitude.toFixed(5)} (±{createdComplaint.locationCoordinates.accuracy}m)
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                stopCameraStream();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Done & Return to CampusOps
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
