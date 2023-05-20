/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Domínios em que o será permitido carregar as imagens
    domains: ['avatars.githubusercontent.com', '192.168.0.7'],
  },
}

module.exports = nextConfig
