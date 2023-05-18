import { getUser } from '@/lib/auth'
import Image from 'next/image'
import { LogOut } from 'lucide-react'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      {/* Como é uma imagem externa, é OBRIGATÓRIO PASSAR WIDTH E HEIGHT que será carregada a imagem */}
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        Olá, <span>{name}</span>
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          <LogOut className="mt-1 h-5 w-5" />
        </a>
      </p>
    </div>
  )
}
