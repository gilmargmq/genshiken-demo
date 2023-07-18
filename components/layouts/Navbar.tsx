import Image from "next/image"
import Link from "next/link"

const instagramLogo = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
    >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g fill="currentColor" transform="translate(-340 -7439)">
                <g transform="translate(56 160)">
                    <path d="M289.87 7279.123c-1.628.073-3.04.471-4.179 1.606-1.143 1.14-1.536 2.557-1.61 4.168-.045 1.005-.313 8.601.463 10.593a5.04 5.04 0 002.91 2.903c.634.246 1.356.412 2.416.461 8.86.401 12.145.183 13.53-3.364.246-.631.415-1.353.462-2.41.405-8.883-.066-10.809-1.61-12.351-1.225-1.222-2.666-2.054-12.382-1.606m.081 17.944c-.97-.043-1.496-.205-1.848-.341a3.255 3.255 0 01-1.888-1.883c-.591-1.514-.395-8.703-.342-9.866.051-1.14.282-2.18 1.086-2.985.995-.992 2.28-1.479 11.034-1.084 1.142.052 2.186.282 2.992 1.084.995.993 1.489 2.288 1.087 11.008-.044.968-.206 1.493-.342 1.843-.901 2.308-2.973 2.628-11.779 2.224m8.139-13.377c0 .657.534 1.19 1.194 1.19.66 0 1.195-.533 1.195-1.19a1.194 1.194 0 00-2.39 0m-9.226 5.298a5.103 5.103 0 005.11 5.097 5.103 5.103 0 005.109-5.097 5.102 5.102 0 00-5.11-5.096 5.102 5.102 0 00-5.11 5.096m1.794 0a3.313 3.313 0 013.316-3.308 3.313 3.313 0 013.317 3.308 3.313 3.313 0 01-3.317 3.31 3.313 3.313 0 01-3.316-3.31"></path>
                </g>
            </g>
        </g>
    </svg>
)

const twitterLogo = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 -2 20 20"
    >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g fill="currentColor" transform="translate(-60 -7521)">
                <g transform="translate(56 160)">
                    <path d="M10.29 7377c7.547 0 11.675-6.156 11.675-11.495 0-.175 0-.349-.012-.522A8.265 8.265 0 0024 7362.89a8.273 8.273 0 01-2.356.637 4.07 4.07 0 001.804-2.235 8.303 8.303 0 01-2.606.98 4.153 4.153 0 00-5.806-.175 4.006 4.006 0 00-1.187 3.86 11.717 11.717 0 01-8.457-4.22 4.005 4.005 0 001.271 5.392 4.122 4.122 0 01-1.863-.505v.051c.001 1.923 1.378 3.579 3.292 3.96a4.144 4.144 0 01-1.852.069c.537 1.646 2.078 2.773 3.833 2.806A8.315 8.315 0 014 7375.185a11.754 11.754 0 006.29 1.812"></path>
                </g>
            </g>
        </g>
    </svg>
)

const facebookLogo = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="-5 0 20 20"
    >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g fill="currentColor" transform="translate(-385 -7399)">
                <g transform="translate(56 160)">
                    <path d="M335.821 7259v-9h2.733l.446-4h-3.179v-1.948c0-1.03.027-2.052 1.466-2.052h1.458v-2.86c0-.043-1.253-.14-2.52-.14-2.645 0-4.302 1.657-4.302 4.7v2.3H329v4h2.923v9h3.898z"></path>
                </g>
            </g>
        </g>
    </svg>
)

const Navbar = () => {
    return (
        <nav className="bg-genshiken-red-500 h-24">
            <div className="w-3/4 h-full flex items-center justify-between p-2 mx-auto">
                <div className="h-full w-1/4 relative">
                    <Link href='/'>
                        <Image src="/logo.png"
                            className=""
                            alt="logo"
                            layout="fill"
                            objectFit="contain" />
                    </Link>
                </div>
                <input type="text" className="outline-0 bg-white rounded-sm p-3 h-fit w-1/2 text-gray-800" placeholder="Animes, noticias, etc" />
                <div className="flex space-x-6 text-white">
                    <div className="opacity-60 hover:opacity-100 cursor-pointer">
                        {instagramLogo}
                    </div>
                    <div className="opacity-60 hover:opacity-100 cursor-pointer">
                        {twitterLogo}
                    </div>
                    <div className="opacity-60 hover:opacity-100 cursor-pointer">
                        {facebookLogo}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar