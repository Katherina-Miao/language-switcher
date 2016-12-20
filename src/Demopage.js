import React, { Component, PropTypes } from 'react'
import DemoComponent from './DemoComponent.js'

class DemoPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <header>{this.props.title}</header>
      <DemoComponent greeting={this.T('greeting', {name:'Kathy',age:24})} howAreYou={this.T('howAreYou')} imgSrc={this.T('imgSrc')}/>
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
