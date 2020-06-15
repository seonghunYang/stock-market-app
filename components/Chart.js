import React from 'react'
import { AreaChart, YAxis, Grid, XAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class Chart extends React.PureComponent {
    render() {
        const {data} = this.props;
        const contentInset = { top: 20, bottom: 20 }
        console.log(data)
        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={data.c}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={5}
                    formatLabel={(value) => `${value}`}
                />
                <AreaChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data.c}
                    svg={{ fill: 'rgba(116, 185, 255, 0.8)' }}
                    contentInset={contentInset}
                    xAccessor={({index}) => data.t[index]}
                    showGrid={false}
                >
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data.c}
                    formatLabel={(value, index) => {
                        let day = new Date(data.t[index] * 1000).getDate();
                        return `${day}D`
                    }}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
                    <Grid />
                </AreaChart>
            </View>
        )
    }
}
export default Chart;