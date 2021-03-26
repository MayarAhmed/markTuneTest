import React, { Component } from 'react'
import {Line} from 'react-chartjs-2';

const styles = {
        graph:{
        width:'30%',
        margin:'10px 0'
      }
}
 
 export class Graph extends Component {


    state = {
        labels: [],
        datasets: [
          {
            label: '',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#6AC5B2',
            borderColor: 'rgba(0,0,0,0.8)',
            borderWidth: 2,
            data: []
          },
          {
            label: 'pending',
            backgroundColor: 'red',
          }
        ]
      }
            applyData = () => {
   
              //Apply points Arr
              
              let newArr = []; 
              let arr =   Array(this.props.labelLength.length) // })
         for (let i = 0;i< arr.length; i++ ){
           newArr.push(i+1)
          
         }
       return newArr;
            }

           componentDidMount(){
           let labelData = this.applyData();
           let pointsDataSet = [...this.state.datasets];
           pointsDataSet[0].data = labelData;
           pointsDataSet[0].label = this.props.userId
           let labeling = this.props.points
           this.setState({
            labels:labeling,
            datasets:pointsDataSet
           })
console.log(pointsDataSet)
            }
      
     render() {
       
         return (
            <div style={styles.graph}>
        <Line
          data={this.state}
          options={{
            title:{
              display:true,
              text:'User Activity ',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
         )
     }
 }
 
 export default Graph;
 
