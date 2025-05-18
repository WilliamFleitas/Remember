'use client'

import {
  Menu,
  MenuItem,
  MenuButton as MButton,
  ClickEvent
} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import './MenuButton.css'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { CiLock } from 'react-icons/ci'

const DOPDOWN_X_PLACE_OPTIONS = {
  left: 'left',
  right: 'right'
}

export interface OptionsType {
  id: string
  label: string
  value: string
  icon?: string
  disabled?: boolean
  description?: string
}
interface MenuButtonPropsType {
  ButtonBody: React.ReactNode
  optionsData: OptionsType[]
  placeY: 'top' | 'bottom' | 'left' | 'right'
  placeX: 'left' | 'right'
  portal?: boolean
  viewScroll?: 'auto' | 'initial' | 'close'
  gap?: number
  shift?: number
  selectedRows?: OptionsType[]
  checkBoxMode?: boolean
  menuWidthSize?: 'small' | 'medium'
  keepOpen?: boolean
  position: 'initial' | 'auto' | 'anchor'
  menuOnClick: (event: ClickEvent, rowData?: OptionsType) => void
}
export default function CustomMenu ({
  ButtonBody,
  optionsData,
  placeY,
  placeX,
  portal = true,
  viewScroll = 'auto',
  gap = 6,
  shift,
  selectedRows,
  checkBoxMode = false,
  menuWidthSize = 'small',
  keepOpen = false,
  position,
  menuOnClick
}: MenuButtonPropsType) {
  return (
    <Menu
      portal={portal}
      menuButton={<MButton>{ButtonBody}</MButton>}
      menuClassName={`custom-menu ${
        menuWidthSize === 'medium' ? 'custom--width-500' : 'custom--width-200'
      }`}
      direction={placeY}
      viewScroll={viewScroll}
      align={placeX === DOPDOWN_X_PLACE_OPTIONS.left ? 'end' : 'start'}
      gap={gap}
      shift={shift ? shift : placeX === DOPDOWN_X_PLACE_OPTIONS.left ? -10 : 10}
      overflow='auto'
      position={position}
      transition
    >
      {optionsData.map(item => (
        <div key={item.id}>
          <MenuItem
            id={item.id.toString()}
            value={item.value}
            className={`custom-item`}
            onClick={event => {
              event.keepOpen = keepOpen
              menuOnClick(event, item)
            }}
            style={{
              pointerEvents: item.disabled ? 'none' : 'auto',
              color: item.disabled ? '#3d3d41' : '',
              backgroundColor:
                selectedRows !== undefined &&
                selectedRows.some(obj => obj.value === item.value)
                  ? '#3a3c40'
                  : ''
            }}
          >
            <div
              className={`flex flex-row text-start items-center justify-start w-full h-fit gap-2 `}
            >
              {checkBoxMode ? (
                <div
                  className={`min-w-[1.5rem] min-h-[1.5rem] border rounded-full flex text-center items-center justify-center mr-1 ${
                    selectedRows !== undefined &&
                    selectedRows.some(obj => obj.value === item.value)
                      ? 'border-green-500'
                      : 'border-inputButtonColor'
                  }`}
                >
                  {selectedRows !== undefined &&
                  selectedRows.some(obj => obj.value === item.value) ? (
                    <IoCheckmarkSharp className='w-4 h-4 text-green-500' />
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {/* {item.icon ? (
                  <IconRenderer
                    iconName={item.icon}
                    className={`w-5 h-5   pointer-events-none ${
                      item.disabled ? '' : 'text-primaryColorButton'
                    }`}
                  />
                ) : (
                  ''
                )} */}
              <span className=' w-fit mr-1 whitespace-nowrap flex flex-grow '>
                {item.label}
              </span>
              {item.disabled ? <CiLock className='w-5 h-5' /> : <></>}
            </div>
          </MenuItem>
        </div>
      ))}
    </Menu>
  )
}
