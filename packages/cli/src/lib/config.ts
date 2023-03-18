import fs from "fs"
import { CompiledContract, DeployTarget, Deployment } from "../types"

export const readConfig = (target: DeployTarget) => {
  try {
    return JSON.parse(
      fs.readFileSync(process.cwd() + "/.hybrid/" + target + ".json").toString()
    )
  } catch {
    return {}
  }
}

export const writeConfig = async (
  target: DeployTarget,
  contractName: string,
  deployment: Deployment,
  contract: CompiledContract
) => {
  // Load the existing config
  const json = await readConfig(target)

  // Rewrite the config, overwriting the newly deployed contract
  await fs.writeFileSync(
    process.cwd() + "/.hybrid/" + target + ".json",
    JSON.stringify(
      {
        ...json,
        [contractName]: {
          ...deployment,
          abi: contract.abi,
          bytecode: contract.bytecode
        }
      },
      null,
      2
    )
  )

  //   return fs.writeFileSync(
  //     process.cwd() + "/.hybrid/" + "client.ts",
  //     `
  // // This file is auto-generated by Hybrid

  // export const Deployments = {
  //   ${contracts
  //     .map((c) => {
  //       return `${c.name}: {
  //     abi: ${JSON.stringify(c.abi)} as const,
  //     bytecode: ${JSON.stringify(c.bytecode)}
  //   }`
  //     })
  //     .join(",\n  ")}
  // };`
  //   )
}