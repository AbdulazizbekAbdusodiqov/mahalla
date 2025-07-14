"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple role-based redirect logic
    switch (role) {
      case "admin":
        window.location.href = "/admin"
        break
      case "mahalla":
        window.location.href = "/mahalla"
        break
      case "citizen":
      default:
        window.location.href = "/"
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            MahallaPlatform
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Tizimga kirish</h2>
          <p className="mt-2 text-sm text-gray-600">
            Hisobingizga kiring yoki{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              ro'yxatdan o'ting
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kirish</CardTitle>
            <CardDescription>Email va parolingizni kiriting</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email manzil</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Parolingizni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="role">Rol</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Rolingizni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Fuqaro</SelectItem>
                    <SelectItem value="mahalla">Mahalla raisi</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Kirish
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/register" className="text-sm text-blue-600 hover:text-blue-500">
                Hisobingiz yo'qmi? Ro'yxatdan o'ting
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
