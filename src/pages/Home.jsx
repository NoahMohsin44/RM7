import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import AboutSection from '../components/AboutSection'

export default function Home() {
    return (
        <div className="px-6 md:px-12 max-w-5xl mx-auto">
            <div className="min-h-screen flex flex-col justify-center items-center text-center relative pt-20">
                <div className="flex-1 flex flex-col justify-center items-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Available for work
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white max-w-4xl"
                    >
                        Building applications for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">specific purposes.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
                    >
                        I build simple easy to use applications for many different games and purposes. All with a no subcription based plan.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="pt-8"
                    >
                        <Link to="/projects" className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-zinc-200 transition-all">
                            View Work
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <ChevronDown className="w-6 h-6 text-zinc-500 animate-bounce" />
                </motion.div>
            </div>

            <AboutSection />
        </div>
    )
}
