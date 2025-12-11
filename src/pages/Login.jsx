import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { Loader2 } from 'lucide-react'

export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { signIn, signUp } = useAuth()
    const { addToast } = useToast()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isLogin) {
                const { error } = await signIn(email, password)
                if (error) throw error
                navigate('/projects')
            } else {
                const { error } = await signUp(email, password)
                if (error) throw error
                // Auto sign in or show success message depending on email config
                addToast('Account created! You can now log in.', 'success')
                setIsLogin(true)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-20">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#1C1C1C] border border-white/5 p-8 rounded-lg backdrop-blur-xl shadow-2xl"
                >
                    <div className="mb-8">
                        <div className="h-10 p-1 bg-black/40 rounded-lg flex border border-white/5">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 flex items-center justify-center text-xs font-medium rounded-md transition-all ${isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 flex items-center justify-center text-xs font-medium rounded-md transition-all ${!isLogin ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Create an Account'}
                        </h2>
                        <p className="text-zinc-500 text-sm">
                            {isLogin ? 'Enter your credentials to access your account' : 'Fill in your details to get started'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2 font-medium tracking-wide">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all outline-none"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-zinc-500 mb-2 font-medium tracking-wide">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-medium py-2.5 rounded-md hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg text-sm mt-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>



                </motion.div>
            </div>
        </div>
    )
}
