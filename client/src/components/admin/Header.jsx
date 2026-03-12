import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useMisStore from '../../store/mis-store'

const Header = ({collapse, setCollapse}) => {
  const headerName = useMisStore((state)=>state.headerName)
  return (
     <header className="bg-white p-4 sticky top-0 left-0">
          <div className="flex justify-between items-center max-w-350 mx-auto">
            <button
              onClick={() => setCollapse(!collapse)}
              className="p-2 text-xl font-bold lg:hidden cursor-pointer"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="text-2xl font-bold">{headerName}</h1>
            <div className="bg-green-100  rounded-full flex items-center justify-center p-2">
              <FontAwesomeIcon
                className="text-green-600 text-xl"
                icon={faAccessibleIcon}
              />
            </div>
          </div>
        </header>
  )
}

export default Header