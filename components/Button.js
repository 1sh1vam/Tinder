import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'

const StyledPressable = styled(Pressable);

const Button = ({ children, ...props }) => {
  return (
    <StyledPressable {...props} className="active:opacity-50">
      {children}
    </StyledPressable>
  )
}

export default Button

const styles = StyleSheet.create({})