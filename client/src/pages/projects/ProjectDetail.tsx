import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, FileText, Download, ExternalLink, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()

  // Mock data - will be replaced with actual Supabase queries
  const project = {
    id: id || '1',
    title: 'Task Management App',
    prompt: 'Build a task management app with drag-and-drop functionality',
    status: 'completed' as const,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  }

  const files = [
    { path: 'src/App.tsx', language: 'typescript', content: '// Main application component' },
    { path: 'src/components/TaskBoard.tsx', language: 'typescript', content: '// Task board with drag-and-drop' },
    { path: 'src/lib/api.ts', language: 'typescript', content: '// API utilities' },
    { path: 'package.json', language: 'json', content: '// Dependencies' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">
              {project.title}
            </h1>
            <p className="text-navy-600 dark:text-navy-400 max-w-3xl">
              {project.prompt}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button>
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Preview
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-navy-500 dark:text-navy-400">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Created {new Date(project.created_at).toLocaleDateString()}
          </span>
          <span className="flex items-center text-success-600 dark:text-success-400">
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed
          </span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="border-b border-navy-200 dark:border-navy-800">
          <div className="flex">
            <button className="px-6 py-3 text-sm font-medium text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400">
              <Code2 className="h-4 w-4 inline mr-2" />
              Code
            </button>
            <button className="px-6 py-3 text-sm font-medium text-navy-600 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white">
              <FileText className="h-4 w-4 inline mr-2" />
              Documentation
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* File Tree */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-navy-700 dark:text-navy-300 mb-3">
              Files
            </h3>
            <div className="space-y-1">
              {files.map((file) => (
                <button
                  key={file.path}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-800 text-sm text-navy-700 dark:text-navy-300 transition-colors"
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  {file.path}
                </button>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div className="bg-navy-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-navy-100 font-mono">
              <code>{files[0].content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
