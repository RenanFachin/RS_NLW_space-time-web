import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  // Verificar se o usuário está logado
  const token = request.cookies.get('token')?.value

  // Redirecionando diretamente para o login caso ele não esteja autenticado
  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        // request.url é a url que o usuário estava tentando acessar
        // HttpOnly faz que o usuário não veja o cookie na aba e o cookie não fica vísivel no js do browser e só no servidor do nextjs
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  // matcher define em quais caminhos da aplicação o middleware de autenticação entrará
  // Qualquer rota que começa com memories
  matcher: '/memories/:path*',
}
