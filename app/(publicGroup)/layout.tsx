import { Footer } from "@/components/shared/footer"
import Navbar from "@/components/shared/navbar"
import { getMe } from "@/service/getMe"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getMe()

  return (
    <div>
      <Navbar user={user} />
      {children}
      <div className= "text-black bg-gradient-to-r from-green-400 to-emerald-500 w-full px-8 py-8  items-center justify-center space-y-12">
        <Footer />
      </div>
    </div>
  )
}