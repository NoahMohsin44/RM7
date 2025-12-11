import { motion } from 'framer-motion'
import Globe from './Globe'
import { Code2, MapPin, User, Coffee, Mail, Terminal, Cpu, Database, GraduationCap, Briefcase } from 'lucide-react'

export default function AboutSection() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <section id="about" className="py-20 scroll-mt-20">
            <div className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl"
                >
                    I believe in a user-centered design approach.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-lg max-w-2xl"
                >
                    Ensuring that every project I work on is tailored to meet the specific needs of its users.
                </motion.p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.div
                    variants={item}
                    className="bg-[#1C1C1C] border border-white/5 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm hover:border-white/10 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-4 text-white">
                        <User size={20} />
                    </div>
                    <div>
                        <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">Who I am</h3>
                        <p className="text-white text-lg font-medium leading-tight">
                            Noah. 24 years old.<br />
                            Full Stack Developer.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}
                    className="relative bg-[#1C1C1C] border border-white/5 rounded-lg p-0 overflow-hidden min-h-[220px] md:min-h-full backdrop-blur-sm hover:border-white/10 transition-colors"
                >
                    <div className="absolute top-6 left-6 z-10 pointer-events-none">
                        <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">Location</h3>
                        <p className="text-white text-lg font-medium">United Kingdom</p>
                    </div>
                    {/* Globe Container */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 pt-10">
                        <Globe />
                    </div>
                </motion.div>

                {/* 3. Education */}
                <motion.div
                    variants={item}
                    className="bg-[#1C1C1C] border border-white/5 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm hover:border-white/10 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">Education</h3>
                        <p className="text-white text-sm font-medium">
                            BSc Computer Science<br />
                            <span className="text-zinc-500">University of Technology, 2023</span>
                        </p>
                    </div>
                </motion.div>

                {/* 4. Work Experience */}
                <motion.div
                    variants={item}
                    className="bg-[#1C1C1C] border border-white/5 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm hover:border-white/10 transition-colors"
                >
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">Experience</h3>
                        <p className="text-white text-sm font-medium">
                            Senior Frontend Developer<br />
                            <span className="text-zinc-500">Tech Solutions Inc. • 2 Years</span>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
