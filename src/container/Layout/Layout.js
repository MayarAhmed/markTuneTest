import React, { Component } from 'react'
import SearchBar from '../../componets/SearchBar/SearchBar'
import Graph from '../../componets/Graph/Graph'
import axiosInstance from '../../axios'
import _ from "lodash";
import Aux from '../../hoc/Auxailairy'
import { Bubble } from 'react-chartjs-2';

const styles = {

    header:{
        backgroundColor:'#3821a0',
        width:'auto',
        height:'50px',
        marginBottom:'20px',
        padding:'20px 30px',
        justifyContent: 'space-between',
        boxShadow:'inset 2px -10px 5px -3px rgba(222 222 222 / 27%)',
        display: 'flex',
        fontSize: '25px',
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'capitalize',
        alignItems:'center'
    },

    main:{
      display:'flex',
      flexWrap: 'wrap',
      flexBasis: '33.333333%',
      justifyContent:'space-around'

    }
}

export class Layout extends Component {

    state={

        data:null,
        userInfo:null,
        label:[]
    }

   

    componentDidMount(){
        axiosInstance.get('/getData')
        .then(res=>
            this.setState({
                data:res.data
            }))
            

        .catch(err=>
            console.log('error',err))
            

    }

     filterHandler=()=> {
         if(this.state.data!==null){
         let userData = [...this.state.data]
        let arrFiltered = _.groupBy(userData,function(goal){
            return goal.userid
        })
       console.log(arrFiltered)
      let graphData =  Object.keys(arrFiltered).map((el,i)=>{
        let pointsArr = [];
        let graphArr = [];
        if(arrFiltered[el].lenght !== 0 || arrFiltered[el] !== undefined ){
        arrFiltered[el].map((goal,x)=>{
            let point;
            if(goal.points_in !== undefined ){
                 point = goal.points_in;
                 graphArr.push(el,goal.status)
            }
            if(goal.goal !== undefined){
             point = goal.goal.points_in
             graphArr.push(el,goal.status)
            }
             pointsArr.push(point)
             console.log('POINTS',pointsArr)
          return pointsArr;
        
        })

    }
    

    console.log('[graphA]rr',graphArr)

        return <Graph 
           key={i}
           test={el}
           labelLength={arrFiltered[el]}
           points={pointsArr}
           userId={el}
          />

       })
        
       return graphData;
          
    }   //end of if Statement

      }


     render() {
         

        return (
            <Aux>
                <header style={styles.header}>
                    <p>Dashboard</p>
                    <SearchBar />
                </header>
                <main style={styles.main}>
                {this.filterHandler()}
            </main>
            

            </Aux>
        )
    }
}

export default Layout;
// console.log(arrFiltered)
// let userInfo = Object.keys(arrFiltered).map((el,i)=>{
//     let arrUser = []
//     let objUser={}
//    return(
//        arrFiltered[el].map((_,x)=>{
//               objUser={"user":el,"points":arrFiltered[el][x].goal.points_in}
//            arrUser.push(objUser)
           
//            return(
               
//                 console.log('test')
//            )
//        }),

       
//        <Graph 
//        label={arrFiltered[el].length}
//        points={arrUser}
//        userId={el}/>
//    )
// })

// //= return userData;
