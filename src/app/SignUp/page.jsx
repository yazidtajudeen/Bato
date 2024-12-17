'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    professionality: '',
    location: '',
    image: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })
      if (authError) throw authError

    
      let imageUrl = null
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { data: imageData, error: imageError } = await supabase.storage
          .from('midwife-images')
          .upload(fileName, formData.image)
        
        if (imageError) throw imageError
        imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/midwife-images/${fileName}`
      }

    
      const { error: profileError } = await supabase
        .from('midwives')
        .insert([
          {
            user_id: authData.user.id,
            name: formData.name,
            professionality: formData.professionality,
            location: formData.location,
            image_url: imageUrl
          }
        ])

      if (profileError) throw profileError

      
      alert('Successfully signed up!')
      
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, image: file }))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Professionality"
          value={formData.professionality}
          onChange={(e) => setFormData(prev => ({ ...prev, professionality: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 text-white bg-[#AE4B68] rounded hover:bg-[#DFB3C0]"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}