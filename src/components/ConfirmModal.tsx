'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import tableStore from '@/store/tableStore'

const ConfirmModal = observer(() => {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const params = tableStore.toUrlParams()
  const search = new URLSearchParams(params).toString()
  const fullUrl = `${window.location.origin}/mainTable?${search}`

  const handleConfirm = () => {
    setIsSubmitting(true)

    // типо запрос
    setTimeout(() => {
      tableStore.resetAll()
      router.push('/mainTable')
    }, 3000)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 100,
        left: '10%',
        width: '80%',
        background: 'white',
        border: '1px solid #aaa',
        padding: 20,
        zIndex: 999,
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      }}
    >
      <h2>Подтверждение отправки</h2>

      {isSubmitting ? (
        <div style={{ marginTop: 20 }}>
          <p>Отправка данных... ждём-с</p>
          <div style={{ marginTop: 10, fontSize: 24 }}>СПИНЕРРРР ..... </div>
        </div>
      ) : (
        <>
          <p>
            На всякий случай вы можете скопировать выбранные вами параметры,
            потому что после отправки они обнулятся:
          </p>
          <pre style={{ background: '#eee', padding: 10 }}>{fullUrl}</pre>

          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button onClick={handleConfirm}>Подтвердить и отправить</button>
            <button onClick={() => router.back()}>Отмена</button>
          </div>
        </>
      )}
    </div>
  )
})

export default ConfirmModal
