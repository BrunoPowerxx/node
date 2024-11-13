const config = {
  use: { headless: true },
  workers: process.env.CI ? 1 : undefined,
  testDir: "./tests"
}

export default config
