"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import styles from "./RegisterPage.module.scss"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ism kiritish majburiy"
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Familiya kiritish majburiy"
    }
    
    if (!formData.email) {
      newErrors.email = "Email kiritish majburiy"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Iltimos, to'g'ri email kiriting"
    }
    
    if (!formData.phone) {
      newErrors.phone = "Telefon raqam kiritish majburiy"
    } else if (!/^\+?[0-9\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Iltimos, to'g'ri telefon raqam kiriting"
    }
    
    if (!formData.password) {
      newErrors.password = "Parol kiritish majburiy"
    } else if (formData.password.length < 6) {
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmadi"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would make an API call here
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // const data = await response.json()
      // if (!response.ok) throw new Error(data.message || 'Xatolik yuz berdi')
      
      // Redirect to login with success message
      router.push('/login?registered=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ro\'yxatdan o\'tishda xatolik yuz berdi')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerWrapper}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>
            MahallaPlatform
          </Link>
          <h2 className={styles.title}>Ro'yxatdan o'tish</h2>
          <p className={styles.subtitle}>
            Yangi hisob yarating yoki{" "}
            <Link href="/login" className={styles.link}>
              tizimga kiring
            </Link>
          </p>
        </div>

        <Card className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>Ro'yxatdan o'tish</CardTitle>
            <CardDescription className={styles.cardDescription}>
              Ma'lumotlaringizni to'ldiring
            </CardDescription>
          </CardHeader>
          
          <CardContent className={styles.cardContent}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <Label htmlFor="firstName" className={styles.label}>Ism</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Ismingiz"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.firstName ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.firstName && (
                    <span className={styles.errorText}>{errors.firstName}</span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <Label htmlFor="lastName" className={styles.label}>Familiya</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Familiyangiz"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.lastName ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <span className={styles.errorText}>{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="email" className={styles.label}>Email manzil</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="phone" className={styles.label}>Telefon raqam</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.phone ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <span className={styles.errorText}>{errors.phone}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="password" className={styles.label}>Parol</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Parol yarating"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className={styles.errorText}>{errors.password}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="confirmPassword" className={styles.label}>Parolni tasdiqlang</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Parolni qayta kiriting"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <span className={styles.errorText}>{errors.confirmPassword}</span>
                )}
              </div>

              <Button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Kutilmoqda...' : "Ro'yxatdan o'tish"}
              </Button>
            </form>

            <div className={styles.footer}>
              <Link href="/login" className={styles.link}>
                Hisobingiz bormi? Tizimga kiring
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
