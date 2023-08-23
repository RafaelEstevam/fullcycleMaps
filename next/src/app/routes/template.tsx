import { ReactNode } from "react"

interface TemplateProps {
    children: ReactNode
}

const Template = ({children}:TemplateProps) => {
    return (
        <div>
            <header className="p-4 bg-slate-100">
                <p className="text-slate-500">Header</p>
            </header>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Template