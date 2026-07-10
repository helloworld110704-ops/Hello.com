import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, Clock, ArrowRight } from 'lucide-react'

interface Phase {
  type: string
  name: string
  description: string
}

interface OrchestrationFlowProps {
  phases: Phase[]
  currentPhase: number
  phaseStatus: Record<number, 'queued' | 'running' | 'completed'>
  prompt: string
}

export function OrchestrationFlow({
  phases,
  currentPhase,
  phaseStatus,
  prompt,
}: OrchestrationFlowProps) {
  const getStatusIcon = (index: number) => {
    const status = phaseStatus[index]
    
    if (status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400" />
    }
    
    if (status === 'running') {
      return <Loader2 className="h-5 w-5 text-primary-600 dark:text-primary-400 animate-spin" />
    }
    
    return <Clock className="h-5 w-5 text-navy-300 dark:text-navy-600" />
  }

  const getStatusBg = (index: number) => {
    const status = phaseStatus[index]
    
    if (status === 'completed') {
      return 'bg-success-100 dark:bg-success-900/20 border-success-200 dark:border-success-800'
    }
    
    if (status === 'running') {
      return 'bg-primary-100 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
    }
    
    return 'bg-navy-50 dark:bg-navy-900/30 border-navy-200 dark:border-navy-700'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Prompt Display */}
      <div className="glass-card p-6 rounded-xl mb-8">
        <h3 className="text-sm font-medium text-navy-500 dark:text-navy-400 mb-2">
          Building:
        </h3>
        <p className="text-lg text-navy-900 dark:text-white">{prompt}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-navy-700 dark:text-navy-300">
            Overall Progress
          </span>
          <span className="text-sm text-navy-500 dark:text-navy-400">
            {Object.values(phaseStatus).filter(s => s === 'completed').length} / {phases.length}
          </span>
        </div>
        <div className="h-2 bg-navy-100 dark:bg-navy-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(Object.values(phaseStatus).filter(s => s === 'completed').length / phases.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
          />
        </div>
      </div>

      {/* Agent Phases Timeline */}
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const isCompleted = phaseStatus[index] === 'completed'
          const isRunning = phaseStatus[index] === 'running'
          const isQueued = !phaseStatus[index] || phaseStatus[index] === 'queued'
          
          return (
            <motion.div
              key={phase.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${getStatusBg(index)}`}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(index)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                    Phase {index + 1}
                  </span>
                  {isRunning && (
                    <span className="px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full animate-pulse">
                      In Progress
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-2 py-0.5 bg-success-600 text-white text-xs rounded-full">
                      Completed
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-navy-900 dark:text-white">
                  {phase.name}
                </h3>
                <p className="text-sm text-navy-600 dark:text-navy-400">
                  {phase.description}
                </p>
              </div>

              {/* Connector Arrow */}
              {index < phases.length - 1 && (
                <div className="absolute left-8 top-full h-4 w-0.5 bg-navy-200 dark:bg-navy-700" />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Final Message */}
      <AnimatePresence>
        {Object.values(phaseStatus).every(s => s === 'completed') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass-card p-6 rounded-xl bg-gradient-to-r from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-900/10 border-success-200 dark:border-success-800"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-success-600 dark:text-success-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-success-800 dark:text-success-300">
                  Application Generated Successfully!
                </h3>
                <p className="text-sm text-success-700 dark:text-success-400">
                  Your production-ready application has been created with all components, tests, and documentation.
                </p>
              </div>
              <ArrowRight className="h-6 w-6 text-success-600 dark:text-success-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
