import { useState } from "react"

export const useToggle = (initialValue = true) => {
    const [toggle, setToggle] = useState(initialValue)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return {
        handleToggle,
        toggle
    }
}