const Loader = () => {
  return (
    <div className="flex items-center gap-3 text-indigo-100">
      <div className="spinner"></div>
      <p className="animate-pulse font-medium">Analyzing...</p>
    </div>
  )
}

export default Loader
