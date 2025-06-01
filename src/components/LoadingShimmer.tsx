
export function LoadingShimmer() {
  return (
    <div className="animate-pulse">
      <div className="h-80 bg-gray-200 rounded-lg mb-4">
        <div className="flex items-end justify-between h-full p-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded-t"
              style={{
                height: `${Math.random() * 60 + 20}%`,
                width: "12%",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
