// App
import React from 'react'
import moreico from '../img/more_icon.png'
import ReactResizeDetector from 'react-resize-detector';
// Router
import {
    NavLink
} from "react-router-dom"


class MenuNav extends React.Component {    
    state = {
        menu:[
            {
                id:1,
                name:'Грузовладельцам',
                href:"/perev",
                type:"menu",
                width:0
            },
            {
                id:2,
                name:'Грузовладельцам',
                href:"/perev",
                type:"menu",
                width:0
            },
            {
                id:3,
                name:'Грузовладельцам',
                href:"/perev",
                type:"menu",
                width:0
            },
            {
                id:4,
                name:'FAQ',
                href:"/faq",
                type:"menu",
                width:0
            }
        ],
        menuWidth: 0
    }

    componentDidMount(){
        this.onResizeItem=this.onResizeItem.bind(this)
        this.onResize=this.onResize.bind(this)
    }
    onResize(menuWidth){
        this.setState({menuWidth})
    }

    onResizeItem(itemWidth, id) {
        let menu = this.state.menu
        for (let i = 0; i < menu.length; i++) {
            if(menu[i].id===id)
            {
                menu[i].width =itemWidth
                break
            }
        }
        this.setState({menu})
    }

    render() {
        let menu = this.state.menu,width=61      
        for (let i = 0; i < menu.length; i++) {
            width+=menu[i].width
            if(width>=this.state.menuWidth)
            {
                menu[i].type='submenu'
            }
            else
                menu[i].type='menu'
        }

        return (            
            <div className="header-navigation d-premd-none col">
                <nav>
                    <ul>

                        {menu.map((item)=>{
                            return item.type === 'menu' && (                             
                                <li key={item.id} style={{opacity:item.width?1:0}}>
                                <NavLink to={item.href} activeClassName="active">{item.name}</NavLink>
                                <ReactResizeDetector handleWidth handleHeight onResize={(width) => {this.onResizeItem(width, item.id)}} />
                                </li>
                        )})}
                                         
                        {menu.find((item)=>item.type === 'submenu') && <li>
                            <span className="more-menu">
                                Еще <img src={moreico} className="d-inline" alt="Pogrooz" />
                                <div className="submenu">
                                    <ul>
                                    {menu.map((item)=>{
                                        return item.type === 'submenu' && (                             
                                        <li key={item.id}>
                                        <NavLink to={item.href} activeClassName="active">{item.name}</NavLink>                                        
                                        </li>
                                    )})}
                                    </ul>
                                </div>
                            </span>
                        </li>}
                    </ul>
                </nav>
                <ReactResizeDetector handleWidth handleHeight onResize={(width) => {this.onResize(width)} }/>
            </div>
        )
    }
}

export default MenuNav