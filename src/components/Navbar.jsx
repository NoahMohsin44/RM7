import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import ConfirmModal from './ConfirmModal'
import { LayoutGrid, Layers, UsersRound, LogIn, LogOut, Terminal, CircleUser } from 'lucide-react'

export default function Navbar() {
    const location = useLocation()
    const { profile, user, signOut } = useAuth()
    const { addToast } = useToast()
    const navigate = useNavigate()
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        addToast('Logged out successfully', 'success')
        navigate('/')
        setShowLogoutConfirm(false)
    }

    const links = [
        { path: '/', label: 'Home', icon: LayoutGrid },
        { path: '/#about', label: 'About', icon: CircleUser },
        { path: '/projects', label: 'Projects', icon: Layers },
        ...(profile?.tier === 'admin' ? [{ path: '/users', label: 'Users', icon: UsersRound }] : []),
    ]

    return (
        <nav className="group fixed top-0 left-0 h-full w-16 bg-[#121212] border-r border-white/5 z-50 flex flex-col justify-between py-6 transition-all duration-300 hover:w-64 overflow-hidden">
            <div>
                {/* Logo Area */}
                <div className="mb-8 flex items-center h-10 w-full overflow-hidden">
                    <div className="w-16 flex items-center justify-center shrink-0">
                        <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center shrink-0">
                            <Terminal className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <span className="font-bold tracking-tight text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block delay-100">RM7</span>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1 w-full">
                    {links.map((link) => {
                        const Icon = link.icon
                        const isActive = link.path === '/#about'
                            ? location.hash === '#about'
                            : location.pathname === link.path

                        const handleClick = () => {
                            if (link.path === '/#about') {
                                if (location.pathname !== '/') {
                                    navigate('/')
                                    setTimeout(() => {
                                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                                    }, 100)
                                } else {
                                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                                }
                            }
                        }

                        return (
                            <Link
                                key={link.path}
                                to={link.path === '/#about' ? '#' : link.path}
                                onClick={link.path === '/#about' ? (e) => { e.preventDefault(); handleClick() } : undefined}
                                className={`group/item flex items-center h-10 w-full transition-colors relative ${isActive
                                    ? 'bg-zinc-800/20 text-white border-l-2 border-white'
                                    : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-200 border-l-2 border-transparent'
                                    }`}
                            >
                                <div className="w-16 flex items-center justify-center shrink-0">
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-zinc-500 group-hover/item:text-zinc-300'}`} />
                                </div>
                                <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block delay-100">{link.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="w-full">
                {user ? (
                    <>
                        <div className="hidden md:block mb-2">
                            {/* Account Header */}
                            <div className="h-6 flex items-center overflow-hidden mb-1">
                                <div className="w-16 flex items-center justify-center shrink-0">
                                    <span className="block w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                                </div>
                                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Account</p>
                            </div>

                            <div className="flex items-center overflow-hidden">
                                <div className="w-16 flex items-center justify-center shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600 flex items-center justify-center text-[10px] text-white shrink-0 shadow-sm border border-white/10">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                </div>
                                <span className="text-xs text-zinc-400 truncate whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{user.email}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowLogoutConfirm(true)}
                            className="w-full flex items-center h-10 hover:bg-zinc-800/30 text-zinc-400 hover:text-red-400 transition-colors border-l-2 border-transparent"
                        >
                            <div className="w-16 flex items-center justify-center shrink-0">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block delay-100">Sign Out</span>
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center h-10 w-full hover:bg-zinc-800/30 text-zinc-400 hover:text-zinc-200 transition-colors border-l-2 border-transparent"
                    >
                        <div className="w-16 flex items-center justify-center shrink-0">
                            <LogIn className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block delay-100">Sign In</span>
                    </Link>
                )}
            </div>
            {/* Bottom Actions */}

            <ConfirmModal
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={handleSignOut}
                title="Sign Out"
                message="Are you sure you want to sign out of your account?"
                confirmText="Sign Out"
            />
        </nav >
    )
}
