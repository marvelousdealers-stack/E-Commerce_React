import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"


const RootLayout = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
