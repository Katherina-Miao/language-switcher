import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DemoList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let lis = this.props.list.map((item, index) =>{
        return (
          <li key={index}>{item}</li>
        )
      }
    )

    return (
      <ul>
      {lis}
      </ul>
    )
  }
}

DemoList.propTypes = {
  list: PropTypes.array
}

DemoList.defaultProps = {
  list: ['list1', 'list2']
}

export default DemoList
