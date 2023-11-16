import React from 'react'
import {useSession} from "next-auth/react"
const page = () => {
    const {data : session} = useSession;

  return (
    <div>
      
    </div>
  )
}

export default page
