import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, TrendingUp, Phone, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import styles from "./HomePage.module.scss"

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
    <div className={styles.root}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.flexBetween}>
            <div className={styles.flexItems}>
              <div className={styles.flexShrink0}>
                <h1 className={styles.logo}>MahallaPlatform</h1>
              </div>
            </div>
            <div className={styles.flexItems}>
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
      <section className={styles.hero}>
        <div className={styles.container + " " + styles.textCenter}>
          <h1 className={styles.heroTitle}>Mahallangizni yaxshilashga yordam bering</h1>
          <p className={styles.heroDesc}>
            Muammolaringizni bildiring, hal qilish jarayonini kuzatib boring va mahallangizni rivojlantirishga hissa
            qo'shing
          </p>
          <Link href="/send-problem">
            <Button size="lg" className={styles.heroBtn}>
              Muammo yuborish
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Problems */}
      <section className={styles.sectionGray}>
        <div className={styles.container}>
          <div className={styles.textCenter + " " + styles.mb8}>
            <h2 className={styles.sectionTitle}>So'nggi muammolar</h2>
            <p className={styles.sectionDesc}>Mahallalarda hal qilinayotgan so'nggi muammolar</p>
          </div>

          <div className={styles.grid3}>
            {recentProblems.map((problem) => (
              <Card key={problem.id} className={styles.cardShadow}>
                <div className={styles.aspectVideo}>
                  <Image src={problem.image || "/placeholder.svg"} alt={problem.title} fill className={styles.objectCover} />
                </div>
                <CardHeader>
                  <div className={styles.flexBetween + " " + styles.mb2}>
                    <CardTitle className={styles.textLg}>{problem.title}</CardTitle>
                    <Badge className={`${styles.statusBadge} ${problem.status === "Hal qilindi" ? styles.statusGreen : problem.status === "Jarayonda" ? styles.statusYellow : problem.status === "Yangi" ? styles.statusBlue : styles.statusGray}`}>{problem.status}</Badge>
                  </div>
                  <CardDescription>{problem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500 + " " + styles.mb2}>
                    <MapPin className={styles.iconSm} />
                    {problem.location}
                  </div>
                  <div className={styles.flexItems + " " + styles.textSm + " " + styles.textGray500}>
                    <Clock className={styles.iconSm} />
                    {problem.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Info */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.textCenter + " " + styles.mb8}>
            <h2 className={styles.sectionTitle}>Platforma haqida</h2>
            <p className={styles.sectionDesc + " " + styles.mxAuto}>
              MahallaPlatform - bu fuqarolar va mahalla rahbariyati o'rtasidagi aloqani yaxshilash uchun yaratilgan
              zamonaviy platforma
            </p>
          </div>

          <div className={styles.grid3}>
            <div className={styles.textCenter}>
              <div className={styles.bgBlue100 + " " + styles.iconLg + " " + styles.roundedFull + " " + styles.flexItems + " " + styles.justifyCenter + " " + styles.mxAuto + " " + styles.mb4}>
                <Users className={styles.iconMd + " " + styles.textBlue600} />
              </div>
              <h3 className={styles.textLg + " " + styles.fontSemibold + " " + styles.mb2}>Oson foydalanish</h3>
              <p className={styles.textGray600}>Oddiy va tushunarli interfeys orqali muammolaringizni tez bildiring</p>
            </div>

            <div className={styles.textCenter}>
              <div className={styles.bgGreen100 + " " + styles.iconLg + " " + styles.roundedFull + " " + styles.flexItems + " " + styles.justifyCenter + " " + styles.mxAuto + " " + styles.mb4}>
                <TrendingUp className={styles.iconMd + " " + styles.textGreen600} />
              </div>
              <h3 className={styles.textLg + " " + styles.fontSemibold + " " + styles.mb2}>Tez hal qilish</h3>
              <p className={styles.textGray600}>Muammolar tezkor ravishda tegishli organlarga yetkaziladi</p>
            </div>

            <div className={styles.textCenter}>
              <div className={styles.bgPurple100 + " " + styles.iconLg + " " + styles.roundedFull + " " + styles.flexItems + " " + styles.justifyCenter + " " + styles.mxAuto + " " + styles.mb4}>
                <MapPin className={styles.iconMd + " " + styles.textPurple600} />
              </div>
              <h3 className={styles.textLg + " " + styles.fontSemibold + " " + styles.mb2}>Kuzatuv</h3>
              <p className={styles.textGray600}>Arizangizning holatini real vaqtda kuzatib boring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid3}>
            <div>
              <h3 className={styles.footerTitle}>Davlat idoralari</h3>
              <ul className={styles.spaceY2}>
                <li>
                  <a href="#" className={styles.footerLink + " " + styles.flexItems + " " + styles.hoverTextBlue400}>
                    <ExternalLink className={styles.iconSm + " " + styles.mr2} />
                    Toshkent shahar hokimligi
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink + " " + styles.flexItems + " " + styles.hoverTextBlue400}>
                    <ExternalLink className={styles.iconSm + " " + styles.mr2} />
                    Fuqarolik xizmatlari agentligi
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink + " " + styles.flexItems + " " + styles.hoverTextBlue400}>
                    <ExternalLink className={styles.iconSm + " " + styles.mr2} />
                    Mahalla qo'mitasi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={styles.footerTitle}>Aloqa</h3>
              <ul className={styles.spaceY2}>
                <li className={styles.flexItems}>
                  <Phone className={styles.iconSm + " " + styles.mr2} />
                  +998 71 123 45 67
                </li>
                <li className={styles.flexItems}>
                  <Mail className={styles.iconSm + " " + styles.mr2} />
                  info@mahallaplatform.uz
                </li>
                <li className={styles.flexItems}>
                  <MapPin className={styles.iconSm + " " + styles.mr2} />
                  Toshkent shahar, Chilonzor tumani
                </li>
              </ul>
            </div>

            <div>
              <h3 className={styles.footerTitle}>Platforma</h3>
              <p className={styles.footerDesc}>
                MahallaPlatform - fuqarolar va mahalla rahbariyati o'rtasidagi aloqani yaxshilash uchun yaratilgan
                platforma.
              </p>
            </div>
          </div>

          <div className={styles.footerBorder}>
            <p>© 2024 MahallaPlatform. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
