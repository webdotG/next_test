// src/store/tableStore.ts
import { makeAutoObservable } from 'mobx'

type Nullable<T> = T | null
export type ColorFormat = 'hex' | 'rgba' | 'cmyk' | null

export interface Filters {
  id: Nullable<number>
  name: Nullable<string>
  color: Nullable<string>
  colorFormat: ColorFormat
  weight: Nullable<number>
  height: Nullable<number>
  width: Nullable<number>
  material: Nullable<string>
  shape: Nullable<string>
  fragility: Nullable<boolean>
  dietary: Nullable<'kosher' | 'halal' | 'blessed'>
  packaging: Nullable<string>
  delivery: Nullable<'company' | 'partner' | 'pickup'>
  rating: Nullable<number>
  comment: Nullable<string>
}

class TableStore {
  filters: Filters = {
    id: null,
    name: null,
    color: null,
    colorFormat: null,
    weight: null,
    height: null,
    width: null,
    material: null,
    shape: null,
    fragility: null,
    dietary: null,
    packaging: null,
    delivery: null,
    rating: null,
    comment: null,
  }

  constructor() {
    makeAutoObservable(this)
  }

  set<K extends keyof Filters>(key: K, value: Filters[K]) {
    this.filters[key] = value
  }

  reset<K extends keyof Filters>(key: K) {
    this.filters[key] = null
  }

  resetAll() {
    for (const key of Object.keys(this.filters) as (keyof Filters)[]) {
      this.filters[key] = null
    }
  }

  get previewList() {
    return Object.entries(this.filters).filter(([_, v]) => v !== null)
  }

  toUrlParams(): Record<string, string> {
    const params: Record<string, string> = {}
    for (const key of Object.keys(this.filters) as (keyof Filters)[]) {
      const value = this.filters[key]
      if (value !== null) {
        params[key] = String(value)
      }
    }
    return params
  }

  fromUrlParams(params: Record<string, string>) {
    const parsed: Partial<Filters> = {}
    for (const key of Object.keys(this.filters) as (keyof Filters)[]) {
      const raw = params[key]
      if (!raw) continue

      switch (key) {
        case 'id':
        case 'weight':
        case 'height':
        case 'width':
        case 'rating':
          parsed[key] = Number(raw)
          break
        case 'fragility':
          parsed[key] = raw === 'true'
          break
        case 'colorFormat':
          parsed[key] = ['hex', 'rgba', 'cmyk'].includes(raw)
            ? (raw as ColorFormat)
            : null
          break
        default:
          parsed[key] = raw
      }
    }
    this.filters = { ...this.filters, ...parsed }
  }
}

const tableStore = new TableStore()
export default tableStore
