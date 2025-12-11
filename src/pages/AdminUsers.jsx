import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'
import { Search, Loader2, Shield, CreditCard, User } from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const { profile } = useAuth()
    const { addToast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && profile?.tier !== 'admin') {
            navigate('/')
        }
    }, [profile, loading, navigate])

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setUsers(data || [])
        } catch (err) {
            console.error('Error fetching users:', err)
        } finally {
            setLoading(false)
        }
    }

    async function handleTierChange(userId, newTier) {
        // Optimistic update
        setUsers(users.map(u => u.id === userId ? { ...u, tier: newTier } : u))

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ tier: newTier })
                .eq('id', userId)

            if (error) throw error
            addToast('User updated successfully', 'success')
        } catch (err) {
            addToast('Error updating user: ' + err.message, 'error')
            fetchUsers() // Revert on error
        }
    }

    const filteredUsers = users.filter(user =>
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const TierIcon = ({ tier }) => {
        switch (tier) {
            case 'admin': return <Shield className="w-4 h-4 text-purple-400" />
            case 'paid': return <CreditCard className="w-4 h-4 text-green-400" />
            default: return <User className="w-4 h-4 text-zinc-400" />
        }
    }

    return (
        <div className="min-h-screen px-6 pt-20 pb-12 md:px-12 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-2xl font-semibold text-white mb-2">User Management</h2>
                <p className="text-zinc-400 mb-6 text-sm">Manage user access and subscription tiers.</p>

                {/* Search */}
                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-3.5 h-3.5" />
                    <input
                        type="text"
                        placeholder="Search users by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1C1C1C] border border-white/10 rounded-md pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-600"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin text-zinc-500" />
                    </div>
                ) : (
                    <div className="bg-[#1C1C1C] border border-white/5 rounded-lg overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">User</th>
                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Joined</th>
                                        <th className="py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Tier</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="py-2 px-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-[10px] font-medium text-white">
                                                        {user.email?.[0].toUpperCase()}
                                                    </div>
                                                    <span className="text-xs text-zinc-200">{user.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3 text-xs text-zinc-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-2 px-3">
                                                <div className="relative inline-block group">
                                                    <select
                                                        value={user.tier}
                                                        onChange={(e) => handleTierChange(user.id, e.target.value)}
                                                        className="appearance-none bg-black/40 border border-white/10 rounded-md py-1 pl-8 pr-6 text-xs text-white focus:outline-none focus:border-white/20 cursor-pointer capitalize"
                                                    >
                                                        <option value="free">Free</option>
                                                        <option value="paid">Paid</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <TierIcon tier={user.tier} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="py-8 text-center text-zinc-500 text-sm">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
