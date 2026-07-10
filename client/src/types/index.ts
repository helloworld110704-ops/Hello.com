export interface User {
  id: string
  email: string
  created_at: string
}

export interface Project {
  id: string
  user_id: string
  prompt: string
  title: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export interface AgentRun {
  id: string
  project_id: string
  agent_type: AgentType
  status: 'queued' | 'running' | 'completed' | 'failed'
  output?: string
  error?: string
  started_at?: string
  completed_at?: string
}

export type AgentType = 
  | 'planner'
  | 'architecture'
  | 'ui-ux-designer'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'api-integration'
  | 'code-reviewer'
  | 'security-reviewer'
  | 'bug-fixer'
  | 'tester'
  | 'performance-optimizer'
  | 'documentation'

export interface AgentPhase {
  id: string
  agent_run_id: string
  phase_name: string
  status: 'queued' | 'running' | 'completed' | 'failed'
  progress: number
  message?: string
  created_at: string
  updated_at: string
}

export interface GeneratedCode {
  id: string
  project_id: string
  file_path: string
  content: string
  language: string
  created_at: string
}

export type Theme = 'light' | 'dark'
