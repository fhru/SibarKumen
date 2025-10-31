export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-ping"></div>
        <img src="/images/sibarkumenlogo.png" alt="Loading..." className="h-16 w-16" />
      </div>
    </div>
  );
}
