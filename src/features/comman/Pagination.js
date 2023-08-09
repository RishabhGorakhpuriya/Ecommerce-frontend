import React from 'react'
import { ITEM_PER_PAGE } from '../../app/constants'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({ page, setPage, handlePage, totalItem }) => {
    const totalPages = Math.ceil(totalItem / ITEM_PER_PAGE)
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={e => handlePage(page > 1 ?  page - 1 : page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
            onClick={e => handlePage(page < totalPages ? page + 1 : page)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * ITEM_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEM_PER_PAGE > totalItem ? totalItem : page * ITEM_PER_PAGE}</span> of{' '}
              <span className="font-medium">{totalItem}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <div
                onClick={e => handlePage(page > 1 ? page - 1 : page)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>

              {Array.from({ length: totalPages }).map((el, index) => (
                <div
                  onClick={e => handlePage(index + 1)}
                  aria-current="page"
                  key={index}
                  className={`relative z-10 inline-flex items-center ${index + 1 === page ? 'bg-indigo-600 text-white' : "text-gray-400 "}  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
                >
                  {index + 1}
                </div>
              ))}
              <div
                onClick={e => handlePage(page < totalPages ? page + 1 : page)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pagination
