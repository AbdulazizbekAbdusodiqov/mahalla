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
import styles from "./MahallaPage.module.scss"

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
    <div className={styles.root}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.flexBetween}>
            <div className={styles.flexItems}>
              <h1 className={styles.logo}>Mahalla Paneli</h1>
              <Badge className={styles.badgeBlue}>Chilonzor 5-mahalla</Badge>
            </div>
            <div className={styles.flexItems}>
              <Button variant="outline">Statistika</Button>
              <Button variant="ghost">Chiqish</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.mb8}>
          <h1 className={styles.title}>Mahalla boshqaruv paneli</h1>
          <p className={styles.subtitle}>Kelib tushgan arizalarni ko'rib chiqing va boshqaring</p>
        </div>

        <Tabs defaultValue="new" className={styles.tabsSpaceY6}>
          <TabsList className={styles.tabsListGrid}>
            <TabsTrigger value="new">Yangi arizalar ({newProblems.length})</TabsTrigger>
            <TabsTrigger value="accepted">Qabul qilingan ({acceptedProblems.length})</TabsTrigger>
            <TabsTrigger value="all">Barcha arizalar ({problems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className={styles.tabsSpaceY6}>
            <Card>
              <CardHeader>
                <CardTitle>Yangi kelib tushgan arizalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.spaceY2}>
                  {newProblems.map((problem) => (
                    <div key={problem.id} className={`${styles.border} ${styles.rounded} ${styles.p4} ${styles.cardShadow}`}>
                      <div className={styles.flexItems + " gap-4"}>
                        <div className="w-24 h-24 relative flex-shrink-0">
                          <Image
                            src={problem.image || "/placeholder.svg"}
                            alt={problem.title}
                            fill
                            className={`${styles.objectCover} ${styles.rounded}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className={styles.flexBetween + " " + styles.mb2}>
                            <h3 className={styles.fontSemibold + " " + styles.textLg}>{problem.title}</h3>
                            <Badge className={`${styles.statusBadge} ${problem.status === "Hal qilindi" ? styles.statusGreen : problem.status === "Jarayonda" ? styles.statusYellow : problem.status === "Yangi" ? styles.statusBlue : styles.statusGray}`}>{problem.status}</Badge>
                          </div>
                          <p className={styles.textGray600 + " " + styles.mb2}>{problem.description}</p>
                          <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500 + " " + styles.mb2}>
                            <MapPin className={styles.iconSm} />
                            {problem.location}
                          </div>
                          <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500 + " " + styles.mb2}>
                            <Clock className={styles.iconSm} />
                            {problem.date}
                          </div>
                          <div className={styles.textSm + " " + styles.textGray600 + " " + styles.mb4}>
                            <strong>Fuqaro:</strong> {problem.citizen} ({problem.phone})
                          </div>
                          <div className={styles.flexItems + " space-x-2"}>
                            <Button
                              size="sm"
                              onClick={() => handleAccept(problem.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className={styles.iconSm} />
                              Qabul qilish
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(problem.id)}>
                              <XCircle className={styles.iconSm} />
                              Rad etish
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className={styles.iconSm} />
                              Batafsil
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {newProblems.length === 0 && (
                    <div className={styles.textCenter + " " + styles.py8 + " " + styles.textGray500}>Yangi arizalar yo'q</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accepted" className={styles.tabsSpaceY6}>
            <Card>
              <CardHeader>
                <CardTitle>Qabul qilingan arizalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.gridProblems}>
                  {acceptedProblems.map((problem) => (
                    <Card key={problem.id} className={styles.cardShadow}>
                      <div className={styles.aspectVideo}>
                        <Image
                          src={problem.image || "/placeholder.svg"}
                          alt={problem.title}
                          fill
                          className={styles.objectCover}
                        />
                      </div>
                      <CardHeader>
                        <div className={styles.flexBetween + " " + styles.mb2}>
                          <CardTitle className={styles.textLg}>{problem.title}</CardTitle>
                          <Badge className={`${styles.statusBadge} ${problem.status === "Hal qilindi" ? styles.statusGreen : problem.status === "Jarayonda" ? styles.statusYellow : problem.status === "Yangi" ? styles.statusBlue : styles.statusGray}`}>{problem.status}</Badge>
                        </div>
                        <p className={styles.textGray600 + " " + styles.textSm}>{problem.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className={styles.spaceY2 + " " + styles.mb4}>
                          <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500}>
                            <MapPin className={styles.iconSm} />
                            {problem.location}
                          </div>
                          <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500}>
                            <Clock className={styles.iconSm} />
                            {problem.date}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className={styles.wFull + " bg-transparent"}>
                          Holat yangilash
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className={styles.tabsSpaceY6}>
            {/* Filters */}
            <Card>
              <CardContent className={styles.pt6}>
                <div className={styles.flexColSmRowGap4}>
                  <div className={styles.flex1}>
                    <div className={styles.relative}>
                      <Search className={styles.iconSm} />
                      <Input
                        placeholder="Arizalarni qidirish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.pl10}
                      />
                    </div>
                  </div>
                  <div className={styles.smW48}>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <Filter className={styles.iconSm} />
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

            <div className={styles.gridProblems}>
              {problems.map((problem) => (
                <Card key={problem.id} className={styles.cardShadow}>
                  <div className={styles.aspectVideo}>
                    <Image
                      src={problem.image || "/placeholder.svg"}
                      alt={problem.title}
                      fill
                      className={styles.objectCover}
                    />
                  </div>
                  <CardHeader>
                    <div className={styles.flexBetween + " " + styles.mb2}>
                      <CardTitle className={styles.textLg}>{problem.title}</CardTitle>
                      <Badge className={`${styles.statusBadge} ${problem.status === "Hal qilindi" ? styles.statusGreen : problem.status === "Jarayonda" ? styles.statusYellow : problem.status === "Yangi" ? styles.statusBlue : styles.statusGray}`}>{problem.status}</Badge>
                    </div>
                    <p className={styles.textGray600 + " " + styles.textSm}>{problem.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className={styles.spaceY2 + " " + styles.mb4}>
                      <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500}>
                        <MapPin className={styles.iconSm} />
                        {problem.location}
                      </div>
                      <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500}>
                        <Clock className={styles.iconSm} />
                        {problem.date}
                      </div>
                    </div>
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
