export const mockUserData = [
  {
    userId: 1,
    userName: "田中太郎",
    gender: "male",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width="128"
        height="128"
      >
        <circle cx="64" cy="64" r="64" fill="url(#grad)" />
        <circle cx="64" cy="44" r="20" fill="white" />
        <path d="M32,104a32,32 0 0 1 64,0Z" fill="white" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4A90E2" />
            <stop offset="100%" stop-color="#7B61FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    userId: 2,
    userName: "田中好子",
    gender: "female",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width="128"
        height="128"
      >
        <circle cx="64" cy="64" r="64" fill="url(#grad)" />
        <circle cx="64" cy="44" r="20" fill="white" />
        <path d="M32,104a32,32 0 0 1 64,0Z" fill="white" />

        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FF5F9E" />
            <stop offset="100%" stop-color="#FFB6C1" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    userId: 3,
    userName: "KABA.ちゃん",
    gender: "genderless",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width="128"
        height="128"
      >
        <circle cx="64" cy="64" r="64" fill="url(#grad)" />
        <circle cx="64" cy="44" r="20" fill="white" />
        <path d="M32,104a32,32 0 0 1 64,0Z" fill="white" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#8E2DE2" />
            <stop offset="100%" stop-color="#C471ED" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];
