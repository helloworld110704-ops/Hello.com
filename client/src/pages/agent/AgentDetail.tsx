import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Loader2, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AgentDetail() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">
          Agent Run Details
        </h1>
        <p className="text-navy-600 dark:text-navy-400 mb-8">
          View detailed progress of your agent orchestration
        </p>
        
        <div className="glass-card p-8 rounded-xl">
          <div className="text-center py-12">
            <Code2 className="h-16 w-16 text-navy-300 dark:text-navy-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-navy-900 dark:text-white mb-2">
              Agent Run Details
            </h2>
            <p className="text-navy-600 dark:text-navy-400">
              Run ID: {id}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
