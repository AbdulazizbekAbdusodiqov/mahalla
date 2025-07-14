"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, MapPin, AlertTriangle, CheckCircle, TrendingUp, Plus, Trash2 } from "lucide-react"

export default function AdminPanel() {
  const [neighborhoods, setNeighborhoods] = useState([
    { id: 1, name: "Chilonzor 1-mahalla", head: "Alisher Karimov", problems: 15, resolved: 12 },
    { id: 2, name: "Chilonzor 2-mahalla", head: "Nodira Tosheva", problems: 8, resolved: 6 },
    { id: 3, name: "Yunusobod 1-mahalla", head: "Bobur Rahimov", problems: 22, resolved: 18 },
    { id: 4, name: "Mirzo Ulug'bek 1-mahalla", head: "Malika Nazarova", problems: 12, resolved: 10 },
  ])

  const statsData = [
    { month: "Yan", problems: 45, resolved: 38 },
    { month: "Fev", problems: 52, resolved: 44 },
    { month: "Mar", problems: 38, resolved: 35 },
    { month: "Apr", problems: 61, resolved: 52 },
    { month: "May", problems: 55, resolved: 48 },
    { month: "Iyun", problems: 48, resolved: 42 },
  ]

  const problemTypes = [
    { name: "Yo'l ta'miri", value: 35, color: "#3B82F6" },
    { name: "Suv ta'minoti", value: 25, color: "#10B981" },
    { name: "Elektr ta'minoti", value: 20, color: "#F59E0B" },
    { name: "Tozalash", value: 15, color: "#EF4444" },
    { name: "Boshqa", value: 5, color: "#8B5CF6" },
  ]

  const unsatisfiedProblems = [
    {
      id: 1,
      title: "Yo'l ta'miri sifatsiz",
      neighborhood: "Chilonzor 1-mahalla",
      rating: 3,
      citizen: "Alisher Karimov",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Suv muammosi qayta paydo bo'ldi",
      neighborhood: "Yunusobod 1-mahalla",
      rating: 4,
      citizen: "Nodira Tosheva",
      date: "2024-01-14",
    },
  ]

  const totalProblems = neighborhoods.reduce((sum, n) => sum + n.problems, 0)
  const totalResolved = neighborhoods.reduce((sum, n) => sum + n.resolved, 0)
  const resolutionRate = Math.round((totalResolved / totalProblems) * 100)

  const handleAddNeighborhood = () => {
    const name = prompt("Yangi mahalla nomini kiriting:")
    const head = prompt("Mahalla raisi ismini kiriting:")
    if (name && head) {
      const newNeighborhood = {
        id: neighborhoods.length + 1,
        name,
        head,
        problems: 0,
        resolved: 0,
      }
      setNeighborhoods([...neighborhoods, newNeighborhood])
    }
  }

  const handleDeleteNeighborhood = (id: number) => {
    if (confirm("Mahallani o'chirishni tasdiqlaysizmi?")) {
      setNeighborhoods(neighborhoods.filter((n) => n.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Admin Paneli</h1>
              <Badge className="ml-4 bg-red-100 text-red-800">Administrator</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sozlamalar</Button>
              <Button variant="ghost">Chiqish</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrator paneli</h1>
          <p className="text-gray-600">Barcha mahallalar va muammolarni kuzatib boring</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Jami mahallalar</p>
                  <p className="text-2xl font-bold text-gray-900">{neighborhoods.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Jami muammolar</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProblems}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hal qilingan</p>
                  <p className="text-2xl font-bold text-gray-900">{totalResolved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hal qilish foizi</p>
                  <p className="text-2xl font-bold text-gray-900">{resolutionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="statistics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="statistics">Statistika</TabsTrigger>
            <TabsTrigger value="problems">Barcha muammolar</TabsTrigger>
            <TabsTrigger value="neighborhoods">Mahallalar</TabsTrigger>
            <TabsTrigger value="unsatisfied">Qoniqarsiz</TabsTrigger>
          </TabsList>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Oylik statistika</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="problems" fill="#3B82F6" name="Muammolar" />
                      <Bar dataKey="resolved" fill="#10B981" name="Hal qilingan" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Muammo turlari</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={problemTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {problemTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="problems" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Barcha muammolar ro'yxati</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Barcha muammolar ro'yxati bu yerda ko'rsatiladi</p>
                  <p className="text-sm">Jami {totalProblems} ta muammo mavjud</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="neighborhoods" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Mahallalar boshqaruvi</CardTitle>
                  <Button onClick={handleAddNeighborhood}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yangi mahalla
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {neighborhoods.map((neighborhood) => (
                    <div key={neighborhood.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{neighborhood.name}</h3>
                          <p className="text-gray-600 mb-2">Rahbar: {neighborhood.head}</p>
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <span>Muammolar: {neighborhood.problems}</span>
                            <span>Hal qilingan: {neighborhood.resolved}</span>
                            <span>
                              Foiz:{" "}
                              {neighborhood.problems > 0
                                ? Math.round((neighborhood.resolved / neighborhood.problems) * 100)
                                : 0}
                              %
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MapPin className="w-4 h-4 mr-1" />
                            Ko'rish
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteNeighborhood(neighborhood.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unsatisfied" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Qoniqarsiz fuqarolar (baho {"<"} 6)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unsatisfiedProblems.map((problem) => (
                    <div key={problem.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{problem.title}</h3>
                        <Badge variant="destructive">Baho: {problem.rating}/10</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Mahalla:</strong> {problem.neighborhood}
                        </p>
                        <p>
                          <strong>Fuqaro:</strong> {problem.citizen}
                        </p>
                        <p>
                          <strong>Sana:</strong> {problem.date}
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Batafsil ko'rish
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Mahallaga xabar yuborish
                        </Button>
                      </div>
                    </div>
                  ))}
                  {unsatisfiedProblems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                      <p>Qoniqarsiz fuqarolar yo'q</p>
                      <p className="text-sm">Barcha fuqarolar xizmat sifatidan mamnun</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
