const config = {
  use: { headless: false },
  workers: process.env.CI ? 1 : undefined,
  testDir: "./tests"
}

export default config