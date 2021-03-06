import { Abi } from "abitype"
import ora from "ora"
import open from "open"
import { Server } from "socket.io"
import { Deployment } from "@hybrd/types"

export async function waitForDeployment(
  abi: Abi,
  bytecode: string,
  chainId: number
): Promise<Deployment> {
  return new Promise((resolve) => {
    const spinner = ora("Waiting for deployment in browser ...").start()
    const server = new Server({
      cors: {
        origin: "*",
      },
    })

    server.on("connection", (socket) => {
      // User connected, send them the abi + bytecode
      socket.emit("init", {
        chainId,
        abi,
        bytecode,
      })

      // Someday we might want to show a status update
      // socket.on("tx", (arg) => {})

      // User deployed, resolve the promise
      socket.on("receipt", (arg) => {
        spinner.succeed("Contract deployed to testnet")
        server.close()
        resolve(JSON.parse(arg))
      })

      //
      socket.on("disconnect", () => {
        // Should we do something here? Maybe just let them reload the window.
      })
    })

    const port = 8581
    const url = "ws://localhost:" + port

    server.listen(port)

    const host = process.env.HYBRID_HOST || "https://hybrid.dev"
    open(host + "/deploy?url=" + url)
  })
}
