import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/agent/PromptForm'
import { OrchestrationFlow } from '@/components/agent/OrchestrationFlow'
import type { AgentType } from '@/types'

const agentPhases: { type: AgentType; name: string; description: string }[] = [
  { type: 'planner', name: 'Planner', description: 'Understands requirements and creates roadmap' },
  { type: 'architecture', name: 'Architecture', description: 'Designs system architecture' },
  { type: 'ui-ux-designer', name: 'UI/UX Design', description: 'Creates beautiful interfaces' },
  { type: 'frontend', name: 'Frontend', description: 'Builds responsive UI components' },
  { type: 'backend', name: 'Backend', description: 'Implements server-side logic' },
  { type: 'database', name: 'Database', description: 'Designs data schema' },
  { type: 'api-integration', name: 'API Integration', description: 'Connects external services' },
  { type: 'code-reviewer', name: 'Code Review', description: 'Reviews code quality' },
  { type: 'security-reviewer', name: 'Security Review', description: 'Ensures security compliance' },
  { type: 'bug-fixer', name: 'Bug Fixer', description: 'Fixes issues automatically' },
  { type: 'tester', name: 'Tester', description: 'Runs comprehensive tests' },
  { type: 'performance-optimizer', name: 'Performance', description: 'Optimizes for speed' },
  { type: 'documentation', name: 'Documentation', description: 'Generates documentation' },
]

export default function NewAgent() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [phaseStatus, setPhaseStatus] = useState<Record<number, 'queued' | 'running' | 'completed'>>({})

  const handleSubmit = async (submittedPrompt: string) => {
    setPrompt(submittedPrompt)
    setIsProcessing(true)
    
    // Simulate agent orchestration
    for (let i = 0; i < agentPhases.length; i++) {
      setPhaseStatus(prev => ({ ...prev, [i]: 'running' }))
      setCurrentPhase(i)
      await new Promise(resolve => setTimeout(resolve, 800))
      setPhaseStatus(prev => ({ ...prev, [i]: 'completed' }))
    }
    
    setIsProcessing(false)
    navigate('/projects')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          AI Agent Orchestration
        </div>
        <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">
          Build Your Application
        </h1>
        <p className="text-lg text-navy-600 dark:text-navy-400 max-w-2xl mx-auto">
          Describe what you want to build, and our autonomous AI agents will collaborate 
          to create a production-ready application.
        </p>
      </motion.div>

      {!isProcessing ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PromptForm onSubmit={handleSubmit} loading={isProcessing} />
          
          {/* Agent Phases Preview */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-navy-900 dark:text-white mb-6 text-center">
              13 Specialized Agents Working Together
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {agentPhases.map((phase, index) => (
                <motion.div
                  key={phase.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="glass-card p-4 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="font-medium text-navy-900 dark:text-white">
                      {phase.name}
                    </h3>
                  </div>
                  <p className="text-xs text-navy-600 dark:text-navy-400">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <OrchestrationFlow
          phases={agentPhases}
          currentPhase={currentPhase}
          phaseStatus={phaseStatus}
          prompt={prompt}
        />
      )}
    </div>
  )
}
