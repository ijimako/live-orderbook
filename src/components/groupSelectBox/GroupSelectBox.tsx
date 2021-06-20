import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { RootState } from "../../redux/reducers"
import "./GroupSelectBox.css"
import { XBT } from "../../services/webSocket"
import { updateGroupLevelSaga } from "../../redux/actions"

const GroupSelectBox = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)

  const dispatch = useDispatch()

  const crypto = useSelector((state: RootState) => state.crypto)
  const groupLevel = useSelector((state: RootState) => state.groupLevel)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Group <span>{groupLevel}</span>
      </DropdownToggle>
      <DropdownMenu container="body">
        <DropdownItem
          onClick={() => {
            dispatch(updateGroupLevelSaga(crypto === XBT ? 0.5 : 0.05))
          }}
        >
          {crypto === XBT ? 0.5 : 0.05}
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            dispatch(updateGroupLevelSaga(crypto === XBT ? 1 : 0.1))
          }}
        >
          {crypto === XBT ? 1 : 0.1}
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            dispatch(updateGroupLevelSaga(crypto === XBT ? 2.5 : 0.25))
          }}
        >
          {crypto === XBT ? 2.5 : 0.25}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default GroupSelectBox
