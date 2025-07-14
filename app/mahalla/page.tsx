"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Search, Filter, CheckCircle, XCircle, Eye } from "lucide-react"
import Image from "next/image"

export default function MahallaPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const problems = [
    {
      id: 1,
      title: "Yo'l ta'miri kerak",
      description: "Asosiy yo'lda chuqurliklar paydo bo'lgan",
      location: "Chilonzor tumani, 5-mahalla",
      status: "Yangi",
      date: "2024-01-15",
      citizen: "Alisher Karimov",
      phone: "+998 90 123 45 67",
      image: "/placeholder.svg?height=200&width=300",
      accepted: false,
    },
    {
      id: 2,
      title: "Suv ta'minoti muammosi",
      description: "3 kundan beri suv kelmayapti",
      location: "Chilonzor tumani, 5-mahalla",
      status: "Qabul qilindi",
      date: "2024-01-14",
      citizen: "Nodira Tosheva",
      phone: "+998 91 234 56 78",
      image: "/placeholder.svg?height=200&width=300",
      accepted: true,
    },
    {
      id: 3,
      title: "Chiroq o'rnatish",
      description: "Ko'cha yoritilishi yetarli emas",
      location: "Chilonzor tumani, 5-mahalla",
      status: "Hal qilindi",
      date: "2024-01-13",
      citizen: "Bobur Rahimov",
      phone: "+998 93 345 67 89",
      image: "/placeholder.svg?height=200&width=300",
      accepted: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hal qilindi":
        return "bg-green-500"
      case "Qabul qilindi":
        return "bg-blue-500"
      case "Jarayonda":
        return "bg-yellow-500"
      case "Yangi":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleAccept = (problemId: number) => {
    alert(`Ariza #${problemId} qabul qilindi`)
  }

  const handleReject = (problemId: number) => {
    alert(`Ariza #${problemId} rad etildi`)
  }

  const newProblems = problems.filter((p) => p.status === "Yangi")
  const acceptedProblems = problems.filter((p) => p.accepted)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Mahalla Paneli</h1>
              <Badge className="ml-4 bg-blue-100 text-blue-800">Chilonzor 5-mahalla</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Statistika</Button>
              <Button variant="ghost">Chiqish</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mahalla boshqaruv paneli</h1>
          <p className="text-gray-600">Kelib tushgan arizalarni ko'rib chiqing va boshqaring</p>
        </div>

        <Tabs defaultValue="new" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">Yangi arizalar ({newProblems.length})</TabsTrigger>
            <TabsTrigger value="accepted">Qabul qilingan ({acceptedProblems.length})</TabsTrigger>
            <TabsTrigger value="all">Barcha arizalar ({problems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Yangi kelib tushgan arizalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newProblems.map((problem) => (
                    <div key={problem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 relative flex-shrink-0">
                          <Image
                            src={problem.image || "/placeholder.svg"}
                            alt={problem.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{problem.title}</h3>
                            <Badge className={`${getStatusColor(problem.status)} text-white`}>{problem.status}</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{problem.description}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {problem.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            {problem.date}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">
                            <strong>Fuqaro:</strong> {problem.citizen} ({problem.phone})
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleAccept(problem.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Qabul qilish
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(problem.id)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Rad etish
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Batafsil
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {newProblems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">Yangi arizalar yo'q</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accepted" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Qabul qilingan arizalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {acceptedProblems.map((problem) => (
                    <Card key={problem.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={problem.image || "/placeholder.svg"}
                          alt={problem.title}
                          fill
                          className="object-cover"
                        />
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
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Holat yangilash
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <Card>
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
                        <SelectItem value="Qabul qilindi">Qabul qilindi</SelectItem>
                        <SelectItem value="Jarayonda">Jarayonda</SelectItem>
                        <SelectItem value="Hal qilindi">Hal qilindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {problems.map((problem) => (
                <Card key={problem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={problem.image || "/placeholder.svg"}
                      alt={problem.title}
                      fill
                      className="object-cover"
                    />
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
                      <div className="text-sm text-gray-600">
                        <strong>Fuqaro:</strong> {problem.citizen}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      Batafsil ko'rish
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
