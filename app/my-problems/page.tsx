"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Search, Filter, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MyProblemsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const problems = [
    {
      id: 1,
      title: "Yo'l ta'miri kerak",
      description: "Asosiy yo'lda chuqurliklar paydo bo'lgan",
      location: "Chilonzor tumani, 5-mahalla",
      status: "Hal qilindi",
      date: "2024-01-15",
      image: "/placeholder.svg?height=200&width=300",
      rating: null,
    },
    {
      id: 2,
      title: "Suv ta'minoti muammosi",
      description: "3 kundan beri suv kelmayapti",
      location: "Yunusobod tumani, 12-mahalla",
      status: "Jarayonda",
      date: "2024-01-14",
      image: "/placeholder.svg?height=200&width=300",
      rating: null,
    },
    {
      id: 3,
      title: "Chiroq o'rnatish",
      description: "Ko'cha yoritilishi yetarli emas",
      location: "Mirzo Ulug'bek tumani, 8-mahalla",
      status: "Yangi",
      date: "2024-01-13",
      image: "/placeholder.svg?height=200&width=300",
      rating: null,
    },
    {
      id: 4,
      title: "Park tozalash",
      description: "Mahalla parkida axlat ko'p to'plangan",
      location: "Chilonzor tumani, 5-mahalla",
      status: "Hal qilindi",
      date: "2024-01-10",
      image: "/placeholder.svg?height=200&width=300",
      rating: 8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hal qilindi":
        return "bg-green-500"
      case "Jarayonda":
        return "bg-yellow-500"
      case "Yangi":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || problem.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleRating = (problemId: number) => {
    // Navigate to feedback page
    window.location.href = `/feedback/${problemId}`
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
              <Link href="/send-problem">
                <Button variant="outline">Yangi ariza</Button>
              </Link>
              <Button variant="ghost">Chiqish</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mening arizalarim</h1>
          <p className="text-gray-600">Yuborgan arizalaringiz va ularning holati</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Arizalarni qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Holat bo'yicha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Barcha holatlar</SelectItem>
                    <SelectItem value="Yangi">Yangi</SelectItem>
                    <SelectItem value="Jarayonda">Jarayonda</SelectItem>
                    <SelectItem value="Hal qilindi">Hal qilindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProblems.map((problem) => (
            <Card key={problem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image src={problem.image || "/placeholder.svg"} alt={problem.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                  <Badge className={`${getStatusColor(problem.status)} text-white`}>{problem.status}</Badge>
                </div>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {problem.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {problem.date}
                  </div>
                </div>

                {problem.status === "Hal qilindi" && (
                  <div className="border-t pt-4">
                    {problem.rating ? (
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        Bahoingiz: {problem.rating}/10
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleRating(problem.id)} className="w-full">
                        Hal qilish sifatini baholang
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">Hech qanday ariza topilmadi</p>
              <Link href="/send-problem">
                <Button className="mt-4">Birinchi arizangizni yuboring</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
