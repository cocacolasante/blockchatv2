import CurrentThread from "@/components/CurrentThread"
import Sidebar from "@/components/Sidebar"

const page = () => {
  return (
    <div className="flex justify-between">

        
          <Sidebar />

        
          <CurrentThread />


    </div>
  )
}

export default page