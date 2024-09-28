import styles from "@/components/UserNickname.module.css"
import { Props } from "@/types/types"


export default function UserNickname({children, className} : Props) {
  return (
    
    <span className={className}>{children}</span>
  )
}