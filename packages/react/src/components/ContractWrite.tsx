import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi"
import { DeployedContract } from "@hybrd/types"
import { useWallet } from "../hooks"
import { useCallback, useState } from "react"

type ButtonProps = {
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
} & React.HTMLAttributes<HTMLButtonElement>

type ContractWriteProps = {
  contract: DeployedContract
  prepare: Omit<Parameters<typeof usePrepareContractWrite>, "abi" | "address">
  render?: (props: ButtonProps) => JSX.Element
  timeout?: number
} & React.HTMLAttributes<HTMLButtonElement>

const DefaultButton = (props: ButtonProps) => {
  const { isError, isLoading, isSuccess, children, ...rest } = props

  return (
    <button disabled={isLoading || isSuccess || isError} {...rest}>
      {isLoading
        ? "Sending ..."
        : isSuccess
        ? "Success"
        : isError
        ? "Error"
        : children}
    </button>
  )
}

const ContractWrite = (props: ContractWriteProps) => {
  const {
    render: Button = DefaultButton,
    contract,
    prepare,
    timeout,
    ...rest
  } = props

  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [isError, setError] = useState(false)

  const wallet = useWallet()
  const { chain: network } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const { config } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    ...prepare,
  })

  const { writeAsync } = useContractWrite(config)

  const reset = () => {
    setLoading(false)
    setSuccess(false)
    setError(false)
  }

  const call = useCallback(() => {
    setLoading(true)
    return writeAsync()
      .then((res) => {
        return res.wait()
      })
      .then(() => {
        setSuccess(true)
      })
      .catch((err) => {
        console.error(err)
        setError(true)
      })
      .finally(() => {
        setLoading(false)

        if (timeout)
          setTimeout(() => {
            reset()
          }, timeout)
      })
  }, [writeAsync, reset])

  if (!wallet.isConnected) {
    return (
      <Button
        {...rest}
        isLoading={false}
        isSuccess={false}
        isError={false}
        onClick={wallet.connect}
        style={{ backgroundColor: "red", cursor: "pointer" }}
      >
        Connect Wallet
      </Button>
    )
  }

  if (network?.id !== contract?.chainId && switchNetwork) {
    return (
      <Button
        {...rest}
        isLoading={false}
        isSuccess={false}
        isError={false}
        onClick={() => switchNetwork(contract?.chainId)}
      >
        Switch Network
      </Button>
    )
  }

  return (
    <Button
      {...rest}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      onClick={() => call()}
    >
      Send Transaction
    </Button>
  )
}

export default ContractWrite
