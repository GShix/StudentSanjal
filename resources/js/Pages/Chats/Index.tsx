import { Head } from "@inertiajs/react"
import ChatsLayout from "./ChatsLayout"
import CleanHomeLayout from "../Layouts/CleanHomeLayout"
import { ToastContainer } from "react-toastify"

const Index = () => {
  return (
    <ChatsLayout>
        <Head title="Chats"/>
        <div className="flex justify-center items-center h-full">Start Messaging</div>
    </ChatsLayout>
  )
}

export default Index
