import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, FolderOpen, Clock, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import type { Project } from '@/types'

// Mock data for demonstration - will be replaced with actual Supabase queries
const mockProjects: Project[] = [
  {
    id: '1',
    user_id: 'user-1',
    prompt: 'Build a task management app with drag-and-drop functionality',
    title: 'Task Management App',
    status: 'completed',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user-1',
    prompt: 'Create an e-commerce dashboard with analytics',
    title: 'E-commerce Dashboard',
    status: 'processing',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'user-1',
    prompt: 'Build a social media scheduling tool',
    title: 'Social Media Scheduler',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Pending',
    color: 'text-warning-600 dark:text-warning-400',
    bgColor: 'bg-warning-100 dark:bg-warning-900/20',
  },
  processing: {
    icon: Loader2,
    label: 'Processing',
    color: 'text-primary-600 dark:text-primary-400',
    bgColor: 'bg-primary-100 dark:bg-primary-900/20',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    color: 'text-success-600 dark:text-success-400',
    bgColor: 'bg-success-100 dark:bg-success-900/20',
  },
  failed: {
    icon: AlertCircle,
    label: 'Failed',
    color: 'text-error-600 dark:text-error-400',
    bgColor: 'bg-error-100 dark:bg-error-900/20',
  },
}

export default function Dashboard() {
  const { user } = useAuth()
  const [projects] = useState<Project[]>(mockProjects)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
      >
        <div>
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">
            Your Projects
          </h1>
          <p className="text-navy-600 dark:text-navy-400">
            Manage and track your AI-generated applications
          </p>
        </div>
        <Link to="/agent/new">
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </Button>
        </Link>
      </motion.div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
            <FolderOpen className="h-16 w-16 text-navy-300 dark:text-navy-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-navy-900 dark:text-white mb-4">
              No Projects Yet
            </h2>
            <p className="text-navy-600 dark:text-navy-400 mb-8">
              Start building your first application with Agent JJ
            </p>
            <Link to="/agent/new">
              <Button>
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Project
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const StatusIcon = statusConfig[project.status].icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link to={`/project/${project.id}`}>
                  <div className="glass-card p-6 rounded-xl hover:shadow-medium transition-all hover:-translate-y-1 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-navy-900 dark:text-white mb-2 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-navy-600 dark:text-navy-400 line-clamp-2">
                          {project.prompt}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[project.status].bgColor} ${statusConfig[project.status].color}`}
                      >
                        <StatusIcon
                          className={`h-3.5 w-3.5 ${project.status === 'processing' ? 'animate-spin' : ''}`}
                        />
                        {statusConfig[project.status].label}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-navy-100 dark:border-navy-800">
                      <span className="text-xs text-navy-500 dark:text-navy-400">
                        {new Date(project.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-primary-600 dark:text-primary-400 text-sm font-medium flex items-center group">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
