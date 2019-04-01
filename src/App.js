import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:7001/";
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use(config => {

    config.headers['Content-Type'] = 'application/json; charset=utf-8';

    return config;
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
    let res = response.data;

    return res || {};
});


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        this.getList()
    }

    getList() {
        axios({
            url: "user/list"
        }).then(e => {
            console.log(e)
            this.setState({
                userList: e
            })
        })
    }

    addUser = () => {
        console.log(this.state)
        axios({
            method: "post",
            url: "user/add",
            data: {
                userName: this.state.userName
            }
        }).then(e => {
            this.getList()
        })
    }
    
    delUser = userId => {
        axios({
            method: "post",
            url: "user/del",
            data: {
                userId
            }
        }).then(e => {
            this.getList()
        })
    }

    upDataUser = userId => {
        axios({
            method: "post",
            url: "user/update",
            data: {
                userId,
                userName: this.state.userName
            }
        }).then(e => {
            this.getList()
        })
    }

    onChange = (key) => {
        return e => {
            this.setState({
                [key]: e.target.value
            })
        }
    }

    render() {
        return (
            <div className="App">
                <div>
                    <input type="text" onChange={this.onChange("userName")} />
                    <button onClick={this.addUser}>添加</button>
                </div>
                <table>
                    <tbody>
                        {this.state.userList.map((item, i) => <tr key={i}>
                            <td>{item.user_id}</td>
                            <td><span>{item.user_name}</span></td>
                            <td>
                                <span onClick={() => this.upDataUser(item.user_id)}>更改</span>
                                <span onClick={() => this.delUser(item.user_id)}>删除</span>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
