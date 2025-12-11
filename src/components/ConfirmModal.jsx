import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isLoading, confirmText = 'Delete', confirmColor = 'red' }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-sm bg-[#1C1C1C] border border-white/10 rounded-lg p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
                                <AlertTriangle className="w-6 h-6" />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                                {message}
                            </p>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-md text-xs font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`flex-1 bg-${confirmColor}-500/10 hover:bg-${confirmColor}-500/20 text-${confirmColor}-500 border border-${confirmColor}-500/20 py-2 rounded-md text-xs font-medium transition-colors`}
                                >
                                    {isLoading ? 'Processing...' : confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
