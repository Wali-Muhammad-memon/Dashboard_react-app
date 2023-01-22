import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./dashboard.css"
import WidgetDoughnut from "./WidgetDoughnut";
import WidgetText from "./WidgetText";
import WidgetBar from "./WidgetBar";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


//excel import
const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            items: [],
            dropdownOptions: [],
            trendStore: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            pageViews: null,
            users: null,
            newUsers: null,
            sourceArr:[],
            userArr:[]
        };
    }

    getData =  args => {
        const arr = this.state.items;
        const arrlen =arr.length

        let organicSource = 0;
        let directSource = 0;
        let referralSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let selectedValue = null;
        let sourceArr = [];
        let userArr=[];

        for(let i=0; i < arrlen; i++){
            if(args == arr[i]['month']){
                organicSource = arr[i].organic_source;
                directSource = arr[i].direct_source;
                referralSource = arr[i].referral_source;
                pageViews = arr[i].page_views;
                users = arr[i].users;
                newUsers = arr[i].new_users;
                sourceArr.push(
                    {
                        label: "Organic Source",
                        value: arr[i].organic_source
                      },
                      {
                        label: "Direct Source",
                        value:arr[i].direct_source
                      },
                      {
                        label: "Referral Source",
                        value: arr[i].referral_source
                      }
                )
                userArr.push(
                    {
                        label: "Users",
                        value: arr[i].users
                      },
                      {
                        label: "Views Users",
                        value:arr[i].newUsers
                      },
                )
            }
        }

        selectedValue = args;
        this.setState({
            organicSource: organicSource,
            directSource:directSource,
            referralSource: referralSource,
            pageViews:pageViews,
            users: users,
            newUsers:newUsers,
            sourceArr:sourceArr,
            userArr:userArr,

        }, () => {
           console.log(this.state.organicSource) 
        } 
        )
    }

    updateDashboard =  event =>{
        this.getData(event.value);
        this.setState({selectedValue:event.value})
    }

    componentDidMount(){
        fetch(url)
        .then(response => response.json())
        .then(data => {

            let batchRowValues = data.valueRanges[0].values;

            const rows = [];

            for (let i = 1; i < batchRowValues.length; i++) {
                let rowObject = {};
                for (let j = 0; j < batchRowValues[i].length; j++) {
                    rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                }
                rows.push(rowObject);
            }

                           // dropdown options
                           let dropdownOptions = [];

                           for (let i = 0; i < rows.length; i++) {
                               dropdownOptions.push(rows[i].month);
                           }
           
                           dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                           this.setState(
                               {
                                   items: rows,
                                   dropdownOptions: dropdownOptions,
                                   selectedValue: "Jan 2018"
                               },
                               () => this.getData("Jan 2018")
                           );
        });
    }

    render(){
        // const chartData = [
        //     // {
        //     //   label: "Venezuela",
        //     //   value: "290"
        //     // },
        //     // {
        //     //   label: "Saudi",
        //     //   value: "260"
        //     // },
        //     // {
        //     //   label: "Canada",
        //     //   value: "180"
        //     // },
        //     // {
        //     //   label: "Iran",
        //     //   value: "140"
        //     // },
        //     // {
        //     //   label: "Russia",
        //     //   value: "115"
        //     // },
        //     // {
        //     //   label: "UAE",
        //     //   value: "100"
        //     // },
        //     // {
        //     //   label: "US",
        //     //   value: "30"
        //     // },
        //     // {
        //     //   label: "China",
        //     //   value: "30"
        //     // }
        //   ];
    
        //   const chartConfigs = {
        //     type: "bar2d", // The chart type
        //     width: "700", // Width of the chart
        //     height: "125", // Height of the chart
        //     dataFormat: "json", // Data type
        //     dataSource: {
        //       // Chart Configuration
        //       chart: {
        //         bgColor:'#2a2a2a',
        //         numberSuffix: "K",
        //         theme: "fusion"                 //Set the theme for your chart
        //       },
        //       // Chart Data - from step 2
        //       data: chartData
        //     }
        //   };
          const options = [
            'one', 'two', 'three'
          ];
          const defaultOption = options[0];
        return(
       <div>
        <Container>
            <Row>
                <Col><Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" /></Col>
            </Row>
        </Container>
        <Container className="main_dashboard">
            <Row>
                <Col>
                <WidgetText title="Organic Source" value={this.state.organicSource}/>
                </Col>
                <Col>
                <WidgetText title="Direct Source" value={this.state.directSource}/>
                </Col>
                <Col>
                <WidgetText title="referal Source" value={this.state.referralSource}/>
                </Col>
                <Col>
                <WidgetText title="pageViews Source" value={this.state.pageViews}/>
                </Col>
            </Row>
            <Row>
            <Col>
                <WidgetText title="Users" value={this.state.users}/>
                </Col>
                <Col>
                <WidgetText title="New Users" value={this.state.newUsers}/>
                </Col>
                <Col>
                <WidgetBar title="Source Comparison" data={this.state.sourceArr}/>
                </Col>
                <Col>
                <WidgetDoughnut title="User Comparison" data={this.state.userArr}/>           
            </Col>
            </Row>
        </Container>       
        </div> 
        )
        }
}

export default Dashboard