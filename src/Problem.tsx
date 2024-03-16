import React from 'react'
import { Icon } from '@iconify/react'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

function Problem(): React.ReactElement {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <span className="uppercase text-sm text-zinc-500">Codechef</span>
          <h1 className="text-3xl font-medium">WORDLE</h1>
          <div className="flex gap-8">
            <div>
              Difficulty: <span className="text-green-600">Easy</span>
            </div>
            <div>
              Status: <span className="text-amber-600">Attempted</span>
            </div>
          </div>
          <div>
            Tags:{' '}
            <span className="px-2 w-min py-1 bg-zinc-300 text-zinc-800 text-xs rounded-md">
              String
            </span>
          </div>
        </div>
        <button className="p-4 px-6 border-2 border-zinc-700 flex items-center gap-2">
          <Icon icon="uil:plus" className="w-5 h-5 font-medium" />
          Submit Solution
        </button>
      </div>
      <div className="flex items-center">
        <div className="w-1/3 flex border-b-2 border-zinc-700 py-4 items-center gap-2 justify-center">
          <Icon icon="tabler:file-text" className="w-6 h-6" />
          Statement
        </div>
        <div className="w-1/3 flex border-b border-zinc-400 text-zinc-400 py-4 items-center gap-2 justify-center">
          <Icon icon="tabler:flask" className="w-6 h-6" />
          Test Cases
        </div>
        <div className="w-1/3 flex border-b border-zinc-400 text-zinc-400 py-4 items-center gap-2 justify-center">
          <Icon icon="tabler:history" className="w-6 h-6" />
          Submissions
        </div>
      </div>
      <article className="w-full prose max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {`Chef invented a modified wordle.There is a hidden word $S$ and a guess
        word $T$, both of length $5$. Chef defines a string $M$ to determine the
        correctness of the guess word. For the $i^{th}$ index:\n- If the guess
        at the $i^{th}$ index is correct, the $i^{th}$ character of $M$ is
        $\\texttt{G}$.\n- If the guess at the $i^{th}$ index is wrong, the $i^
        {th}$ character of $M$ is $\\texttt{B}$.\n\nGiven the hidden word $S$
        and guess $T$, determine string $M$.`}
        </Markdown>
      </article>
      <h2 className="text-xl font-medium -mb-4">Input Format</h2>
      <article className="prose w-full max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {
            '- First line will contain $T$, number of test cases. Then the test cases follow.\n- Each test case contains of two lines of input.\n- First line contains the string $S$ - the hidden word.\n- Second line contains the string $T$ - the guess word.'
          }
        </Markdown>
      </article>
      <h2 className="text-xl font-medium -mb-4">Output Format</h2>
      <article className="prose w-full max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {
            'For each test case, print the value of string $M$.\n\nYou may print each character of the string in uppercase or lowercase (for example, the strings $\\texttt{BgBgB}$, $\\texttt{BGBGB}$, $\\texttt{bgbGB}$ and $\\texttt{bgbgb}$ will all be treated as identical).'
          }
        </Markdown>
      </article>
      <h2 className="text-xl font-medium -mb-4">Constraints</h2>
      <article className="prose w-full max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {
            '- $1 \\leq T \\leq 1000$\n- $|S| = |T| = 5$\n- $S, T$ contain uppercase english alphabets only.\n\n'
          }
        </Markdown>
      </article>
      <h2 className="text-xl font-medium -mb-4">Sample 1</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-4 px-6 border-b-2 font-medium border-zinc-700 border-2">
              Input
            </th>
            <th className="py-4 px-6 border-b-2 font-medium border-zinc-700 border-2">
              Output
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4 border-l-2 border-r-2 px-6 border-b-2 border-zinc-700">
              <pre>
                {`3
HELLO
HELLU
WORLD
WORLD
WORLD
HELLO`}
              </pre>
            </td>
            <td className="py-4 px-6 border-b-2 border-r-2 border-zinc-700">
              <pre>
                {`GGGBB
GGGGG
BBBBB`}
              </pre>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-xl font-medium -mb-4">Explanation</h2>
      <article className="prose w-full max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {
            '**Test Case $1$:** Given string $S = \\texttt{ABCDE}$ and $T = \\texttt{EDCBA}$. The string $M$ is:\n- Comparing the first indices, $\\texttt{A} \\neq \\texttt{E}$, thus, $M[1] = \\texttt{B}$.\n- Comparing the second indices, $\\texttt{B} \\neq \\texttt{D}$, thus, $M[2] = \\texttt{B}$.\n- Comparing the third indices, $\\texttt{C} = \\texttt{C}$, thus, $M[3] = \\texttt{G}$.\n- Comparing the fourth indices, $\\texttt{D} \\neq \\texttt{B}$, thus, $M[4] = \\texttt{B}$.\n- Comparing the fifth indices, $\\texttt{E} \\neq \\texttt{A}$, thus, $M[5] = \\texttt{B}$.  \nThus, $M = \\texttt{BBGBB}$.\n\n**Test Case $2$:** Given string $S = \\texttt{ROUND}$ and $T = \\texttt{RINGS}$. The string $M$ is:\n- Comparing the first indices, $\\texttt{R} = \\texttt{R}$, thus, $M[1] = \\texttt{G}$.\n- Comparing the second indices, $\\texttt{O} \\neq \\texttt{I}$, thus, $M[2] = \\texttt{B}$.\n- Comparing the third indices, $\\texttt{U} \\neq \\texttt{N}$, thus, $M[3] = \\texttt{B}$.\n- Comparing the fourth indices, $\\texttt{N} \\neq \\texttt{G}$, thus, $M[4] = \\texttt{B}$.\n- Comparing the fifth indices, $\\texttt{D} \\neq \\texttt{S}$, thus, $M[5] = \\texttt{B}$.  \nThus, $M = \\texttt{GBBBB}$.\n\n\n'
          }
        </Markdown>
      </article>
    </>
  )
}

export default Problem
