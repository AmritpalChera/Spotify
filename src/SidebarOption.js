import React from 'react';
import "./SidebarOption.css"

const SidebarOption = (props) => {
    let { title, Icon } = props;
    return (
        <div className="sidebarOption">
            {Icon && <Icon className="sidebarOption-icon"/>}
            {Icon ? <h4>{title}</h4> :<p>{title}</p>}
        </div>
    )
}

export default SidebarOption
