import ora, { Ora } from "ora"

export async function spinner(label: string, fn: () => Promise<any>) {
  let spinner: Ora
  if (label) spinner = ora(label).start()

  return fn()
    .then((res) => {
      spinner?.succeed(`${label} ... DONE`)
      return spinner
    })
    .catch((err) => {
      spinner?.fail(`${label}`)
      console.error(err)
    })
}
