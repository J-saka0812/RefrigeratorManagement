export function LoginHeader({ title, icon, description }) {
  return (
    <div class="text-center mb-8">
      <div class="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <span class="text-4xl">{icon}</span>
      </div>
      <h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      <p class="text-gray-700 font-medium">{description}</p>
    </div>
  );
}
