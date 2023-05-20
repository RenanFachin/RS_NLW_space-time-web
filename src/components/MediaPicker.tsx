'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    // Garantindo que foi enviado um arquivo
    const { files } = event.target
    if (!files) {
      return
    }

    // Criando uma url de preview
    // files[0] pq o envio não é multiplo, logo, sempre é um array com 1 posição
    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {/* Caso exista algo no state preview */}
      {/* {preview ? <></> : null} => funcionaria mas não é o ideal */}
      {/* aspect-video => determina a altura baseado na largura */}
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
