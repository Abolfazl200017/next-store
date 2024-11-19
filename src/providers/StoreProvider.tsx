'use client'

import useBasketStore from "@/store/basketStore"
import { useEffect } from "react"



export default function StoreProvider({children}: { children: React.ReactNode }) {
  const { initializeStore } = useBasketStore()

  useEffect (() => {
    initializeStore()
  }, [initializeStore])

  return (
    <>
      {children}
    </>
  )
}