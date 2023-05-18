import axios from 'axios'

export const api = axios.create({
  // Definindo o caminho padrão do back-end
  baseURL: 'http://192.168.0.7:3333',
})
