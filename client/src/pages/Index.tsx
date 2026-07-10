import { motion } from 'framer-motion'
import { Zap, ArrowRight, Code2, Sparkles, Shield, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Generate complete applications with frontend, backend, and database layers.',
  },
  {
    icon: Sparkles,
    title: 'Premium UI/UX',
    description: 'Beautiful, modern interfaces inspired by Linear, Vercel, and Stripe.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built-in security reviews, OWASP compliance, and secure authentication.',
  },
  {
    icon: Rocket,
    title: 'Production Ready',
    description: 'Deployment-ready code with testing, documentation, and optimization.',
  },
]

const agentPhases = [
  'Planner',
  'Architecture',
  'UI/UX Design',
  'Frontend',
  'Backend',
  'Database',
  'API Integration',
  'Code Review',
  'Security Review',
  'Bug Fixer',
  'Tester',
  'Performance',
  'Documentation',
]

export default function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')] opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              AI-Powered Software Development
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="block text-navy-900 dark:text-white">Build Production Apps</span>
              <span className="block gradient-text">with AI Agents</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-navy-600 dark:text-navy-300 mb-10">
              Transform your ideas into production-ready applications. Our autonomous AI agents 
              collaborate to design, build, test, and deploy software at unprecedented speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agent/new">
                <Button size="lg" className="group">
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  View Projects
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Agent Orchestration Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="glass-card rounded-2xl p-8 shadow-large">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 dark:text-white">Agent Orchestration</h3>
                    <p className="text-sm text-navy-500 dark:text-navy-400">13 specialized agents collaborating</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-success-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-success-500"></span>
                  </span>
                  <span className="text-sm text-navy-600 dark:text-navy-400">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-13 gap-2">
                {agentPhases.map((phase, index) => (
                  <motion.div
                    key={phase}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      index < 3
                        ? 'bg-success-100 dark:bg-success-900/20 text-success-700 dark:text-success-400'
                        : index < 6
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'bg-navy-100 dark:bg-navy-800/50 text-navy-600 dark:text-navy-400'
                    }`}
                  >
                    <span className="text-xs font-medium">{phase}</span>
                    {index < 3 && (
                      <span className="text-[10px] mt-1">✓</span>
                    )}
                    {index >= 3 && index < 6 && (
                      <span className="text-[10px] mt-1 animate-pulse">●</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy-50 dark:bg-navy-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-lg text-navy-600 dark:text-navy-400 max-w-2xl mx-auto">
              From concept to deployment, our AI agents handle every aspect of software development.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="glass-card p-6 rounded-xl hover:shadow-medium transition-shadow"
                >
                  <div className="bg-gradient-to-br from-primary-600 to-accent-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-navy-600 dark:text-navy-400">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Build Your Next App?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of developers using Agent JJ to accelerate their workflow.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-navy-50">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
