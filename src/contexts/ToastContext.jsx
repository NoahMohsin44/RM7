import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

const ToastContext = createContext(null)

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info') => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => removeToast(id), 5000)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

const Toast = ({ message, type, onClose }) => {
    const icons = {
        success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        error: <AlertCircle className="w-4 h-4 text-red-500" />,
        info: <Info className="w-4 h-4 text-blue-500" />
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="pointer-events-auto min-w-[300px] bg-[#1C1C1C] border border-white/10 rounded-lg shadow-xl p-4 flex items-start gap-3 backdrop-blur-md"
        >
            <div className="mt-0.5 shrink-0">{icons[type] || icons.info}</div>
            <p className="text-sm text-zinc-200 flex-1 leading-relaxed">{message}</p>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    )
}
