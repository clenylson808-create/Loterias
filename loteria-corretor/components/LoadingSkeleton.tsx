export default function LoadingSkeleton() {
  return (
    <div className="rounded-xl shadow-xl overflow-hidden bg-gray-200 animate-pulse">
      <div className="bg-gray-300 h-24"></div>
      <div className="bg-white p-6 space-y-4">
        <div className="flex gap-2 justify-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-12 h-12 rounded-full bg-gray-300"></div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
