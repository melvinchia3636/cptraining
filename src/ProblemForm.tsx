/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { Fragment, useEffect, useState } from 'react'
import { firestore } from './firebase.config'
import { Icon } from '@iconify/react'
import { Dialog, Transition } from '@headlessui/react'
import { useDocumentData } from 'react-firebase-hooks/firestore'

interface IFormInput {
  problemName: string
  difficulty: 0 | 1 | 2
  tags: string
  list: string
  problemStatement: string
  inputFormat: string
  outputFormat: string
  constraints: string
  testCases: Array<{
    input: string
    output: string
    explanation: string
  }>
}

function ProblemForm({
  type,
  id,
  Button
}: {
  type: 'create' | 'edit'
  id?: string
  Button: React.FC<{ setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }>
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [formInput, setFormInput] = useState<IFormInput>({
    problemName: '',
    difficulty: 0,
    tags: '',
    list: '',
    problemStatement: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    testCases: []
  })

  const [data] = useDocumentData(doc(firestore, 'problems', id ?? 'sus'))

  async function updateData(): Promise<void> {
    if (type === 'edit' && data !== undefined) {
      const detail = await (await getDoc(data.meta)).data()

      setFormInput({
        problemName: data.problemName,
        difficulty: data.difficulty,
        tags: data.tags.join(', '),
        list: data.list,
        problemStatement: detail.problemStatement,
        inputFormat: detail.inputFormat,
        outputFormat: detail.outputFormat,
        constraints: detail.constraints,
        testCases: detail.testCases
      })
    }
  }

  useEffect(() => {
    updateData()
  }, [data])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (formInput.problemName === '') {
      return
    }

    if (type === 'create') {
      const doc = await addDoc(collection(firestore, 'problems'), {
        status: 'unattempted',
        problemName: formInput.problemName,
        difficulty: formInput.difficulty,
        tags: formInput.tags.split(',').map((tag) => tag.trim()),
        list: formInput.list
      })

      const details = await addDoc(collection(firestore, 'problems_meta'), {
        problemId: doc.id,
        problemStatement: formInput.problemStatement,
        inputFormat: formInput.inputFormat,
        outputFormat: formInput.outputFormat,
        constraints: formInput.constraints,
        testCases: formInput.testCases
      })

      await updateDoc(doc, {
        meta: details
      })
    } else {
      await updateDoc(doc(firestore, 'problems', id!), {
        problemName: formInput.problemName,
        difficulty: formInput.difficulty,
        tags: formInput.tags.split(',').map((tag) => tag.trim()),
        list: formInput.list
      })

      await updateDoc(doc(firestore, 'problems_meta', data?.meta.id), {
        problemStatement: formInput.problemStatement,
        inputFormat: formInput.inputFormat,
        outputFormat: formInput.outputFormat,
        constraints: formInput.constraints,
        testCases: formInput.testCases
      })
    }

    setIsOpen(false)
  }

  return (
    <>
      <Button setIsOpen={setIsOpen} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto top-0 left-0"
          onClose={() => {
            setIsOpen(false)
          }}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-8">
            <Dialog.Panel className="mx-auto w-1/2 max-h-[calc(100dvh-10rem)] overflow-scroll rounded-md shadow-2xl bg-zinc-100 text-zinc-700 p-8">
              <Dialog.Title className="text-2xl font-Medium flex items-center gap-2">
                <Icon icon="uil:plus" className="w-6 h-6" />
                Add a new problem
              </Dialog.Title>
              <Dialog.Description className="text-zinc-500 mt-2">
                Fill in the details to add a new problem
              </Dialog.Description>
              <form
                onSubmit={(e) => {
                  handleSubmit(e).catch((error) => {
                    console.error(error)
                  })
                }}
                className="mt-6 flex flex-col gap-6"
              >
                <label className="block">
                  <span className="text-gray-700">Problem Name</span>
                  <input
                    type="text"
                    name="problemName"
                    placeholder='Eg: "Two Sum" or "Maximum Subarray"'
                    value={formInput.problemName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Difficulty</span>
                  <div className="relative">
                    <select
                      name="difficulty"
                      value={formInput.difficulty}
                      onChange={(e) => {
                        setFormInput({
                          ...formInput,
                          difficulty: parseInt(e.target.value) as 0 | 1 | 2
                        })
                      }}
                      className="mt-1 block appearance-none w-full border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                    >
                      <option value="0">Easy</option>
                      <option value="1">Medium</option>
                      <option value="2">Hard</option>
                    </select>
                    <Icon
                      icon="uil:angle-down"
                      className="absolute right-4 pointer-events-none top-1/2 transform -translate-y-1/2 w-5 h-5 stroke-[0.5px] stroke-zinc-700"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-gray-700">Tags</span>
                  <input
                    type="text"
                    name="tags"
                    placeholder='Eg: "Array, Hash Table, Two Pointers" (comma separated)'
                    value={formInput.tags}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">List</span>
                  <input
                    type="text"
                    name="list"
                    placeholder='Eg: "LeetCode, HackerRank, Codeforces"'
                    value={formInput.list}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Problem Statement</span>
                  <textarea
                    name="problemStatement"
                    value={formInput.problemStatement}
                    onChange={handleInputChange}
                    placeholder='Eg: "Given an array of integers, return indices of the two numbers such that they add up to a specific target."'
                    className="mt-1 block w-full h-32 border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                  />
                </label>
                <label className="block mt-4">
                  <span className="text-gray-700">Input Format</span>
                  <textarea
                    name="inputFormat"
                    value={formInput.inputFormat}
                    onChange={handleInputChange}
                    placeholder='Eg: "The first line contains an integer n, the size of the array. The second line contains n space-separated integers."'
                    className="mt-1 block w-full h-32 border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                  />
                </label>
                <label className="block mt-4">
                  <span className="text-gray-700">Output Format</span>
                  <textarea
                    name="outputFormat"
                    value={formInput.outputFormat}
                    onChange={handleInputChange}
                    placeholder='Eg: "Return the two numbers such that they add up to a specific target."'
                    className="mt-1 block w-full h-32 border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                  />
                </label>
                <label className="block mt-4">
                  <span className="text-gray-700">Constraints</span>
                  <textarea
                    name="constraints"
                    value={formInput.constraints}
                    onChange={handleInputChange}
                    placeholder='Eg: "The array contains only unique numbers."'
                    className="mt-1 block w-full h-32 border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                  />
                </label>
                <label className="block mt-4">
                  <span className="text-gray-700 mb-2 block">Test Cases</span>
                  <div className="flex flex-col gap-4">
                    {formInput.testCases.map((testCase, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 p-6 border-2 border-zinc-700"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">
                            Test Case {index + 1}
                          </h3>
                          <div
                            onClick={() => {
                              setFormInput({
                                ...formInput,
                                testCases: formInput.testCases.filter(
                                  (_, i) => i !== index
                                )
                              })
                            }}
                            className="text-zinc-500 cursor-pointer"
                          >
                            <Icon icon="uil:trash-alt" className="w-6 h-6" />
                          </div>
                        </div>
                        <label className="block">
                          <span className="text-gray-700">Input</span>
                          <textarea
                            name="input"
                            value={testCase.input}
                            onChange={(e) => {
                              setFormInput({
                                ...formInput,
                                testCases: formInput.testCases.map((tc, i) =>
                                  i === index
                                    ? {
                                        ...tc,
                                        input: e.target.value
                                      }
                                    : tc
                                )
                              })
                            }}
                            placeholder={`Eg:
3 22
7 8 15
                              `}
                            className="mt-1 block w-full h-32 border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                          />
                        </label>
                        <label className="block">
                          <span className="text-gray-700">Output</span>
                          <textarea
                            name="output"
                            value={testCase.output}
                            onChange={(e) => {
                              setFormInput({
                                ...formInput,
                                testCases: formInput.testCases.map((tc, i) =>
                                  i === index
                                    ? {
                                        ...tc,
                                        output: e.target.value
                                      }
                                    : tc
                                )
                              })
                            }}
                            placeholder='Eg: "7 15"'
                            className="mt-1 block w-full h-32 border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                          />
                        </label>
                        <label className="block">
                          <span className="text-gray-700">Explanation</span>
                          <textarea
                            name="explanation"
                            value={testCase.explanation}
                            onChange={(e) => {
                              setFormInput({
                                ...formInput,
                                testCases: formInput.testCases.map((tc, i) =>
                                  i === index
                                    ? {
                                        ...tc,
                                        explanation: e.target.value
                                      }
                                    : tc
                                )
                              })
                            }}
                            placeholder='Eg: "The two numbers are 7 and 15."'
                            className="mt-1 block w-full h-32 border-2 border-zinc-700 p-4 focus:outline-none bg-transparent"
                          />
                        </label>
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        setFormInput({
                          ...formInput,
                          testCases: [
                            ...formInput.testCases,
                            {
                              input: '',
                              output: '',
                              explanation: ''
                            }
                          ]
                        })
                      }}
                      className="mt-4 border-2 flex items-center cursor-pointer justify-center border-zinc-700 hover:bg-zinc-200/50 py-4 px-4 font-medium"
                    >
                      Add Test Case
                    </div>
                  </div>
                </label>
                <button
                  type="submit"
                  className="mt-4 bg-zinc-700 hover:bg-zinc-800 text-white py-4 px-4 font-medium"
                >
                  Submit
                </button>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ProblemForm
