import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {

    return (<div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow" />
        <Footer className="mt-auto" />
    </div>)
}

export default Layout