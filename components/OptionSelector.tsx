"use client"
import React from 'react'

type Props = {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}

export default function OptionSelector({ label, value, options, onChange }: Props) {
  return (
    <div className="my-3 text-left">
      <label className="mb-1 block text-sm font-medium text-neutral-700">{label}</label>
      <select
        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

