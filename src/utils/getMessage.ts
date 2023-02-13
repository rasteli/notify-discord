import * as core from "@actions/core"

export function getMessage(branch: string, type: "create" | "merge") {
  const repo_tree = core.getInput("repo_tree")
  const source_branch = core.getInput("source_branch")

  const messages = {
    create: `Nova branch **${branch}** criada: ${repo_tree}/${branch}`,
    merge: `Merge da branch **${source_branch}** para a branch **${branch}**. Façam o pull da branch **${branch}** para atualizarem o ambiente de desenvolvimento.`
  }

  return messages[type]
}
