import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Download, Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import ConfirmModal from '../components/ConfirmModal'

const DUMMY_PROJECTS = [
    {
        id: 1,
        title: 'Finance Dashboard',
        description: 'A comprehensive dashboard for tracking personal expenses and investments with real-time data visualization.',
        tech_stack: ['React', 'D3.js', 'Supabase'],
        link: '#',
        github: '#'
    },
    {
        id: 2,
        title: 'E-commerce Platform',
        description: 'Minimalist online store with seamless checkout experience and administrative control panel.',
        tech_stack: ['Next.js', 'Stripe', 'Tailwind'],
        link: '#',
        github: '#'
    }
]

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const { profile } = useAuth()
    const { addToast } = useToast()
    const isAdmin = profile?.tier === 'admin'

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState(null)
    const [editingProject, setEditingProject] = useState(null)

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tech_stack: '',
        link: '',
        github: ''
    })
    const [formLoading, setFormLoading] = useState(false)

    useEffect(() => {
        fetchProjects()
    }, [])

    async function fetchProjects() {
        if (!supabase) {
            setProjects(DUMMY_PROJECTS)
            setLoading(false)
            return
        }
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: true })

            if (error) throw error
            setProjects(data || [])
        } catch (err) {
            console.error('Error fetching:', err)
            // Only fallback if empty and error implies network/setup issue, but here we just show empty or error
            if (projects.length === 0) setProjects(DUMMY_PROJECTS)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (project) => {
        setEditingProject(project)
        setFormData({
            title: project.title,
            description: project.description,
            tech_stack: project.tech_stack ? project.tech_stack.join(', ') : '',
            link: project.link || '',
            github: project.github || ''
        })
        setIsModalOpen(true)
    }

    const handleAddNew = () => {
        setEditingProject(null)
        setFormData({
            title: '',
            description: '',
            tech_stack: '',
            link: '',
            github: ''
        })
        setIsModalOpen(true)
    }

    const confirmDelete = (id) => {
        setProjectToDelete(id)
        setDeleteModalOpen(true)
    }

    const handleDelete = async () => {
        if (!projectToDelete) return

        try {
            const { error } = await supabase.from('projects').delete().eq('id', projectToDelete)
            if (error) throw error
            setProjects(projects.filter(p => p.id !== projectToDelete))
            addToast('Project deleted successfully', 'success')
        } catch (err) {
            addToast('Error deleting project: ' + err.message, 'error')
        } finally {
            setDeleteModalOpen(false)
            setProjectToDelete(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormLoading(true)

        const techStackArray = formData.tech_stack.split(',').map(s => s.trim()).filter(s => s)
        const payload = {
            title: formData.title,
            description: formData.description,
            tech_stack: techStackArray,
            link: formData.link, // Download link
            github: formData.github
        }

        try {
            if (editingProject) {
                const { error } = await supabase
                    .from('projects')
                    .update(payload)
                    .eq('id', editingProject.id)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([payload])
                if (error) throw error
            }

            await fetchProjects()
            setIsModalOpen(false)
            addToast(editingProject ? 'Project updated successfully' : 'Project created successfully', 'success')
        } catch (err) {
            addToast('Error saving project: ' + err.message, 'error')
        } finally {
            setFormLoading(false)
        }
    }

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="min-h-screen px-6 pt-20 pb-12 md:px-12 max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-semibold text-white"
                >
                    Selected Projects
                </motion.h2>

                {isAdmin && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-white text-black border border-transparent px-3 py-1.5 rounded-md font-medium hover:bg-zinc-200 transition-all shadow-lg text-xs"
                    >
                        <Plus size={18} />
                        Add Project
                    </motion.button>
                )}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-zinc-900/50 rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            className="group relative bg-[#181818]/60 border border-white/5 rounded-lg p-5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between h-full backdrop-blur-sm"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>

                                    {isAdmin ? (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(project)} className="text-zinc-500 hover:text-white p-1">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => confirmDelete(project.id)} className="text-zinc-500 hover:text-red-400 p-1">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3">
                                            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>}
                                        </div>
                                    )}
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-auto space-y-6">
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_stack && project.tech_stack.map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 bg-white/5 text-zinc-400 text-[10px] rounded-md border border-white/5 font-mono">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Download Button */}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-zinc-200 py-1.5 rounded-md text-xs font-medium transition-colors"
                                    >
                                        <Download size={16} />
                                        Download App
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )
            }

            {/* Edit/Add Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm bg-[#1C1C1C] border border-white/10 rounded-lg p-5 shadow-2xl overflow-hidden"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase text-zinc-500 mb-1.5 font-medium tracking-wide">Project Title</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:border-white/20 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                                        placeholder="e.g. Finance Dashboard"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-zinc-500 mb-1.5 font-medium tracking-wide">Description</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:border-white/20 focus:ring-1 focus:ring-white/10 outline-none resize-none h-20"
                                        placeholder="Brief description of the app..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase text-zinc-500 mb-1.5 font-medium tracking-wide">Download URL</label>
                                        <input
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-white/20 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase text-zinc-500 mb-1.5 font-medium tracking-wide">GitHub URL</label>
                                        <input
                                            value={formData.github}
                                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-white/20 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase text-zinc-500 mb-1.5 font-medium tracking-wide">Languages (comma separated)</label>
                                    <input
                                        value={formData.tech_stack}
                                        onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-white/20 focus:ring-1 focus:ring-white/10 outline-none transition-all"
                                        placeholder="React, CSS, Node.js"
                                    />
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-1.5 rounded-md text-xs font-medium transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={formLoading} className="flex-1 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 hover:from-zinc-700 hover:to-zinc-800 text-white py-1.5 rounded-md text-xs font-medium transition-all flex justify-center items-center gap-2 shadow-lg">
                                        {formLoading && <Loader2 className="animate-spin w-4 h-4" />}
                                        Save Project
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
            />
        </div >
    )
}
