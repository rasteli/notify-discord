import amqp from "amqplib"
import * as core from "@actions/core"
import * as github from "@actions/github"

async function main() {
  const branch = core.getInput("branch")

  const connection = await amqp.connect(
    "amqp://url-shortener-production-9595.up.railway.app"
  ) // Alterar para IP do servidor (laptop)
  const channel = await connection.createChannel()

  const queue = "notify-discord"

  await channel.assertQueue(queue, { durable: true })
  channel.sendToQueue(queue, Buffer.from(branch))

  console.log(`[x] Sent ${branch} to ${queue}`)

  await channel.close()
  await connection.close()

  const payload = JSON.stringify(github.context.payload, undefined, 2)

  console.log(`The event payload: ${payload}`)
}

main().catch(error => {
  core.setFailed(error.message)
})
