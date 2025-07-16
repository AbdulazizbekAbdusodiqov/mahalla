"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, MapPin, Camera } from "lucide-react"
import Link from "next/link"
import styles from "./SendProblemPage.module.scss"
import path from 'path';

export default function SendProblemPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [location, setLocation] = useState("")

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
        },
        (error) => {
          console.error("Lokatsiya olishda xatolik:", error)
          alert("Lokatsiyani olishda xatolik yuz berdi")
        },
      )
    } else {
      alert("Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    alert("Ariza muvaffaqiyatli yuborildi!")
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
              <Link href="/my-problems">
                <Button variant="outline">Mening arizalarim</Button>
              </Link>
              <Button variant="ghost">Chiqish</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.mb8}>
          <h1 className={styles.title}>Muammo yuborish</h1>
          <p className={styles.subtitle}>Mahallangizda mavjud muammoni bildiring</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ariza ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className={styles.spaceY6}>
              <div className={styles.gridCols2}>
                {/* Left Column */}
                <div className={styles.spaceY6}>
                  <div>
                    <Label htmlFor="title">Muammo sarlavhasi *</Label>
                    <Input id="title" placeholder="Muammo sarlavhasini kiriting" required className={styles.mt1} />
                  </div>

                  <div>
                    <Label htmlFor="description">Muammo haqida tavsif *</Label>
                    <Textarea
                      id="description"
                      placeholder="Muammo haqida batafsil ma'lumot bering"
                      rows={4}
                      required
                      className={styles.mt1}
                    />
                  </div>

                  <div>
                    <Label htmlFor="neighborhood">Mahalla tanlash *</Label>
                    <Select required>
                      <SelectTrigger className={styles.mt1}>
                        <SelectValue placeholder="Mahallani tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chilonzor-1">Chilonzor 1-mahalla</SelectItem>
                        <SelectItem value="chilonzor-2">Chilonzor 2-mahalla</SelectItem>
                        <SelectItem value="yunusobod-1">Yunusobod 1-mahalla</SelectItem>
                        <SelectItem value="yunusobod-2">Yunusobod 2-mahalla</SelectItem>
                        <SelectItem value="mirzo-ulugbek-1">Mirzo Ulug'bek 1-mahalla</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className={styles.spaceY6}>
                  <div>
                    <Label>Rasm yuklash</Label>
                    <div
                      className={`${styles.mt1} ${styles.borderDashed} ${styles.roundedLg} ${styles.p6} ${styles.textCenter} ${styles.transitionColors} ${dragActive ? styles.borderBlue : styles.borderGray}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Camera className={`${styles.w12} ${styles.textGray400} ${styles.mxAuto} ${styles.mb4}`} />
                      <p className={`${styles.textGray600} ${styles.mb2}`}>Rasmlarni bu yerga sudrab olib keling yoki</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className={styles.hidden}
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button type="button" variant="outline" className={`${styles.cursorPointer} ${styles.bgTransparent}`}>
                          <Upload className={`${styles.w4} ${styles.mr2}`} />
                          Fayl tanlash
                        </Button>
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className={`${styles.mt4} ${styles.spaceY2}`}>
                        {files.map((file, index) => (
                          <div key={index} className={`${styles.flexItems} ${styles.justifyBetween} ${styles.bgGray50} ${styles.p2} ${styles.rounded}`}>
                            <span className={`${styles.textSm} ${styles.textGray600}`}>{file.name}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              O'chirish
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Lokatsiya</Label>
                    <div className={`${styles.mt1} ${styles.flexItems} ${styles.spaceX2}`}>
                      <Input
                        id="location"
                        placeholder="Lokatsiya koordinatalari"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.flex1}
                      />
                      <Button type="button" variant="outline" onClick={getCurrentLocation}>
                        <MapPin className={styles.w4} />
                      </Button>
                    </div>
                    <p className={`${styles.textSm} ${styles.textGray500} ${styles.mt1}`}>GPS tugmasini bosib joriy lokatsiyangizni aniqlang</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.flexEnd} ${styles.spaceX4} ${styles.pt6} ${styles.borderT}`}>
                <Link href="/">
                  <Button type="button" variant="outline">
                    Bekor qilish
                  </Button>
                </Link>
                <Button type="submit" className={styles.bgBlue600}>
                  Ariza yuborish
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
