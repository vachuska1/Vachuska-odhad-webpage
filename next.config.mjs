import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

/** @type {import('next').NextConfig} */
const config = (phase) => ({
  // Keep development chunks separate from production builds and previews.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  experimental: { serverActions: { bodySizeLimit: '4.5mb' } },
})

export default config
