import React, { Component, PropTypes } from 'react'
import DemoList from './DemoList.js'

class DemoComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>
        {this.props.greeting}
        </h1>
        <h3>
        {this.props.howAreYou}
        </h3>
        <p>
        {this.F(1400000000,'friendlyDate')}
        </p>
        <p>
        {navigator.language}
        </p>
        <DemoList list={this.L(['oneMonth', 'threeMonths', 'oneYear'])}/>
        <img src={this.props.imgSrc}/>
      </div>
    )
  }
}

DemoComponent.propTypes = {
  greeting: PropTypes.string,
  howAreYou: PropTypes.string,
  imgSrc: PropTypes.string
}

DemoComponent.defaultProps = {
  greeting: '你好我是xx',
  howAreYou: '你好嘛？',
  imgSrc: 'http://img4q.duitang.com/uploads/item/201501/21/20150121093402_iVzwx.jpeg'
}

export default DemoComponent
