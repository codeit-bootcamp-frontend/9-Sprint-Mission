import styles from "@/components/LikeCount.module.css";
import { Props } from "@/types/types"


export default function LikeCount({children, className} :Props) {
  return (
    <>
    <span className={className}>
      {children}
    </span>
    </>
  )
}