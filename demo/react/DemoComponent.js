import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
          {this.F('friendlyDate',717561000)}
        </p>
        <p>
          {navigator.language}
        </p>
        <DemoList list={this.T(['oneMonth', 'threeMonths', 'oneYear'])}/>
        Favourate:
        <ol>
          <li>
            {this.T('fruits.apple')}
          </li>
          <li>
            {this.T('fruits.banana')}
          </li>
          <ul>
            <li>
              {this.T('fruits.mandarin.orange')}
            </li>
            <li>
              {this.T('fruits.mandarin.lemon')}
            </li>
          </ul>
        </ol>
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
