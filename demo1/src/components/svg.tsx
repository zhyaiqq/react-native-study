import React from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import SvgUri from 'react-native-svg-uri'
import svgs from '../assets/svgs'

interface Props {
	size?: number,
	color?: string,
	icon?: string,
	style?: object
}

export default class Svg extends React.Component<Props> {
	render() {
		let { size = 20, color = '#222', icon = 'return', style } = this.props
		return (
			<View style={style}>
				<SvgUri
					width={size}
					height={size}
					fill={color}
					svgXmlData={svgs[icon]}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {

	}
})