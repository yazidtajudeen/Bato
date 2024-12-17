'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import MidwifeCard from '@/Components/MidwifeCard'

export default function MidwivesPage() {
  const [midwives, setMidwives] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMidwives()
  }, [])

  async function fetchMidwives() {
    try {
      const { data, error } = await supabase
        .from('midwives')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMidwives(data || [])
    } catch (error) {
      console.error('Error fetching midwives:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AE4B68]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Available Midwives</h1>
      <p className="text-center text-gray-600 mb-8">Find and book appointments with qualified midwives</p>
      
      {midwives.length === 0 ? (
        <div className="text-center text-gray-600">
          No midwives available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {midwives.map((midwife) => (
            <MidwifeCard key={midwife.id} midwife={midwife} />
          ))}
        </div>
      )}
    </div>
  )
}