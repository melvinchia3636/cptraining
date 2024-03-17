/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { firestore, auth } from './firebase.config'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { useNavigate } from 'react-router'
import ProblemForm from './ProblemForm'

interface IProblem {
  id: string
  status: string
  problemName: string
  difficulty: 0 | 1 | 2
  tags: string[]
  list: string
}

function Header(): React.ReactElement {
  return (
    <div className="flex items-center justify-between">
      <h1 className="flex items-center gap-4 justify-center text-2xl">
        <Icon icon="fluent:code-text-16-filled" className="w-9 h-9" />
        Competitive Programming Training Platform
      </h1>
      <ProblemForm
        type="create"
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
              <Icon icon="uil:plus" className="w-5 h-5" />
              Add Question
            </button>
          )
        }}
      />
    </div>
  )
}

function Filters(): React.ReactElement {
  return (
    <div className="w-full flex items-center justify-center gap-4">
      <button className="p-4 pl-6 pr-5 w-64 border-2 border-zinc-700 flex justify-between items-center gap-2">
        List
        <Icon
          icon="uil:angle-down"
          className="w-5 h-5 stroke-[0.5px] stroke-zinc-700"
        />
      </button>
      <button className="p-4 pl-6 pr-5 border-2 border-zinc-700 flex items-center gap-2">
        Difficulty
        <Icon
          icon="uil:angle-down"
          className="w-5 h-5 stroke-[0.5px] stroke-zinc-700"
        />
      </button>
      <button className="p-4 pl-6 w-64 justify-between pr-5 border-2 border-zinc-700 flex items-center gap-2">
        Tags
        <Icon
          icon="uil:angle-down"
          className="w-5 h-5 stroke-[0.5px] stroke-zinc-700"
        />
      </button>
      <search className="w-full p-4 border-2 border-zinc-700 flex items-center gap-4">
        <Icon icon="akar-icons:search" className="w-6 h-6" />
        <input
          type="text"
          placeholder="Search for problems"
          className="w-full bg-transparent border-none focus:outline-none placeholder-zinc-700"
        />
      </search>
      <button className="p-4 border-2 border-zinc-700">
        <Icon icon="uil:setting" className="w-6 h-6" />
      </button>
    </div>
  )
}

function Table({ data }: { data: IProblem[] | undefined }): React.ReactElement {
  const navigate = useNavigate()

  return (
    <table className="w-full">
      <thead>
        <tr className="!text-left">
          <th className="py-4 px-6 border-b-2 border-zinc-700 w-2/12">
            Status
          </th>
          <th className="py-4 px-6 border-b-2 border-zinc-700">Problem</th>
          <th className="py-4 px-6 border-b-2 border-zinc-700 w-2/12">
            Difficulty
          </th>
          <th className="py-4 px-6 border-b-2 border-zinc-700 w-2/12">List</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((problem, i) => (
          <tr
            onClick={() => {
              navigate(`/problem/${problem.id}`)
            }}
            key={i}
            className="!text-left cursor-pointer transition-all hover:bg-zinc-200/50"
          >
            <td
              className={`py-4 px-6 border-b border-zinc-700 ${
                problem.status === 'unattempted'
                  ? 'text-red-600'
                  : problem.status === 'solved'
                  ? 'text-green-600'
                  : 'text-yellow-600'
              }`}
            >
              {problem.status[0].toUpperCase() + problem.status.slice(1)}
            </td>
            <td className="py-5 px-6 border-b border-zinc-700">
              <div className="flex w-full flex-col gap-2">
                {problem.problemName}
                <div className="flex w-full flex-wrap gap-2">
                  {problem.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-zinc-300 text-zinc-800 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </td>
            <td
              className={`py-4 px-6 border-b border-zinc-700 ${
                problem.difficulty === 0
                  ? 'text-green-600'
                  : problem.difficulty === 1
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {problem.difficulty === 0
                ? 'Easy'
                : problem.difficulty === 1
                ? 'Medium'
                : 'Hard'}
            </td>
            <td className="py-4 px-6 border-b border-zinc-700">
              {problem.list}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Login(): React.ReactElement {
  async function signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <button
        onClick={() => {
          signInWithGoogle().catch((error) => {
            console.error(error)
          })
        }}
        className="p-4 px-6 border-2 border-zinc-700 flex items-center gap-2"
      >
        <Icon icon="akar-icons:google-fill" className="w-6 h-6" />
        Sign in with Google
      </button>
    </div>
  )
}

function Home(): React.ReactElement {
  const [user, setUser] = useState<null | User>(null)
  const [data, loading, error] = useCollection(
    collection(firestore, 'problems')
  )

  useEffect(() => {
    const cancel = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => {
      cancel()
    }
  }, [])

  if (user === null) {
    return <Login />
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error !== undefined) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <Header />
      <Filters />
      <Table
        data={
          data?.docs.map((e) => ({
            id: e.id,
            ...e.data()
          })) as IProblem[]
        }
      />
    </>
  )
}

export default Home
