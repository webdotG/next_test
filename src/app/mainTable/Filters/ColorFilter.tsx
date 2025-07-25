'use client'

import { observer } from 'mobx-react-lite'
import tableStore, { ColorFormat } from '@/store/tableStore'
import { useState } from 'react'

const validate = {
  hex: (val: string) => /^#([0-9a-f]{3}){1,2}$/i.test(val),
  rgba: (val: string) =>
    /^rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(0|1|0\.\d{1,2})\)$/.test(
      val,
    ),
  cmyk: (val: string) =>
    /^cmyk\((\d{1,3})%,\s?(\d{1,3})%,\s?(\d{1,3})%,\s?(\d{1,3})%\)$/.test(val),
}

function hexToRgba(hex: string): string {
  const parsed = hex.replace('#', '')
  const bigint = parseInt(parsed, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, 1)`
}

function hexToCmyk(hex: string): string {
  const parsed = hex.replace('#', '')
  const bigint = parseInt(parsed, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const k = 1 - Math.max(rNorm, gNorm, bNorm)
  const c = (1 - rNorm - k) / (1 - k) || 0
  const m = (1 - gNorm - k) / (1 - k) || 0
  const y = (1 - bNorm - k) / (1 - k) || 0

  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(
    y * 100,
  )}%, ${Math.round(k * 100)}%)`
}

const ColorFilter = observer(() => {
  const format = tableStore.filters.colorFormat
  const [input, setInput] = useState(tableStore.filters.color ?? '')

  const handleChange = (val: string | null) => {
    setInput(val ?? '')
    if (val && format && validate[format]?.(val)) {
      tableStore.set('color', val)
    } else {
      tableStore.set('color', null)
    }
  }

  const handleReset = () => {
    tableStore.reset('color')
    tableStore.reset('colorFormat')
    setInput('')
  }

  const handleFormatChange = (val: string) => {
    const valid = ['hex', 'rgba', 'cmyk'].includes(val)
    const parsed = valid ? (val as ColorFormat) : null
    tableStore.set('colorFormat', parsed)
  }

  const handleColorPickerChange = (hex: string) => {
    let result = hex
    if (format === 'rgba') {
      result = hexToRgba(hex)
    } else if (format === 'cmyk') {
      result = hexToCmyk(hex)
    }
    handleChange(result)
  }

  return (
    <div>
      <label>Цвет:</label>
      <select
        value={format ?? ''}
        onChange={(e) => handleFormatChange(e.target.value)}
      >
        <option value=''>-- формат не выбран --</option>
        <option value='hex'>Hex</option>
        <option value='rgba'>RGBA</option>
        <option value='cmyk'>CMYK</option>
      </select>

      <input
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder='Введите цвет'
        style={{ marginLeft: 10 }}
      />

      <input
        type='color'
        onChange={(e) => handleColorPickerChange(e.target.value)}
        value={validate.hex(input) ? input : '#000000'}
        style={{ marginLeft: 10 }}
      />

      <button onClick={handleReset} style={{ marginLeft: 10 }}>
        Сбросить
      </button>
    </div>
  )
})

export default ColorFilter
