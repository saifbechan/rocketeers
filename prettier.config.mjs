/** @type {import("prettier").Config} */
const config = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 80,

  // Use 'all' to allow trailing commas in function args (Modern standard)
  trailingComma: 'all',

  plugins: [
    // 1. Organize imports first
    'prettier-plugin-organize-imports',
    'prettier-plugin-sh',

    // 2. Sort Tailwind classes on the organized code
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
