"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  CheckCircle2,
  TrendingUp, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Star, 
  User,
  MessageSquare
} from "lucide-react"
import styles from "./AdminPage.module.scss"

// Type definitions
interface Neighborhood {
  id: number
  name: string
  head: string
  problems: number
  resolved: number
}

interface StatsData {
  month: string;
  problems: number;
  resolved: number;
}

interface ProblemType {
  name: string;
  value: number;
  color: string;
}

interface UnsatisfiedProblem {
  id: number;
  title: string;
  neighborhood: string;
  rating: number;
  citizen: string;
  date: string;
}

export default function AdminPanel() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("statistics")
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([
    { id: 1, name: "Chilonzor 1-mahalla", head: "Alisher Karimov", problems: 15, resolved: 12 },
    { id: 2, name: "Chilonzor 2-mahalla", head: "Nodira Tosheva", problems: 8, resolved: 6 },
    { id: 3, name: "Yunusobod 1-mahalla", head: "Bobur Rahimov", problems: 22, resolved: 18 },
    { id: 4, name: "Mirzo Ulug'bek 1-mahalla", head: "Malika Nazarova", problems: 12, resolved: 10 },
  ])

  const statsData: StatsData[] = [
    { month: "Yan", problems: 45, resolved: 38 },
    { month: "Fev", problems: 52, resolved: 44 },
    { month: "Mar", problems: 38, resolved: 35 },
    { month: "Apr", problems: 61, resolved: 52 },
    { month: "May", problems: 55, resolved: 48 },
    { month: "Iyun", problems: 48, resolved: 42 },
  ]

  const problemTypes: ProblemType[] = [
    { name: "Yo'l ta'miri", value: 35, color: "#3B82F6" },
    { name: "Suv ta'minoti", value: 25, color: "#10B981" },
    { name: "Elektr ta'minoti", value: 20, color: "#F59E0B" },
    { name: "Tozalash", value: 15, color: "#EF4444" },
    { name: "Boshqa", value: 5, color: "#8B5CF6" },
  ]

  const unsatisfiedProblems: UnsatisfiedProblem[] = [
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
  const resolutionRate = Math.round((totalResolved / Math.max(totalProblems, 1)) * 100) // Avoid division by zero

  const handleAddNeighborhood = () => {
    const name = prompt("Yangi mahalla nomini kiriting:")
    const head = prompt("Mahalla raisi ismini kiriting:")
    if (name && head) {
      const newNeighborhood: Neighborhood = {
        id: neighborhoods.length > 0 ? Math.max(...neighborhoods.map(n => n.id)) + 1 : 1,
        name,
        head,
        problems: 0,
        resolved: 0,
      }
      setNeighborhoods([...neighborhoods, newNeighborhood])
    }
  }

  const handleDeleteNeighborhood = (id: number) => {
    const neighborhood = neighborhoods.find(n => n.id === id)
    if (neighborhood && confirm(`'${neighborhood.name}' mahallasini o'chirishni tasdiqlaysizmi?`)) {
      setNeighborhoods(neighborhoods.filter((n) => n.id !== id))
    }
  }

  const handleLogout = () => {
    // In a real app, you would clear the auth token here
    router.push('/login')
  }

  // Helper function to determine progress bar color based on completion percentage
  const getProgressColor = (resolved: number, total: number) => {
    if (total === 0) return 'bg-gray-200';
    const percentage = (resolved / total) * 100;
    if (percentage < 30) return 'bg-red-400';
    if (percentage < 70) return 'bg-yellow-400';
    return 'bg-green-400';
  }

  return (
    <div className={styles.adminContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>
              <MapPin />
              <span>Admin Paneli</span>
            </h1>
            <Badge variant="destructive" className={styles.badge}>
              Administrator
            </Badge>
          </div>
          <div className={styles.navActions}>
            <Button variant="outline" size="sm" className={`${styles.button} outline`}>
              <Settings className={styles.icon} />
              Sozlamalar
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${styles.button} ghost`}
              onClick={handleLogout}
            >
              <LogOut className={styles.icon} />
              Chiqish
            </Button>
          </div>
        </div>
      </nav>

      <div className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Administrator paneli</h1>
          <p className={styles.subtitle}>Barcha mahallalar va muammolarni kuzatib boring</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.statContainer}>
                <div className={`${styles.iconContainer} blue`}>
                  <Users className={styles.iconSmall} />
                </div>
                <div className={styles.statInfo}>
                  <p className={styles.statLabel}>Jami mahallalar</p>
                  <p className={styles.statValue}>{neighborhoods.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.statContainer}>
                <div className={`${styles.iconContainer} yellow`}>
                  <AlertTriangle className={styles.iconSmall} />
                </div>
                <div className={styles.statInfo}>
                  <p className={styles.statLabel}>Jami muammolar</p>
                  <p className={styles.statValue}>{totalProblems}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.statContainer}>
                <div className={`${styles.iconContainer} green`}>
                  <CheckCircle className={styles.iconSmall} />
                </div>
                <div className={styles.statInfo}>
                  <p className={styles.statLabel}>Hal qilingan</p>
                  <p className={styles.statValue}>{totalResolved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.statContainer}>
                <div className={`${styles.iconContainer} purple`}>
                  <TrendingUp className={styles.iconSmall} />
                </div>
                <div className={styles.statInfo}>
                  <p className={styles.statLabel}>Hal qilish foizi</p>
                  <p className={styles.statValue}>{resolutionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className={styles.tabsContainer}
        >
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="statistics" className={styles.tabTrigger}>
              Statistika
            </TabsTrigger>
            <TabsTrigger value="problems" className={styles.tabTrigger}>
              Barcha muammolar
            </TabsTrigger>
            <TabsTrigger value="neighborhoods" className={styles.tabTrigger}>
              Mahallalar
            </TabsTrigger>
            <TabsTrigger value="unsatisfied" className={styles.tabTrigger}>
              Qoniqarsiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="statistics" className={styles.tabContent}>
            <div className={styles.statsGrid}>
              <Card className={styles.chartCard}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle>Muammolar statistikasi</CardTitle>
                  <CardDescription>Oylik muammolar va ularning hal qilinish ko'rsatkichlari</CardDescription>
                </CardHeader>
                <CardContent className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statsData}>
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                        axisLine={{ stroke: 'var(--border)' }}
                        tickLine={{ stroke: 'var(--border)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                        axisLine={{ stroke: 'var(--border)' }}
                        tickLine={{ stroke: 'var(--border)' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          borderRadius: 'var(--radius)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="problems" name="Muammolar" fill="var(--primary)" radius={[4, 4, 0, 0]}
                        activeBar={{ fill: 'var(--primary-hover)' }} />
                      <Bar dataKey="resolved" name="Hal qilingan" fill="var(--success)" radius={[4, 4, 0, 0]}
                        activeBar={{ fill: 'var(--success-hover)' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={styles.chartCard}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle>Muammolar turlari bo'yicha</CardTitle>
                  <CardDescription>Muammolarning turlari bo'yicha taqsimoti</CardDescription>
                </CardHeader>
                <CardContent className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={problemTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {problemTypes.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke="var(--background)"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} ta`, 'Soni']}
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          borderRadius: 'var(--radius)'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="problems" className={styles.tabContent}>
            <Card className={styles.card}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle>Barcha muammolar ro'yxati</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.emptyState}>
                  <AlertTriangle className={styles.emptyIcon} />
                  <p>Barcha muammolar ro'yxati bu yerda ko'rsatiladi</p>
                  <p className={styles.emptyDescription}>Jami {totalProblems} ta muammo mavjud</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="neighborhoods" className={styles.tabContent}>
            <Card className={styles.card}>
              <CardHeader className={styles.cardHeader}>
                <div>
                  <CardTitle>Mahallalar ro'yxati</CardTitle>
                  <CardDescription>Barcha mahallalar va ular statistikasi</CardDescription>
                </div>
                <Button 
                  onClick={handleAddNeighborhood}
                  className={styles.addButton}
                >
                  <Plus className={styles.iconXSmall} /> 
                  <span>Yangi mahalla</span>
                </Button>
              </CardHeader>
              <CardContent className={styles.tableContainer}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={styles.tableHead}>#</TableHead>
                      <TableHead className={styles.tableHead}>Nomi</TableHead>
                      <TableHead className={styles.tableHead}>Rais</TableHead>
                      <TableHead className={styles.tableHead}>Muammolar</TableHead>
                      <TableHead className={styles.tableHead}>Hal qilingan</TableHead>
                      <TableHead className={styles.tableHead}>Foiz</TableHead>
                      <TableHead className={`${styles.tableHead} text-right`}>Harakatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {neighborhoods.length > 0 ? (
                      neighborhoods.map((neighborhood, index) => (
                        <TableRow key={neighborhood.id} className={styles.tableRow}>
                          <TableCell className={styles.tableCell}>{index + 1}</TableCell>
                          <TableCell className={`${styles.tableCell} font-medium`}>
                            {neighborhood.name}
                          </TableCell>
                          <TableCell className={styles.tableCell}>{neighborhood.head}</TableCell>
                          <TableCell className={styles.tableCell}>
                            <Badge variant="outline">{neighborhood.problems}</Badge>
                          </TableCell>
                          <TableCell className={styles.tableCell}>
                            <Badge variant="outline" className={styles.badgeSuccess}>
                              {neighborhood.resolved}
                            </Badge>
                          </TableCell>
                          <TableCell className={styles.tableCell}>
                            <div className={styles.progressContainer}>
                              <div 
                                className={`${styles.progressBar} ${getProgressColor(neighborhood.resolved, neighborhood.problems)}`}
                                style={{
                                  width: `${Math.round((neighborhood.resolved / (neighborhood.problems || 1)) * 100)}%`,
                                  backgroundColor: getProgressColor(neighborhood.resolved, neighborhood.problems)
                                }}
                              >
                                {Math.round((neighborhood.resolved / (neighborhood.problems || 1)) * 100)}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className={`${styles.tableCell} ${styles.actionsCell}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`${styles.button} ${styles.deleteButton}`}
                              onClick={() => handleDeleteNeighborhood(neighborhood.id)}
                            >
                              <Trash2 className={styles.icon} />
                              <span className={styles.srOnly}>O'chirish</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className={styles.textCenter}>
                          Hech qanday mahalla topilmadi
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unsatisfied" className={styles.tabContent}>
            <Card className={styles.card}>
              <CardHeader className={styles.cardHeader}>
                <div>
                  <CardTitle>Qoniqarsiz baholangan muammolar</CardTitle>
                  <CardDescription>
                    Aholi tomonidan past baholangan yoki qayta yuzaga kelgan muammolar
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className={styles.spaceY4}>
                  {unsatisfiedProblems.length > 0 ? (
                    unsatisfiedProblems.map((problem) => (
                      <div key={problem.id} className={styles.problemCard}>
                        <div className={styles.problemHeader}>
                          <h3 className={styles.problemTitle}>{problem.title}</h3>
                          <Badge variant="destructive" className={styles.ratingBadge}>
                            Baho: {problem.rating}/10
                          </Badge>
                        </div>
                        <div className={styles.problemDetails}>
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
                        <div className={styles.problemActions}>
                          <Button size="sm" variant="outline" className={styles.button}>
                            Batafsil ko'rish
                          </Button>
                          <Button size="sm" className={`${styles.button} ${styles.primaryButton}`}>
                            Mahallaga xabar yuborish
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      <CheckCircle className={styles.successIcon} />
                      <p>Qoniqarsiz baholangan muammolar mavjud emas</p>
                      <p className={styles.emptyDescription}>Barcha muammolar qoniqarli darajada hal qilingan</p>
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
