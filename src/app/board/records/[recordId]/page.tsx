'use client'

import { useParams } from "next/navigation"

export default function Record () {

  const params = useParams()
    console.log(params.recordId)
  return (
    <div>
      <strong>this is the record route</strong>
    </div>
  )
}
