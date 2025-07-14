"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, MapPin, Camera } from "lucide-react"
import Link from "next/link"

export default function SendProblemPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [location, setLocation] = useState("")

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
        },
        (error) => {
          console.error("Lokatsiya olishda xatolik:", error)
          alert("Lokatsiyani olishda xatolik yuz berdi")
        },
      )
    } else {
      alert("Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    alert("Ariza muvaffaqiyatli yuborildi!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MahallaPlatform
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/my-problems">
                <Button variant="outline">Mening arizalarim</Button>
              </Link>
              <Button variant="ghost">Chiqish</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Muammo yuborish</h1>
          <p className="text-gray-600">Mahallangizda mavjud muammoni bildiring</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ariza ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title">Muammo sarlavhasi *</Label>
                    <Input id="title" placeholder="Muammo sarlavhasini kiriting" required className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="description">Muammo haqida tavsif *</Label>
                    <Textarea
                      id="description"
                      placeholder="Muammo haqida batafsil ma'lumot bering"
                      rows={4}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="neighborhood">Mahalla tanlash *</Label>
                    <Select required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Mahallani tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chilonzor-1">Chilonzor 1-mahalla</SelectItem>
                        <SelectItem value="chilonzor-2">Chilonzor 2-mahalla</SelectItem>
                        <SelectItem value="yunusobod-1">Yunusobod 1-mahalla</SelectItem>
                        <SelectItem value="yunusobod-2">Yunusobod 2-mahalla</SelectItem>
                        <SelectItem value="mirzo-ulugbek-1">Mirzo Ulug'bek 1-mahalla</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <Label>Rasm yuklash</Label>
                    <div
                      className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Rasmlarni bu yerga sudrab olib keling yoki</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                          <Upload className="w-4 h-4 mr-2" />
                          Fayl tanlash
                        </Button>
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-600">{file.name}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              O'chirish
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Lokatsiya</Label>
                    <div className="mt-1 flex space-x-2">
                      <Input
                        id="location"
                        placeholder="Lokatsiya koordinatalari"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" onClick={getCurrentLocation}>
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">GPS tugmasini bosib joriy lokatsiyangizni aniqlang</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link href="/">
                  <Button type="button" variant="outline">
                    Bekor qilish
                  </Button>
                </Link>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Ariza yuborish
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
