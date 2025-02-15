import Link from 'next/link'
import React from 'react'

const SuccessPage = () => {
    return (
        <div>
            <h1>Payment Success</h1>
            <Link href='/'>Back to Home</Link>
        </div>
    )
}

export default SuccessPage