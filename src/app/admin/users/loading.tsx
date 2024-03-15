import {LoaderIcon} from "lucide-react"

const Loading = () => {
    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <LoaderIcon className="animate-spin"/>
    </div>
}

export default Loading;
