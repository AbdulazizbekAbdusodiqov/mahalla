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
import styles from "./MyProblemsPage.module.scss"

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
    <div className={styles.root}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.flexBetween}>
            <Link href="/" className={styles.logo}>
              MahallaPlatform
            </Link>
            <div className={styles.flexItems}>
              <Link href="/send-problem">
                <Button variant="outline">Yangi ariza</Button>
              </Link>
              <Button variant="ghost">Chiqish</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.mb8}>
          <h1 className={`${styles.title}`}>Mening arizalarim</h1>
          <p className={styles.subtitle}>Yuborgan arizalaringiz va ularning holati</p>
        </div>

        {/* Filters */}
        <Card className={styles.mb6}>
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
                    <SelectItem value="Jarayonda">Jarayonda</SelectItem>
                    <SelectItem value="Hal qilindi">Hal qilindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className={styles.gridProblems}>
          {filteredProblems.map((problem) => (
            <Card key={problem.id} className={styles.cardShadow}>
              <div className={styles.aspectVideo}>
                <Image src={problem.image || "/placeholder.svg"} alt={problem.title} fill className={styles.objectCover} />
              </div>
              <CardHeader>
                <div className={styles.flexBetween + " " + styles.mb2}>
                  <CardTitle className={styles.textLg}>{problem.title}</CardTitle>
                  <Badge className={`${styles.statusBadge} ${problem.status === "Hal qilindi" ? styles.statusGreen : problem.status === "Jarayonda" ? styles.statusYellow : problem.status === "Yangi" ? styles.statusBlue : styles.statusGray}`}>{problem.status}</Badge>
                </div>
                <p className={`${styles.textGray600} ${styles.textSm}`}>{problem.description}</p>
              </CardHeader>
              <CardContent>
                <div className={styles.spaceY2 + " " + styles.mb4}>
                  <div className={`${styles.flexItems} ${styles.textSm} ${styles.textGray500}`}>
                    <MapPin className={styles.iconSm} />
                    {problem.location}
                  </div>
                  <div className={`${styles.flexItems} ${styles.textSm} ${styles.textGray500}`}>
                    <Clock className={styles.iconSm} />
                    {problem.date}
                  </div>
                </div>

                {problem.status === "Hal qilindi" && (
                  <div className={styles.borderT + " " + styles.pt4}>
                    {problem.rating ? (
                      <div className={`${styles.flexItems} ${styles.textSm} ${styles.textGray600}`}>
                        <Star className={styles.iconStar} />
                        Bahoingiz: {problem.rating}/10
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleRating(problem.id)} className={styles.wFull}>
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
            <CardContent className={`${styles.textCenter} ${styles.py12}`}>
              <p className={`${styles.textGray500} ${styles.textLg}`}>Hech qanday ariza topilmadi</p>
              <Link href="/send-problem">
                <Button className={styles.mt4}>Birinchi arizangizni yuboring</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
