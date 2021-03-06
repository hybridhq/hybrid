import React from "react"
import { useAccount } from "wagmi"
import { useTokenGating } from "../hooks/useTokenGating"
import { DeployedContract } from "@hybrd/types"

type Props = {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  contract: DeployedContract
  loading?: React.ReactNode
  deny?: React.ReactNode
}

const TokenGate: React.FC<Props> = ({
  className,
  style,
  children,
  contract,
  loading: loadingComponent = <p>Loading</p>,
  deny: denyComponent = <p>You must own a token to view this content</p>,
}: Props) => {
  const { address } = useAccount()

  const { isLoading, allow } = useTokenGating({ address, contract })

  if (isLoading) {
    return (
      <span className={className} style={style}>
        {loadingComponent}
      </span>
    )
  }

  if (allow) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <span className={className} style={style}>
      {denyComponent}
    </span>
  )
}

export default TokenGate
