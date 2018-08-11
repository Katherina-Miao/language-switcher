import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DemoComponent from './DemoComponent.js'

class DemoPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <header>{this.props.title}</header>
        <DemoComponent greeting={this.T('greeting', {name:'Kathy',age:26})} howAreYou={this.T('howAreYou')} imgSrc={this.T('imgSrc')}/>
        <button onClick={() => this.setLang('en-US')}> en-US </button>
        <button onClick={() => this.setLang('zh-CN')}> zh-CN </button>
      </div>
    )
  }
}

DemoPage.propTypes = {
  title: PropTypes.string
}

DemoPage.defaultProps = {
  title: 'TITLE'
}

export default DemoPage
