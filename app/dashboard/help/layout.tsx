import { DocProvider } from "./_components/doc-context"
import { HelpSidebar } from "./_components/help-sidebar"

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DocProvider>
      <div className="flex min-h-screen">
        <HelpSidebar />
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="container py-6 px-8">
            {children}
          </div>
        </main>
      </div>
    </DocProvider>
  )
}
