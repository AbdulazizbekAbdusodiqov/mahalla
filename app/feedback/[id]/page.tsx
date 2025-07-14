"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function FeedbackPage() {
  const params = useParams()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Iltimos, baho bering")
      return
    }

    // Submit feedback logic here
    alert("Fikr-mulohazangiz uchun rahmat!")
    window.location.href = "/my-problems"
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fikr-mulohaza bildirish</h1>
          <p className="text-gray-600">Muammoni hal qilish sifatini baholang</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hal qilish sifatini baholang</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Muammoni hal qilish sifatini 1 dan 10 gacha baholang
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`p-1 transition-colors ${
                        star <= (hoveredRating || rating) ? "text-yellow-500" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                  <span className="ml-4 text-lg font-medium">{rating > 0 ? `${rating}/10` : "Baho bermagan"}</span>
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Qo'shimcha fikr-mulohaza (ixtiyoriy)
                </label>
                <Textarea
                  id="comment"
                  placeholder="Hal qilish jarayoni haqida fikringizni bildiring..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Baholash mezonlari:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1-3: Juda yomon (muammo hal qilinmagan)</li>
                  <li>• 4-6: Qoniqarsiz (qisman hal qilingan)</li>
                  <li>• 7-8: Yaxshi (muammo hal qilingan)</li>
                  <li>• 9-10: A'lo (tez va sifatli hal qilingan)</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Link href="/my-problems">
                  <Button type="button" variant="outline">
                    Bekor qilish
                  </Button>
                </Link>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Baholashni yuborish
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
