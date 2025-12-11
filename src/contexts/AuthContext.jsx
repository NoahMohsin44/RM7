import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!supabase) {
            setLoading(false)
            return
        }

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            if (session?.user) fetchProfile(session.user.id)
            else setLoading(false)
        })

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null)
                if (session?.user) {
                    await fetchProfile(session.user.id)
                } else {
                    setProfile(null)
                    setLoading(false)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (!error && data) {
                setProfile(data)
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email, password) => {
        if (!supabase) throw new Error('Supabase not configured')
        return supabase.auth.signUp({
            email,
            password,
        })
    }

    const signIn = async (email, password) => {
        if (!supabase) throw new Error('Supabase not configured')
        return supabase.auth.signInWithPassword({
            email,
            password,
        })
    }

    const signOut = async () => {
        return supabase?.auth.signOut()
    }

    return (
        <AuthContext.Provider value={{ user, profile, signUp, signIn, signOut, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
