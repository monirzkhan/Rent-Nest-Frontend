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
      <div className="min-h-screen w-full place-content-end pt-4">
        <Footer />
      </div>
    </div>
  )
}