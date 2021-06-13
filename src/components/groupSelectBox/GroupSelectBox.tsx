import React, { useState } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import "./GroupSelectBox.css"

const GroupSelectBox = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Group</DropdownToggle>
      <DropdownMenu container="body">
        <DropdownItem onClick={() => {}}>Action 0.50</DropdownItem>
        <DropdownItem onClick={() => {}}>Action 1</DropdownItem>
        <DropdownItem onClick={() => {}}>Action 2.5</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default GroupSelectBox
