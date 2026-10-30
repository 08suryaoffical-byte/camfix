/**
 * CamFix DSIT Enterprise Operations - Data Types
 * Dhanalakshmi Srinivasa Institute of Technology
 */

export type UserRole = 'ops_admin' | 'technician' | 'faculty' | 'student';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  email: string;
  regOrEmpId: string;
  department: string;
  avatar: string;
  badge?: string;
}

export interface MetricTile {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  footnote: string;
  accentColor: string;
  icon: string;
}

export interface IncidentReport {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  severity: 'Critical' | 'Moderate' | 'Low' | 'Resolved';
  location: string;
  building: string;
  room: string;
  reportedBy: string;
  reporterId: string;
  reportedAt: string;
  assignedTech?: string;
  assignedTechRole?: string;
  assignedTechAvatar?: string;
  assignedTechEta?: string;
  status: 'Submitted' | 'Reviewed' | 'Assigned' | 'In Progress' | 'Spare Parts' | 'Resolved' | 'Closed';
  slaDeadline: string;
  slaRemaining: string;
  aiDuplicateMatch?: string;
  aiReasoning?: string;
  assetTag?: string;
  assetName?: string;
  sparePartRequired?: string;
  sparePartSku?: string;
  photoBefore?: string;
  photoAfter?: string;
  masterClusterId?: string;
}

export interface ClusteredDuplicate {
  id: string;
  studentName: string;
  regNo: string;
  quote: string;
  time: string;
  synced: boolean;
  avatarInitials: string;
}

export interface DisruptionScenario {
  id: 'A' | 'B' | 'C' | 'D';
  name: string;
  subtitle: string;
  stressVector: string;
  severityColor: string;
  affectedRooms: number;
  roomsDetail: string;
  impactedStudents: number;
  examsDetail: string;
  hardwareOffline: number;
  hardwareDetail: string;
  crewRequired: number;
  crewDetail: string;
  inventoryStock: string;
  inventoryDetail: string;
}

export interface GraphNodeData {
  id: string;
  badge: string;
  title: string;
  desc: string;
  assetId: string;
  parentCircuit: string;
  blastRadius: string;
  mitigationStatus: string;
  x: number;
  y: number;
  icon: string;
  colorType: 'error' | 'primary' | 'secondary' | 'neutral';
}

export interface RoomTelemetry {
  id: string;
  name: string;
  type: string;
  status: 'normal' | 'scheduled' | 'warning' | 'critical' | 'exam';
  temperature: string;
  powerDraw: string;
  humidity: string;
  breakerStatus: string;
  occupants: number;
  capacity: number;
  activeExam?: string;
  assets: { name: string; tag: string; status: 'online' | 'unpowered' | 'standby' | 'stalled' }[];
  cctvFeedId?: string;
}
