import { WagmiConfig, Client, Chain } from "wagmi"

import React from "react"
import {
  ProviderConfig,
  WalletConnector,
  WalletConnectionHooks,
} from "@hybrd/types"
import * as Chains from "wagmi/chains"

import DefaultWalletConnector from "./DefaultWalletConnector"
import { publicProvider } from "wagmi/providers/public"
import { hybridProvider } from "./hybridProvider"

export function useWeb3() {
  return React.useContext(Web3Context)
}

const DEFAULT_CHAINS = [
  Chains.mainnet,
  Chains.goerli,
  //
  Chains.polygon,
  Chains.polygonMumbai,
  //
  Chains.arbitrum,
  Chains.arbitrumGoerli,
  //
  Chains.optimism,
  Chains.optimismGoerli,
  //
  // Chains.goerli, # when deployed
  Chains.baseGoerli,
  //
  Chains.localhost,
]

export const Web3Context = React.createContext<{
  client: Client
  chains: Chain[]
  hooks: WalletConnectionHooks
}>({
  client: undefined,
  chains: undefined,
  hooks: {
    useWallet: () => ({
      account: undefined,
      isLoading: true,
      isConnected: undefined,
      connect: async () => {
        throw new Error("No wallet provider found")
      },
      disconnect: async () => {
        throw new Error("No wallet provider found")
      },
    }),
  },
})

function buildProviders(config: ProviderConfig) {
  const { hybridKey } = config
  const providers = []

  providers.push(
    hybridProvider({
      apiKey: hybridKey,
    })
  )

  providers.push(publicProvider())

  return providers
}

export function Web3Provider(
  props: {
    children: React.ReactNode
    chains?: Chain[]
    wallet?: WalletConnector
  } & ProviderConfig
) {
  const {
    children,
    chains = DEFAULT_CHAINS,
    wallet: createWalletConnector = DefaultWalletConnector,
  } = props

  const { client, hooks, Provider } = createWalletConnector({
    chains,
    providers: buildProviders(props),
  })

  const contextValue = {
    client,
    hooks,
    chains,
  }

  return (
    <Web3Context.Provider value={contextValue}>
      <WagmiConfig client={client}>
        <Provider>{children}</Provider>
      </WagmiConfig>
    </Web3Context.Provider>
  )
}

// I really want to support an HOC its cleaner in some cases.
//
// export const withHybrid = (InputComponent, config: Config = {}) => {
//   return function WithHybrid(props) {
//     return (
//       <Web3Provider {...config}>
//         <InputComponent {...props} />
//       </Web3Provider>
//     )
//   }
// }
