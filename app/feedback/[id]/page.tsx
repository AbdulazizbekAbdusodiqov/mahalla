"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Star, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import styles from "./FeedbackPage.module.scss"

export default function FeedbackPage() {
  const params = useParams()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const starsRef = useRef<Array<HTMLButtonElement | null>>([])
  const formRef = useRef<HTMLFormElement>(null)
  const successMessageRef = useRef<HTMLDivElement>(null)

  const validateForm = (): boolean => {
    if (rating === 0) {
      setError("Iltimos, baho bering")
      return false
    }
    setError(null)
    return true
  }

  // Auto-focus first star on mount and handle ESC key
  useEffect(() => {
    const firstStar = starsRef.current[0]
    if (firstStar) {
      firstStar.focus()
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.history.back()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    // Cleanup function to avoid memory leaks
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      starsRef.current = []
    }
  }, [])

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
    // Clear error when user selects a rating
    if (newRating > 0 && error) {
      setError(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const nextStar = starsRef.current[index + 1]
    const prevStar = starsRef.current[index - 1]
    const firstStar = starsRef.current[0]
    const lastStar = starsRef.current[9]
    
    switch (e.key) {
      case 'ArrowRight':
        if (index < 9) {
          e.preventDefault()
          nextStar?.focus()
        }
        break
      case 'ArrowLeft':
        if (index > 0) {
          e.preventDefault()
          prevStar?.focus()
        }
        break
      case 'Home':
        e.preventDefault()
        firstStar?.focus()
        break
      case 'End':
        e.preventDefault()
        lastStar?.focus()
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleRatingChange(index + 1)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Submit feedback logic here
      // await api.submitFeedback({ 
      //   problemId: params.id, 
      //   rating, 
      //   comment 
      // })
      
      setIsSubmitted(true)
      
      // Show success message for 2 seconds before redirecting
      setTimeout(() => {
        window.location.href = "/my-problems"
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setError("Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle form close
  const handleClose = () => {
    if (!isSubmitting) {
      window.history.back()
    }
  }

  return (
    <div className={styles.feedbackContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            MahallaPlatform
          </Link>
          <div className={styles.navActions}>
            <Link href="/my-problems">
              <Button variant="outline">Mening arizalarim</Button>
            </Link>
            <Button variant="ghost">Chiqish</Button>
          </div>
        </div>
      </nav>

      <div className={styles.header}>
        <h1 className={styles.title}>Fikr-mulohaza bildirish</h1>
        <p className={styles.subtitle}>Muammoni hal qilish sifatini baholang</p>
      </div>

      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Hal qilish sifatini baholang</CardTitle>
          <button 
            type="button" 
            className={styles.closeButton}
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Yopish"
          >
            &times;
          </button>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.ratingContainer}>
              <label className={styles.ratingLabel}>
                Muammoni hal qilish sifatini 1 dan 10 gacha baholang
              </label>
              <div className={styles.starsContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <button
                    ref={(el) => {
                      if (el) {
                        starsRef.current[star - 1] = el
                      }
                    }}
                    type="button"
                    className={`${styles.starButton} ${
                      star <= (hoveredRating || rating) ? styles.starActive : styles.starInactive
                    }`}
                    onClick={() => handleRatingChange(star)}
                    onKeyDown={(e) => handleKeyDown(e, star - 1)}
                    onFocus={() => setHoveredRating(star)}
                    onBlur={() => setHoveredRating(0)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={isSubmitting || isSubmitted}
                    aria-label={`${star} yulduz`}
                    aria-pressed={star <= rating}
                  >
                    <Star className={styles.starIcon} />
                  </button>
                ))}
                <span className={styles.ratingText}>
                  {rating > 0 ? `${rating}/10` : "Baho bermagan"}
                </span>
              </div>
            </div>

            <div className={styles.textareaGroup}>
              <label htmlFor="comment" className={styles.label}>
                Qo'shimcha fikr-mulohaza (ixtiyoriy)
              </label>
              <Textarea
                id="comment"
                className={styles.textarea}
                placeholder="Hal qilish jarayoni haqida fikringizni bildiring..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting || isSubmitted}
              />
            </div>

            <div className={styles.infoBox}>
              <h3 className={styles.infoTitle}>Baholash mezonlari:</h3>
              <ul className={styles.infoList}>
                <li>• 1-3: Juda yomon (muammo hal qilinmagan)</li>
                <li>• 4-6: Qoniqarsiz (qisman hal qilingan)</li>
                <li>• 7-8: Yaxshi (muammo hal qilingan)</li>
                <li>• 9-10: A'lo (tez va sifatli hal qilingan)</li>
              </ul>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                <AlertCircle className={styles.errorIcon} />
                <span>{error}</span>
              </div>
            )}
            
            {isSubmitted ? (
              <div 
                ref={successMessageRef}
                className={styles.successMessage}
                tabIndex={-1}
                role="alert"
                aria-live="polite"
              >
                <CheckCircle2 className={styles.successIcon} aria-hidden="true" />
                <span>Fikr-mulohazangiz uchun rahmat! Qayta yo'naltirilmoqda...</span>
              </div>
            ) : (
              <div className={styles.formActions}>
                <Button 
                  type="button" 
                  variant="outline" 
                  className={styles.backButton}
                  onClick={() => window.history.back()}
                  disabled={isSubmitting || isSubmitted}
                >
                  Orqaga
                </Button>
              <Button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
                data-loading={isSubmitting}
              >
                {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
              </Button>
            </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
