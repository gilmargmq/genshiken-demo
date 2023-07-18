import { FC } from "react"
import Navbar from "./Navbar";

interface Props {
    children: JSX.Element
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="2xl:w-3/4 w-full 2xl:mx-auto">
                {children}
            </div>
        </div>
    )
}

export default Layout;