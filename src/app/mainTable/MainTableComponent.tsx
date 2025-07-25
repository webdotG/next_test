'use client'

import { useEffect } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'

import tableStore from '@/store/tableStore'

import IdFilter from './Filters/IdFilter'
import NameFilter from './Filters/NameFilter'
import ColorFilter from './Filters/ColorFilter'
import WeightFilter from './Filters/WeightFilter'
import HeightFilter from './Filters/HeightFilter'
import WidthFilter from './Filters/WidthFilter'
import MaterialFilter from './Filters/MaterialFilter'
import ShapeFilter from './Filters/ShapeFilter'
import FragilityFilter from './Filters/FragilityFilter'
import DietaryFilter from './Filters/DietaryFilter'
import PackagingFilter from './Filters/PackagingFilter'
import DeliveryFilter from './Filters/DeliveryFilter'
import RaitingFilter from './Filters/RaitingFilter'
import CommentFilter from './Filters/CommentFilter'
import PreviewBlock from './Preview'
import FiltersActions from './FiltersActions'

const MainTableComponent = observer(function MainTableComponent() {
  const searchParams = useSearchParams()

  // для первого маунта читает URL и заполняет стор
  useEffect(() => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    tableStore.fromUrlParams(params)
  }, [])

  // mobx autorun чтоб СИНХРОНИЗИРОВАТЬ стор в URL
  useEffect(() => {
    const disposer = autorun(() => {
      const params = tableStore.toUrlParams()
      const url = new URL(window.location.href)
      const search = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        search.set(key, value)
      })

      const newUrl = `${url.pathname}?${search.toString()}`
      window.history.replaceState({}, '', newUrl)
    })

    // для корректного unmount
    return () => disposer()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Таблица заказа</h1>
      <div style={{ display: 'grid', gap: 10 }}>
        <IdFilter />
        <NameFilter />
        <ColorFilter />
        <WeightFilter />
        <HeightFilter />
        <WidthFilter />
        <MaterialFilter />
        <ShapeFilter />
        <FragilityFilter />
        <DietaryFilter />
        <PackagingFilter />
        <DeliveryFilter />
        <RaitingFilter />
        <CommentFilter />
      </div>
      <PreviewBlock />
      <FiltersActions />
    </div>
  )
})

export default MainTableComponent
