"use client"
import { useEffect, useMemo, useState } from 'react'

function isOpenAt(date: Date) {
  const day = date.getDay() // 0=Sun ... 6=Sat
  const minutes = date.getHours() * 60 + date.getMinutes()
  let open = 0, close = 0
  if (day >= 1 && day <= 4) { // Mon-Thu
    open = 11 * 60; close = 21 * 60
  } else if (day === 5 || day === 6) { // Fri-Sat
    open = 11 * 60; close = 22 * 60
  } else { // Sun
    open = 12 * 60; close = 20 * 60
  }
  return minutes >= open && minutes < close
}

export default function OpenStatus() {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const open = useMemo(() => isOpenAt(now), [now])
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${open ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-700'}`}>
      {open ? 'Open Now' : 'Closed'}
    </span>
  )
}

