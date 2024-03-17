/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { Icon } from '@iconify/react'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
import { useNavigate, useParams } from 'react-router'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'
import { firestore } from './firebase.config'
import ProblemForm from './ProblemForm'
import { Link } from 'react-router-dom'

function Problem(): React.ReactElement {
  const { id } = useParams<{ id: string }>()
  const [data, loading, error] = useDocumentData(
    doc(firestore, 'problems', id!)
  )
  const [detail, detailLoading, detailError] = useDocumentData(data?.meta)

  if (loading || detailLoading) return <div>Loading...</div>

  if (error !== undefined || detailError !== undefined) {
    return <div>Error: {error?.message ?? detailError?.message}</div>
  }

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Icon icon="uil:arrow-left" className="w-5 h-5" />
            Back
          </Link>
          <span className="uppercase text-sm text-zinc-500">{data?.list}</span>
          <h1 className="text-3xl font-medium">{data?.problemName}</h1>
          <div className="flex gap-8">
            <div>
              Difficulty:{' '}
              <span
                className={
                  ['text-green-600', 'text-yellow-600', 'text-red-600'][
                    data?.difficulty
                  ]
                }
              >
                {['Easy', 'Medium', 'Hard'][data?.difficulty]}
              </span>
            </div>
            <div>
              Status:{' '}
              <span
                className={
                  {
                    unattempted: 'text-red-600',
                    attempted: 'text-yellow-600',
                    solved: 'text-green-600'
                  }[data?.status as 'unattempted' | 'attempted' | 'solved']
                }
              >
                {data?.status[0].toUpperCase() + data?.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            Tags:{' '}
            {data?.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 w-min py-1 bg-zinc-300 whitespace-nowrap text-zinc-800 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-4 px-6 border-2 border-zinc-700 flex items-center gap-2">
            <Icon icon="uil:plus" className="w-5 h-5 font-medium" />
            Submit Solution
          </button>
          <ProblemForm
            type="edit"
            id={id}
            Button={({
              setIsOpen
            }: {
              setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
            }) => {
              return (
                <button
                  onClick={() => {
                    setIsOpen(true)
                  }}
                  className="p-4 px-6 border-2 border-zinc-700 flex items-center gap-2"
                >
                  <Icon icon="uil:pen" className="w-5 h-5" />
                  Edit
                </button>
              )
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-1/3 flex border-b-2 border-zinc-700 py-4 items-center gap-2 justify-center">
          <Icon icon="tabler:file-text" className="w-6 h-6" />
          Statement
        </div>
        <div className="w-1/3 flex border-b border-zinc-400 text-zinc-400 py-4 items-center gap-2 justify-center">
          <Icon icon="tabler:code" className="w-6 h-6" />
          Initial Code
        </div>
        <div className="w-1/3 flex border-b border-zinc-400 text-zinc-400 py-4 items-center gap-2 justify-center">
          <Icon icon="tabler:history" className="w-6 h-6" />
          Submissions
        </div>
      </div>
      <article className="w-full prose max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {detail?.problemStatement}
        </Markdown>
      </article>
      <h2 className="text-xl font-medium -mb-4">Input Format</h2>
      <article className="prose w-full max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {detail?.inputFormat}
        </Markdown>
      </article>
      <h2 className="text-xl font-medium -mb-4">Output Format</h2>
      <article className="prose w-full max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {detail?.outputFormat}
        </Markdown>
      </article>
      <h2 className="text-xl font-medium -mb-4">Constraints</h2>
      <article className="prose w-full max-w-full">
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {detail?.constraints}
        </Markdown>
      </article>
      {detail?.testCases.map((testCase: any, index: number) => (
        <>
          <h2 className="text-xl font-medium -mb-4">Sample {index + 1}</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-4 px-6 w-1/2 border-b-2 font-medium border-zinc-700 border-2">
                  Input
                </th>
                <th className="py-4 px-6 w-1/2 border-b-2 font-medium border-zinc-700 border-2">
                  Output
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 border-l-2 border-r-2 px-6 border-b-2 border-zinc-700">
                  <pre className="whitespace-pre-wrap">{testCase.input}</pre>
                </td>
                <td className="py-4 px-6 border-b-2 border-r-2 border-zinc-700">
                  <pre className="whitespace-pre-wrap">{testCase.output}</pre>
                </td>
              </tr>
            </tbody>
          </table>
          {testCase.explanation && (
            <>
              <h2 className="text-xl font-medium -mb-4">Explanation</h2>
              <article className="prose w-full max-w-full">
                <Markdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {testCase.explanation}
                </Markdown>
              </article>
            </>
          )}
        </>
      ))}
    </>
  )
}

export default Problem
