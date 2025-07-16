"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import styles from "./LoginPage.module.scss"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!email || !password || !role) {
      setError("Iltimos, barcha maydonlarni to'ldiring")
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would make an API call here
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, role })
      // })
      // const data = await response.json()
      // if (!response.ok) throw new Error(data.message || 'Xatolik yuz berdi')
      
      // For demo purposes, just redirect based on role
      switch (role) {
        case "admin":
          router.push("/admin")
          break
        case "mahalla":
          router.push("/mahalla")
          break
        case "citizen":
        default:
          router.push("/")
          break
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            MahallaPlatform
          </Link>
          <h2 className={styles.title}>Tizimga kirish</h2>
          <p className={styles.subtitle}>
            Hisobingizga kiring yoki{" "}
            <Link href="/register" className={styles.link}>
              ro'yxatdan o'ting
            </Link>
          </p>
        </div>

        <Card className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>Kirish</CardTitle>
            <CardDescription className={styles.cardDescription}>
              Email va parolingizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.cardContent}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <Label htmlFor="email" className={styles.label}>Email manzil</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="password" className={styles.label}>Parol</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Parolingizni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="role" className={styles.label}>Rol</Label>
                <Select 
                  value={role} 
                  onValueChange={setRole} 
                  required
                  disabled={isLoading}
                >
                  <SelectTrigger className={styles.input}>
                    <SelectValue placeholder="Rolingizni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Fuqaro</SelectItem>
                    <SelectItem value="mahalla">Mahalla raisi</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Kiritilmoqda...' : 'Kirish'}
              </Button>
            </form>

            <div className={styles.footer}>
              <Link href="/register" className={styles.link}>
                Hisobingiz yo'qmi? Ro'yxatdan o'ting
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
