import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PromptFormProps {
  onSubmit: (prompt: string) => void
  loading?: boolean
}

const examplePrompts = [
  'Build a task management app with drag-and-drop kanban boards',
  'Create an e-commerce dashboard with real-time analytics',
  'Design a social media scheduling tool with AI content suggestions',
  'Build a fitness tracking app with workout plans and progress charts',
]

export function PromptForm({ onSubmit, loading = false }: PromptFormProps) {
  const [prompt, setPrompt] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      onSubmit(prompt.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`glass-card rounded-2xl p-2 transition-all duration-300 ${
            isFocused ? 'shadow-large ring-2 ring-primary-500/20' : 'shadow-medium'
          }`}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe the application you want to build..."
            className="w-full h-40 px-4 py-3 bg-transparent border-none resize-none focus:outline-none text-navy-900 dark:text-white placeholder-navy-400 text-lg"
            disabled={loading}
          />
          <div className="flex items-center justify-between px-4 pb-2">
            <div className="flex items-center gap-2 text-xs text-navy-500 dark:text-navy-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI will handle everything: design, code, tests, and deployment</span>
            </div>
            <Button type="submit" size="lg" disabled={!prompt.trim() || loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Build App
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Example Prompts */}
      <div className="mt-8">
        <p className="text-sm font-medium text-navy-700 dark:text-navy-300 mb-4 text-center">
          Try an example prompt:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left p-4 rounded-xl bg-navy-50 dark:bg-navy-900/50 hover:bg-navy-100 dark:hover:bg-navy-800/50 transition-colors border border-navy-200 dark:border-navy-700"
            >
              <p className="text-sm text-navy-700 dark:text-navy-300 line-clamp-2">
                {example}
              </p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
