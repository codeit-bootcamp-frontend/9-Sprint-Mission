import { Props } from "@/types/types"

export default function CreatedDate({children, className} : Props) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}