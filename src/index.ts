import * as core from "@actions/core"
import * as github from "@actions/github"

import { Client, Events, GatewayIntentBits, TextChannel } from "discord.js"

const DEV_ROLE_ID = "1044322898355167302"
const NOTIFICATIONS_CHANNEL_ID = "1074433899192656005"

async function main() {
  const token = core.getInput("token")
  const branch = core.getInput("branch")
  const repo_tree = core.getInput("repo_tree")

  const client = new Client({ intents: [GatewayIntentBits.Guilds] })

  client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}!`)

    const channel = client.channels.cache.get(
      NOTIFICATIONS_CHANNEL_ID
    ) as TextChannel

    channel.send(
      `<@&${DEV_ROLE_ID}> Nova branch **${branch}** criada: ${repo_tree}/${branch}`
    )

    setTimeout(() => {
      client.destroy()
    }, 3000)
  })

  client.login(token)

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
}

main().catch(error => {
  core.setFailed(error.message)
})
