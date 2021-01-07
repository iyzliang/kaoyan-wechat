import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import success from './images/success.svg'
import close from './images/close.svg'

export default class Modal extends Component {
  render () {
    const { showModal } = this.props
    const modalDom = showModal ? (
      <View className='modal' onClick={this.props.onCloseModal}>
        <View className="modal-container">
          <Image className="modal-img" src={ success }/>
          <View className="modal-title">您已提交成功</View>
          <View className="modal-msg">感谢您的支持，客服将与您联系为您答疑解惑~</View>
        </View>
        <image src={close} className="modal-close"/>
      </View>
    ) : ''
    return modalDom
  }
}
