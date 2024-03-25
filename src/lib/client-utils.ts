'use client'

import {useEffect, useState} from 'react';

export const useRouterReady = () => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setIsReady(true)
    }, [])

    return isReady
}