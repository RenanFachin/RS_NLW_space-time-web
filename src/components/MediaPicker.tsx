'use client'

export function MediaPicker() {
  return (
    <input
      onChange={(value) => console.log(value)}
      type="file"
      id="media"
      className="invisible h-0 w-0"
    />
  )
}
