export default function Loading() {
  return (
    <div className="flex justify-center w-screen items-center h-screen bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full border-t-4 border-slate-300 w-16 h-16 mx-auto mb-4"></div>
        <p className="text-slate-300 text-xl">Loading...</p>
      </div>
    </div>
  )
}
