import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, TrendingUp, Phone, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const recentProblems = [
    {
      id: 1,
      title: "Yo'l ta'miri kerak",
      description: "Asosiy yo'lda chuqurliklar paydo bo'lgan",
      location: "Chilonzor tumani, 5-mahalla",
      status: "Jarayonda",
      date: "2024-01-15",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Suv ta'minoti muammosi",
      description: "3 kundan beri suv kelmayapti",
      location: "Yunusobod tumani, 12-mahalla",
      status: "Hal qilindi",
      date: "2024-01-14",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Chiroq o'rnatish",
      description: "Ko'cha yoritilishi yetarli emas",
      location: "Mirzo Ulug'bek tumani, 8-mahalla",
      status: "Yangi",
      date: "2024-01-13",
      image: "/placeholder.svg?height=200&width=300",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">MahallaPlatform</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Kirish</Button>
              </Link>
              <Link href="/register">
                <Button>Ro'yxatdan o'tish</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Mahallangizni yaxshilashga yordam bering</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Muammolaringizni bildiring, hal qilish jarayonini kuzatib boring va mahallangizni rivojlantirishga hissa
            qo'shing
          </p>
          <Link href="/send-problem">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Muammo yuborish
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Problems */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">So'nggi muammolar</h2>
            <p className="text-lg text-gray-600">Mahallalarda hal qilinayotgan so'nggi muammolar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProblems.map((problem) => (
              <Card key={problem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={problem.image || "/placeholder.svg"} alt={problem.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    <Badge className={`${getStatusColor(problem.status)} text-white`}>{problem.status}</Badge>
                  </div>
                  <CardDescription>{problem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {problem.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {problem.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Info */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platforma haqida</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MahallaPlatform - bu fuqarolar va mahalla rahbariyati o'rtasidagi aloqani yaxshilash uchun yaratilgan
              zamonaviy platforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Oson foydalanish</h3>
              <p className="text-gray-600">Oddiy va tushunarli interfeys orqali muammolaringizni tez bildiring</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tez hal qilish</h3>
              <p className="text-gray-600">Muammolar tezkor ravishda tegishli organlarga yetkaziladi</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kuzatuv</h3>
              <p className="text-gray-600">Arizangizning holatini real vaqtda kuzatib boring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Davlat idoralari</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center hover:text-blue-400">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Toshkent shahar hokimligi
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center hover:text-blue-400">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Fuqarolik xizmatlari agentligi
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center hover:text-blue-400">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Mahalla qo'mitasi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Aloqa</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +998 71 123 45 67
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@mahallaplatform.uz
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Toshkent shahar, Chilonzor tumani
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Platforma</h3>
              <p className="text-gray-400">
                MahallaPlatform - fuqarolar va mahalla rahbariyati o'rtasidagi aloqani yaxshilash uchun yaratilgan
                platforma.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 MahallaPlatform. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
