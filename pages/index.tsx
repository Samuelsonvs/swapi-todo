import type { NextPage } from 'next'
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import {
  getSwapiNames,
  selectSwapi,
  addTodo
} from '@/redux/slice/swipeSlice';
import { useEffect, useState } from 'react';
import Modal from '@/components/TodoModal';

const Home: NextPage = () => {
  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [sort, setSort] = useState<string>("sort-status")
  const [person, setPerson] = useState<string>("")
  const [todoStatus, setTodoStatus] = useState<string>("TO DO")
  const dispatch = useAppDispatch();
  const {
    data, 
    pending, 
    error,
    todos
  } = useAppSelector(selectSwapi);

  const modalHandler = () => {
    setModalStatus(true)
  }
  const todoAddHandler = () => {
    if (title && content && person && todoStatus && todos) {
      const addedTodos = Object.keys(todos).reduce((acc, personName) => {
        if (person === personName) {
          return ({...acc, [personName] : {...todos[personName],[title]: {description: content, status: todoStatus}}})
        } else {
          return ({...acc, [personName] : {...todos[personName]}})
        }
      }, {})
      dispatch(addTodo(addedTodos))
      setTitle("")
      setContent("")
    }
  }

  useEffect(() => {
    dispatch(getSwapiNames())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      const rData = Array.isArray(data) && data.reduce((acc, person) => ({
        ...acc, [person.name] : {}
      }), {})
      setPerson(Object.keys(rData)[0])
      dispatch(addTodo(rData))
    }
  }, [dispatch, data])

  return (
    <div className=' text-black container mx-auto'>
      {error && (<span>{error}</span>)}
      {pending && (<span>data is coming</span>)}
      <h1 className='py-3 text-3xl text-center'>
        Welcome to ToDo-App
      </h1>
      <div className="py-4 flex justify-center">
        <button type="button" onClick={modalHandler} className="p-3 rounded-lg text-white bg-gray-500 hover:bg-gray-400 active:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300">
          Add ToDo
        </button>
      </div>
        <Modal
          isOpen={modalStatus}
          setIsOpen={setModalStatus}
          handler={todoAddHandler}
          firstButtonMessage={"Add ToDo"}
          secondButtonMessage={"Cancel"}
          dialogTitleMessage={"Add ToDo"}
          dialogMessage={"Choose options and press 'Add ToDo'"}
        >
          <>
        <div id="select-person" className='pt-10 pb-3 flex justify-center'>
          {todos && 
            <select onChange={(e) => setPerson(e.target.value)} aria-label="select-person" name="person" id="person" value={person}>
            {
              Object.keys(todos).map((person, idx) => {
                return (
                  <option key={idx+10} value={person}>
                    {person}
                  </option>
                )
              })
            }
          </select>
          }
        </div>
        <div id="select-status" className='py-3 flex justify-center'>
          <select onChange={(e) => setTodoStatus(e.target.value)} aria-label="select-status" name="status" id="status" value={todoStatus}>
            <option value="TO DO">
              TO DO
            </option>
            <option value="IN PROGRESS">
              IN PROGRESS
            </option>
            <option value="DONE">
              DONE
            </option>
          </select>
        </div>
        <div className='py-2 flex space-x-9 items-center'>
          <label htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            className="custom-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className='py-2 flex space-x-3 items-center'>
          <label htmlFor="content">
            Content:
          </label>
          <input
            id="content"
            type="text"
            className="custom-input"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <div>

        </div>
        </>
        </Modal>
      <div id="select-sort" className="py-5 flex justify-center">
        <select onChange={(e) => setSort(e.target.value)} aria-label='select-sort' name="sort" id="sort" value={sort}>
          <option selected disabled hidden value="sort-status">
            Sort Status
          </option>
          <option value="TO DO">
            TO DO
          </option>
          <option value="IN PROGRESS">
            IN PROGRESS
          </option>
          <option value="DONE">
            DONE
          </option>
        </select>
      </div>
      <div className='px-5 mx-auto'>
          {todos && 
            <ul>
              {
                Object.keys(todos).map((personName, idx) => {
                  const todoList = todos[personName]
                  if (Object.keys(todoList).length > 0) {
                    return (
                      <li key={idx} className='w-full text-center odd:bg-white even:bg-gray-100 py-4 first:pt-0'>
                        <div className='p-2'>{personName}</div>
                        <div className="hidden sm:flex justify-between font-semibold">
                          <div>Title</div>
                          <div>Description</div>
                          <div>Status</div>
                        </div>
                        {Object.keys(todoList).map((td, index) => {
                          const { description, status } = todoList[td as keyof typeof todoList]
                          if (sort !== "sort-status") {
                            if (sort === status) {
                              return (
                                <div key={index} className="w-full flex flex-col sm:flex-row justify-between sm:space-x-3">
                                  <div className="flex justify-between flex-wrap">
                                    <div className="inline sm:hidden font-semibold">Title</div>
                                    <div>{td}</div>
                                  </div>
                                  <div className="flex justify-between flex-wrap">
                                    <div className="inline sm:hidden font-semibold">Description</div>
                                    <div>{description}</div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="inline sm:hidden font-semibold">Status</div>
                                    <div className="whitespace-nowrap">{status}</div>
                                  </div>
                                </div>
                              )
                            }
                          } else {
                            return (
                              <div key={index} className="w-full flex flex-col sm:flex-row justify-between sm:space-x-3">
                              <div className="flex justify-between flex-wrap">
                                <div className="inline sm:hidden space-x-2 font-semibold">Title</div>
                                <div>{td}</div>
                              </div>
                              <div className="flex justify-between flex-wrap">
                                <div className="inline sm:hidden space-x-2 font-semibold">Description</div>
                                <div>{description}</div>
                              </div>
                              <div className="flex justify-between">
                                <div className="inline sm:hidden space-x-2 font-semibold ">Status</div>
                                <div className="whitespace-nowrap">{status}</div>
                              </div>
                            </div>
                            )
                          }
                        })}
                      </li>
                    )
                  } else {
                    return (
                      <li key={idx} className='w-full text-center odd:bg-white even:bg-gray-100 py-4 first:pt-0'>
                        <div className='p-2'>{personName}</div>
                      </li>
                    )
                  } 
                })
              }
            </ul>
          }
      </div>
    </div>
  )
}

export default Home
