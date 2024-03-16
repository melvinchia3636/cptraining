import React from 'react'
import { Icon } from '@iconify/react'
import { faker } from '@faker-js/faker'

function Home(): React.ReactElement {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-4 justify-center text-2xl">
          <Icon icon="fluent:code-text-16-filled" className="w-9 h-9" />
          Competitive Programming Training Platform
        </h1>
        <button className="p-4 px-6 border-2 border-zinc-700 flex items-center gap-2">
          <Icon icon="uil:plus" className="w-5 h-5" />
          Add Question
        </button>
      </div>
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
      <table className="w-full">
        <thead>
          <tr className="!text-left">
            <th className="py-4 px-6 border-b-2 border-zinc-700">Status</th>
            <th className="py-4 px-6 border-b-2 border-zinc-700">Problem</th>
            <th className="py-4 px-6 border-b-2 border-zinc-700">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {Array(25)
            .fill(0)
            .map((_, i) => (
              <tr key={i} className="!text-left">
                {(() => {
                  const SELECTION = [
                    ['Unattempted', 'text-red-600'],
                    ['Solved', 'text-green-600'],
                    ['Attempted', 'text-yellow-600']
                  ]
                  const random = faker.number.int({ min: 0, max: 2 })

                  return (
                    <td
                      className={`py-4 px-6 border-b border-zinc-700 ${SELECTION[random][1]}`}
                    >
                      {SELECTION[random][0]}
                    </td>
                  )
                })()}
                <td className="py-5 px-6 border-b border-zinc-700">
                  <div className="flex w-full flex-col gap-2">
                    {faker.lorem
                      .words(faker.number.int({ min: 3, max: 8 }))
                      .split(' ')
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(' ')}
                    {(() => {
                      const TAGS = [
                        'Array',
                        'Math',
                        'String',
                        'Dynamic Programming',
                        'Graph',
                        'Tree',
                        'Greedy',
                        'Bit Manipulation',
                        'Recursion',
                        'Sorting',
                        'Searching',
                        'Hashing',
                        'Stack',
                        'Queue',
                        'Linked List',
                        'Heap',
                        'Backtracking',
                        'Geometry',
                        'Game Theory',
                        'Trie',
                        'Segment Tree',
                        'Fenwick Tree',
                        'Disjoint Set',
                        'Binary Search Tree',
                        'Binary Indexed Tree',
                        'Suffix Array',
                        'Suffix Tree',
                        'Trie',
                        'Segment Tree',
                        'Fenwick Tree',
                        'Disjoint Set',
                        'Binary Search Tree',
                        'Binary Indexed Tree',
                        'Suffix Array',
                        'Suffix Tree'
                      ]
                      const random = faker.number.int({ min: 1, max: 5 })

                      return (
                        <div className="flex w-full flex-wrap gap-2">
                          {Array(random)
                            .fill(0)
                            .map((_, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-zinc-300 text-zinc-800 text-xs rounded-md"
                              >
                                {
                                  TAGS[
                                    faker.number.int({
                                      min: 0,
                                      max: TAGS.length - 1
                                    })
                                  ]
                                }
                              </span>
                            ))}
                        </div>
                      )
                    })()}
                  </div>
                </td>
                {(() => {
                  const SELECTION = [
                    ['Easy', 'text-green-600'],
                    ['Medium', 'text-yellow-600'],
                    ['Hard', 'text-red-600']
                  ]
                  const random = faker.number.int({ min: 0, max: 2 })

                  return (
                    <td
                      className={`py-4 px-6 border-b border-zinc-700 ${SELECTION[random][1]}`}
                    >
                      {SELECTION[random][0]}
                    </td>
                  )
                })()}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Home
