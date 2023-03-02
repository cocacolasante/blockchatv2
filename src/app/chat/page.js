import CurrentThread from "@/components/CurrentThread"
import Sidebar from "@/components/Sidebar"

const page = () => {
  return (
    <div className="flex ">
      <div className="w-36" >
        
          <Sidebar />
      </div>
        
          <CurrentThread />


    </div>
  )
}

export default page